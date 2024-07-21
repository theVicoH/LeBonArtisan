import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Product from "core/entities/productEntities"

interface Props {
  product: Product;
  handleDeleteClick: (productId: string) => void;
}

const ProductItem = ({ product, handleDeleteClick }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>{product.type}</p>
      <p>{product.price}$</p>
      <p>{product.rating}/5</p>
      <div className="flex gap-2">
        <Link to={`/edit/${product.id}`}>
          <Button variant="contained" color="secondary">
            Edit
          </Button>
        </Link>
        <Button variant="contained" color="error" onClick={() => handleDeleteClick(product.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
