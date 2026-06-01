import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotificationProvider } from "./context/NotificationContext";
import ToastHandler from "./components/notifications/ToastHandler";
import CursorGlow from "./components/common/CursorGlow";

// Pages
import Solutions from "./pages/Solutions";

// IMPORTANT: check your real home page file name
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CursorGlow />
        <ToastHandler />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
        </Routes>

      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;