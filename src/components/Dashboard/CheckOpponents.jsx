import {
  Page,
  Header,
  Text,
  Label,
  DisabledInput,
  Select,
  CheckButton,
  Box,
} from "../../styles/commonStyles";

import {
  isLoading,
  fetchOpponents,
  populateCheatersAndStreamers,
} from "../../store/OpponentSlice/opponentSlice";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Calendar from "./Calendar";
import Collapsable from "../UI/Collapsable";
import Loader from "../UI/Loader";

function CheckOpponents() {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.user.player);
  const opponents = useSelector((state) => state.opponent.opponents);
  const cheaters = useSelector((state) => state.opponent.cheaters);
  const streamers = useSelector((state) => state.opponent.streamers);
  const loading = useSelector((state) => state.opponent.loading);

  const date = new Date();
  let thisYear = date.getFullYear();
  let thisMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const formats = ["rapid", "blitz", "bullet", "daily"];
  const [format, setFormat] = useState("rapid");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: thisMonth,
    year: thisYear,
  });

  useEffect(() => {
    async function filterCheatersAndStreamers() {
      const detectedCheaters = [];
      const detectedStreamers = [];

      dispatch(isLoading());

      for (const opponent of opponents) {
        try {
          const res = await fetch(
            `https://api.chess.com/pub/player/${opponent.username.toLowerCase()}`
          );
          const data = await res.json();

          // Check for cheaters (closed accounts)
          if (data.status.includes("closed")) {
            detectedCheaters.push(opponent);
          }

          // Check for streamers
          if (data.is_streamer) {
            if (data.twitch_url) {
              const updatedOpponent = { ...opponent, twitch: data.twitch_url };
              detectedStreamers.push(updatedOpponent);
            }
          }
        } catch (error) {
          console.error("Error filteringCheatersAndStreamers:", error);
        }
      }

      // dispatch cheaters and streamers
      dispatch(
        populateCheatersAndStreamers({
          cheaters: detectedCheaters,
          streamers: detectedStreamers,
        })
      );
    }

    if (opponents.length > 0) {
      filterCheatersAndStreamers();
    }
  }, [opponents]);

  async function handleCheck(username) {
    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${username}/games/${
          selectedMonthData.year
        }/${selectedMonthData.month.toString().padStart(2, "0")}`
      );
      const data = await res.json();

      if (data.games && data.games.length === 0)
        throw new Error("No games found this month");

      if (data.message) throw new Error(data.message);

      // filter games for game.time_class == format
      const formatFilteredGames = data.games.filter(
        (game) => game.time_class == format
      );

      const playedGames = [];
      let formatFilteredGamesPerOpponent;

      for (const game of formatFilteredGames) {
        // make opponent
        const opponent = {
          username:
            game.white.username.toLowerCase() === username.toLowerCase()
              ? game.black.username
              : game.white.username,
          gameUrls: [game.url],
        };

        playedGames.push(opponent);
      }

      // map games per opponent
      formatFilteredGamesPerOpponent = Array.from(
        new Set(playedGames.map((e) => e.username))
      ).map((user) => {
        return {
          username: user,
          gameUrls: playedGames
            .filter((e) => e.username === user)
            .map((e) => e.gameUrls),
        };
      });

      dispatch(fetchOpponents(formatFilteredGamesPerOpponent));
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  function renderList(list, msg) {
    // Check if data is empty
    if (list.length === 0) {
      return <p>{msg}</p>;
    }

    return list.map((opponent, i) => (
      <Collapsable
        key={i}
        username={opponent.username}
        twitch={opponent.twitch}
        gameUrls={opponent.gameUrls}
      >
        hi
      </Collapsable>
    ));
  }

  return (
    <>
      <Page>
        <Header style={{ textAlign: "center" }}>
          Check opponents you played against
        </Header>
        <Text>
          Find cheaters in the Hall of Shame and streamers in the Hall of Fame!
        </Text>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Label>
            Username
            <DisabledInput defaultValue={player.profile.username} />
          </Label>

          <Label>
            Select timeformat
            <Select onChange={(e) => setFormat(e.target.value)} value={format}>
              {formats.map((f, i) => (
                <option key={i}>{f}</option>
              ))}
            </Select>
          </Label>

          <Label>
            Select a month
            <Calendar
              isOpen={isCalendarOpen}
              openCal={setIsCalendarOpen}
              monthData={selectedMonthData}
              selectMonth={setSelectedMonthData}
            ></Calendar>
          </Label>
        </div>

        <CheckButton onClick={() => handleCheck(player.profile.username)}>
          Check opponents
        </CheckButton>

        {opponents.length > 0 && (
          <>
            <p>
              Found {opponents.length} opponent
              {opponents.length !== 1 ? "s" : ""}, {cheaters.length} cheater
              {cheaters.length !== 1 ? "s" : ""} & {streamers.length} streamer
              {streamers.length !== 1 ? "s" : ""}.
            </p>

            {loading && (
              <span>
                <Loader loading={loading} />
              </span>
            )}

            <section style={{ display: "flex", gap: "1rem" }}>
              <Box style={{ display: "block" }}>
                {cheaters && renderList(cheaters, "No cheaters found yet...")}
              </Box>
              <Box style={{ display: "block" }}>
                {streamers &&
                  renderList(streamers, "No streamers found yet...")}
              </Box>
            </section>
          </>
        )}
      </Page>
    </>
  );
}

export default CheckOpponents;
