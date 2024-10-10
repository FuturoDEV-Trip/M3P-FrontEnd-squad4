import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import RoutesComponent from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { LocalProvider } from "./contexts/LocalContext"

function App() {
  return (
    <>
      <AuthProvider>
      <LocalProvider> 
        <Router>
          <RoutesComponent />
        </Router>
        </LocalProvider>
      </AuthProvider>
    </>
  );
}
export default App;
