import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Insight from './components/Insight';
import AuthLayout from './components/AuthLayout';

const router = createBrowserRouter([
  
  {
    path: "/auth",
    element: <AuthLayout />,  // Layout for authentication pages
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/insight",
        element: <Insight />,
      },
      {
          path: "*",
          element: <p>404 Page Not Found</p>,
      },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  return <RouterProvider router={router} />;
}

export default App
