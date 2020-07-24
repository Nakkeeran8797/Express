
//signup-page

exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;

      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};
 
//login page
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){

      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";    

      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};


//dashboard page
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('user is'+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};


//logout functionality
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   });
};


//reset script

exports.reset=function(req,res)
{
   res.render('reset.ejs',{message: 'submit your number here !'});
};


//user details
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};


//edit users details
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";  

   db.query(sql, function(err, result){  
      res.render('edit_profile.ejs',{data:result});
   });

};


//edit
exports.edit=function(req,res){

   var userId = req.session.userId;

   var name= res.ename;
   var mob= res.emobile;

   console.log(name, mob);

   var sql="UPDATE first_name, mob_no FROM `users` SET first_name = '"+name+"', mob_no='"+mob+"' WHERE `id`='"+userId+"'";

   db.query(sql, function(err, result){  
      res.render('edit.ejs',{data:result});
   });

};



//blog
exports.article = function(req, res){

   message = '';
   if(req.method == "POST")
   {

   var title     =    req.body.title; 
   var content   =    req.body.content;
   var author    =    req.body.author;

   var sql = "INSERT INTO `articles`(`title`,`content`,`author`) VALUES ('" + title + "','" + content + "','" + author + "')";

   var query = db.query(sql, function(err, result) {

      if (err) {

         throw err;
      }

      message = "Succesfully! Your Post Uploaded."  ;
      res.render('article.ejs',{message: message});

   });
} 

else
{
   res.render('article');
}


};

//indi-blog
exports.individual = function(req, res){


   var sql2 = "SELECT *FROM `articles`;";

   db.query(sql2, function(err, result){  

      if(err) throw err;

      res.render('individual.ejs',{articles:result});

   });
   

};