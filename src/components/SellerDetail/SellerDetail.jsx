'use client';

import { useEffect } from 'react';
import ProductScrollList from '../SellerSection/ProductScrollList';
import './SellerDetail.css';

function SellerDetail({ seller, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!seller) return null;

  return (
    <div className="seller-detail-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Detalle de ${seller.name}`}>
      <div className="seller-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="seller-detail__close" onClick={onClose} aria-label="Cerrar" type="button">
          ✕
        </button>

        <div className="seller-detail__top">
          <img className="seller-detail__image" src={seller.image} alt={seller.name} />
        </div>

        {/* ✅ meta BELOW image */}
        <div className="seller-detail__meta">
          <div className="seller-detail__meta-head">
            {seller.category ? <span className="seller-detail__category">{seller.category}</span> : null}
            {typeof seller.rating !== 'undefined' && seller.rating !== null ? (
              <p className="seller-detail__rating">★ {seller.rating}</p>
            ) : null}
          </div>

          <h2 className="seller-detail__name">{seller.name}</h2>

          {seller.description ? <p className="seller-detail__description">{seller.description}</p> : null}
        </div>

        <div className="seller-detail__bottom">
          <h3 className="seller-detail__products-title">Productos disponibles</h3>
          <ProductScrollList products={seller.products} />
        </div>
      </div>
    </div>
  );
}

export default SellerDetail;