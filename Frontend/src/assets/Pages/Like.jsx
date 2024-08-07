import '../Styles/Cart.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import { IMAGE_PATH } from '../constants';

function Like() {
    const [products, setProducts] = useState([]);
    const image_path = IMAGE_PATH+'/api';

    //Fetch liked products when the component mounts and when th products state changes
    useEffect(()=>{
        const like_id = localStorage.getItem('LIKE_ID');
        api.get(`like/${like_id}/items/`).then((res) => res.data).then((data) => setProducts(data)).catch((error) => console.error('Error fetching like items:', error))
    },[products]);

    //Function to remove liked items from user's account
    const removeFromLike = async(id) => {
        try {
            const response = await api.delete(`like/items/${id}/`)
            console.log('Removed item from like:', response.data);
        } catch (error) {
            console.error('Error removing item from like:', error);
        }
    };


    return(
        <div className="page">
        <div className="cart-page">
        <NavBar/>
        <h2>LIKED PRODUCTS</h2>
        <div className="cart-list">
            {products.length > 0 ? (products.map((item,index)=>(
                <div className="cart-card" key={index}>
                    <Link to={`/product/${item.product.name}/${item.product.id}`}><img src={image_path+`${item.product.image}`} alt={item.product.name} /></Link>
                    <div className="cart-card-detail">
                        <div className="text">
                            <h3>{item.product.name}</h3>
                            <span>Ksh: {item.product.price}</span>
                        </div>
                        <button onClick={()=>{removeFromLike(item.id)}}>
                        <box-icon name='minus' color="red"></box-icon>
                        </button>
                    </div>
                </div>
            ))) : ( <h2>You have no liked products</h2> ) }
        </div>
        </div>
        <Footer/>
    </div>
    );
}
export default Like;