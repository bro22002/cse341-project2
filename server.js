const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require("./db/database")
const app = express();
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-key"
        );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
    })

    .use(cors({ methods:  ['GET', 'POST', 'PUT', 'DELETE']})) // For preflight request
    .use(cors({ origin: '*'}))
    .use("/", require("./routes"));

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, 
    (accessToken, refreshToken, profile, done) => {
        // console.log(`Got a new user with username ${profile.username}`);
        // let user = {
        //     githubId: profile.id,
        //     token: accessToken,
        //     name: profile._json.name,
        //     email: profile._json.email,
        //     avatarUrl: profile._json.avatar_url,
        // };
        // User.findOneAndUpdate({githubId: user.githubId}, user, {upsert:true}).exec()
        //   .then(()=>{done(null, user)}).catch(err=>console.error(err));
          return done(null, profile)
    }));
    
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        // console.log(req.user);
        req.session.user = req.user;
        res.redirect('/');
});

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



app.use(async (err, req, res, next) => {

    console.error(`Error at: "${req.originalUrl}": ${err.message}`)
    if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
    // res.render("errors/error", {
    //   title: err.status || 'Server Error',
    //   message,
    //   nav
    // })
    res.send(message)
    // res.status(status).send(message)
    // res.render("/", {message})
  })

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)})
    }
})
