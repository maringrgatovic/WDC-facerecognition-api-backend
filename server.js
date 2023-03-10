const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cf02ej02i3mmhmdoqtqg-a',
      port: 5432,
      user : 'marin',
      password : 'GlBplYOCQqNP8kOcDqyaxZf8ZHGCW5rT',
      database : 'smartbrain_ypcq'
    }
});

db.select('*').from('users')
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));


app.get('/', (req, res) => { res.send('it is working') });

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
    console.log(`app is running on port 3000`);
})
