import React from 'react';
import ProductList from './components/ProductList';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Product Listing with Charts !!</h1>
      <ProductList />
      <Toaster />
    </div>
  );
}

export default App;