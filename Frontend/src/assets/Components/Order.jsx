import "../Styles/Order.css";


function Order() {


    return(
        <div className="order-container">
            <h2><box-icon type='solid' name='cart'></box-icon>Orders</h2>
            <div className="order-details">
                 <ul>
                    <li>Total Orders: <span>0</span></li>
                    <li>Pedding Orders: <span>0</span></li>
                 </ul>
            </div>
        </div>
    );
};
export default Order;