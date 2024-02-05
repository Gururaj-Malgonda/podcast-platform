import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpSignIn from "./pages/SignUpSignIn";
import Podcasts from "./pages/Podcasts";
import StartAPodcast from "./pages/StartAPodcast";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpSignIn />}></Route>
          <Route path="/podcasts" element={<Podcasts />}></Route>
          <Route path="/start-a-podcast" element={<StartAPodcast />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
