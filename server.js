/**
 * Created by krostyslav on 12.06.17.
 */
const config = {
    username: 'kxmmvragqrygfi',
    password: '39c358751cc54f72c3e1f9ad14a50cfbeaa5daa4ebc3d079baa584e1164b74a5',
    host: 'ec2-23-21-246-11.compute-1.amazonaws.com',
    port: '5432',
    database: 'dfr4velvir2hae'
};

const URI = 'postgres://kxmmvragqrygfi:39c358751cc54f72c3e1f9ad14a50cfbeaa5daa4ebc3d079baa584e1164b74a5@ec2-23-21-246-11.compute-1.amazonaws.com:5432/dfr4velvir2hae';

var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.get('/db', function (request, response) {
    pg.connect(process.env.URI, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('pages/db', {results: result.rows} ); }
        });
    });
});


// var client = new pg.Client(URI);
// client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
    {
        id: 1,
        name: 'Metalica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
];

app.get('/', function (req, res) {
    res.send('Hello API');
});

app.get('/artists', function (req, res) {
    res.send(artists);
});

app.get('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
});

app.post('/artists', function (req, res) {
    var artist = {
        id: Date.now(),
        name: req.body.name
    };
    artists.push(artist);
    console.log(req.params);
    res.send(artist);
});

app.put('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    artist.name = req.body.name;
    res.sendStatus(200);
});

app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id)
    });
    res.sendStatus(200);
});

// app.listen(3012, function () {
//     console.log('API app started');
// });

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});