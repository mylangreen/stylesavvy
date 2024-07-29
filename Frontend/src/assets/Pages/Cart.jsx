import "../Styles/Cart.css";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { IMAGE_PATH } from "../constants";


function Cart() {
  const image_path = IMAGE_PATH+"/api";
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const {addToCart} = useContext(MyContext);

   //Retrieve cartItems from user's account
   useEffect(()=>{
    const cart_id = localStorage.getItem('CART_ID');
    api.get(`carts/${cart_id}/items/`).then((res) => res.data).then((data) => setProducts(data))
    getCart(cart_id)
  },[products])

  //Update Quantity
  const updateQuantity = (itemId, quantity) => {
    api.put(`/carts/items/${itemId}/delete`,{quantity})
  }

  //get cart detail
  const getCart = (id) =>{
    api.get(`carts/${id}/`).then((res) => res.data).then((data) => setCart(data))
  }

  //Remove cartItems from user's account
  const removeFromCart = async(id) => {
      try {
        const response = await api.delete(`carts/items/${id}/delete`)
        console.log('Product removed from cart');
      } catch (error) {
        console.error('Error removing product from cart: ',error);
      }
  }
  

  return (
    <div className="page">
      <div className="cart-page">
      <NavBar />
      <h2>Your Cart</h2>
      {products.length < 0 ? (
          <p>Your cart is Empty</p>
        ) : (
          <p>You have {products.length} item(s) in cart</p>
        )}
      
        <div className="cart-container">
        <div className="cart-list">
          {products && products.map && products.map((item, index) => (
            <div className="cart-card" key={index}>
                <Link to={`/product/${item.product.name}/${item.product.id}`}><img src={image_path+`${item.product.image}`} alt="" /></Link>
              <div className="cart-card-detail">
                <h3>{item.product.name}</h3>
                <p>
                  Price: Ksh {item.product.price}
                </p>
                <button
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    <box-icon name="minus" color="red"></box-icon>
                  </button>
              </div>
              <div className="quantity">
              <label htmlFor="quantity">Quantity:</label>
              <button  onClick={()=>updateQuantity(item.id,item.quantity>1?-1:"")}
              ><box-icon name="minus" color="red"></box-icon></button>
              <input type="number" min="1" name="quantity" value={item.quantity}
              />
              <button onClick={()=>updateQuantity(item.id,+1)}
              ><box-icon name="plus" color="red"></box-icon></button>
              </div>
            </div>
          ))}
        </div>
        <div className="order-container">
        <div className="total">Total: <span>Ksh{cart.total}</span></div> 
        <button>Call to ORDER</button>
        </div>
  
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Cart;
