const request = require('postman-request');


const forecast = (latitude , longitude , callback) =>{
    let url = 'http://api.weatherstack.com/current?access_key=c0f00ab798c622856e6d1f08bb515e50&query='+latitude+','+longitude ;
      
    request({url , json : true}, (error , response)=>{
        if(error){
            callback('No network connection' , undefined);
        }else if(response.body.error){
            callback('Invalid data' , undefined);
        }else{
            const feelslike = response.body.current.feelslike;
            const temp = response.body.current.temperature;
            callback(undefined , 'It feels like'+ feelslike + '. It is '+ temp + 'degree celcius out.');
        }
    })
}

module.exports = forecast;