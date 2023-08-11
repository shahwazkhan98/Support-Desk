import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/NewTicket.css";
import { createTicket, reset } from "../features/ticket/ticketSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../Header/BackButton";

const NewTicket = () => {
    const {user} = useSelector(state => state.auth);
    const {isLoading, isSuccess, isError, message } = useSelector(
      (state) => state.tickets
    );



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/all-tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  if(isLoading){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <>
    <BackButton url={"/"}/>
       <section className="new-main-detail">
        <section className="new-tick-head">
          <h1>Create New Ticket</h1>
          <p>Please Fill All Detail Here</p>
        </section>
        <section className="form">
          <div className="form-group">
            <label className="text-light " htmlFor="name">
              Customer Name
            </label>
            <input
              type="text"
              className="form-control new-1 p-3 rounded-0"
              value={name}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="name">
              Customer Email
            </label>
            <input
              type="text"
              className="form-control new-1 p-3 rounded-0 "
              value={email}
              disabled
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-light" htmlFor="name">
                Select Product
              </label>
              <select
                className="new-select p-3"
                name="product"
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option className="new-opt" value="iPhone">
                  iPhone
                </option>
                <option className="new-opt" value="iphone">
                  iPad
                </option>
                <option className="new-opt" value="Mackbook">
                  Macbook
                </option>
                <option className="new-opt" value="iMac">
                  iMac
                </option>
              </select>
            </div>
            <div className="form-group">
              <label className="text-light" htmlFor="name">
                Enter Description of Your Issue
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control p-3 rounded-0"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add Your Product Issue Here"
              ></textarea>
            </div>
            <button className="btn btn-block w-100">Submit</button>
          </form>
        </section>
      </section>
    </>
  );
};

export default NewTicket;
