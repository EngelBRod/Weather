const request = require('request');


const forecast = ({latitude,longitude}, callback)=>{


 const token_weather = process.env.TOKEN_WEATHER   
 const url = `https://api.darksky.net/forecast/${token_weather}/${latitude},${longitude}?units=si`;

 request({ url:url,json:true }, (error,{body})=>{
     if(error){ callback('Unable to connecto to services')}
    else if(body.error){ callback('Unable to find location')  }
    else {
        callback(undefined,{summary:body.daily.data[0].summary,temperature:body.currently.temperature,humidity:body.currently.humidity,precipitation:body.currently.precipProbability,windSpeed:body.currently.windSpeed,icon:body.currently.icon});
    }
})

}

module.exports ={
    forecast
}