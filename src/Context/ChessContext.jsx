import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://api.chess.com/pub/player";

const ChessContext = createContext();

//state
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: "",
  player: {},
  suspect: {},
  opponents: [],
  cheaters: [],
  streamers: [],
};
// /state

// reducer
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
        isLoggedIn: action.payload.data.username.length > 0,
        player: action.payload.data,
      };
    case "logout":
      return {
        ...initialState,
      };
    case "data/suspect":
      // console.log("data/suspect", action.payload);
      return {
        ...state,
        isLoading: false,
        suspect: {
          status: action.payload,
          wins: state.suspect.wins,
          losses: state.suspect.losses,
          draws: state.suspect.draws,
          rating: state.suspect,
        },
      };
    case "data/games": {
      // console.log('filling opponents', action);
      return {
        ...state,
        opponents: action.payload,
      };
    }
    case "data/rating":
      return {
        ...state,
        isLoading: false,
        suspect: {
          status: state.suspect.status,
          wins: action.payload.chess_rapid?.record.win,
          losses: action.payload.chess_rapid?.record.loss,
          draws: action.payload.chess_rapid?.record.draw,
          rating: {
            best: action.payload.chess_rapid?.best.rating,
            latest: action.payload.chess_rapid?.last.rating,
            fide: action.payload.fide,
          },
        },
      };
    case "data/failed":
      // console.log('data/failed', action.payload);
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    case "opponents/check":
      return {
        ...state,
        isLoading: false,
        cheaters: action.payload.cheaters,
        streamers: action.payload.streamers,
      };
    default:
      throw new Error("Action unknown");
  }
}

// eslint-disable-next-line react/prop-types
function ChessProvider({ children }) {
  const [
    {
      isLoading,
      isLoggedIn,
      error,
      player,
      suspect,
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
        // console.log(opponent);
        try {
          const res = await fetch(
            `https://api.chess.com/pub/player/${opponent.username}`
          );

          const data = await res.json();

          if (
            data.status === "closed:fair_play_violations" ||
            data.status === "closed:abuse"
          ) {
            opponent.isCheater = true;
            foundCheaters.push(opponent);
          }

          if (data.is_streamer) {
            opponent.isStreamer = true;
            if (data.twitch_url) {
              opponent.twitch = data.twitch_url;
            }
            foundStreamers.push(opponent);
          }
        } catch (error) {
          console.error(error);
        }
      }

      dispatch({
        type: "opponents/check",
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

      if (data.message) throw new Error(data.message);

      // console.log('login', data);

      dispatch({
        type: "login",
        payload: { isLoggedIn: data, data: data },
      });
    } catch (error) {
      dispatch({ type: "data/failed", payload: error.message });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  async function checkSuspect(opponent) {
    if (opponent === " ") return;

    try {
      const res = await fetch(`https://api.chess.com/pub/player/${opponent}`);
      const data = await res.json();
      let status = "";

      if (data.message) throw new Error(data.message);

      data.status === "closed:abuse" ||
      data.status === "closed:fair_play_violations"
        ? (status = data.status)
        : (status = "No violations found (yet)");

      dispatch({
        type: "data/suspect",
        payload: status,
      });
    } catch (error) {
      dispatch({ type: "data/failed", payload: error.message });
    }
  }

  async function checkRating(opponent) {
    if (opponent === " ") return;

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${opponent}/stats`
      );
      const data = await res.json();

      if (data.message) throw new Error(data.message);

      // console.log("data/rating", data);

      dispatch({ type: "data/rating", payload: data });
    } catch (error) {
      dispatch({ type: "data/failed", payload: error.message });
    }
  }

  async function fetchOpponents(year, month) {
    if (player.username === initialState.player.username) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${player.username}/games/${year}/${month}`
      );
      const data = await res.json();

      if (data.games && data.games.length === 0)
        throw new Error("No games found this month");

      if (data.message) throw new Error(data.message);

      const playedGames = [];
      let unique;

      for (const game of data.games) {
        // make opponent
        const opponent = {
          username:
            game.white.username.toLowerCase() === player.username.toLowerCase()
              ? game.black.username.toLowerCase()
              : game.white.username.toLowerCase(),
          gameUrls: game.url,
        };

        playedGames.push(opponent);
      }

      // map games per opponent
      unique = Array.from(new Set(playedGames.map((e) => e.username))).map(
        (user) => {
          return {
            username: user,
            gameUrls: playedGames
              .filter((e) => e.username === user)
              .map((e) => e.gameUrls),
          };
        }
      );

      // console.log("games", data);

      dispatch({
        type: "data/games",
        payload: unique,
      });
    } catch (error) {
      dispatch({ type: "data/failed", payload: error.message });
    }
  }

  return (
    <ChessContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        error,
        player,
        suspect,
        opponents,
        cheaters,
        streamers,

        login,
        logout,
        fetchOpponents,
        checkSuspect,
        checkRating,
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
