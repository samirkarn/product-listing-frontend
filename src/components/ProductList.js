import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import Filter from './Filter';
import Charts from './Charts';
import AddProduct from './AddProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetching the product list
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to apply filter on color & capacity
  const handleFilter = (color, capacity) => {
    const filtered = products.filter((product) => {
      const matchesColor = color ? product.data?.color.toLowerCase() === color.toLowerCase() : true;
      const matchesCapacity = capacity ? String(product.data?.capacity) === String(capacity) : true;
      return matchesColor && matchesCapacity;
    });
    console.log('Filtered Products:', filtered);
    setFilteredProducts(filtered);
  };

  // Reload products after adding a product
  const handleProductAdded = () => {
    loadProducts(); 
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <AddProduct onProductAdded={handleProductAdded} />
      <Filter onFilter={handleFilter} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Charts products={filteredProducts} />
    </div>
  );
};

export default ProductList;
