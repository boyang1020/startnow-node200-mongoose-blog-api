const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/my-blog',{useMongoClient: true});
mongoose.Promise = Promise;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res)=>{
    res.status(200).send();
});
app.put('/:id', (req, res)=>{
    res.status(200).send();
});
app.post('/', (req, res)=>{
    res.status(200).send();
});
app.delete('/:id', (req, res)=>{
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
// app.use('/api/users/:id', require('./routes/users'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/users/:id', require('./routes/users'));
// app.use('/api/users/:id', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));
// app.use('/api/blogs/feathured', require('./routes/blogs'));
// app.use('/api/blogs/:id', require('./routes/blogs'));
// app.use('/api/blogs', require('./routes/blogs'));
// app.use('/api/blogs/:id', require('./routes/blogs'));
// app.use('/api/blogs/:id', require('./routes/blogs'));

module.exports =app;

