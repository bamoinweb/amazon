export let deliveryOptions=[{
  idOP:'1',
  deliveryDays:7,
  priceCent:0
},{
  idOP:'2',
  deliveryDays:3,
  priceCent:499
},{
  idOP:'3',
  deliveryDays:1,
  priceCent:999
}];
export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:5,
    deliveryOptionId:'1'
  },{productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }];
};

export function savetostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};
export function updateDeliveryoption(productId,deliveryOptionId){
  let matchitem;
    cart.forEach((item)=>{
      if(productId===item.productId){
        matchitem=item;
      }});
  matchitem.deliveryOptionId=deliveryOptionId;
  savetostorage();
};
export let orders=JSON.parse(localStorage.getItem('orders'))||[];
export function addorders(order){
  orders.unshift(order)
  ordersavetostorage();
}
function ordersavetostorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}