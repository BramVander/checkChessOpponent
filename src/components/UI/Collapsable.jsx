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
  background-color: #81b64c;
  text-align: center;
  padding: 4px;
  margin: 4px;
`;

const Username = styled.p`
  color: white;
  background: #558c44;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Link = styled.a`
  color: white;
  text-align: center;
  text-decoration: none;
`;

function Collapsable({ username, twitch, gameUrls }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Username style={{ backgroundColor: twitch ? "gold" : "tomato" }}>
        <Link
          href={twitch}
          target="_blank"
          title={twitch ? "View twitch channel" : ""}
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
              <Link key={j} href={gameUrl} target="_blank" title="View game">
                View game {j + 1}
              </Link>
            </ListItem>
          ))}
      </ListRow>
    </>
  );
}

export default Collapsable;
