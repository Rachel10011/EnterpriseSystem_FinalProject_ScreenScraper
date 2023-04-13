import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authentication/login" element={<Login />} />
        {/* <Route path="/view-all" element={<ViewAll />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
