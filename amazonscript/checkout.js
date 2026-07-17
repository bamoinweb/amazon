import {cart,savetostorage,deliveryOptions,updateDeliveryoption} from '../data/cart.js';
import {products,loadproductsfetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderOrderPayment} from './orderpayment.js';
//import '../data/cart-oop-class.js';
//import '../data/backend-practice.js';
function renderOrderSummary(){
  function removefromcart(productId) {
    const index = cart.findIndex(cartItem => cartItem.productId === productId);
    if (index !== -1) {
      cart.splice(index, 1);}
    savetostorage()};
    
  let cartsummaryHTML='';
  cart.forEach((item)=>{
    let productid=item.productId;
    let matchingitem;
    products.forEach((product)=>{
        if(product.id===productid){
          matchingitem=product;
        };
    });
    let deliveryoptionid=item.deliveryOptionId
    let matchoptions;
    deliveryOptions.forEach((option)=>{
      if(deliveryoptionid===option.idOP){
        matchoptions=option;
      }
    });
    const today=dayjs();
    let deliveryTime=today.add(matchoptions.deliveryDays,'days')
    let deliveryDate=deliveryTime.format('dddd , MMMM D')

    cartsummaryHTML+=`
        <div class="cart-item-container container-${matchingitem.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src=${matchingitem.image}>

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingitem.name}
            </div>
            <div class="product-price">
              $${(matchingitem.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="delete-quantity-link link-primary delete-button" data-product-id=${matchingitem.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
              </div>
                ${deliveryoptionHTML(item, matchingitem)}
              </div>
            </div>
          </div>
        `;
      });
              
              document.querySelector('.order-summary').innerHTML=cartsummaryHTML;
              document.querySelectorAll('.delete-button').forEach((link)=>{
                link.addEventListener('click',()=>{
                  let productId=link.dataset.productId;
                  removefromcart(productId);
                  let container=document.querySelector(`.container-${productId}`);
                  container.remove();
                  renderOrderPayment();          
                });
              });
              function deliveryoptionHTML(item,matchingitem){
                let deliveryHTML;
                deliveryOptions.forEach((deliveryOption)=>{
                  const today=dayjs();
                  let deliveryTime=today.add(deliveryOption.deliveryDays,'days')
                  let deliveryDate=deliveryTime.format('dddd , MMMM D')
                  const Shippingprice=deliveryOption.priceCent===0?'free':`$${
                    (deliveryOption.priceCent/100).toFixed(2)
                  }`;
                  let ischecked=item.deliveryOptionId===deliveryOption.idOP;
                  deliveryHTML+= `
                      <div class="delivery-option"
                          data-product-id=${matchingitem.id}
                          data-deliveryoption-id=${deliveryOption.idOP}>
                        <input type="radio"
                          ${ischecked ? 'checked' : ''}
                          class="delivery-option-input"
                          name="delivery-option-${matchingitem.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${deliveryDate}
                          </div>
                          <div class="delivery-option-price">
                            ${Shippingprice} - Shipping
                          </div>
                        </div>
                      </div>
                `;
                });
                return deliveryHTML;
              };
              document.querySelectorAll('.delivery-option').forEach((element)=>{
                element.addEventListener('click',()=>{
                  const{productId,deliveryoptionId}=element.dataset;
                  updateDeliveryoption(productId,deliveryoptionId);
                  renderOrderSummary();
                  renderOrderPayment();
                })
              });
            }

async function loadPage(){
  try{
    await loadproductsfetch();
  }catch(error){
    console.log('unexpected error');
  }
  renderOrderSummary();
  renderOrderPayment();
};
loadPage();
/*
loadproductsfetch().then(()=>{
  renderOrderSummary();
  renderOrderPayment();
});*/
/*loadproducts(()=>{
  renderOrderSummary();
  renderOrderPayment();
});*/


          
