const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    let firstNmae = req.body.firstName;
    let lastName = req.body.lastName
    let email = req.body.email;

    let data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstNmae,
                    LNAME: lastName
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);
    console.log(req.body.firstName);
    let options = {
        url:"https://us5.api.mailchimp.com/3.0/lists/85fdc5de08",
        method: "POST",
        headers:{
            "Authorization": "adityashukla266 4b7b958897d6b8b2fcc3bc7ea335e540-us5"
        },
        body:jsonData
    }
    
    request(options, function(error, response ,body){
        if(error)
        {
            res.sendFile(__dirname+"/failure.html");
            //console.log(error);
        }
        else{
            if(response.statusCode === 200){
                //onsole.log(response.statusCode);
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at 3000");
});

// 4b7b958897d6b8b2fcc3bc7ea335e540-us5
// 85fdc5de08