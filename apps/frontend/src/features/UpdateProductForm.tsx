import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, Link } from 'react-router-dom';

const PRODUCT_SCHEMA = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  price: z.number().min(1, 'Price must be at least 1'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  warrantyYears: z.number().min(0, 'Warranty must be at least 0 years'),
  available: z.boolean(),
});

const URL: string = import.meta.env.VITE_REACT_APP_API_URL;

type Product = z.infer<typeof PRODUCT_SCHEMA>;

const UpdateProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Product>({
    resolver: zodResolver(PRODUCT_SCHEMA),
  });

  const queryClient = useQueryClient();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { data: product, isLoading, error } = useQuery<Product>(['product', id], () =>
    fetch(`${URL}/product/${id}`).then(res => res.json())
  );

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const mutation = useMutation(
    (updatedProduct: Product) => fetch(`${URL}/product/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        setSnackbarMessage('Product updated successfully!');
        setOpenSnackbar(true);
      },
      onError: () => {
        setSnackbarMessage('Failed to update product.');
        setOpenSnackbar(true);
      }
    }
  );

  const onSubmit: SubmitHandler<Product> = data => {
    if (id) {
      mutation.mutate({ ...data, id });

    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading product data</Typography>;

  return (
    <Box className="p-4 max-w-md mx-auto">
      <Typography variant="h4" className="mb-4">Update Product</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} value={id} />
        <div className="mb-4">
          <TextField
            label="Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Type"
            fullWidth
            {...register('type')}
            error={!!errors.type}
            helperText={errors.type?.message}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Price"
            type="number"
            fullWidth
            {...register('price', { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Rating"
            type="number"
            fullWidth
            {...register('rating', { valueAsNumber: true })}
            error={!!errors.rating}
            helperText={errors.rating?.message}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Warranty Years"
            type="number"
            fullWidth
            {...register('warrantyYears', { valueAsNumber: true })}
            error={!!errors.warrantyYears}
            helperText={errors.warrantyYears?.message}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            <input
              type="checkbox"
              {...register('available')}
              className="mr-2"
            />
            Available
          </label>
        </div>
        <div className='flex flex-col gap-2'>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Update
          </Button>
          <Link to={`/`}>
            <Button variant="outlined" color="primary" fullWidth>Cancel</Button>
          </Link>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={mutation.isError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateProductForm;
