import "../Styles/Login.css";
import {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Spinner from "../Components/Spinner";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await api.post('/account/token/',{
                email,
                password
            });
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            const cart_id = response.data.cart_uuid;
            const like_id = response.data.like_uuid;
            const profile_id = response.data.profile_id
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            localStorage.setItem('CART_ID', cart_id);
            localStorage.setItem('LIKE_ID', like_id);
            setMessage("Logged in succesfully");
            navigate("/");
        } catch (error) {
            console.log(error)
        }
        finally{
                setLoading(false)
        }

        return
    }

    return(
        <div className="login-page">
            <div className="login-container">
                <h1>style<span>Savvy</span></h1>
                <h3>Login to proceed</h3>
                <form action="">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id='email'name='email' placeholder='Enter email...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder='Enter password...' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={handleSubmit}>Login</button>
                    <p>
                        Don't have an account? <br />
                        <Link to='/signup'>SignUp</Link>
                    </p>
                </form>
                {loading?<Spinner text={"Logging you in..."}/>:""}
                <b>{message}</b>
            </div>
        </div>
    );
}
export default Login;