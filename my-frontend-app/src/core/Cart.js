import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentCard from "./PaymentCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2> Products in Cart - <strong className="bg-black">{products.length}</strong></h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  
 
  return (
    <Base title="Your Cart " description="Ready to checkout !"
    
    >
      <div className="row ">
        <div className="col-6">{products.length>0 ?  (loadAllProducts(products) ) : (<h2>Cart is Empty </h2>) }
        </div>
        <div className="col-6">
          <PaymentCard products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
