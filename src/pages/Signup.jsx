import FormSignup from "../components/FormSignup/FormSignup";
import "./Pages.css";
import ImgSignup from "../components/ImgSignup/ImgSignup";

function SignupPage() {
  return (
    <div className="grid-signup">
      <FormSignup></FormSignup>
      <ImgSignup> </ImgSignup>
    </div>
  );
}

export default SignupPage;
