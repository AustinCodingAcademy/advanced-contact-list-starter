const express = require('express');
const router = express.Router();
const ContactModel = require('../models/ContactModel');


// Declare our GET /contacts route
router.get('/contacts', function (request, response, next) {
  ContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(err => {
      return next(err);
    });
});

router.get('contacts/:_id', function (request, response, next) {
  ContactModel.findById(request.params._id).exec()
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
});

router.delete('/contacts/:_id', function (request, response, next) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/contacts', function (request, response, next) {
  // create instance of ContactModel
  // grab atts of request.body object
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  // save contact
  contact.save()
  // when save is done, return newly created contact
  .then(newContact => {
    return response.json(newContact);
  })
  .catch(err => {
    return next(err);
  });
});

router.put('/contacts/:_id', function (request, response, next) {
  ContactModel.findById(request.params._id)
  .then(contact => {
    // set atts on model from request.body OR
    // if null is returned, use what contact already set to

    contact.name = request.body.name || contact.name;
    contact.occupation = request.body.occupation || contact.occupation;
    contact.avatar = request.body.avatar || contact.avatar;

    return contact.save();
  })
  .then(contact => {
    return response.json(contact);
  })
  .catch(err => {
    return next(err);
  });
});

module.exports = router;
