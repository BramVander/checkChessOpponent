import styled from "styled-components";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const ListRow = styled.ol`
  color: white;
  margin: 5px;
  list-style-type: none;
`;

const ListItem = styled.li`
  color: white;
  background-color: black;
  text-align: center;
  padding: 4px;
  margin: 4px;
`;

const Username = styled.p`
  background: black;
  width: fit-content;
  opacity: 0.5;
  margin: 0;
  padding: 4px;
`;

const Link = styled.a`
  color: white;
  background-color: black;
  text-align: center;
`;

function Collapsable({ username, twitch, gameUrls }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Username>
        <Link
          href={twitch}
          target="_blank"
          title="Click to view twitch channel"
        >
          {username}
        </Link>{" "}
        &nbsp;
        <FontAwesomeIcon
          title="Click to view games"
          icon={open ? faCaretDown : faCaretRight}
          onClick={() => setOpen(!open)}
        />
      </Username>

      <ListRow>
        {open &&
          gameUrls.map((gameUrl, j) => (
            <ListItem key={j}>
              <Link key={j} href={gameUrl} target="_blank">
                View game {j + 1}
              </Link>
            </ListItem>
          ))}
      </ListRow>
    </>
  );
}

export default Collapsable;
