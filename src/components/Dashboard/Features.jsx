import { Card, Header } from "../../styles/commonStyles";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faGamepad,
  faMagnifyingGlass,
  faMask,
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const FeatureGrid = styled.div`
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  place-items: center;
  grid-gap: 1rem;
  padding: 1rem;
`;

const FeatureElement = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-color: #ebecd0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  transition: ease-in-out 500ms;

  &:hover {
    color: #ebecd0;
    background-color: black;
  }
`;

function Features({ featureSelected, featureFn }) {
  function handleClick(newFeature) {
    if (featureSelected == newFeature) return;
    featureFn(newFeature);
  }

  return (
    <Card style={{ height: "fit-content", justifyContent: "flex-start" }}>
      <Header>Features</Header>
      <FeatureGrid>
        <FeatureElement onClick={() => handleClick("bugreport")}>
          <FontAwesomeIcon icon={faBug}/> Report a bug
        </FeatureElement>

        <FeatureElement onClick={() => handleClick("check-opponents")}>
          <FontAwesomeIcon icon={faMagnifyingGlass}/> Check opponents
        </FeatureElement>

        <FeatureElement onClick={() => handleClick("investigate")}>
          <FontAwesomeIcon icon={faMask}/> Investigate suspect
        </FeatureElement>

        <FeatureElement onClick={() => handleClick("minigames")}>
          <FontAwesomeIcon icon={faGamepad}/> Minigames
        </FeatureElement>
      </FeatureGrid>
    </Card>
  );
}

export default Features;
