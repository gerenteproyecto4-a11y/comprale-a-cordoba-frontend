'use client';

import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useProductsBySeller } from '../../hooks/useProductsBySeller';
import { stripHtmlDeep } from '../../utils/html';
import { normSku } from '../../utils/url';
import './ProductPageView.css';

const PRODUCT_PLACEHOLDER = 'https://via.placeholder.com/700x700?text=Producto';

function getDedupKey(url) {
  if (typeof url !== 'string') return '';
  const raw = url.trim();
  if (!raw) return '';

  // remove hash/query
  const clean = raw.split('#')[0].split('?')[0].trim();

  // try parse url, fallback to string ops
  try {
    const u = new URL(clean, 'https://dummy-base.local');
    const path = u.pathname || '';
    const filename = path.split('/').filter(Boolean).pop() || '';
    if (filename) return filename.toLowerCase(); // ✅ strongest dedup key
    return clean.toLowerCase();
  } catch {
    const path = clean.split('/').pop() || '';
    return (path || clean).toLowerCase();
  }
}

function uniqUrls(urls) {
  const seen = new Set();
  const out = [];

  for (const u of urls) {
    const raw = typeof u === 'string' ? u.trim() : '';
    if (!raw) continue;

    const key = getDedupKey(raw);
    if (!key) continue;

    if (seen.has(key)) continue;
    seen.add(key);

    out.push(raw);
  }

  return out;
}


export default function ProductPageView() {
  const params = useParams();
  const searchParams = useSearchParams();

  const rawId = params?.id;
  const sellerId = searchParams?.get('seller');

  const { data, isLoading, isError } = useProductsBySeller({
    sellerId: sellerId ? Number(sellerId) : null,
    pageSize: 200,
    currentPage: 1,
    enabled: Boolean(sellerId),
  });

  const product = useMemo(() => {
    const items = data?.productsBySeller?.items;
    if (!Array.isArray(items) || !items.length) return null;

    const target = normSku(rawId);
    const found = items.find((p) => normSku(p?.sku) === target);
    if (!found) return null;

    const stock = typeof found.stock_saleable === 'number' ? found.stock_saleable : null;

    const mainUrl = found?.image?.url || '';
    const galleryUrls = Array.isArray(found?.media_gallery)
      ? found.media_gallery.map((m) => m?.url).filter(Boolean)
      : [];

    // ✅ de-dupe (media_gallery often contains the main image)
    const gallery = uniqUrls([mainUrl, ...galleryUrls]);

    const image = gallery[0] || PRODUCT_PLACEHOLDER;

    return {
      id: found.sku,
      sku: found.sku,
      productId: typeof found.id === 'number' ? found.id : null,
      name: found.name || '',
      image,
      price: found.price_range?.minimum_price?.final_price?.value ?? 0,
      description: stripHtmlDeep(found.description?.html),
      gallery,
      stock,
    };
  }, [data, rawId]);

  if (!sellerId) {
    return (
      <div className="pdp-page__state-wrapper">
        <Navbar />
        <main className="pdp-page__state-main">Producto no encontrado (falta sellerId en la URL).</main>
        <Footer sponsors={[]} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pdp-page__state-wrapper">
        <Navbar />
        <main className="pdp-page__state-main">Cargando...</main>
        <Footer sponsors={[]} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pdp-page__state-wrapper">
        <Navbar />
        <main className="pdp-page__state-main">Error cargando el producto.</main>
        <Footer sponsors={[]} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pdp-page__state-wrapper">
        <Navbar />
        <main className="pdp-page__state-main">Producto no encontrado.</main>
        <Footer sponsors={[]} />
      </div>
    );
  }

  return (
    <div className="pdp-page">
      <ProductDetailClient product={product} sellerId={String(sellerId)} />
    </div>
  );
}