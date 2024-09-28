import Header from "../components/Header/Header";
import "./Pages.css";
import SpotView from "../components/SpotView/SpotView";

function SpotViewPage() {
  return (
    <div className="grid-spotview">
      <Header />
      <SpotView />
    </div>
  );
}

export default SpotViewPage;
