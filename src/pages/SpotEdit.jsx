import Header from "../components/Header/Header";
import "./Pages.css";
import FormSpotEdit from "../components/FormSpotEdit/FormSpotEdit";

function SpotEditPage() {
  return (
    <div className="grid-spotedit">
      <Header />
      <FormSpotEdit />
    </div>
  );
}

export default SpotEditPage;
