const ContactModel = require('..models/ContactModel');
const contactsController = {};

contactsController.list = function (request, response, next) {
  ContactModel.find().exec()
    .then(contacts => {
      return response.json(contacts);
    })
    .catch(error => {
      return next(error);
    });
};

contactsController.show = function (request, response, next) {
  ContactModel.findById(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(error);
    });
};

contactsController.create = function (request, response, next) {
  const contact = new ContactModel({
    name: request.body.name,
    occupation: request.body.occupation,
    avatar: request.body.avatar
  });

  contact.save()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(error);
    });
};

contactsController.update = function (request, response, next) {
  ContactModel.findById(request.params._id)
    .then(contact => {
      contact.name = request.body.name || contact.name;
      contact.occupation = request.body.occupation || contact.occupation;
      contact.avatar = request.body.avatar || contact.avatar;

      return contact.save();
    })
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(error);
    });
};

contactsController.remove = function (request, response, next) {
  ContactModel.findByIdAndRemove(request.params._id).exec()
    .then(contact => {
      return response.json(contact);
    })
    .catch(error => {
      return next(error);
    });
};

module.exports = contactsController;
