//IMPORTS
const path = require('path');
const  express = require('express');
const hbs = require('hbs');
const {forecast} = require('./utils/forecast');
const {geocode}= require('./utils/geocode');




const app = express()

//APP PORT

const port = process.env.PORT

//DEFINE PATHS FOR EXPRESS CONFIG 

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

//SETUP STATIC DIRECTORY TO SERVER 
app.use(express.static(publicDirectoryPath))


//ROUTES

//HOME ROUTE
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Engel Rodriguez'
    })
})
//ABOUT ROUTE
app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:'about me',
        name:'Engel Rodriguez'

    })
})
//HELP ROUTE
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        help:'funciona',
        name:'Engel Rodriguez'
    })
})

//WEATHER ROUTE

app.get('/weather', (req,res)=>{



    if(!req.query.address){
        return res.send({
            error:'No address provide'
        })
    }

    geocode(req.query.address,(error,data={})=>{

        if(error){
            return res.send({error})
        }
            
    
    forecast(data, (error, forecastData) => {
                if(error){
                    return console.log(error)
                }
                res.send(
                    {
                        location:data.location,
                        forecast:forecastData.summary,
                        temperature:forecastData.temperature,
                        humidity:forecastData.humidity,
                        precipitation:forecastData.precipitation,
                        windSpeed:forecastData.windSpeed,
                        icon:forecastData.icon

                    }
                )
              })
    })

   
})

//PRODUCTS ROUTE

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//HELP ROUTE
app.get('/help/*',(req, res)=>{
    res.render('error',{
        errorMessage:'Help article not found'
    })
})
//NOT FOUND ROUTE
app.get('*',(req,res)=>{
    
    res.render('error',{
        errorMessage:'404 not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port 3001.${port}`)
});