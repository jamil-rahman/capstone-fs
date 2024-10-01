import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
          path: "/login",
          element: <Login />,
      },
      {
          path: "/signup",
          element: <Signup />,
      },
      {
        path: "/createpost",
        element: <CreatePost />,
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
