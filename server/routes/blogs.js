const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const bodyParser = require('body-parser');

// find blog
router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
})
//Get featured blog

router.get('/featured', (req, res) => {
    Blog.where({ blogs: 'featured' })
        .then(blogs => {
            res.status(200).send(blogs);
        })
})

//GET an existing blog
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Blog.findOne({ _id: id }, (err, blog) => {
        if (blog) {
            return res.status(200).send(blog);
        } else {
            return res.status(404).send();
        }
    });
});

//POST a new blog. 
router.post('/', (req, res) => {
    let newBlog = new Blog(req.body);
    // newBlog.author = req.params._id,
    newBlog.title = req.body.title;
    newBlog.article = req.body.article;
    newBlog.published = req.body.published;
    newBlog.featured = req.body.featured;
    newBlog
        .save()
        .then(blog => {
            console.log(Object.keys(blog));
            res.status(201).json(blog);
        });
});

//UPDATE existing blog
router.put('/:id', (req, res) => {
    let id = req.params.id;
    Blog.findOneAndUpdate({ _id: id },
        {
            title: req.params.title,
            article: req.params.article,
            published: req.params.published,
            featured: req.params.featured
        })
        .then(Blog => { res.status(204).send(Blog) });
})

//REMOVE existing blog
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Blog.findOneAndRemove({ _id: id })
        .then(blogs => { res.status(200).send() });
});


module.exports = router;
