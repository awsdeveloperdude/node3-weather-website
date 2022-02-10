const path=require('path')
const { response } = require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./Utils/forecast')

const express=require('express')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'mohammad'
    })
})
app.get('/about',(req,res)=>{
   res.render('about',{
       title:'About Me',
       name:'Mohammad'
   })
})
app.get('/help',(req,res)=>{
res.render('help',{
    title:'Help',
    message:'Yes.I love it',
    name:'mohammad'
   })
})
app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'Address must be provided'
        })
    }
    geoCode(address,(error,{latitude,longitude,location}={})=>{
   
        if(error){
            return res.send({error})
        }
       forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send(error)
        }
        console.log(req.query.address)
        res.send({address,location,forecastData})
       
    })
})

  
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
             error:'You mustr provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404help',{
        title:'404',
        name:'Mohammad',
        err:'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohammad',
        err:'Page Not Found'
    }) 
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})