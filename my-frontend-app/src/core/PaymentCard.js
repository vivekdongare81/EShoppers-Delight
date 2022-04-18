import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
// integerated braintree card
import DropIn from "braintree-web-drop-in-react";
// Delivery optins
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { createTheme } from '@mui/material/styles';

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const [value, setValue] = React.useState('COD');
  const [Address, setAddress] = React.useState('Default address');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };
const cardPaymentOption = ()=>{
  return (<div>
    <DropIn
      options={{ authorization: info.clientToken }}
      onInstance={instance => (info.instance = instance)}
    />
     {!info.success ? (<button className="btn btn-block btn-success" onClick={onPurchase_Online}>
      Buy
    </button>) : msgAfterPayment()}
  </div> );
}
const cardCODOption =()=>{
  return(
    <div>
       {!info.success ? (<button className="btn btn-block btn-success" onClick={onPurchase_COD}>
      Buy
    </button>) : msgAfterPayment()}
    </div>
  );

}


const chooseOptions =()=>{
return (
  <FormControl>
  <FormLabel  id="demo-controlled-radio-buttons-group">Delivery Mode</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
   
    <FormControlLabel value="Net Banking" control={<Radio />} label="Pay Online" />
    {value==="Net Banking"? cardPaymentOption() :""}
    {value==="COD"? cardCODOption() :""}
  </RadioGroup>
</FormControl>
);
}
  // BrainTree Drop in 
  const showbtdropIn = () => {
    return (
    isAutheticated() ? ( <div>
      {info.clientToken !== null && products.length > 0 ? (   <div>
        <h3>Your bill is {getAmount()} ₹</h3>
        {chooseOptions()} </div>
      ) : (
        <h3> Add something to cart</h3>
      )}
    </div>) :   ( <h3>Please login to checkout</h3>)    
    );
  };


  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };


  useEffect(() => {
    getToken(userId, token);
  }, []);

const onPurchase_COD =()=>{
  setInfo({ ...info, success: true, loading: false });
  const orderData = {
    products: products,
    transactionId: 0,
    type:"COD",
    totalAmount: getAmount(),
    address :Address
  };
  console.log("CREATED ORDER DATA",orderData)
  createOrder(userId, token, orderData);

}
  const onPurchase_Online = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS",response);
          const productPurchased = [];
          products.forEach(product => {
            productPurchased.push(product._id);
          });
          const orderData = {
            products: products,
            transactionId: response.transaction.id,
            type:"Net Banking",
            totalAmount:  response.transaction.amount,
            address :Address
          };
          console.log("CREATED ORDER DATA",orderData)
          createOrder(userId, token, orderData);
          // emptyCart(() => {
          //   console.log("Cart Cleared after successful order");
          // });
          setReload(!reload);
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED",error);
        });
    });
  };

  
 const msgAfterPayment=()=>{
   return(
     <div>
   {errorMessage()}
   {successMessage()} </div> );
 }
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <div
            className="alert alert-danger"
            style={{ display: info.success===false ? "" : "none" }}
          >
            Payment failed ! Try Again.
          </div>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-10 offset-sm-1 text-left">
          <div
            className="alert alert-success"
            style={{ display: info.success===true ? "" : "none" }}
          >
            Payment successful. Please Check your Order Status Here 
            <Link to="/user/dashboard"> Dashboard</Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
