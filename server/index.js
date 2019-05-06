import express  from 'express';
import path  from 'path';
import bodyParser  from 'body-parser';
import session  from 'express-session';
import cors  from 'cors';
import mongoose  from 'mongoose';
import routes from './index.route';

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-try', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-test');
mongoose.set('debug', true);

app.get('/', (req, res) => {
    res.send("Server is running.")
});

app.get('/test', async(req, res) => {
    res.send("test success");
})

app.use('/api', routes);
app.listen(3002, () => console.log('Server running on http://localhost:3002/'));