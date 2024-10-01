import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export const LoaderElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .dots {
    width: 15px;
  }

  .magnifying-glass {
    height: 30px;
    width: 30px;
    position: absolute;
    position: relative;
    right: 12rem;
    bottom: 2.5rem;
    animation: scanning 2s linear infinite;
  }

  @keyframes scanning {
    0% {
      transform: rotate(0deg) translate(40px) rotate(0deg);
    }
    100% {
      transform: rotate(360deg) translate(40px) rotate(-360deg);
    }
  }
`;

function Loader({ loading }) {
  useEffect(() => {
    const dots = document.querySelector(".dots");
    let dotCount = 1;

    const interval = setInterval(() => {
      dots.textContent = ".".repeat(dotCount);

      dotCount = (dotCount % 3) + 1;
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <LoaderElement>
      Still investigating all opponents<span className="dots">.</span>{" "}
      <FontAwesomeIcon
        className="magnifying-glass"
        icon={faMagnifyingGlassChart}
      />
    </LoaderElement>
  );
}

export default Loader;
