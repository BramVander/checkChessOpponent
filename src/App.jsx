import { useChess } from "./Context/ChessContext";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/UI/Error";
import Loader from "./components/UI/Loader";

import SquareChallenge from "./components/minigames/SquareChallenge";
import { useState } from "react";

function App() {
  const { user, isLoading, error, logout } = useChess();
  let [testGame, setTestGame] = useState(false);

  function handleLogout() {
    setTestGame(false);
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
        {!testGame && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              padding: "1rem",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => setTestGame(true)}
              style={{
                backgroundColor: "#d4121e",
                borderColor: "#d4121e",
                fontSize: "1rem",
              }}
            >
              Welcome Electude! Click to test minigame
            </button>
          </div>
        )}
        {!testGame && error && <Error message={error} color="tomato" />}
        {!testGame && isLoading && <Loader />}
        {!testGame && !isLoading && !user && <Login />}
        {!testGame && !isLoading && user && <Dashboard user={user} />}

        {testGame && <SquareChallenge />}
      </main>
    </>
  );
}

export default App;
