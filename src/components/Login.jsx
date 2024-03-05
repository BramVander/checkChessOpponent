import { useChess } from "../Context/ChessContext";
import Error from "./UI/Error";

function Login() {
  const { player, login, checkPlayer } = useChess();

  async function handleLogin(e) {
    e.preventDefault();

    const user = { username };
    await login(user.username.value.toLowerCase());
  }

  async function handleCheckPlayer(e) {
    e.preventDefault();

    const user = { opponent };
    await checkPlayer(user.opponent.value.toLowerCase());
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input id="username" type="text" placeholder="Username" required />
        <button className="btn-primary">Check my opponents</button>
      </form>

      <h2>Check specific player</h2>
      <form onSubmit={handleCheckPlayer}>
        <input id="opponent" type="text" placeholder="Opponent" required />
        <button className="btn-primary">Check this player</button>
        {player && (
          <Error
            message={player}
            color={player.substr(0, 6) !== "closed" ? "#7fa650" : "tomato"}
          />
        )}
      </form>
    </>
  );
}

export default Login;
