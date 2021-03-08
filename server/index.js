
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    res.header('Authorization', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires'
    );
    next();
});
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH')
            .status(200)
            .json('Access-Control-Allow-Methods: ' + 'GET, POST, OPTIONS, DELETE, PATCH');
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// authentiction
app.post('/login/', (req, res) => {
    const body = req.body;
    console.log('login called ==> ', body)
    res.send({user:body.username, token:'1234qwerty', retoken:'4321ytrewq'});
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
