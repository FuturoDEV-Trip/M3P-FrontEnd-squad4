import Header from "../components/Header/Header";
import "./Pages.css";
import ListSpots from "../components/ListSpots/ListSpots";

function SpotsPage() {
  return (
    <div className="Grid-listspots">
      <Header />
      <ListSpots />
    </div>
  );
}

export default SpotsPage;
