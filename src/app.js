const path = require('path')
const express = require('express')
const hbs =require("hbs")
const app = express()
const port = process.env.PORT || 3000
const func = require('../../wether-app/functions/all.js')
const { json } = require('express')
const { geocode } = require('../../wether-app/functions/all.js')
const public_path = path.join(__dirname, '../public')
const partial_path = path.join(__dirname, './partials')
app.use(express.static(public_path))
app.set('view engine','hbs')
hbs.registerPartials(partial_path)

app.get('',(rep,res)=>{
    res.render('index',{
        title:'Weather',
        url:'/',
        name:'Yuvaraj Tuli'
    })
})

app.get('/about',(rep,res)=>{
    res.render('about',{
        title:'about',
        url:'/about',
        name:'Yuvaraj Tuli'
    })
})

app.get('/weather',(rep,res)=>{
    if(!rep.query.address){
        return res.send({error:'Please Enter The Location !'})
    }else{
        const addr = rep.query.address
        func.geocode(addr,(error,data)=>{
            if(error){
                return res.send({error})
            }
            else{
                func.weather_data(data,(error,weather_data)=>{
                    if(error){
                       return res.send({error})
                    }
                    else{
                        res.send({weather_data})
                    }
                })
            }    
        })
        
    }
})

app.get('*',(rep,res)=>{
    res.render('404',{
        title:'404',
        Error : 'sorry wrong url! select from above links',
        name:'Yuvaraj Tuli'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running '+port+" !")
})
