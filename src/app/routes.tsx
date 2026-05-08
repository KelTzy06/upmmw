import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Login } from "./components/Login";
import { QbitApp } from "./components/QbitApp";
import { useAuth, AuthProvider } from "./auth/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { path: "login", element: <Login /> },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <QbitApp /> }
        ]
      }
    ]
  }
]);
