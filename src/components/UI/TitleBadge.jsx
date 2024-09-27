import styled from "styled-components";

const Badge = styled.span`
    color: white;
    font-weight: 700;
    font-family: Segoe UI Semibold;
    background-color: #7c2929;
    border-radius: 5px;
    padding: 4px;
`;

function TitleBadge({rank}) {
  return <Badge>{rank}</Badge>
}

export default TitleBadge;
