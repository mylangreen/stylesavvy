import "../Styles/SignUp.css";
import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import backgroundImage from "../Img/pic3.jpeg";


function SignUp() {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState("");
    const [phone_number, setPhone] = useState("");
    const [password, setPass1] = useState("");
    const [confirm_password, setPass2] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const response = await api.post(
          "account/users/",
          {
            username,
            phone_number,
            email,
            password,
            confirm_password,
          }
        );
        if (response.status==201){
          setMessage(response.data.message);
          navigate("/login");
        }else{
          setError(response.data.error);
        }
      } catch (error) {
        setError('email already exist')
        console.error('Error signing user in:', error);
      }
      finally{
        setLoading(false)
      }
    };
  
    return (
      <div className="signup-page" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="signup-container">
          <h1>
            style<span>Savvy</span>
          </h1>
          <p>Create an account to proceed</p>
          <form action="">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email..."
              required
            />
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number..."
              required
            />
            <label htmlFor="pass1">Password</label>
            <input
              type="password"
              id="pass1"
              name="pass1"
              value={password}
              onChange={(e) => setPass1(e.target.value)}
              placeholder="Enter password..."
              required
            />
            <label htmlFor="pass2">Confirm password</label>
            <input
              type="password"
              id="pass2"
              name="pass2"
              value={confirm_password}
              onChange={(e) => setPass2(e.target.value)}
              placeholder="Confirm password..."
              required
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <button onClick={handleSubmit}>Signup</button>
          </form>
          <p>
            Already have an account? <br />
            <Link to="/login">Login</Link>
          </p>
          {loading?<Spinner text={"Creating your account..."}/>:''}
          <h3 className="message">{message && message}</h3>
          <h3 className="error">{error && error}</h3>
        </div>
      </div>
    );
  }
  export default SignUp;
  