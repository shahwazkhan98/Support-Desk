import { useEffect, useState } from "react";
import "../Pages/Register.css";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { reset } from "../features/auth/authSlice";
const Register = () => {


const {user , isLoading , isSuccess , isError , message} = useSelector((state)=> state.auth);
const dispatch = useDispatch();

const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(password !== password2){
      toast.error("Password not match")
    }

    dispatch(registerUser(formData));
  }

  useEffect(()=>{ 
    if(isError){
      toast.error(message);
    }

    if(user || isSuccess){
      navigate('/')
    }
    
    dispatch(reset())
  },[user , isLoading , isSuccess , isError , message]);

  if(isLoading){
    (
      <h1>Loading</h1>
    )
  }

  return (
    <>
      <section className="form-container">
        <div className="image"></div>
        <section className="form-main">
          <form onSubmit={handleSubmit}>
            <div className="frm-inp1">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={name}
              />
            </div>
            <div className="frm-inp1">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="frm-inp1">
              <label>PassWord</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={password}
              />
            </div>
            <div className="frm-inp1">
              <label>Confirm PassWord</label>
              <input
                type="password"
                name="password2"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={password2}
              />
            </div>
            <div className="frm-btn">
              <button>Submit</button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Register;
