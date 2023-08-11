// import React from "react";
import { useEffect } from "react";
import BackButton from "../Header/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import "../Pages/AllTicket.css";
import TicketItem from "./TicketItem";

const AllTicket = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <BackButton url={"/"} />
      <h1>TIckets</h1>
      <div className="all-tickets">
        <div className="all-ticket-head">
          <div className="tik-dat">
            <p>Date</p>
          </div>
          <div className="tik-pro">
            <p>Product</p>
          </div>
          <div className="tik-stat">
            <p>Status</p>
          </div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default AllTicket;
