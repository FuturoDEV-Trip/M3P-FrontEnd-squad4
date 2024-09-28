import Header from "../components/Header/Header";
import "./Pages.css";
import FormSpotRegistration from "../components/FormSpotRegistration/FormSpotRegistration";

function SpotRegistrationPage() {
  return (
    <div className="grid-spotregistration">
      <Header />
      <FormSpotRegistration />
    </div>
  );
}

export default SpotRegistrationPage;
