import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/create_order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(response => { console.log("front se=ress",response)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getOrders = (userId, token) => {
 
  return fetch(`${API}/get_all_orders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {  console.log("in res",response)
      return response.json();
    })
    .catch(err => console.log(err));
};
