
//set up the server
const express = require( "express" );
const app = express();
const { auth } = require('express-openid-connect');
const helmet = require("helmet"); 
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'cdnjs.cloudflare.com']
      }
    }
})); 


const port = process.env.PORT || 8080;
const logger = require("morgan");
const db = require('./db/db_pool');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  };

const { requiresAuth } = require('express-openid-connect');

const dotenv = require('dotenv');
dotenv.config();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


// define middleware that logs all incoming requests
app.use(logger("dev")); 

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
})


// req.isAuthenticated is provided from the auth router
app.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
  

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
});

// define a route for the stuff inventory page
const read_stuff_all_sql = `
    SELECT 
        id, item, type, format(price, 2) as price
    FROM
        stuff
    WHERE 
        userid = ? 
`

// define a route for the stuff inventory page
app.get( "/stuff", requiresAuth(), ( req, res ) => {
    db.execute(read_stuff_all_sql, [req.oidc.user.email], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.render('stuff', { inventory : results });
        }
    });
} );

// define a route for the item detail page
const read_item_sql = `
    SELECT 
        id, item, format(price, 2) as price, type, description 
    FROM
        stuff
    WHERE
        id = ?
`

// define a route for the item detail page
app.get( "/stuff/item/:id", requiresAuth(), ( req, res ) => {
    db.execute(read_item_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = results[0]; // results is still an array
            // data's object structure: 
            //  { item: ___ , price:___ , description: ____ }
            res.render('item', data);
        }
    });
});




const read_type_sql = `
    SELECT
        id, item, format(price, 2) as price, type, description
    FROM 
        stuff
    WHERE 
        type = ?
        
`

app.get("/stuff/types/:type", requiresAuth(), ( req, res ) => {
    db.execute(read_type_sql, [req.params.type], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.render('stuff', { inventory : results, type : req.params.type });

            //*let typeData = results; // results is still an array
            // data's object structure: 
            //  { item: ___ , price:___ , description: ____ }
            //*res.render('types', typeData);
        }
            
    })

})

// define a route for item DELETE
const delete_item_sql = `
    DELETE 
    FROM
        stuff
    WHERE
        id = ?
`
app.get("/stuff/item/:id/delete", requiresAuth(), ( req, res ) => {
    db.execute(delete_item_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/stuff");
        }
    });
})

// define a route for item DELETE
const delete_item_type_sql = `
    DELETE 
    FROM
        stuff
    WHERE
        type = ?
        id = ?
`
app.get("/stuff/types/:type/:id/delete", requiresAuth(), ( req, res ) => {
    db.execute(delete_item_sql, [req.params.type], [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/stuff/types/:type");
        }
    });
})


// define a route for item Create
const create_item_sql = `
    INSERT INTO stuff
        (item, price, type, userid)
    VALUES
        (?, ?, ?, ?)
`
app.post("/stuff", requiresAuth(), ( req, res ) => {
    db.execute(create_item_sql, [req.body.name, req.body.price, req.body.type, req.oidc.user.email], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (id) of the newly inserted element.
            res.redirect(`/stuff/item/${results.insertId}`);
        }
    });
})


// define a route for item UPDATE
const update_item_sql = `
    UPDATE
        stuff
    SET
        item = ?,
        price = ?,
        type = ?, 
        description = ?
    WHERE
        id = ?
`
app.post("/stuff/item/:id", requiresAuth(), ( req, res ) => {
    db.execute(update_item_sql, [req.body.name, req.body.price, req.body.type, req.body.description, req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/stuff/item/${req.params.id}`);
        }
    });
})


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );









