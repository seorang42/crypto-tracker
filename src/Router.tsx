import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({ isDark, toggleDark }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/:coinId/*" element={<Coin isDark={isDark} />} />
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
