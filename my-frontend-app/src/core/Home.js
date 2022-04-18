import React ,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import MyCard from "./Card"
import { getProducts } from "../admin/helper/adminapicall";
import poster from '../Images/4359042.jpg';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="" className=""> 
    <div>
       <div class="img-fluid ">
      <img class="poster" src={poster} alt="Logo" />
       </div>
        <div className=" d-flex d-flex flex-wrap  justify-content-center myBgImg">

          {products.map((product, index) => {
            return (
              <div key={index} className="p-2 bd-highlight">
                <MyCard product={product} />
              </div>
            );
          })}
  
        </div>
        </div>
    </Base>
  );
}
