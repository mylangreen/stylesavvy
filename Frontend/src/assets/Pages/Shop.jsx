import "../Styles/Shop.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";

function Shop() {
  const [products, setProducts] = useState([]);
  const image_path = "https://stylesavvy.onrender.com/api";
  const {addToLike} = useContext(MyContext);

  useEffect(() => {
    fetch("https://stylesavvy.onrender.com/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data.reverse()))
      .catch((error) => console.log("Error fetching products: ", error));
  }, []);

  return (
    <div className="shop-page">
      <NavBar />
      <div className="shop-list">
        {products.map((product, index) => (
          <div className="shop-card" key={index}>
            <Link to={`/product/${product.name}/${product.id}`}>
              <img src={image_path + `${product.image}`} alt={product.name} />
            </Link>
            <div className="detail">
              <div className="text">
                <h3>{product.name}</h3>
                <span>Ksh {product.price}</span>
              </div>
                  <button onClick={() => addToLike(product)}>
                  <box-icon name="heart" size="xsm" color="#F3482A"></box-icon>
                </button>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
export default Shop;
