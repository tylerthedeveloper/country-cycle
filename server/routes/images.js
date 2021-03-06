const express = require('express');
const router = express.Router();
//TODO: validation-utils
const validation = require("../validation/utils");
const imageValidation = require("../validation/images");
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

router.get('/albums', function (req, res, next) {
    // axios(`https://api.smugmug.com/api/v2/user/johnschwenck!albums?_accept=application%2Fjson&APIKey=CgHshKMZrJWBrXCQGHrs4CsqbXVtcvnC`, {
    axios(`http://api.smugmug.com/api/v2/user/johnschwenck!albums?_accept=application%2Fjson&APIKey=CgHshKMZrJWBrXCQGHrs4CsqbXVtcvnC`, {
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //     "Access-Control-Allow-Origin": "*",
        // }
    })
        .then(result => result.data)
        .then((response) => {
            console.log(response.Response.Album);
            res.status(res.statusCode).send(response.Response.Album)
            // res.status(200).json({ res: "hello from space" })
        })
        .catch((err) => console.log(err));
        // .catch((err) => res.status(res.statusCode).send(err));
});



// const storage = multer.diskStorage({
//     destination: 'some-destination',
//     filename: function(req, res, )
// })
// const parser = multer();
var upload = multer({ dest: '/tmp/' });

// TODO: Error handling
/**
 * TODO: Create new album ???
 */

/**
 * Add new image to album by UserID and album
 */
// router.post('/:userID', function(req, res, next) {
router.post('/', upload.single("file"), (req, res) => {
    // const userID = req.params['userID'];
    const body = req.body;
    console.log('data', body)
    console.log(req.file)
    console.log(req.file.path)
    var formData = new FormData();
    formData.append("file1", fs.createReadStream(req.file.path), req.file.filename);
    // formData.append('data', req.file.filename);
    // for (var key of formData) {
    //     // console.log(data);
    //     formData.append(key, formData[key]);
    // }
    // for (var data in formData) {
    //     console.log(data);
    // }
    // console.log(formData.getLength())
    axios({
        url: 'http://localhost:8081/upload',
        data: formData,
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
        }
    })
        .then((res) => //res.status(res.statusCode).send(res))
        {
            console.log(res)
        })
        .catch((err) => //res.status(res.statusCode).send(err));
        {
            console.log(err)
        })
});

/**
 * Get images from album by UserID and album
 */
router.post('/:userID/:album', function (req, res, next) {
    const userID = req.params['userID'];
    const album = req.params['album'];
    fetch('TODO: URL HERE (e.g. something/userID/album')
        .then((res) => //res.status(res.statusCode).send(res))
        {
            console.log(res)
        })
        .catch((err) => //res.status(res.statusCode).send(err));
        {
            console.log(err)
        })
});

/**
 * Get a specific images from album by UserID and album and imageID
 */
router.post('/:userID/:album/:imageID', function (req, res, next) {
    const userID = req.params['userID'];
    const imageID = req.params['imageID'];
    const album = req.params['album'];
    fetch('TODO: URL HERE (e.g. something/userID/album/imageID')
        // TODO: What type of data is sent
        .then((res) => res.status(res.statusCode).send(res))
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
