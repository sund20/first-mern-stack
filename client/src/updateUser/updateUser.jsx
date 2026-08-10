import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialUserState = {
    name: '',
    email: '',
    address: ''
  };

  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error(
          error.response?.data?.message || 'Failed to load user data',
          { position: 'top-center' }
        );
        navigate('/');
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [id, navigate, API_URL]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.address) {
      toast.error('All fields are required', { position: 'top-center' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/user/${id}`, user);
      toast.success(response.data.message || 'User updated successfully', {
        position: 'top-center'
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(
        error.response?.data?.message || 'Failed to update user',
        { position: 'top-center' }
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 updateUser">
      <Link to="/" className="btn btn-secondary m-3 d-block">Back to User List</Link>
      <h1>Update User</h1>
      <form className="updateUserForm" onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={inputHandler}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={inputHandler}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
