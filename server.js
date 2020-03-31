const express = require('express');
const app = express();
const hbs = require('hbs');
require ('./hbs/helpers');

const port = process.env.PORT || 3200;

app.use(express.static(__dirname + '/public'));


// express hbs
hbs.registerPartials(__dirname + '/views/parcials');
app.set('view engine', 'hbs');

app.get('/', (req, res) =>{

  res.render('home');
});


  app.get('/pilares', (req, res) =>{

    res.render('pilares');
  
});

  app.get('/valores',(req,res) =>{

    res.render('valores');
    });

  app.get('/elementos',(req,res) =>{

    res.render('elementos');
    });
  
  app.get('/ceremonias',(req,res) =>{
    res.render('ceremonias');
  });

  app.get('/roles',(req,res) =>{
    res.render('roles');
  });

  app.get('/artefactos',(req,res) =>{
    res.render('artefactos');
  });

  app.get('/whois',(req,res) =>{
    res.render('whois');
  });
    

app.listen(port,()=>{
    console.log(`El puerto ${ port } se esta escuchando`)
});