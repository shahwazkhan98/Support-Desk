import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { toast } from "react-toastify"
import BackButton from "../Header/BackButton"
import { getTicket } from "../features/ticket/ticketSlice"


const Ticket = () => {
const {ticket , isLoading, isError,message} = useSelector(state => state.tickets);

const params = useParams()
const dispatch = useDispatch()

useEffect(()=>{
if(isError){
    toast.error(message)
}
dispatch(getTicket(params.id));
}, [isError, message, params.id]);

if(isLoading){
  return(
    <h1>Loading...</h1>
  )
}
if(isError){
    return <h1>Something went Wrong</h1>
}
  return (
    <>
      <div className="ticket-item">
        <header>
          <BackButton url={"/all-tickets"} />
          <h2>
            Ticket ID : {ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status}</span>
          </h2>
          <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString("en-in")}</h3>
          <h3>Product : {ticket.product}</h3>
          <hr/>
          <div className="">
            <h3>Description of Issues</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
      </div>
    </>
  );
}

export default Ticket