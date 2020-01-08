const wform=document.querySelector('form');
const info= document.querySelector('#info');
const locationD= document.querySelector('#location');
const temperatureInfo= document.querySelector('#temperature_info');
const humidityInfo= document.querySelector('#humidity_info');
const windSpeedInfo= document.querySelector('#windSpeed_info');
const precipitationInfo =document.querySelector('#precipitation_info');
const summary =document.querySelector('#summary_info');
const dayCondition= document.querySelector('#day_condition')


wform.addEventListener('submit',processForm);

const p= document.createElement('p');
const h2= document.createElement('h2');
const img=document.createElement('img');

img.classList.add('icon_condition')


function processForm(e){

    e.preventDefault();
    const location= document.querySelector('input');
    console.log(location.value);
    fetch(`/weather?address=${location.value}`)
    .then((response)=>{
    return response.json()
    }).then((data)=>{
    console.log(data);
   const wlocation= data.location;
   const wforecast= data.forecast;
   const temperature= data.temperature;
   const windSpeed=data.windSpeed.toFixed(1);
   const summary =data.summary;
   const humidity =data.humidity.toFixed(1);
   const precipitation=data.precipitation.toFixed(1);
   const icon= data.icon;
   img.src=`./img/${icon}.png`
      
                   
   if(wlocation!==undefined){

    locationD.innerHTML=`${wlocation}`
   temperatureInfo.innerHTML=`${temperature} C`
   humidityInfo.innerHTML=`${humidity * 100} %`
   windSpeedInfo.innerHTML=`${windSpeed} k/h`
   precipitationInfo.innerHTML=`${precipitation * 100} %`
   p.innerHTML=` ${wforecast}`;
   info.appendChild(h2)
   info.appendChild(p);
   dayCondition.appendChild(img)

   }else{
    locationD.innerHTML=`Please, Selecte a valid location`
    
    temperatureInfo.innerHTML=``
    humidityInfo.innerHTML=``
    windSpeedInfo.innerHTML=``
    precipitationInfo.innerHTML=``
   ;
   }
   
   
   
    }).catch((error)=>{
    console.log(error);
    })

}











