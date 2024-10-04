import { Main } from "../styles/commonStyles";
import { useState } from "react";
import { useSelector } from "react-redux";
import PlayerData from "../components/Dashboard/PlayerData";
import CheckOpponents from "../components/Dashboard/CheckOpponents";
import Features from "../components/Dashboard/Features";
import Notification from "../components/UI/Notification";
import Investigate from "../components/Features/suspect/Investigate";
import Bugreporter from "../components/Features/bugreporter/Bugreporter";
import Minigames from "../components/Features/minigames/Minigames";

function Dashboard() {
  const opponentError = useSelector((state) => state.opponent.opponentError);
  const [selectedFeature, setSelectedFeature] = useState("dashboard");

  return (
    <Main>
      {opponentError && <Notification type="fail" msg={opponentError} />}

      <section
        style={{
          width: "100%",
          display: "flex",
          gap: "3rem",
        }}
      >
        <PlayerData />

        <div>
          <Features
            featureSelected={selectedFeature}
            featureFn={setSelectedFeature}
          />
        </div>
      </section>

      <section
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {selectedFeature == "check-opponents" && <CheckOpponents />}
        {selectedFeature == "investigate" && <Investigate />}
        {selectedFeature == "bugreport" && <Bugreporter />}
        {selectedFeature == "minigames" && <Minigames />}
      </section>
    </Main>
  );
}

export default Dashboard;
