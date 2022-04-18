
import React, { useState, useEffect } from "react";
import "../styles.css";
import { DataGrid } from '@mui/x-data-grid';

import Base from "../core/Base";

import { getOrders } from "../core/helper/orderHelper";
import { isAutheticated } from "../auth/helper";

// export default function Home() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(false);

//   const loadOrders = () => {
//     const { user, token } = isAutheticated();

//     getOrders(user._id, token).then(data => {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setOrders(data);
//       }
//     });
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   return (
//     <Base title="All Orders">

//       <div className="row">
//         {orders.map((product, index) => {
//           const { _id, status, type, createdAt, products } = product;
//           const all_products = [];
//           products.forEach(e => {
//             all_products.push(e);
//           });

//           return (
//             <div key={index} className="row mb-4">
//               <h3>Order {index + 1}</h3>

//               {product.products.map((ele,indx)=>(
//                <h2 key={indx}>sss{ele.name}</h2> 
//               ))}

//               <p>{type} {status} -{createdAt}</p>

//             </div>
//           );
//         })}

//       </div>
//     </Base>
//   );
// }

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'Ordered on', width: 110 },
  { field: 'lastName', headerName: 'Address', width: 350 }, { field: 'type', headerName: 'Delivery Mode', width: 180 },
  { field: 'productCnt', headerName: 'Total Products', width: 180 },
  {
    field: 'age',
    headerName: 'Amount',
    type: 'number',
    width: 180,
  },
  { field: 'transaction', headerName: 'Transaction Id', width: 180 },

  { field: 'status', headerName: 'Status', width: 180 },

];


export default function DataTable() {


  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const loadOrders = () => {
    const { user, token } = isAutheticated();

    getOrders(user._id, token).then(data => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const myrow = () => {
    const newRow = [];
    orders.map((product, index) => {
      const { _id, status, type, createdAt, products, address, totalAmount, transactionId } = product;
    
      const newData = {
        id: index + 1, lastName: address, firstName: createdAt, age: totalAmount,
        status: status,
        transaction: transactionId,
        type:type,
        productCnt:products.length

      };
      newRow.push(newData);

    })
    return newRow;
  }

  return (
    <Base title="All Orders">
      <div  style={{ color: "white", height: 500, width: '100%' }}>
        <DataGrid  className="text-white" 
          rows={myrow()}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </div>
    </Base>
  );
}