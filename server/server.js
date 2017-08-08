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

/**
 * @api {get} /artists Get all artists
 * @apiName GetArtists
 * @apiGroup Artists
 *
 * @apiSuccess {String} List of artists.
 */
app.get('/artists', function (req, res) {
    res.send(artists);
});

/**
 * @api {get} /artists/:id Get Artist information
 * @apiName GetArtist
 * @apiGroup Artists
 *
 * @apiParam {Number} id Artist unique ID.
 *
 * @apiSuccess {String} name of the Artist.
 * @apiSuccess {String} id  of the Artist.
 */
app.get('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
});

/**
 * @api {post} /artists/:id Post Artist information
 * @apiName PostArtist
 * @apiGroup Artists
 *
 * @apiParam {Number} id Artists unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the Artists.
 * @apiSuccess {String} lastname  Lastname of the Artists.
 */
app.post('/artists', function (req, res) {
    var artist = {
        id: Date.now(),
        name: req.body.name
    };
    db.collection('artists').insert(artist, function (err, result) {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        res.send(artist);
    });
});

// app.post('/artists', function (req, res) {
//     var artist = {
//         id: Date.now(),
//         name: req.body.name
//     };
//     artists.push(artist);
//     console.log(req.params);
//     res.send(artist);
// });

/**
 * @api {put} /artists/:id Update Artist information
 * @apiName PutArtist
 * @apiGroup Artists
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the Artists.
 * @apiSuccess {String} lastname  Lastname of the Artists.
 */
app.put('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    artist.name = req.body.name;
    res.sendStatus(200);
});

/**
 * @api {delete} /artists/:id Delete Artist
 * @apiName DeleteArtist
 * @apiGroup Artists
 *
 * @apiParam {Number} id Artists unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the Artists.
 * @apiSuccess {String} lastname  Lastname of the Artists.
 */
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
//         console.log('Fake API app started');
//         console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//     });
// });