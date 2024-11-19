// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Pages
import Home from './pages/Home';
import Insights from './pages/Insights';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  console.log("App is rendering");
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;