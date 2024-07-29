import "../Styles/Popular.css";
import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import api from "../api";
import { IMAGE_PATH } from "../constants";


const Popular = ({ title, type, index }) => {
    const [products, setProducts] = useState([]);
    const image_path = IMAGE_PATH+"/api";
  
    const listRef = useRef(null);
    const { addToCart, inCart, addToLike, inLike } = useContext(MyContext);
  
    function scroll(x) {
      listRef.current.scrollLeft += x;
    }
  
    useEffect(() => {
      api.get(`/api/${type ? type : "popular"}/`)
        .then((response) =>setProducts(response.data.reverse().slice(0, index)))
        .catch((error) => console.log("Error fetching product: ", error));
    }, []);
  
    return (
      <div className="popular-title-container">
        <h2>{title ? title : "POPULAR PRODUCTS"}</h2>
  
        <div className="popular-container">
          <button className="btn" id="left-btn" onClick={() => scroll(-170)}>
            <box-icon name="chevron-left" size="lg"></box-icon>
          </button>
          <div className="popular-list" ref={listRef}>
            {products.map((product, index) => (
              <div className="popular-card" key={index}>
                <Link to={`/product/${product.name}/${product.id}`}>
                  <img src={image_path + `${product.image}`} alt={product.name} />
                </Link>
                <h3>{product.name}</h3>
                <span>Price : Ksh {product.price}</span>
                <div className="icons">
                    <button onClick={() => addToCart(product)}>
                      <box-icon
                        name="cart-add"
                        size="xsm"
                        color="#F3482A"
                      ></box-icon>
                    </button>
                  <button onClick={() => addToLike(product)}>
                  <box-icon name="heart" size="xsm" color="#F3482A"></box-icon>
                </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" id="right-btn" onClick={() => scroll(170)}>
            <box-icon name="chevron-right" size="lg"></box-icon>
          </button>
        </div>
      </div>
    );
  };
  export default Popular;
  