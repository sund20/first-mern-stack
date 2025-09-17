import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) {
        navigate('/');
        return;
      }

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/${id}`);
        toast.success("User deleted successfully", { position: 'top-center' });
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete user", { position: 'top-center' });
      } finally {
        navigate('/');
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  return null; // No UI — this is a redirecting route
};

export default DeleteUser;
