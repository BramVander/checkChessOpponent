import { useChess } from "../Context/ChessContext";

function Login() {
  const { login } = useChess();

  async function handleLogin(e) {
    e.preventDefault();

    const user = { username };
    await login(user.username.value);
  }

  return (
    <form onSubmit={handleLogin}>
      <label>Please state your chess.com username</label>
      <input id="username" type="text" placeholder="username" />
      <button>Login</button>
    </form>
  );
}

export default Login;
