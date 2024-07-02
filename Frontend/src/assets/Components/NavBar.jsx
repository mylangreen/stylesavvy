import "../Styles/NavBar.css";
import { useEffect, useState} from "react";
import {NavLink,Link, useNavigate} from "react-router-dom";
import SearchBar from "./SearchBar";

function NavBar(){

  const navigate = useNavigate();
  
  const Logout = () => {
    localStorage.clear();
    navigate('/login');
  };
 
   
  return (
    <div className="nav-bar">
      <nav>
      <Link to="/">
        <h1 className="brand">
          style<span>Savvy</span>
        </h1>
      </Link>
      <div className="right-navbar">
        <ul className="nav-bars">
          <li>
            <NavLink to="/" activeClassName="active">
              <span>
                <box-icon
                  className="icon"
                  type="solid"
                  name="home"
                  color="#FCF8FE"
                ></box-icon>
              </span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeClassName="active">
              <span>
                <box-icon
                  type="solid"
                  name="shopping-bag"
                  color="#FCF8FE"
                ></box-icon>
              </span>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">
              <span>
                <box-icon type="solid" name="cart" color="#FCF8FE"></box-icon>
              </span>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/like" activeClassName="active">
              <span>
                <box-icon type="solid" name="heart" color="#FCF8FE"></box-icon>
              </span>
              Like
            </NavLink>
          </li>
        </ul>
          <div className="nav-profile">
          <box-icon name='user-circle' size='40px'color="black"></box-icon>
            <button className="logout" onClick={Logout}>
              Logout
            </button>
          </div>
      </div>
    </nav>
    <SearchBar/>
    </div>
  );
}
export default NavBar;