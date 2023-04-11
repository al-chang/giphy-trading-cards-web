import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./hooks/useUser";
import NagivationBar from "./components/NavigationBar";
import RequireAuth from "./components/RequireAuth";
import { Role } from "./types";
import Profile from "./pages/Profile";

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
          <Route
            path="/profile"
            element={
              <RequireAuth allowedRoles={permissionLevels.allRoles}>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
