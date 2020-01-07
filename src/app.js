//IMPORTS
const path = require('path');
const  express = require('express');
const hbs = require('hbs');
const {forecast} = require('./utils/forecast');
const {geocode}= require('./utils/geocode');




const app = express()

//App port
const port = process.env.PORT

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//ROUTES

//Home route
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Engel Rodriguez'
    })
})
//About route
app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:'about me',
        name:'Engel Rodriguez'

    })
})
//Help route
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        help:'funciona',
        name:'Engel Rodriguez'
    })
})
// app.get('',(req,res)=>{
//     res.send('Hello express!')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Andrew',
//         age:27
//     }
//     )
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// });

//Weather route
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

//Products route
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

//Help route
app.get('/help/*',(req, res)=>{
    res.render('error',{
        errorMessage:'Help article not found'
    })
})
//Not found route
app.get('*',(req,res)=>{
    
    res.render('error',{
        errorMessage:'404 not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port 3001.${port}`)
});