import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DevHubPage from "./pages/DevHubPage";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import PublishEventPage from "./pages/PublishEventPage"
function App() {
  return (
    <Routes>
      <Route path="/" element={<DevHubPage />} exact>
        <Route index element={<HomePage />} exact />
        <Route path="event" element={<EventPage />} exact />
        <Route path="event/details/:eid" element={<EventDetailsPage/>}/>
        <Route path="profile/:uid" element={<ProfilePage/>}/>
        <Route path='publish/:uid' element={<PublishEventPage/>}/>
      </Route>
      <Route path="/login" element={<LoginPage />} exact />
      <Route path="/signup" element={<SignUpPage />} exact />
    </Routes>
  );
}

export default App;
