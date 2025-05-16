import { useSelector } from "react-redux";
import "./Orders.css"; // Importing CSS

function Orders() {
  const orders = useSelector((state) => state.Orders);

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container empty">
        <h2>No orders found</h2>
        <h3>Please place an order</h3>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="orders-heading">Order History</h2>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <h3>Order ID: {order.orderId}</h3>
            <p>Purchase Time: {order.purchaseTime}</p>
            <p className="order-amount">Final Amount: ₹{order.finalAmount}</p>
            <ul className="products-list">
              {order.products?.map((product, idx) => (
                <li key={idx} className="product-item">
                  <span>{product.name}</span> - 
                  <span> Qty: {product.quantity}</span> - 
                  <span> ₹{product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
