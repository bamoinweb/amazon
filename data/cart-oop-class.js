class Cart{
      cartitems;
      #localStorageKey;
      /*this is a private property it's used to prevent using properties outside of a class we can make private methods  aswell*/
      constructor(localStorageKey){
         this.#localStorageKey=localStorageKey;
         this.loadfromstorage();
      }
      cartitems=JSON.parse(localStorage.getItem(this.#localStorageKey));
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
      }}
      savetostorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartitems));
      }
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
         }
         removefromcart(productId) {
            const index = this.cartitems.findIndex(cartItem => cartItem.productId === productId);
            if (index !== -1) {
               this.cartitems.splice(index, 1);}
            this.savetostorage()}
         updateDeliveryoption(productId,deliveryOptionId){
         let matchitem;
            this.cartitems.forEach((item)=>{
               if(productId===item.productId){
               matchitem=item;
               }});
         matchitem.deliveryOptionId=deliveryOptionId;
         this.savetostorage();
         }
};
const cart=new Cart('cart.oop');
const buisnessCart=new Cart('cart.buisness');
buisnessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
console.log(cart);
console.log(buisnessCart);
console.log(buisnessCart instanceof Cart);