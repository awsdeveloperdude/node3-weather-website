const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=05694ecdc3db2567036bb783e035fdeb&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
         if(error){
             callback('Unable to connect to weather service',undefined)
         }else if(body.error){
            callback('Unable to forcast weather for this location',undefined)
         }else{
             callback(undefined,{
                 temperature:body.current.temperature
             })
         }
    })
}

module.exports=forecast