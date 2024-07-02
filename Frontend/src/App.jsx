import "boxicons";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { createContext} from "react";
import HomePage from "./assets/Pages/Home";
import ShopPage from "./assets/Pages/Shop";
import CartPage from "./assets/Pages/Cart";
import LikePage from "./assets/Pages/Like";
import ProductPage from "./assets/Pages/Product";
import LoginPage from "./assets/Pages/Login";
import SignUpPage from "./assets/Pages/SignUp";
import ProtectedRoute from "./assets/ProtectedRoute";
import api from "./assets/api";


export const MyContext = createContext();

function App() {


  //Add an item to the cart in user's account
  
  const addToCart = async(product) => {
    const product_id = product.id
    const cart_id = localStorage.getItem('CART_ID')
    try {
      const response = await api.post(`/carts/${cart_id}/items/add`,{product_id});
      alert('Added to cart');
      console.log('Product added:',response.data)
    }
    catch(error){
      console.error('Error adding product to cart:', error);
    }
  }

  //Add an item to like in user's account
  const addToLike = async(product) => {
    const product_id = product.id
    const like_id = localStorage.getItem('LIKE_ID');
    try {
      const response = await api.post(`like/${like_id}/items/add/`,{product_id});
      alert('Added to Like');
      console.log('Product added:', response.data); 
    } catch (error) {
      console.error('Error adding product to like: ', error);
    }
  }



//Calculate total price of items in cart
const getTotalPrice = () => {
    return cartItems.reduce((total,item)=>(total+item.price),0);
};



  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/signup",
      element: <SignUpPage/>,
    },
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/shop",
      element: (
        <ProtectedRoute>
          <ShopPage/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute>
          <CartPage/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/like",
      element: (
        <ProtectedRoute>
          <LikePage/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:name/:id",
      element: (
        <ProtectedRoute>
          <ProductPage/>
        </ProtectedRoute>
      ),
    },
  ]);

    return(
        <MyContext.Provider value={{addToLike, addToCart}}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    );
};
export default App;