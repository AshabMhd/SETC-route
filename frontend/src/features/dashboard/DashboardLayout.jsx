import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
