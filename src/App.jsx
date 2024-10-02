import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { userError } from "./store/userSlice";

function App() {
  const ProtectedRoute = ({ children }) => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const dispatch = useDispatch();

    if (!authenticated) {
      dispatch(userError("Please log in to visit the dashboard"));
      return <Navigate to="/" replace />;
    }

    return children; // Render the children if authenticated
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
