const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

// router.get('/:id', (req, res) => {
//     let id=req.params.id;

//     User
//         .findById(id)
//         .then(users => {
//           user ?  res.status(200).json(users) : res.status(404).send("user not found");
//         });
// });
// router.post('/', (req, res) => {
//     User
//         .save()
//         .then(users => {
//             res.status(200).json(users);
//         });
// });
// router.put('/:id', (req, res) => {
//     User
//         .findByIdAndUpdate()
//         .then(users => {
//             res.status(200).json(users);
//         });
// });
// router.delete('/:id', (req, res) => {
//     User
//         .findByIdAndRemove()
//         .then(users => {
//             res.status(200).json(users);
//         });
// });
router.get('/:id', (req, res) => {  
    let id = req.params.id;
    User.findOne({
      _id: id
    }, (err, user) => {
      if (!user) {
        return res.status(404).send(`User ${id} doesn\'t exist.`);
      } else {
        return res.status(200).send(user);
      }
    });
  });
  
  //POST new user
  router.post('/', (req, res) => {
    let newUser = new User(req.body);
    newUser.firstName = req.body.firstName,
    newUser.lastName = req.body.lastName,
    newUser.email = req.body.email,
    newUser.social = {
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedIn: req.body.linkedIn
    }
    newUser
    .save()
    .then(users => {
      res.body = newUser
      res.status(201).send(res.body);
    });
  });
  
  //UPDATE existing user
  router.put('/:id', (req,res) => {
    let id = req.params.id;
    User.findOneAndUpdate({ _id: id }, 
      { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
    .then(user => {
      res.status(204).send(`User ${user.firstName} ${user.lastName} has been updated.`)
    })
  });
  
  //DELETE existing user
  router.delete('/:id', (req, res) => {
    let id =  req.params.id;
    User.findByIdAndRemove({ _id:id })  
    .then(user => { 
      res.status(200)
      .send(`User ${user.firstName, user.lastName} has been deleted from the database.`);
    });
  });

  
module.exports = router;