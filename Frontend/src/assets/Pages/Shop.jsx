import "../Styles/Shop.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import api from "../api";
import { IMAGE_PATH } from "../constants";

function Shop() {
  const [products, setProducts] = useState([]);
  const image_path = IMAGE_PATH+"/api";
  const {addToLike} = useContext(MyContext);

  useEffect(() => {
    api.get("/api/products/")
      .then((response) => setProducts(response.data.reverse()))
      .catch((error) => console.log("Error fetching products: ", error));
  }, []);

  return (
    <div className="page">
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
      </div>
      <Footer/>
    </div>
  );
}
export default Shop;
