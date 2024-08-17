import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.data ? (
        <div>
          <p>Color: {product.data.color || 'N/A'}</p>
          <p>Capacity: {product.data.capacity || 'N/A'}</p>
        </div>
      ) : (
        <p>Data: N/A</p>
      )}
    </div>
  );
};

export default ProductCard;