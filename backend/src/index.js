express = require('express');
app = express();

app.get('/', (req, res) => res.send('Hello Word!'));
app.get('/index', (req, res) => res.json({message: "Hello World, again!"}));

app.listen(3333);