import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header/Header";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NewTicket from "./Pages/NewTicket";

import AllTicket from "./Pages/AllTicket";
import PrivateRoute from "./Header/PrivateRoute";
import Ticket from "./Pages/Ticket";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
              <Route path="/all-tickets" element={<AllTicket />} />
              <Route path="all-tickets/ticket/:id" element={<Ticket />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
};

export default App;
