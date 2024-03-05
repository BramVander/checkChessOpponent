import { useChess } from "../Context/ChessContext";
import Error from "./UI/Error";

function Login() {
  const { player, login, checkSuspect } = useChess();

  async function handleLogin(e) {
    e.preventDefault();

    const user = { username };
    await login(user.username.value.toLowerCase());
  }

  async function handleCheckSuspect(e) {
    e.preventDefault();

    const user = { opponent };
    await checkSuspect(user.opponent.value.toLowerCase());
    // await checkPlayerRating(user.opponent.value.toLowerCase());
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input id="username" type="text" placeholder="Username" required />
        <button className="btn-primary">Check my opponents</button>
      </form>

      <h2>Check a suspicious player</h2>
      <form onSubmit={handleCheckSuspect}>
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
