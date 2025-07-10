import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import Dashboard from "./features/dashboard/Dashboard";
import AuthLayout from "./features/auth/AuthLayout";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ManageSETCRoutes from "./features/route-management/ManageSETCRoutes";

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
