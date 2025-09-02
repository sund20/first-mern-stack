import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: ""
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Basic frontend validation
   if (!user.name.trim() || !user.email.trim() || !user.address.trim()) {
  toast.error("Please fill in all fields", { position: 'top-center' });
  return;
}

    try {
      const response = await axios.post('http://localhost:8000/api/user', user);
      toast.success(response.data.message || "User added", { position: 'top-center' });
      setUser(initialUserState);
      navigate('/');
    } catch (error) {
      console.error("Error adding user:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message, { position: 'top-center' });
      } else {
        toast.error("Failed to add user", { position: 'top-center' });
      }
    }
  };

  return (
    <div className="container mt-5 addUser">
      <Link to="/" className="btn btn-secondary m-3 d-block">Back to User List</Link>
      <h1>Add New User</h1>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={inputHandler}
            className="form-control"
            placeholder="Enter name"
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
            placeholder="Enter email"
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
            placeholder="Enter address"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
