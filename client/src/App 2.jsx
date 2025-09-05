import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './getUser/User';
import AddUser from './addUser/addUser';
import UpdateUser from './updateUser/updateUser';
import DeleteUser from './deleteUser/DeleteUser.jsx'; // ✅ matches file name


const router = createBrowserRouter([
  {
    path: '/',
    element: <User />,
  },
  {
    path: '/add-user',
    element: <AddUser />,
  },
  {
    path: '/update-user/:id',
    element: <UpdateUser />,
  },
  {
    path: '/delete-user/:id',
    element: <DeleteUser />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
