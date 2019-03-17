const Org = require('../model/organization');
const User = require('../model/User');
const mongoose = require('mongoose');

var addOrganization = (req, res) => {
  const org = new Org({
    organizationName:req,
    taxId:req,
    noOfEmployees:req,
    regNo: req,
    contact: {
      phone: req,
      fax: req,
      email:req,
      adress: {
        street:req,
        city: req,
        state:req,
        postalcode:req,
        country:req,
      },
    }
  });
  org.save().then(result => {
    return res.redirect('/home');
  })
  .catch(err => {
    return res.status(400).json(err.message);
  });
};
module.exports = addLeave;