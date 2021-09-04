const request = require('postman-request');

const geocode = (address , callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia29tYWwtMDUiLCJhIjoiY2tzeTlibjlyMW5peTMxbHN5N21nY3pneSJ9.CYcpz-_skE6A8vuzUB390A';

    request({url , json : true} , (error , response)=>{
        if(error){
            callback('No network connection' , undefined);
        }else if(response.body.features.length ===0){
            callback('Not a valid addresss' , undefined);
        }else{
            callback(undefined , 
                {  latitude : response.body.features[0].center[1],
                    longitude : response .body.features[0].center[0],
                    location : response.body.features[0].place_name
                });
        }
    })
}

module.exports = geocode;
