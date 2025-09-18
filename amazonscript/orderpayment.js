import { cart,deliveryOptions,orders,addorders } from "../data/cart.js";
import { products } from "../data/products.js";
export function renderOrderPayment(){
   function getdeliveryoption(deliveryoptionid){
      let matchoptions=[];
      deliveryOptions.forEach((option)=>{
         if(deliveryoptionid===option.idOP){
            matchoptions=option;
            }
          });
      return matchoptions;
   };
   let totalshipping=0;
   let productsprice=0;
   cart.forEach((item)=>{
      let productid=item.productId;
      let matchingitem;
      products.forEach((product)=>{
         if(product.id===productid){
            matchingitem=product;
            };
         });
      productsprice+=item.quantity * (matchingitem.priceCents/100);
      const deliveryoption=getdeliveryoption(item.deliveryOptionId)
      
      totalshipping+=deliveryoption.priceCent/100;
      });
      
   let totalBeforeTax=totalshipping+productsprice;
   let tax=totalBeforeTax*0.1;
   let total=totalBeforeTax+tax;
   const paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${productsprice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalshipping.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${total.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> `;
   document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML;
   document.querySelector('.place-order-button').addEventListener('click',async()=>{
    let response=fetch('https://supersimplebackend.dev/orders',{method:'post',
      headers:{
        'Content-Type':'application/json'
      },body:JSON.stringify({cart:cart})
    })
    let order=(await response).json();
    addorders(order);
    window.location.href='orders.html';
   });
};
//this is new
document.querySelectorAll('.place-order-button').forEach((button)=>{
  button.addEventListener('click',()=>{
    let matchitem;
    
    cart.forEach((item)=>{
      
      if(productId===item.productId){
        matchitem=item;         
      }
    });
    if(matchitem){
      matchitem.quantity+=1;
    }else{
      cart.push({
        productId,
        quantity:1,
        deliveryOptionId:'1'
      });
    };
    savetostorage();
 });
})