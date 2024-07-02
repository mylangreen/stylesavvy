import "../Styles/NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";


function SearchBar() {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async(value) => {
        fetch('http://127.0.0.1:8000/api/products/')
        .then(response => response.json())
        .then(json => {
          const results = json.filter((product) => {
            return value && product && product.name && product.name.toLowerCase().includes(value)
          });
          setData(results)
        })
      }
    
      const handleSearch = (value) => {
          setInput(value);
          fetchData(value)
      };

    return(
        <div className="search-container">
    <form action="" className="search-bar">
      <button><box-icon name="search" size="sm"></box-icon></button>
      <input
        type="text"
        placeholder="Search product.."
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
    {input.length > 0 ? <ul className="results">
      {data.map((data,index) => <Link to={`/product/${data.name}/${data.id}`}>
        <li key={index}>
        {data.name}
      </li> 
      </Link>)}
    </ul> : null}
    </div>
    );
};
export default SearchBar;