console.log('It is client side javascript');

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.forecast);
//             console.log(data.location);
//         }
//     })
// })
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const button = document.querySelector('form');
const input = document.querySelector('input');

button.addEventListener('submit' , (e)=>{
    e.preventDefault();

    const inputVal = input.value;

    msg2.textContent = 'loading...'
    msg1.textContent = '';
    
     fetch('http://localhost:3000/weather?address='+ inputVal).then((response)=>{
         response.json().then((data)=>{
             if(data.error){
                //  console.log(data.error);
                msg1.textContent = data.error;
                msg2.textContent = '';
             }else{
                //  console.log(data.forecast + '\n'+ data.location);
                msg2.textContent = data.forecast + '\n'+ data.location;
             }
         })
     })
})