const express =            require('express'),
      mongoose =           require('mongoose'),
      passport =           require('passport'),
      bodyParser =         require('body-parser'),
      LocalStrategy =      require('passport-local'),
      localMongoose =      require("passport-local-mongoose")

const app = express();

let USER = require('./models/user.js');
 /* VERY VERYYY IMPORTANT */
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(require('express-session')({
  secret : " Hey this is my name , which is Aniket",
  resave : false,
  saveUninitialized : false
}));
/* THESE ARE IMPORTANT FOR PASSPORT JS */
passport.use(new LocalStrategy(USER.authenticate()));
app.use(passport.initialize()); // init
app.use(passport.session()); // initialize the session
passport.serializeUser(USER.serializeUser());
passport.deserializeUser(USER.deserializeUser());
mongoose.connect("mongodb://localhost/save_Password",{useNewUrlParser : true });

 /* VERY VERY IMPORTANTTTT */





app.get('/', (req,res) => {
  res.render('index');
});

app.get('/secret' , isLoggedIn , (req,res) =>{
    res.render("secret");
});

// auth routes

app.get('/signup', (req,res) => {

    res.render("register");
});

app.post('/signup', (req,res) =>{

   USER.register(new USER({username : req.body.username}),req.body.password , (err,user) => {
     if(err){
       console.log(err);
       return res.render("register");
     }
     else {
       passport.authenticate("local")(req,res, () =>{
          res.redirect("/secret");
       });
     }
   });
});


// login

app.get('/signin', (req,res) =>{
  res.render("login");
});

 app.post('/signin',passport.authenticate("local",{
  successRedirect : "/secret",  //middleware : some code that runs before the real code runs
  failureRedirect : "/signup"

}),(req,res)=>{});

// logout

app.get('/logout', (req,res) =>{

      req.logout();
      res.redirect('/');
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/signin');
};




app.listen(3000, () => {
   console.log("server running on port 3000");
});
