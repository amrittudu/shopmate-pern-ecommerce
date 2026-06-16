import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Users from "./components/Users";
import { User } from "lucide-react";

function App() {

  const { openedComponent } = useSelector = useSelector( (state) => state.extra);
  const { user, isAuthenticated } = useSelector( (state) => state.auth);


  const renderDashBoardContent = () => {
    switch( openedComponent) {
      case "Dashboard" :
        <Dashboard/>
        break;
      case "Orders" :
        <Orders/>
        break;
      case "Users" :
        <Users/>
        break;
      case "Profile" :
        <Profile/>
        break;
      case "Products" :
        <Products/>
        break;
        
      default:
        return <Dashboard/>;
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen">
                <SideBar />
                {renderDashboardContent()}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
}

export default App;
