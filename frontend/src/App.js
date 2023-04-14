import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ViewAll from "./pages/ViewAll";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        {/* login / security routes */}
        <Route path="/authentication/login" element={<Login />} />
        <Route path="/authentication/register" element={<CreateAccount />} />

        {/* Standard routes */}
        <Route path="/view-all" element={<ViewAll />} />
        {/* <Route path="/add-item" element={<AddItem />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
