import {
  Poster,
  Header,
  Avatar,
  Box,
  Text,
} from "../../../styles/commonStyles";
import styled from "styled-components";

export const BanStatus = styled.p`
  color: white;
  background-color: black;
  font-weight: 700;
  text-align: center;
  padding: 0.4rem;
  margin: auto auto;
`;

function Profile({ suspect }) {
  // console.log(suspect);
  return (
    <>
      <Poster>
        <Header style={{ backgroundColor: "tomato" }}>
          Suspect: {suspect.profile.username}
        </Header>
        <span>
          \\ toDo: currently only shows rapid format, add tabs for each
          timeformat
        </span>
        <Box>
          <Text>
            Wins: {suspect.rating.chess_rapid.record.win}
            <br />
            Draws: {suspect.rating.chess_rapid.record.loss}
            <br />
            Losses: {suspect.rating.chess_rapid.record.draw}
            <br />
            <br />
            Winrate:{" "}
            {Math.round(
              (suspect.rating.chess_rapid.record.win /
                (suspect.rating.chess_rapid.record.win +
                  suspect.rating.chess_rapid.record.loss +
                  suspect.rating.chess_rapid.record.draw)) *
                100
            )}
            %
          </Text>

          <Avatar src={suspect.profile.avatar} alt="Avatar" />

          <Text>
            Best rapid: {suspect.rating.chess_rapid.best.rating}
            <br />
            Last rapid: {suspect.rating.chess_rapid.last.rating}
            <br />
            Fide rapid: {suspect.rating.fide}
          </Text>

          <BanStatus>
            {suspect.profile.status.includes("closed")
              ? "Banned"
              : "No violations found (yet)"}
          </BanStatus>
        </Box>
      </Poster>
    </>
  );
}

export default Profile;
