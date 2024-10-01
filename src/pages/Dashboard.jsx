import { Main } from "../styles/commonStyles";
import { useState } from "react";
import PlayerData from "../components/Dashboard/PlayerData";
import CheckOpponents from "../components/Dashboard/CheckOpponents";
import Features from "../components/Dashboard/Features";
import Investigate from "../components/Features/suspect/Investigate";
import Bugreporter from "../components/Features/bugreporter/Bugreporter";
import Minigames from "../components/Features/minigames/Minigames";

function Dashboard() {
  const [selectedFeature, setSelectedFeature] = useState("dashboard");

  return (
    <>
      <Main>
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
    </>
  );
}

export default Dashboard;
