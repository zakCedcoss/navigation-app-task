import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import { validatePhone } from "./utils/vailidation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/:id" element={<EditUser />} />
        <Route path="*" element={<h1>Page not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
