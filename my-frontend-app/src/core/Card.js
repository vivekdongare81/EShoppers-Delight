import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper"

export default function MyCard({ product,
  addtoCart = true,
  removeFromCart = false,
   setReload = f => f,
  //   function(f){return f}
  reload = undefined }) {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  // func to convert Binary to Image 
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }
  
  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <Button 
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload);
        }}
         color="error" variant="contained">Remove</Button>
      )
    );
  };
  
  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <Button onClick={ addToCart } color="secondary" variant="contained">Add to Cart</Button>
       
      )
    );
  };

  return (
    <div>

      
   <div class="container p-3">
  <div class="card">
    <div class="imgBx">
    <img src={product ? `data:image/png;base64,${toBase64(product.photo.data.data)}` : "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"}/>
    </div>
    <div class="contentBx">
      <h2>{product.name}</h2>
      <p class="description" >{product.description} <br></br> 
      <del> ₹ {product.price* 130/100} </del>
      <mark><strong>₹ {(product.price)} /-</strong></mark>
      </p>
      <div class="size">
        <h3></h3>
        <span></span>
        {getARedirect(redirect)}
      </div>
      <div class="color">
      <h3></h3>
        
      </div>
      {showAddToCart(addtoCart)}
      {showRemoveFromCart(removeFromCart)}
    </div>
  </div>
</div>

    </div>
  );
}



// import React, { useState, useEffect } from "react";
// import ImageHelper from "./helper/ImageHelper";
// import { Redirect } from "react-router-dom";
// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

// const Card = ({
//   product,
//   addtoCart = true,
//   removeFromCart = false,
//   setReload = f => f,
//   //   function(f){return f}
//   reload = undefined
// }) => {
//   const [redirect, setRedirect] = useState(false);
//   const [count, setCount] = useState(product.count);

//   const cartTitle = product ? product.name : "A photo from pexels";
//   const cartDescrption = product ? product.description : "Default description";
//   const cartPrice = product ? product.price : "DEFAULT";

//   function toBase64(arr) {
//     return btoa(
//       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
//     );
//   }

//   const addToCart = () => {
//     addItemToCart(product, () => setRedirect(true));
//   };

//   const getARedirect = redirect => {
//     if (redirect) {
//       return <Redirect to="/cart" />;
//     }
//   };

//   const showAddToCart = addtoCart => {
//     return (
//       addtoCart && (
//         <button
//           onClick={addToCart}
//           className="btn btn-block btn-outline-success mt-2 mb-2"
//         >
//           Add to Cart
//         </button>
//       )
//     );
//   };

//   const showRemoveFromCart = removeFromCart => {
//     return (
//       removeFromCart && (
//         <button
//           onClick={() => {
//             removeItemFromCart(product._id);
//             setReload(!reload);
//           }}
//           className="btn btn-block btn-outline-danger mt-2 mb-2"
//         >
//           Remove from cart
//         </button>
//       )
//     );
//   };
//   return (
//     <div className="card text-white bg-dark border border-info ">
//       <div className="card-header lead">{cartTitle}</div>
//       <div className="card-body">
//         {getARedirect(redirect)}
//         <ImageHelper product={product} />
//         <p className="lead bg-success font-weight-normal text-wrap">
//           {cartDescrption}
//         </p>
//         <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
//         <div className="row">
//           <div className="col-12">{showAddToCart(addtoCart)}</div>
//           <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
