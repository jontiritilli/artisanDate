const axios = require('axios');
const yelp = require('yelp-fusion');
const { sqlcredentials, crypt, googleKey, yelpKey } = require('../config/credentials');

const client = yelp.client(yelpKey);
const googleMaps = require('@google/maps').createClient({
    key: googleKey
});

const mysql = require('mysql');
const connection = mysql.createConnection(sqlcredentials);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected to db");
});

module.exports = (app,  path) => {
    app.post('/addCompletedDate', (req, res) => {
        let request = testObject;
        var events = function () {
            const { name, id, location, url, image_url, coordinates } = request.events;
            let query = 'INSERT INTO locations (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)';
            let table = 'locations';
            let inserts = ['name', 'city', 'address', 'yelpID', 'primaryPhoto', 'lat', 'lng', name, location.city, location.address1, id, image_url, coordinates.latitude, coordinates.longitude];
            let sql = mysql.format(query, inserts);
            connection.query(sql, (err, results, fields) => {
                if (err) return next(err);
                const output = {
                    success: true
                }
                console.log('events added')
            });
        }();

        var food = function () {
            const { name, id, location, url, image_url, coordinates } = request.food;
            let query = 'INSERT INTO locations (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)';
            let table = 'locations';
            let inserts = ['name', 'city', 'address', 'yelpID', 'primaryPhoto', 'lat', 'lng', name, location.city, location.address1, id, image_url, coordinates.latitude, coordinates.longitude];
            let sql = mysql.format(query, inserts);
            connection.query(sql, (err, results, fields) => {
                if (err) next(err);
                const output = {
                    success: true
                };
                console.log('food added')
            });
        }();

        var drinks = function () {
            const { name, id, location, url, image_url, coordinates } = request.drinks;
            let query = 'INSERT INTO locations (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)';
            let table = 'locations';
            let inserts = ['name', 'city', 'address', 'yelpID', 'primaryPhoto', 'lat', 'lng', name, location.city, location.address1, id, image_url, coordinates.latitude, coordinates.longitude];
            let sql = mysql.format(query, inserts);
            connection.query(sql, (err, results, fields) => {
                if (err) next(err);
                const output = {
                    success: true
                };
                console.log('drinks added')
            });
        }()
    });

    //results endpoint
    app.post('/api/getEverything', (req, res) => {
        var output = {
            events: null,
            food: null,
            drinks: null
        };
        var temp = {};
        var zip = req.body.zip;
        var ts = Math.floor(new Date().getTime() / 1000);

        var places = client.search({
            term: 'activity',
            // category: 'comedy',
            location: zip,
            radius: 8000,
            rating: "5",
            sort_by: "distance",

            sort_by: "rating",
            // sort_by: "review_count",
            limit: 5
        })
            .then(
                response => response.jsonBody.businesses
            ).catch(err =>
                res.status(400).send(err)
            )


        var events = axios({
            url: 'https://api.yelp.com/v3/events',
            headers: { 'Authorization': 'Bearer xkA9Hp5U6wElMNSf3MGcF_L6R0Io18O69Xsth-G-OsV50MIfoVyiWfQmmQgFHpmFvgFatiEW8sppCiAVWrfRgpy1-pNH905xO-Okl1TV6nIqp_RXCSDmvJFOEqKLWnYx' },
            params: {
                location: zip,
                radius: 8000,
                limit: 10,
                sort_on: 'popularity',
                start_date: ts
            },
            responseType: 'json'
        })
            .then(
                response => response.data.events
            ).catch(err =>
                res.status(400).send(err)
            )

        var food = client.search({
            term: 'restaurant',
            location: zip,
            radius: 8000,
            limit: 10
        })
            .then(
                response => response.jsonBody.businesses
            ).catch(err =>
                res.status(400).send(err)
            )

        var drinks = client.search({
            term: 'bars',
            location: zip,
            radius: 8000,
            limit: 10,
            rating: "3.5, 4",
            sort_by: "rating",
            limit: 10
        })
            .then(
                response => response.jsonBody.businesses
            ).catch(err =>
                res.status(400).send(err)
            )

        places.then(v => {
            temp.places = v;
        })
        .catch(err =>
            res.status(400).send(err)
        );

        events.then(v => {
            temp.events = v;
        })
        .catch(err =>
            res.status(400).send(err)
        );

        food.then(v => {
            output.food = v;
        })
        .catch(err =>
            res.status(400).send(err)
        );

        drinks.then(v => {
            output.drinks = v;
        })
        .catch(err =>
            res.status(400).send(err)
        );

        var p = Promise.all([places, events, food, drinks]);

        p.then(() => {
            output.events = temp.places.concat(temp.events);
            if(output.events.length > 0 && output.food.length > 0 && output.drinks.length > 0){
                res.send(output);
            }
            res.status(400).send(
                {
                    message: 'We cannot find any locations with this zip code. Please try again.'
                }
            )
        }).catch(err =>
            res.status(500).send(
                {
                    message: 'There were errors on the server',
                    error: err
                }
            )
        );
    });
    //google places call for food
    app.get('/getDinner', (req, res)=>{
        axios({
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            params: {
                key: 'AIzaSyBQzvigXgukz_X2Ii05aUywXroY4776EFE',
                location: '33.665242, -117.7490656',
                keyword: 'restaurant',
                rankby: 'distance'
            },
            responseType: 'json'
        })
            .then(function(response){
                var results = response.data.results;
                res.json(results[3].photos[0].photo_reference);
            })
            .catch(err =>
            res.status(400).send(err)
            )
    });

    app.get('/getEvents', (req, res) => {
        axios({
            url: 'https://api.yelp.com/v3/events',
            headers: {'Authorization': 'Bearer xkA9Hp5U6wElMNSf3MGcF_L6R0Io18O69Xsth-G-OsV50MIfoVyiWfQmmQgFHpmFvgFatiEW8sppCiAVWrfRgpy1-pNH905xO-Okl1TV6nIqp_RXCSDmvJFOEqKLWnYx'},
            params:{
                location: 90742,
                radius: 8000,
                limit: 10,
                sort_on: 'popularity',
                start_date: 1519104023
            },
            responseType: 'json'
        })
            .then(function(response){
                var results = response.data.events;
                var output = [];
                for(var i = 0; i < results.length; i++){
                    var img = '<img src='+results[i].image_url+' height="300" width="300">';
                    output.push(img);
                }
                res.send(output.join('\n'));
            })
            .catch(function(err){
                console.log(err);
            })
    });

    app.post('/api/getOneBusiness', (req, res) => {
        const {type, id}= req.body;
        axios({
            url: `https://api.yelp.com/v3/${type}/${id}`,
            // url: `https://api.yelp.com/v3/businesses/four-sons-brewing-huntington-beach-5`,
            headers: {'Authorization': 'Bearer xkA9Hp5U6wElMNSf3MGcF_L6R0Io18O69Xsth-G-OsV50MIfoVyiWfQmmQgFHpmFvgFatiEW8sppCiAVWrfRgpy1-pNH905xO-Okl1TV6nIqp_RXCSDmvJFOEqKLWnYx'},
            responseType: 'json'
        })
            .then(function(response){
                res.send(response.data);
            })
            .catch(err =>
                res.status(400).send(err)
            )
    })

app.get('/getdata', (req, res) => {
    const address = {
        address: '92618'
    };
    googleMaps.geocode(address, function(err, response){
        if (!err) {
            let lat = response.json.results[0].geometry.location.lat;
            let lng = response.json.results[0].geometry.location.lng;
        }
        res.json(response.json.results[0].geometry.location);
    });

})
};