const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ec82c1753c8d4f2e80d4b6d5461deedf'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(
            {
            id: "a403429f2ddf4b49b307e318f00e528b",
            version: "34ce21a40cc24b6b96ffee54aabff139",
            },
            req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to work with API')) 
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0].entries))
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};