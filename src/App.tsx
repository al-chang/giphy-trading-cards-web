import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./hooks/useUser";
import NagivationBar from "./components/NavigationBar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NagivationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
