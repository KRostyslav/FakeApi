/**
 * Created by krostyslav
 */

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var artists = [
    {
        id: 1,
        name: 'Metalica'
    },
    {
        id: 2,
        name: 'Nirvana'
    },
    {
        id: 3,
        name: 'Deep Purple'
    },
    {
        id: 4,
        name: 'R.E.M.'
    },
    {
        id: 5,
        name: 'Iron Maiden'
    }
];

app.get('/', function (req, res) {
    res.send('Hello Fake API');
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

app.listen(process.env.PORT || 3012, function () {
    console.log('Fake API app started');
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// MongoClient.connect('mongodb://localhost:27017/fakeApi', function (err, database) {
//     if (err) {
//         return console.log(err);
//     }
//     db = database;
//     app.listen(process.env.PORT || 3012, function () {
//         console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//     });
// });