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
  opponents: [],
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
      console.log('login pl', action.payload);
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
    case "data/games": {
      const playedGames = [];
      let unique;

      for (const game of action.payload) {
        // make opponent
        const opponent = {
          username:
              game.white.username.toLowerCase() ===
              state.player.username.toLowerCase()
                  ? game.black.username.toLowerCase()
                  : game.white.username.toLowerCase(),
          gameUrls: game.url,
        };

        playedGames.push(opponent);
      }

      // map games per opponent
      unique = Array.from(new Set(playedGames.map(e => e.username))).map(
        user => {
          return {
            username: user,
            gameUrls: playedGames.filter(e => e.username === user).map(e => e.gameUrls),
          }
        }
      )

      console.log("state after update:", { ...state, opponents: unique });

      return {
        ...state,
        isLoading: false,
        opponents: unique,
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
      console.log('check pl', action.payload);
      return {
        ...state,
        isLoading: false,
        opponents: action.payload
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
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function checkEnemies() {
    dispatch({ type: "loading" });
    let updated = [];

    try {
      updated = await Promise.all(opponents.map(async (opponent) => {
        const res = await fetch(
            `https://api.chess.com/pub/player/${opponent.username}`
        );
        const data = await res.json();

        const updatedOpponent = { ...opponent };

        if (data.status === "closed:fair_play_violations" || data.status === "closed:abuse") {
          updatedOpponent.isCheater = true;
        }

        if (data.is_streamer === true) {
          updatedOpponent.isStreamer = true;
          if (data.twitch_url) {
            updatedOpponent.twitch = data.twitch_url;
          }
        }
        return updatedOpponent;
      }));

      console.log('updated', updated);

      // Now dispatch the updated opponents list here
      dispatch({
        type: "opponents/check",
        payload: updated,
      });

    } catch (error) {
      console.error(error);
    }
  }

  async function login(user) {
    if (user === " ") return;

    try {
      const res = await fetch(`${BASE_URL}/${user}`);
      const data = await res.json();

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

      data.status === "closed:abuse" ||
      data.status === "closed:fair_play_violations"
        ? status = data.status
        : status = "No violations found (yet)"

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

      console.log('data.games', data.games);

      dispatch({
        type: "data/games",
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

        login,
        logout,
        fetchOpponents,
        checkSuspect,
        checkRating,
        checkEnemies
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
