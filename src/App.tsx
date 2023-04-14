import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import { UserProvider } from "./hooks/useUser";
import NagivationBar from "./components/NavigationBar/NavigationBar";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { Role } from "./types";
import Profile from "./pages/Profile/Profile";
import BrowseCards from "./pages/BrowseCards/BrowseCards";
import { useEffect } from "react";
import BrowsePacks from "./pages/BrowsePacks/BrowsePacks";

function App() {
  const permissionLevels = {
    allRoles: Object.values(Role),
    admin: [Role.ADMIN],
    user: [Role.USER],
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <NagivationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/cards" element={<BrowseCards />} />
          <Route path="/packs" element={<BrowsePacks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
