const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;

const views_dir = path.join(__dirname,'../views') 
const publicpath = path.join(__dirname,'../Public')
app.use(express.static(publicpath))

app.set('view engine','ejs')
app.set('views',views_dir)

app.get('/',(req,res)=>{
    res.render('index')
}) 
app.get('/weather',(req,res)=>{
    res.render('weather')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port,(err)=>{
    console.log(`server running`)
})



