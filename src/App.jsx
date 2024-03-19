import { useChess } from "./Context/ChessContext";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/UI/Error";
import Loader from "./components/UI/Loader";

function App() {
  const { user, isLoading, error, logout } = useChess();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <main>
        <div className="header">
          <img
            alt="Chess logo"
            src="/logo.png"
            onClick={handleLogout}
            title="click to go home"
          />
          {user && (
            <button className="btn-primary logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <h1>
          Check your opponents for{" "}
          <a href="https://www.chess.com/" target="_blank">
            chess.com
          </a>
        </h1>

        {error && <Error message={error} color="tomato" />}
        {isLoading && <Loader />}
        {!isLoading && !user && <Login />}
        {!isLoading && user && <Dashboard user={user} />}
      </main>
    </>
  );
}

export default App;
