import { Link } from "react-router-dom";
import "../Pages/TicketItem.css";
const TicketItem = ({ ticket }) => {
  return (
    <>
      <div className="new-all-tick">
        <div className="new-tick-create">
          {new Date(ticket.createdAt).toLocaleString("en-in")}
        </div>
        <div className="new-pro-tick">{ticket.product}</div>
        <div className={`status status-${ticket.status}`} id="status">
          {ticket.status}
        </div>

        <Link className="new-tick-link" to={`ticket/${ticket._id}`}>
          View
        </Link>
      </div>
    </>
  );
};

export default TicketItem;
