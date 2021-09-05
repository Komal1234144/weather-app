const express = require('express');
const app = express();
const path = require('path');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');
const port = process.env.PORT ||3000;

const publicDirectoryPath = path.join(__dirname, '../static');

const viewsPath = path.join(__dirname , '../public/views');

app.set('view engine', 'ejs');
app.set(  'views' , viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('/' , (req,res)=>{
    res.render('index' , {title: 'Weather', path : '/'});
}); 

app.get('/about' , (req,res)=>{
    res.render('about-us', {
      title : 'About me',
      path : '/about'
    })
});

app.get('/help', (req,res)=>{
  res.render('help' , {title : 'help page' , path : '/help'});
})

app.get('/weather' , (req,res)=>{
  if(!req.query.address){
    return res.send({error : 'you must provide an address'});  
  }
    geocode(req.query.address , (error , geoData)=>{
      if(error){
        return res.send({error : error})
      }
      forecast(geoData.latitude , geoData.longitude , (error , forecastData)=>{
        if(error){
          return res.send({error : error});
        }
        res.send({
          forecast : forecastData,
          location : geoData.location,
          address : req.query.address
        });
      })
    })
  
})


app.get('/help/*' , (req,res)=>{
  res.render('404' , {title : '404 help page' , path : '/help/*' , para : 'No such help article exists'});
})


app.get('*' , (req,res)=>{
  res.render('404', {title : '404 page' , path : '*' , para : 'No such page exists on this website'});
})



app.listen(port , ()=>{
  console.log('listening on port no. '+ port);
});

