import { useDispatch, useSelector } from "react-redux";
import './Cart.css';

import { useRef, useState } from "react";
import { clearCart, decrementQuantity, incrementQuantity, OrderDetails, removeProduct } from "./Store";
import {  useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import emailjs from "@emailjs/browser";


function Cart() {
  const cartObjects = useSelector((globalState) => globalState.cart);
  const dispatch = useDispatch();
 const[customerEmail, setCustomerEmail]=useState("");
  const [discount, setDiscount] = useState(0);
  const[cupon, setCupon]=useState(0);
const[payment,setpaymentMethod]=useState("");
const[paymentSuccess,setPaymentSuccess]=useState(false);

const Navigate=useNavigate();

  const cuponCodeRef = useRef();
  const handleCupon=()=>{
    const cuponCode=cuponCodeRef.current.value.trim().toUpperCase();
    
    switch(cuponCode){
      case "DISCOUNT10": setCupon(10);
        break;
       
      case "DISCOUNT20": setCupon(20);
        break;
     
         case "DISCOUNT30": setCupon(30);
        break;
        
      case "DISCOUNT40": setCupon(40);
        break;
       
      default: alert("Invalid cupon code");
        setCupon(0);
      
    }
  }


  const cartCalculation=()=>{
  const totalPrice= cartObjects.reduce((total, product) => total+(product.price * product.quantity), 0);
  const totaldiscount= (totalPrice*discount)/100 ;
  const tax= ((totalPrice - totaldiscount) * 5) / 100;
    const finalAmount= (totalPrice - totaldiscount -(totalPrice*cupon/100 )) + tax;
   return{totalPrice, totaldiscount, tax, finalAmount};
  
  };
  const { totalPrice, totaldiscount, tax, finalAmount } = cartCalculation();

  const handlepayment = () => {
  const purchaseTime = new Date().toLocaleString();
  const orderId = 'ORD-' + new Date().getTime();
  const customerEmail = "example@example.com"; // Replace with actual logic

  const orderDetails = {
  orderId,
  purchaseTime,
  totalPrice,
  totaldiscount,
  tax: tax.toFixed(2),
  email: customerEmail,
  finalAmount,
  products: cartObjects 
};


  alert('Order placed successfully!\nOrder ID: ' + orderDetails.orderId);
  dispatch(clearCart());
  dispatch(OrderDetails(orderDetails));

  const templateparams  = {
    order_id: orderId,
    purchase_time: purchaseTime,
    email: customerEmail,
    tax: tax.toFixed(2),
    final_amount: finalAmount.toFixed(2),
    item_details: cartObjects.map((product) =>
      `${product.name} - (Qty: ${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}`
    ).join('\n')
  };

   
  // You can send templateparams to an API or use it as needed
emailjs.send(
    'service_e59djkv',
     'template_jc6f9m4',
      templateparams,
       '-qukVUwgjrA27L3Ob'
    ).then((response) => {
    console.log('Email sent successfully!', response.status, response.text);
  }).catch((error) => {
    console.error('Error sending email:', error);
  });

    setPaymentSuccess(true);
    setTimeout(() => {
      Navigate('/order');
    }, 2000);
};

  
  return (
    <div className="cart-container">
      <h1 style={{backgroundColor:"white",textAlign:"center"}}> Cart</h1>
      
      {/* Cart Table Container */}
      <div className="cart-table">
        <div className="cart-header">
          <span className="cart-col image-col">🛒</span>
          <span className="cart-col">Product Name</span>
          <span className="cart-col">Price</span>
          <span className="cart-col">Quantity</span>
          <span className="cart-col">opps</span>
        </div>

        {cartObjects.map((product, index) => (
          <div key={index} className="cart-row">
            <div className="cart-col image-col">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="cart-col">{product.name}</div>
            <div className="cart-col">₹{product.price}</div>
            
            <div className="cart-col">
             <button onClick={() => dispatch(decrementQuantity(product))}>-</button>
             <span style={{ margin: '0 10px' }}>{product.quantity}</span>
             <button onClick={() => dispatch(incrementQuantity(product))}>+</button>
             <button 
            onClick={() => dispatch(removeProduct(product))} 
            style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
  > 
                       Remove
                </button>
            </div>

          </div>
        ))}
       
   <div className="summary-box">
  <h2>Order Summary</h2>
  <div className="summary-row">
    <span>Total Price:</span>
    <span>₹{totalPrice.toFixed(2)}</span>
  </div>
  

  <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
  <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
  <br/>


<div className="coupon-section">
  <input type="text" ref={cuponCodeRef} placeholder="Enter coupon code" />
  <button onClick={handleCupon}>Apply</button>
</div>
    
 
  <div className="summary-row">
    <span>Cupon Discount ({cupon}%):</span>
    <span>-₹{(totalPrice*cupon/100).toFixed(2)}</span>
  </div>
  
  <div className="summary-row">
    <span>Discount ({discount}%):</span>
    <span>-₹{totaldiscount.toFixed(2)}</span>
  </div>
  <div className="summary-row">
    <span>Tax (5%):</span>
    <span>+₹{tax.toFixed(2)}</span>
  </div>
  <hr />
  <div className="summary-row final">
    <span>Final Amount:</span>
    <span>₹{finalAmount.toFixed(2)}</span>
  </div>
   <div className="coupon-section">
<input
  type="email"
  value={customerEmail}
  onChange={(e) => setCustomerEmail(e.target.value)}
  placeholder="Enter your email"
/>

 <button onClick={() => alert(`Email set: ${customerEmail}`)}>Apply</button>

</div>
</div>
   <h2>Payment Here:</h2>
   <button onClick={() => setpaymentMethod("qr") }>qr code</button>
    <button onClick={() => setpaymentMethod("upi")}>upi</button>
    <button onClick={() => setpaymentMethod("card")}>card</button>
    
     {payment === "qr" && !paymentSuccess && (
  <div>
    <h3>Scan the QR to pay ₹{finalAmount.toFixed(2)}</h3>
    <QRCode value={`upi://pay?pa=8121441442@ybl&pn=MyStore&am=${finalAmount.toFixed(2)}&cu=INR`} />
    <br></br>
    <button onClick={handlepayment}>Paid</button>
  </div>
)}


      
      </div>
    </div>
  );

  }
export default Cart;
