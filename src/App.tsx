import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import { UserProvider } from "./hooks/useUser";
import NagivationBar from "./components/NavigationBar/NavigationBar";
import { Role } from "./types";
import Profile from "./pages/Profile/Profile";
import BrowseCards from "./pages/BrowseCards/BrowseCards";
import BrowsePacks from "./pages/BrowsePacks/BrowsePacks";
import ViewCard from "./pages/ViewCard/ViewCard";
import CreatePack from "./pages/CreatePack/CreatePack";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import ProposeTrade from "./pages/ProposeTrade/ProposeTrade";
import Trades from "./pages/Trades/Trades";
import ReviewTrade from "./pages/ReviewTrade/ReviewTrade";
import Coins from "./pages/Coins/Coins";
import BrowseUsers from "./pages/BrowseUsers/BrowseUsers";
import EditPofile from "./pages/EditProfile/EditProfile";
import CustomCardSelect from "./pages/CustomCardSelect/CustomCardSelect";

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
          <Route path="/users" element={<BrowseUsers />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/profile/edit" element={<EditPofile />} />
          <Route path="/cards" element={<BrowseCards />} />
          <Route path="/card/:id" element={<ViewCard />} />
          <Route path="/packs" element={<BrowsePacks />} />
          <Route path="/trades" element={<Trades />}></Route>
          <Route path="/propose/:otherId" element={<ProposeTrade />} />
          <Route path="/trade/:id" element={<ReviewTrade />} />
          <Route
            path="/coins"
            element={
              <RequireAuth allowedRoles={permissionLevels.allRoles}>
                <Coins />
              </RequireAuth>
            }
          />
          <Route
            path="/packs/create"
            element={
              <RequireAuth allowedRoles={permissionLevels.admin}>
                <CreatePack />
              </RequireAuth>
            }
          />
          <Route
            path="/cards/custom"
            element={
              <RequireAuth allowedRoles={permissionLevels.allRoles}>
                <CustomCardSelect />
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
