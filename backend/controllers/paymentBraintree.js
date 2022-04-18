const braintree = require("braintree");

// this gets called in getToken  
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "56hrgbxxb7mmvphj",
  publicKey: "4y44rqn9ydscxj4c",
  privateKey: "5f9c524e43e98c74877626f2894c0e4f"
});

exports. getToken = (req,res) => {
    // generate clientToken
    gateway.clientToken.generate( {} , (err, response) => {
   // pass clientToken to your front-end
       if(err){
         return res.status(500).json({
            error: "Payment Failed while getting Token ! Try Again."
          })
       }else{
         return res.json(response);  
       }
      }); 
}



exports. sendNonce = (req,res) =>{
    // get Nonce from frontend
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;
    // process Transaction using Nonce & send results Accordingly
    gateway.transaction.sale({
        amount: amountFromTheClient ,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (error, result) => {
        if(error){  
            res.status(500).json({
                error: "Payment Failed while sending Nonce! Try Again."
              })
           }else{
             res.json(result);  
           }
      });
}
