import { stripHtml } from './html';

const SELLER_PLACEHOLDER = 'https://via.placeholder.com/400x300?text=Negocio';
const PRODUCT_PLACEHOLDER = 'https://via.placeholder.com/200x200?text=Producto';

function isValidProduct(p) {
  if (!p) return false;

  // We need a stable id for routing (/product/:id)
  const id = p?.sku ?? p?.id;
  if (id === null || id === undefined) return false;
  const idStr = String(id).trim();
  if (!idStr) return false;

  // Optional: avoid rendering blank cards
  const name = String(p?.name ?? '').trim();
  if (!name) return false;

  return true;
}

export function mapSellersWithProducts(items) {
  return (items || [])
    .map((item) => {
      const s = item?.seller || {};
      const rawProductItems = Array.isArray(item?.products?.items) ? item.products.items : [];

      // ✅ filter invalid/empty products defensively
      const validProducts = rawProductItems.filter(isValidProduct);

      const banner_pic = s.banner_pic || null;
      const logo_pic = s.logo_pic || null;

      return {
        id: s.seller_id,
        name: s.shop_title || s.shop_url || `Seller ${s.seller_id}`,
        description: stripHtml(s.description),

        banner_pic,
        logo_pic,

        image: logo_pic || banner_pic || SELLER_PLACEHOLDER,

        category: 'Negocio',
        rating: 4.8,

        products: validProducts.map((p, i) => {
          const pid = p?.sku ?? p?.id ?? `${s.seller_id || 'seller'}-${i}`;
          return {
            id: String(pid), // ✅ ensure string id
            name: p?.name || '',
            price: p?.price_range?.minimum_price?.final_price?.value ?? 0,
            image: p?.image?.url || PRODUCT_PLACEHOLDER,
          };
        }),
      };
    })
    // ✅ remove sellers with no valid products (null, [], invalid items)
    .filter((seller) => Array.isArray(seller?.products) && seller.products.length > 0);
}

export function mapSellers(items) {
  return (items || []).map((item) => {
    const s = item?.seller || {};

    const banner_pic = s.banner_pic || null;
    const logo_pic = s.logo_pic || null;

    return {
      id: s.seller_id,
      name: s.shop_title || s.shop_url || `Seller ${s.seller_id}`,

      banner_pic,
      logo_pic,

      image: logo_pic || banner_pic || 'https://via.placeholder.com/900x900?text=Negocio',

      description: stripHtml(s.description),
    };
  });
}