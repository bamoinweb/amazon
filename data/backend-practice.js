const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
   console.log(xhr.response);
})
xhr.open('get','https://amazon-backend-1-konm.onrender.com/products');
xhr.send();
