import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

console.log(`Server is running on ${API_URL}/products`)

// Fetching (Get) the product from db.json
export const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}products`);
      console.log(response); // Move the console.log before the return
      return response.data;
    } catch (error) {
      console.error('Something went wrong', error);
      throw error;
    }
  };

// Add product (Post) to db.json
export const addProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}products`, product);
      return response.data;
    } catch (error) {
      console.error('Something went wrong', error);
      throw error;
    }
  };