import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { Redirect } from "react-router-dom";
import Button from '@mui/material/Button';


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const { user, token } = isAutheticated();

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/admin/products" />;
    }
  };


  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        getARedirect(true);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);

      } else {
        preload();

      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn bg-dark" to={`/admin/dashboard`}>
        <span className="purpColor">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total <span className="text-muted">{products.length} </span>products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                  > <Button  variant="contained" color="secondary">Update</Button>
                   
                  </Link>
                </div>
                <div className="col-4">
                  <span onClick={() => {
                    deleteThisProduct(product._id);
                  }} className="text-danger" >
                    <DeleteForeverSharpIcon />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
