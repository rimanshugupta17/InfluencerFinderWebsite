var express=require("express");
let app=express();
var fileuploader=require("express-fileupload");
app.use(fileuploader());

var mysql2=require("mysql2");
app.use(express.static("public"));
app.use(express.urlencoded(true));
app.listen(1000,function()
{
    console.log("server started");
})

    let config={
        host:"127.0.0.1",
        user:"root",
        password:"Rgupta@17",
        database:"june24",
        dateStrings:true
    }
    var mysql=mysql2.createConnection(config);
    mysql.connect(function(err){
            if(err==null)
                    console.log("Connected To Database Successfulllyyyy");
            else
                console.log(err.message+"  ########");
    })

app.get("/",function(req,resp){
    let path=__dirname+"/index.html";
    resp.sendFile(path);
})




app.get("/signup",function(req,resp)
{
    // resp.send(req.body);
    // console.log(req.query.semail);
    mysql.query("insert into signup1 values(?,?,?,?)",[req.query.semail,req.query.spwd,req.query.utype,1],function(err){
        if(err==null){
            resp.send("Successfull");
        }
        else{
            resp.send(err.message);
        }
    }) 
})

// app.get("/signup-process",function(req,resp)
// {
//     let semail= req.query.semail;

   
//     mysql.query("select * from signup1 where email=?",[semail],function(err,resultJsonAry){
//         if(err!=null)
//             {
//                 resp.send(err.message);
//                 return;
//             }
//         if(resultJsonAry.length==0) 
//             resp.send("Yes!! Available :-)");
//         else
//             resp.send("Sorrryy Alreadyy Taken... :-(");
//     })
// })
app.get("/login-process",function(req,resp){
    let lemail= req.query.lemail;
    let lpwd=req.query.lpwd;

    mysql.query("select * from signup1 where email=? and pwd=?",[lemail,lpwd],function(err,result){
        if(err!=null){
            resp.send(err.message);return;
        }
        if(result.length==0){
            resp.send("invalid id or pwd");return;
        }
        if(result[0].status==1){
            resp.send(result[0].utype);return;
        }
        else{
            resp.send("u r blockedddd!!");return;
        }
    })
})

app.get("/influencer-dashboard",function(req,resp){
    let path=__dirname+"/infldb.html";
    resp.sendFile(path);
    
})
app.get("/profile",function(req,resp){
    let path=__dirname+"/profile.html";
    resp.sendFile(path);
})
app.get("/inf-profile",function(req,resp)
{

    // if (req.files) {
    //     let file = req.files.ppic;
    //     let uploadPath = __dirname + "/pics/" + file.name;

    //     file.mv(uploadPath, function (err) {
    //         if (err) {
    //             return resp.status(500).send(err);
    //         }
    // resp.send(req.body);
    mysql.query("insert into profile values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.query.email,req.query.ppic,req.query.name,req.query.mobile,req.query.dob,req.query.gender,req.query.address,req.query.city,req.query.state,req.query.pincode,req.query.content,req.query.igacc,req.query.youtube,req.query.twitter,req.query.other],function(err){
        if(err==null){
            resp.send("connected");
        }
        else{
            resp.send(err.message);
        }
    }) 
}) 

app.get("/inf-booking",function(req,resp)
{
    // resp.send(req.body);
    mysql.query("insert into bookings values(?,?,?,?,?,?)",[req.query.email,req.query.event,req.query.sdate,req.query.stime,req.query.city,req.query.venue],function(err){
        if(err==null){
            resp.send("booking request sent successfullyy!!");
        }
        else{
            resp.send(err.message);
        }
    }) 
})
app.get("/admin-dash",function(req,resp){
    let path=__dirname+"/admin-dash.html";
    resp.sendFile(path);
    
})
app.get("/admin-users",function(req,resp){
    let path=__dirname+"/admin-users.html";
    resp.sendFile(path);
    
})

app.get("/fetch-all-emails",function(req,resp){
    // let semail= req.query.semail;

   
    mysql.query("select distinct email from signup1",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        // console.log(resultJsonAry);
        resp.send(resultJsonAry);    
})
})

app.get("/fetch-all",function(req,resp){
    // let semail= req.query.semail;

   
    mysql.query("select * from signup1",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }

        resp.send(resultJsonAry);    
})
})
app.get("/fetch-some",function(req,resp){
    // let semail= req.query.semail;

   
    mysql.query("select * from signup1 where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        
        resp.send(resultJsonAry);    
})
})

app.get("/del-one",function(req,resp){
    // let semail= req.query.semail;

   
    mysql.query("delete from signup1 where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }

        resp.send("deleted");    
})  
})
app.get("/clerkdashboard",function(req,resp){
    let path=__dirname+"/clerk-dashboard.html";
    resp.sendFile(path);
})

app.get("/inflfinder",function(req,resp){
    let path=__dirname+"/inf-finder.html";
    resp.sendFile(path);
})

app.get("/clientprofile",function(req,resp){
    let path=__dirname+"/client-profile.html";
    resp.sendFile(path);
})


app.post("/findcities",function(req,resp){
    mysql.query("select distinct city from profile",function(err,resultJsonAry){
        if(err!=null){
            resp.send(err.message);
        }
        resp.send(resultJsonAry);
    })
})




app.post("/findinflall",function(req,resp){

    mysql.query("select * from profile where content like ? && city = ? && name like ? ",["%"+req.query.content+"%",req.query.city,"%"+req.query.name+"%"],function(err,resultJsonAry){
        if(err!=null){
            resp.send(err.message);
            return;
        }
        resp.send(resultJsonAry);
    })

})
 app.post("/findinflcontentcity",function(req,resp)
{

   

    mysql.query("select * from profile where content like ? && city = ?  ",["%"+req.query.content+"%",req.query.city],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})
app.post("/findinflcontentname",function(req,resp)
{

   

    mysql.query("select * from profile where content like ? && name like  ?  ",["%"+req.query.content+"%","%"+req.query.name+"%"],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})
app.post("/findinflnamecity",function(req,resp)
{

   

    mysql.query("select * from profile where city = ? && name like ? ",[req.query.city,"%"+req.query.name+"%"],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})
app.post("/findinflcontent",function(req,resp)
{

   

    mysql.query("select * from profile where content like ?  ",["%"+req.query.content+"%"],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})
app.post("/findinflcity",function(req,resp)
{

   

    mysql.query("select * from profile where city=  ?  ",[req.query.city],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})
app.post("/findinflname",function(req,resp)
{

   

    mysql.query("select * from profile where name like ?  ",["%"+req.query.name+"%"],function(err,resultjsonarray){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultjsonarray);
    })

})



app.get("/event-manager",function(req,resp){
    let path=__dirname+"/event-manager.html";
    resp.sendFile(path);
})



app.get("/fetch-data",function(req,resp){
    // let semail= req.query.semail;

   
    mysql.query("select * from bookings",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }

        resp.send(resultJsonAry);    
})
})