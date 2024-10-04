import {
  Poster,
  Header,
  Avatar,
  Box,
  Text,
} from "../../../styles/commonStyles";
import styled from "styled-components";
import {useState} from "react";

const BanStatus = styled.p`
  color: white;
  background-color: black;
  font-weight: 700;
  text-align: center;
  padding: 0.4rem;
  margin: auto auto;
`;

const TabContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
`;

const FormatTab = styled.span`
    height: 25px;
    background: #ebecd0;
    justify-content: center;
    align-content: last baseline;
    padding: 4px;
    border-radius: 0 0 6px 6px;
    cursor: pointer;
    
    &:first-child {
        margin-left: 0.5rem;
    }
`;

function Profile({ suspect }) {
  // console.log(suspect);
  const [showFormat, setShowFormat] = useState('rapid');
  const data = suspect['rating'][`chess_${showFormat}`];

  const clickTab = (e) => {
    if(!e.target.classList.contains('tab')) return;
    setShowFormat(e.target.innerText);
  };

  return (
    <Poster>
      <Header style={{ backgroundColor: "tomato" }}>
        Suspect: {suspect.profile.username}
      </Header>

      <TabContainer onClick={clickTab}>
        <FormatTab className={showFormat === 'rapid' ? 'active tab' : 'tab'}>rapid</FormatTab>
        <FormatTab className={showFormat === 'bullet' ? 'active tab' : 'tab'}>bullet</FormatTab>
        <FormatTab className={showFormat === 'blitz' ? 'active tab' : 'tab'}>blitz</FormatTab>
        {/*<FormatTab className="tab">fide</FormatTab>*/}
        {/*<FormatTab className="tab">tactics</FormatTab>*/}
        {/*<FormatTab className="tab">puzzle rush</FormatTab>*/}
      </TabContainer>

      <Box>
        <Text>
          Wins: {data.record.win}
          <br />
          Draws: {data.record.loss}
          <br />
          Losses: {data.record.draw}
          <br />
          <br />
          Winrate:{" "}
          {Math.round(
            (data.record.win /
              (data.record.win +
                data.record.loss +
                data.record.draw)) *
              100
          )}
          %
        </Text>

        <Avatar src={suspect.profile.avatar} alt="Avatar" style={{margin: '0 auto'}} />

        <Text>
          Best rapid: {data.best.rating}
          <br />
          Last rapid: {data.last.rating}
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
  );
}

export default Profile;
