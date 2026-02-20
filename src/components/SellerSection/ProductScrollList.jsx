import ProductItem from './ProductItem';
import './ProductScrollList.css';

function ProductScrollList({ products, offset = 0, visibleCount = 3 }) {
  const visible = products.slice(offset, offset + visibleCount);

  return (
    <div className="product-scroll" role="list" aria-label="Productos del negocio">
      {visible.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductScrollList;
