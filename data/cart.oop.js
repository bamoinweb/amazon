function Cart(localStorageKey){
   let cart={
      cartitems:undefined,
      cartitems:JSON.parse(localStorage.getItem(localStorageKey)),
      loadfromstorage(){
         if(!this.cartitems){
            this.cartitems=[{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:5,
            deliveryOptionId:'1'
         },{productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionId:'2'
      }]
      }},
      savetostorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartitems));
      },
      addToCart(productId){
         let matchitem;
         this.cartitems.forEach((item)=>{
            if(productId===item.productId){
            matchitem=item;         
            }
         });
         if(matchitem){
            matchitem.quantity+=1;
         }else{
            this.cartitems.push({
            productId,
            quantity:1,
            deliveryOptionId:'1'
            });
         }
         this.savetostorage()
         },
         removefromcart(productId) {
            const index = this.cartitems.findIndex(cartItem => cartItem.productId === productId);
            if (index !== -1) {
               this.cartitems.splice(index, 1);}
            this.savetostorage()},
         updateDeliveryoption(productId,deliveryOptionId){
         let matchitem;
            this.cartitems.forEach((item)=>{
               if(productId===item.productId){
               matchitem=item;
               }});
         matchitem.deliveryOptionId=deliveryOptionId;
         this.savetostorage();
         }
   }
      return cart;
   };
const cart=Cart('cart-oop');
const buisnessCart=Cart('buisness-cart');
cart.loadfromstorage();
buisnessCart.loadfromstorage();
buisnessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(cart);
console.log(buisnessCart);
