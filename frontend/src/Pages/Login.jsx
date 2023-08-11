
import "../Pages/Login.css"
const Login = () => {
  return (
    <>
      <section className="login-main">
          <div className="log-1">
            <label className="log-label">Email Id</label>
            <input
              className="log-input"
              type="email"
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div className="log-1">
            <label className="log-label">Password</label>
            <input
              className="log-input"
              type="password"
              required
              placeholder="Enter Your Password"
            />
          </div>
          <div className="log-btn">
            <button type="submit">Login</button>
          </div>
      </section>
    </>
  );
}

export default Login