const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
   console.log(xhr.response);
})
xhr.open('get','http://localhost:3000/products');
xhr.send();
