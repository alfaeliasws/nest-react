import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from './auth/Auth.tsx';
import AdminPanel from './adminPanel/AdminPanel.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/adminPanel/",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/createHeadline",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/getHeadline",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/searchHeadline",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/deleteHeadline",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/editHeadline",
    element: <AdminPanel />,
  },
  {
    path: "/adminPanel/logout",
    element: <AdminPanel />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
