import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userError} from "./store/userSlice";
import "./styles/App.css";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

function App() {
  const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const authenticated = useSelector((state) => state.user.authenticated);

    if (!authenticated) {
      dispatch(userError("Please log in to visit the dashboard"));
      return <Navigate to="/" replace />;
    }

    return children;
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
