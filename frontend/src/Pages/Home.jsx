import { Link } from "react-router-dom";
import "../Pages/Home.css"

const Home = () => {
  return (
    <>
      <div className="home-section">
        <div className="home-head">
          <h1>Do You Need Any Help</h1>
          <h3>Check Option Below</h3>
        </div>
        <div className="home-button">
          <Link  className="create-ticket" to="/new-ticket">
            Create Ticket
          </Link>
          <Link className="view-ticket" to="/all-tickets">
            View MyTicket
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home