import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import Dashboard from "./features/dashboard/Dashboard";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ManageSETCRoutes from "./features/route-management/ManageSETCRoutes";

/**
 * Main App component that defines the application's routing structure
 * The application is focused on two main functionalities:
 * 1. Voice-based SETC bus route search for users (main dashboard)
 * 2. SETC route management for administrators (admin area)
 */
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManageSETCRoutes />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
