import { useDispatch, useSelector } from "react-redux";
import "../Header/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <>
      <div className="header">
        <div className="nav-head">
          <Link to="/">Main</Link>
        </div>
        <span className="nav-ul">
          {user ? (
            <li>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <Link className="reg" to="/register">
                Register
              </Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default Header;
