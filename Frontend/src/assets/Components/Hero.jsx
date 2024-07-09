import "../Styles/Hero.css";
import { useEffect, useContext, useState } from "react";
import { MyContext } from "../../App";

function Hero() {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const { addToCart, addToLike} = useContext(MyContext);
  const image_path = "https://stylesavvy.onrender.com/api";

  useEffect(() => {
    fetch("https://stylesavvy.onrender.com/api/trending/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error fetching products: ", error));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [products]);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const product = products[index];

  return (
    <div className="hero-container">
      <div className="hero-detail">
        <div className="shoe-info">
          <h2>{product.name}</h2>
          <p>{product.description.slice(0, 20)}</p>
          <span>0nly at: Ksh {product.price}</span>
        </div>
        <div className="hero-icons">
            <button onClick={() => addToCart(product)}>
              <box-icon name="cart-add" color="red"></box-icon>
            </button>
          <button onClick={() => addToLike(product)}>
          <box-icon name="heart" color="red"></box-icon>
        </button>
        </div>
      </div>

      <img src={image_path + `${product.image}`} alt="" />
    </div>
  );
}
export default Hero;
