import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isPublicRoute } from '../utils/authUtils';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Don't show loading state for public routes
    if (loading && !isPublicRoute(location.pathname)) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;