import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import RoutesComponent from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <RoutesComponent />
        </Router>
      </AuthProvider>
    </>
  );
}
export default App;
