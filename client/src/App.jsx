import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AllInvoices from "./pages/Invoices/AllInvoices";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import InvoiceDetail from "./pages/Invoices/InvoiceDetail";
import CreateInvoice from "./pages/Invoices/CreateInvoice";
import ProfilePage from "./pages/Profile/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoices" element={<AllInvoices />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="profile" element={<ProfilePage />} />
            
          </Route>
          {/* Catch all routes  */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
