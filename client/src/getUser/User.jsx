import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Links } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';


const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const deleteUser = async (userId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_URL}/api/user/${userId}`); // ✅ correct route
    toast.success("User deleted successfully", { position: 'top-center' });
    setUsers(users.filter((user) => user._id !== userId));
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user", { position: 'top-center' });
  }
};

  return (
    <div className="userTable container mt-5">
      <Link to="/add-user" className="btn btn-primary m-3 d-block">
        Add User
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr className="bg-info">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="align-middle" key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <Link
                  to={`/update-user/${user._id}`}
                  className="btn btn-primary m-1"
                >
                  Update
                </Link>
                <button
            className="btn btn-danger m-1"
            onClick={() => deleteUser(user._id)}
            >
            Delete
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
