import React, { useState } from 'react';
import { addProduct, fetchProducts } from '../services/api';
import toast, {Toaster} from 'react-hot-toast'


const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errors, setErrors] = useState({});

  // Validation on add product
  const validateForm = () => {
    const newErrors = {};

    const alphanumericRegex = /^[a-zA-Z0-9 ]*$/;

    if (!name.trim()) {
      newErrors.name = 'Product Name is required.';
    } else if (!alphanumericRegex.test(name)) {
      newErrors.name = 'Special characters not allowed.';
    }

    if (!color.trim()) {
      newErrors.color = 'Color is required.';
    } else if (!alphanumericRegex.test(color)) {
      newErrors.color = 'Special characters not allowed..';
    }

    if (!capacity.trim()) {
      newErrors.capacity = 'Capacity is required.';
    } else if (isNaN(capacity)) {
      newErrors.capacity = 'Capacity must be a number.';
    } else if (Number(capacity) <= 0) {
      newErrors.capacity = 'Capacity must be a positive number.';
    }

    return newErrors;
  };

  // Function for add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const products = await fetchProducts();
      const nextId = products.length ? Math.max(...products.map(p => Number(p.id))) + 1 : 1;

      const existingColor = products.find(product => product.data?.color?.toLowerCase() === color.toLowerCase());
      const finalColor = existingColor 
        ? existingColor.data.color 
        : color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();

      const newProduct = {
        id: nextId.toString(),
        name,
        data: {
          color: finalColor,
          capacity: Number(capacity)
        }
      };

      await addProduct(newProduct);
      onProductAdded();

      setName('');
      setColor('');
      setCapacity('');
      setErrors({});
      toast.success('Successfully Added')
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, color: '' }));
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, capacity: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={handleColorChange}
          required
        />
        {errors.color && <p className="error-message">{errors.color}</p>}
      </div>
      
      <div className="form-group">
        <select
          value={capacity}
          onChange={handleCapacityChange}
          className='capacity-opions'
          required
        >
          <option value="" disabled>Select Capacity</option>
          <option value="64">512 MB</option>
          <option value="64">32 GB</option>
          <option value="64">64 GB</option>
          <option value="128">128 GB</option>
          <option value="256">256 GB</option>
          <option value="512">512 GB</option>
          <option value="1024">1 TB</option>
        </select>
        {errors.capacity && <p className="error-message">{errors.capacity}</p>}
      </div>
      
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;