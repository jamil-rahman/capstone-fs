export const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password'];

export const isPublicRoute = (pathname) => {
    return PUBLIC_ROUTES.includes(pathname);
};