const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
port = process.env.PORT || 3000;

// *The app.get wont be executed for the specific ones. except index all must have html suffix
// ! Setting the Static files Path
const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

// ! Setting the Template Files Directory and hbs engine.
const viewsPaths = path.join(__dirname, '../templates/views');
app.set("view engine","hbs");
app.set("views",viewsPaths);

// ! Setting up and Registering the Partials Directory.
const partialsPath = path.join(__dirname,"../templates/partials")
hbs.registerPartials(partialsPath);

// ! Function to Retrive the Geocode and Forecast Data.
const getData = (req, res, address) =>{
    geocode(address,(error,{name,longitude,latitude} = {})=>{
        if (error){
            return res.send({
                error
            });
        };
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({
                    error
                });
            };
            res.send({
                name,
                address,
                forecast: forecastData
            });
        });
    });
};


// ! Rendering the Template Files as per the Routes.
app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather",
        name: "Abhilash"
    });
});

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About Page",
        name: "Robot"
    });
});

app.get("/help",(req,res)=>{
    res.render("help",{
        name: "Helper",
        title: "Help Page"
    });
});

app.get('/weather',(req, res)=>{
    const address = req.query.address;
    if (!address){
        return res.send({
            error: "You must provide the address query!"
        });
    };
    getData(req, res, address);
});

// ! Creating the 404 Error Pages.
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title: "404 Error Page",
        name: "Abhilash",
        errorMsg: "Help Article Not Found!"
    });
});

app.get("*",(req,res)=>{
    res.render("404",{
        title: "404 Error Page",
        name: "Abhilash",
        errorMsg: "Page Not Found!"
    });
});


app.listen(port,()=>{
    console.log("Server listening on port",3000);
});