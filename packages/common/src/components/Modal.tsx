import { Box, Button, Typography, Modal as MUIModal } from "@mui/material";

interface Props {
  openModal: boolean;
  handleCloseModal: () => void;
  handleConfirmDelete: () => void;
}

const Modal = ({ openModal, handleCloseModal, handleConfirmDelete }: Props) => {
  return (
    <MUIModal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
        className="max-w-sm w-full"
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="modal-description" className="mt-2">
          Are you sure you want to delete this product?
        </Typography>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Box>
    </MUIModal>
  );
};

export default Modal;
