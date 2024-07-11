import "../Styles/Product.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {MyContext} from "../../App";
import api from "../api";


function Product() {
  const { name, id } = useParams();
  const [product, setProduct] = useState([]);
  const image_path = "https://stylesavvy.onrender.com/api";
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [product.image, product.img2, product.img3, product.img4];
  const { addToCart, addToLike } = useContext(MyContext);

  const Next = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((c) => c + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const Prev = () => {
    if (currentIndex) setCurrentIndex((c) => c - 1);
  };

  useEffect(() => {
<<<<<<< HEAD
    fetch(`https://stylesavvy.onrender.com/${id}/`)
=======
    fetch(`https://stylesavvy.onrender.com/products/${id}/`)
>>>>>>> e9581ab27815c28f4dc5d03d462b059df118dbd6
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("Error fetching the product: ", error));
  }, []);

  return (
    <div className="product-page">
      <NavBar />
      <div className="product-container">
        <div className="main-container">
          <div className="main-image">
            <img src={image_path + `${images[currentIndex]}`} alt="" />
          </div>
        </div>
        <div className="other-container">
          <button id="left-btn" onClick={Prev}>
            <box-icon name="chevron-left" size="lg"></box-icon>
          </button>
          <div className="other">
            {images.map((image, index) => (
              <div className="image" key={index}>
                <img src={image_path + image} alt="" />
              </div>
            ))}
          </div>
          <button id="right-btn" onClick={Next}>
            <box-icon name="chevron-right" size="lg"></box-icon>
          </button>
        </div>
        <div className="p-detail">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>Ksh {product.price}</span>
        </div>
      </div>
      <div className="btns">
        <button className="order" onClick={() => addToCart(product)}>
          Add to cart
        </button>
        <button className="like" onClick={() => addToLike(product)}>
          <box-icon name="heart" size="xsm" color="#F3482A"></box-icon>
        </button>
      </div>
      <Footer/>
    </div>
  );
};
export default Product;