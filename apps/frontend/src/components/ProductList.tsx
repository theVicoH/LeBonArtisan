import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setProducts } from '../stores/slices/productSlice';
import Product from 'core/entities/productEntities';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/product/all");
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const responseData = await response.json();
  if (!responseData.body || !Array.isArray(responseData.body.data)) {
    throw new Error('Fetched data is not in the expected format');
  }
  return responseData.body.data;
};

const ProductsList: React.FC = () => {
  const dispatch = useDispatch();

  const { data: products, error, isLoading } = useQuery<Product[], Error>(
    'products', 
    fetchProducts
  );

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link to="/create">
        <Button variant="contained" color="primary">Add Product</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.isArray(products) && products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Type: {product.type}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Warranty Years: {product.warrantyYears}</p>
            <p>Available: {product.available ? 'Yes' : 'No'}</p>
            <Link to={`/edit/${product.id}`}>
              <Button variant="contained" color="secondary">Edit</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
