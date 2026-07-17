import {cart, savetostorage} from '../data/cart.js';
import {products,loadproducts} from '../data/products.js';
loadproducts(renderproductsgrid);
function renderproductsgrid(){
  let productHtml='';
  products.forEach((products)=>{
    productHtml+=`<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${products.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${products.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${(products.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            
            ${products.extrainfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id="${products.id}">
              Add to Cart
            </button>
          </div>`;
  });
  document.querySelector('.products-grid').innerHTML=productHtml;
  /*let cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:'5'
  },{productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1}];*/
  function updateCartQuantity(){
      let cartQuantity=0;
      cart.forEach((item)=>{
        cartQuantity+=item.quantity;
      });
      document.querySelector('.cart-quantity').innerHTML=cartQuantity;
      savetostorage();
    };
  updateCartQuantity();
  document.querySelectorAll('.button-primary').forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId= button.dataset.productId;
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
      updateCartQuantity();
    });
  });
};
