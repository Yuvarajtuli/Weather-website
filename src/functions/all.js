const request = require("request")
const col = require('chalk')

const weather_data = (geocode,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=446e829e53b5c1a29d067f7a93b5f5c7&query='+geocode.latitude+','+geocode.longitude
    request({url,json:true}, (error,responce)=>{
        if(error){
            callback('Error weather!',undefined)
        }
        else if(responce.body.current.length === 0){
            callback('Error in weather finding',undefined)
        }
        else{
            const getdata = ({
                weather:'The temprature outside is : '+ responce.body.current.temperature + ' degree',
                latitude: geocode.latitude,
                longitude: geocode.longitude})
            callback(undefined,getdata)
        }
        })
}



const geocode = (address,callback)=>{
    const url_latlong = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieXV2YXJhanR1bGkiLCJhIjoiY2trNmd2c2lnMDN2NTJ1bXZwbmw3MW1zdCJ9.LbEaukWpJJsa7pd_WCp4Sw&limit=1'
    request({url : url_latlong,json:true},(error,responce)=>{
        if (error) {
            callback('Please enter a location',undefined)
        }
        else if(responce.body.features.length === 0){
             callback('Enter an appropriate location',undefined)
        }else{
        callback(undefined,{
            latitude: responce.body.features[0].center[1],
            longitude: responce.body.features[0].center[0],
            location: responce.body.features[0].place_name
        })
        }
    })
}

module.exports = {
    geocode : geocode,
    weather_data : weather_data
}