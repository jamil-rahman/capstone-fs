import { Outlet } from 'react-router-dom';
import AuthHeader from "./AuthHeader";

const AuthLayout = () => {
  return (
    <>
    <AuthHeader />
    <div className="auth-layout">
      {/* Render the login/signup page */}
      <Outlet />
    </div>
    </>
  );
};

export default AuthLayout;
