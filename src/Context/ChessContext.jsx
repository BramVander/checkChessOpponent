/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://api.chess.com/pub/player";

const ChessContext = createContext();

const initialState = {
  isLoggedIn: false,
  error: "",
  isLoading: false,
  player: {
    id: "",
    avatar: "",
    country: "",
    followers: null,
    is_streamer: false,
    joined: null,
    last_online: null,
    league: "",
    location: "",
    name: "",
    player_id: null,
    status: "",
    streaming_platforms: [],
    title: "",
    twitch_url: "",
    url: "",
    username: "",
    verified: false,
  },
  rating: {
    name: "",
    status: "",
    fide: null,
    best: null,
    last: null,
    wins: null,
    losses: null,
    draws: null,
  },
  games: [],
  opponents: [],
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
    case "newLogin":
      return {
        ...state,
        isLoggedIn: action.payload.data.username.length > 0,
        player: action.payload.data,
      };
    case "logout":
      return {
        isLoggedIn: false,
        rating: {},
        isLoading: false,
        error: "",
        games: [],
        opponents: new Set(),
        cheaters: [],
        streamers: [],
      };
    case "data/player":
      return {
        ...state,
        player: { status: action.payload },
        isLoading: false,
        error: "",
      };
    case "data/rating":
      return {
        ...state,
        rating: {
          status: state.player.status,
          fide: action.payload.fide,
          best: action.payload.chess_rapid?.best.rating,
          last: action.payload.chess_rapid?.last.rating,
          wins: action.payload.chess_rapid?.record.win,
          losses: action.payload.chess_rapid?.record.loss,
          draws: action.payload.chess_rapid?.record.draw,
        },
        isLoading: false,
        error: "",
      };
    case "data/opponents": {
      const unique = new Set();
      const uniqueOpponents = [];

      for (const game of action.payload) {
        const opponent = {
          username:
            game.white.username.toLowerCase() ===
            state.player.username.toLowerCase()
              ? game.black.username.toLowerCase()
              : game.white.username.toLowerCase(),
          gameUrl: game.url,
        };

        if (!unique.has(opponent.username)) {
          unique.add(opponent.username);
          uniqueOpponents.push(opponent);
        }
      }

      return {
        ...state,
        error: "",
        games: action.payload,
        opponents: uniqueOpponents,
      };
    }
    case "data/checkOpponents":
      return {
        ...state,
        error: "",
        isLoading: false,
        cheaters: action.payload.cheaters,
        streamers: action.payload.streamers,
      };
    case "dataFailed":
      return {
        ...state,
        rating: {},
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
        player: { status: action.payload },
      };
    default:
      throw new Error("Action unknown");
  }
}

function ChessProvider({ children }) {
  const [
    {
      isLoggedIn,
      player,
      rating,
      error,
      isLoading,
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
        // console.log("opponent", opponent.username);
        try {
          const res = await fetch(
            `https://api.chess.com/pub/player/${opponent.username}`
          );
          const data = await res.json();

          if (data.status === "closed:fair_play_violations") {
            foundCheaters.push(opponent);
          }
          if (data.is_streamer === true) {
            foundStreamers.push(opponent);
          }
          // if(data.twitch_url) foundStreamers.push(data.twitch_url)
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
      // console.log("login", data);

      if (data.message) throw new Error(data.message);

      dispatch({
        type: "newLogin",
        payload: { isLoggedIn: data, data: data },
      });
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error.message });
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

      if (data.message) throw new Error(data.message);

      // console.log("data", data);

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

  async function checkRating(opponent) {
    if (opponent === " ") return;

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${opponent}/stats`
      );
      const data = await res.json();

      if (data.message) throw new Error(data.message);

      dispatch({ type: "data/rating", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed", payload: error.message });
    }
  }

  async function fetchOpponents(year, month) {
    if (player.username === initialState.user) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${player.username}/games/${year}/${month}`
      );
      const data = await res.json();
      // console.log(data.games);

      if (data.games && data.games.length === 0)
        throw new Error("No games found this month");

      if (data.message) throw new Error(data.message);

      // console.log("data", data);

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
        isLoggedIn,
        rating,
        player,
        error,
        isLoading,
        games,
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
