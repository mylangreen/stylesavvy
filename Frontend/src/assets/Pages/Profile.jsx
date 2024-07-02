import "../Styles/Profile.css";
import { Link } from "react-router-dom";
import Order from "../Components/Order";
import NavBar from "../Components/NavBar";
import api from "../api";
import { useEffect, useState } from "react";

function Profile() {
    const [data, setData] = useState({
        email,
    });

    useEffect(() => {
        api.get(`/accounts/users/16/`)
        .then(response => {
            setData(response.data)
        })
        .catch(error => console.error('There was an error fetching the profile:', error))
      }, []);

      console.log(data)
    

    return(
        <div className="profile-page">
            <div className="nav">
            <NavBar/>
            </div>
            <div className="profile-container">
            <div className="profile">
                <div className="profile-pic-container">
                <div className="profile-pic">
                    <img src="src/assets/Img/profile.png" alt="" />
                </div>
                <h3>KrissyJ88</h3>
                </div>
                <div className="details">
                    <p>Email: {data.email}</p>
                </div>
                <button>Update profile</button>
            </div>
            <Order/>
            </div>
        </div>
    );
};
export default Profile;