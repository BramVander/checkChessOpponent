import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://api.chess.com/pub/player";
// find endpoint for opponents

const ChessContext = createContext();

const initialState = {
  user: "",
  player: "",
  error: "",
  isLoading: false,
  data: {},
  games: [],
  opponents: new Set(),
  cheaters: [],
  streamers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "login":
      return {
        ...state,
        isLoading: false,
        error: "",
        user: action.payload.user,
        data: action.payload.data,
      };
    case "logout":
      return {
        user: "",
        player: "",
        isLoading: false,
        error: "",
        data: {},
        games: [],
        opponents: new Set(),
        cheaters: [],
        streamers: [],
      };
    case "data/player":
      return {
        ...state,
        player: action.payload,
        isLoading: false,
        error: "",
      };
    case "data/opponents": {
      const unique = new Set();

      for (const game of action.payload) {
        unique.add(
          game.white.username.toLowerCase() === state.user.toLowerCase()
            ? game.black.username.toLowerCase()
            : game.white.username.toLowerCase()
        );
      }

      return {
        ...state,
        player: "",
        error: "",
        games: action.payload,
        opponents: unique,
      };
    }
    case "data/checkOpponents":
      return {
        ...state,
        player: "",
        error: "",
        isLoading: false,
        cheaters: action.payload.cheaters,
        streamers: action.payload.streamers,
      };
    case "dataFailed":
      return {
        ...state,
        player: "",
        games: [],
        cheaters: [],
        streamers: [],
        isLoading: false,
        error: action.payload,
      };
    case "account/closed":
      return {
        ...state,
        isLoading: false,
        player7: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

function ChessProvider({ children }) {
  const [
    {
      user,
      player,
      error,
      isLoading,
      data,
      games,
      opponents,
      cheaters,
      streamers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkOpponents = async () => {
      const foundCheaters = [];
      const foundStreamers = [];

      for (const opponent of opponents) {
        try {
          const res = await fetch(
            `https://api.chess.com/pub/player/${opponent}`
          );
          const data = await res.json();

          if (data.status === "closed:fair_play_violations") {
            foundCheaters.push(opponent);
          }
          if (data.is_streamer === true) {
            foundStreamers.push(opponent);
          }
          // if(data.twitch_url) console.log(data.twitch_url)
        } catch (error) {
          console.error(error);
        }
      }

      dispatch({
        type: "data/checkOpponents",
        payload: { cheaters: foundCheaters, streamers: foundStreamers },
      });
    };

    checkOpponents();
  }, [opponents]);

  async function login(user) {
    if (user === " ") return;

    try {
      const res = await fetch(`${BASE_URL}/${user}`);
      const data = await res.json();
      // console.log(data);

      if (data.message) throw new Error(data.message);

      dispatch({
        type: "login",
        payload: { user: user, data: data },
      });
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error.message });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  async function checkPlayer(opponent) {
    if (opponent === " ") return;

    try {
      const res = await fetch(`https://api.chess.com/pub/player/${opponent}`);
      const data = await res.json();

      if (data.message) throw new Error(data.message);

      if (
        data.status === "closed:abuse" ||
        data.status === "closed:fair_play_violations"
      ) {
        dispatch({
          type: "data/player",
          payload: data.status,
        });
      } else {
        dispatch({
          type: "data/player",
          payload: "No violations found (yet)",
        });
      }
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error.message });
    }
  }

  async function fetchOpponents(year, month) {
    if (user === initialState.user) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${user}/games/${year}/${month}`
      );
      const data = await res.json();
      // console.log(data.games.length === 0);

      if (data.games && data.games.length === 0)
        throw new Error("No games found this month");

      if (data.message) throw new Error(data.message);

      dispatch({
        type: "data/opponents",
        payload: data.games,
      });
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error.message });
    }
  }

  return (
    <ChessContext.Provider
      value={{
        user,
        player,
        error,
        isLoading,
        data,
        games,
        opponents,
        cheaters,
        streamers,

        login,
        logout,
        fetchOpponents,
        checkPlayer,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
}

function useChess() {
  const context = useContext(ChessContext);
  if (context === undefined)
    throw new Error("ChessContext used outside QuizProvider");

  return context;
}

export { ChessContext, ChessProvider, useChess };
