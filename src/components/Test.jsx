import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    width: 200px;
    height: 200px;
    outline: 1px solid purple;
`;

const FormatTab = styled.span`
    background-color: #ebecd0;
`;

function Test() {
  return <p>
    <Container>
      <FormatTab>t</FormatTab>
      <FormatTab>e</FormatTab>
      <FormatTab>s</FormatTab>
      <FormatTab>t</FormatTab>
    </Container>
  </p>
}

export default Test;
