import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpSignIn from "./pages/SignUpSignIn";
import Podcasts from "./pages/Podcasts";
import StartAPodcast from "./pages/StartAPodcast";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/common/PrivateRoutes";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PodcastsDetatils from "./pages/PodcastsDetatils";
import CreateAnEpisode from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribedAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        const unSubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetchinh user data:", error);
          }
        );
        return () => {
          unSubscribeSnapshot();
        };
      }
    });

    return () => {
      unSubscribedAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpSignIn />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/podcasts" element={<Podcasts />}></Route>
            <Route path="/start-a-podcast" element={<StartAPodcast />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/podcast/:id" element={<PodcastsDetatils />}></Route>
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisode />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
