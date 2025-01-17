import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setProducts } from "../stores/slices/productSlice";
import Product from "core/entities/productEntities";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { getAllProducts } from "common/services";
import Modal from "common/components/Modal";
import ProductItem from "common/components/ProductItem";
import io from "socket.io-client";

const URL: string = import.meta.env.VITE_REACT_APP_API_URL;

const ProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const { data: products, error, isLoading } = useQuery<Product[], Error>("products", () => getAllProducts(URL));

  const deleteMutation = useMutation(
    (productId: string) =>
      fetch(`${URL}/product/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        setOpenModal(false);
        socket.emit('getAllProducts');
      },
      onError: () => {
        alert("Failed to delete product.");
      },
    }
  );

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  useEffect(() => {
    const socket = io(URL);
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('getAllProducts');
    });

    socket.on('allProducts', (data: Product[]) => {
      dispatch(setProducts(data));
    });

    socket.on('error', (message: string) => {
      console.error(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      deleteMutation.mutate(selectedProductId);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProductId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link to="/create">
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} handleDeleteClick={handleDeleteClick} />
          ))}
      </div>
      <Modal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsList;
