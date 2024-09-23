/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://api.chess.com/pub/player";

const ChessContext = createContext();

//state
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: '',
  player: {
    name: '',
    avatar: '',
    subscription: '',
    joined: '',
    last_online: ''
  },
  suspect: {
    status: '',
    wins: 0,
    losses: 0,
    draws: 0,
    rating: {
      best: 0,
      latest: 0,
      fide: 0,
    }
  },
  opponents: [], // opponent { username: '', gameUrls: []}
  cheaters: [],
  streamers: []
}
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
        ...initialState
      };
    case "data/player":
      return {
        ...state,
        isLoading: false,
        player: action.payload
      };
    case "data/suspect":
      return {
        ...state,
        isLoading: false,
        suspect: {
          status: action.payload,
          wins: state.suspect.wins,
          losses: state.suspect.losses,
          draws: state.suspect.draws,
          rating: {
            best: state.suspect.rating.best,
            latest: state.suspect.rating.latest,
            fide: state.suspect.rating.fide
          },
        }
      };
    case "data/opponents":
      // eslint-disable-next-line no-case-declarations
      const playedGames = [];
      for (const game of action.payload) {
        // make opponent
        const opponent = {
          username:
              game.white.username.toLowerCase() ===
              state.player.username.toLowerCase()
                  ? game.black.username.toLowerCase()
                  : game.white.username.toLowerCase(),
          gameUrls: [game.url],
        };
        // group games per opponent
        playedGames.push(opponent);
      }
      return {
        ...state,
        opponents: playedGames
      };
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
            best: action.payload.chess_raid?.best.rating,
            latest: action.payload.chess_rapid?.last.rating,
            fide: action.payload.fide,
          }
        }
      };
    case "data/failed":
      return {
        ...initialState,
        error: action.payload,
      };
    case "opponents/check":
      return {
        ...state,
        isLoading: false,
        cheaters: action.payload.cheaters,
        streamers: action.payload.streamers,
      }
    default:
      throw new Error("Action unknown");
  }
}

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
      streamers
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkOpponents = async () => {
      const foundCheaters = [];
      const foundStreamers = [];

      console.log('oppo', opponents);


      for (const opponent of opponents) {
        try {
          const res = await fetch(
            `https://api.chess.com/pub/player/${opponent.username}`
          );
          const data = await res.json();

          if (data.status === "closed:fair_play_violations" || data.status === "closed:abuse") {
            foundCheaters.push(opponent);
          }
          if (data.is_streamer === true) {
            if (data.twitch_url) {
              opponent.twitch = data.twitch_url;
            }
            foundStreamers.push(opponent);
          }
        } catch (error) {
          console.error(error);
        }
      }

      console.log('cheat', foundCheaters);
      console.log('stream', foundStreamers);

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
      // console.log("login", data);

      if (data.message) throw new Error(data.message);

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
      let status = '';

      if (data.message) throw new Error(data.message);

      if (data.status === "closed:abuse" || data.status === "closed:fair_play_violations") {
        status = data.status;
      } else {
        status = "No violations found (yet)"
      }

      // console.log('status', status);

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

      // console.log('checkRating', data);

      if (data.message) throw new Error(data.message);

      dispatch({ type: "data/rating", payload: data });
    } catch (error) {
      dispatch({ type: "data/failed", payload: error.message });
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

      if (data.games && data.games.length === 0)
        throw new Error("No games found this month");

      if (data.message) throw new Error(data.message);

      dispatch({
        type: "data/opponents",
        payload: data.games,
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
