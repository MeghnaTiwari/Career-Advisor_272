var jwt = require("jsonwebtoken");

module.exports.setEmail = email => {
  //Storing token in the local storage
  localStorage.setItem("email", JSON.stringify(email));
};
module.exports.getEmail = () => {
  return localStorage.getItem("email");
};
module.exports.setId = id => {
  //Storing token in the local storage
  localStorage.setItem("id", JSON.stringify(id));
};
module.exports.getId = id => {
  return localStorage.getItem("id");
};

module.exports.setRole = role => {
  //Storing token in the local storage
  localStorage.setItem("career", JSON.stringify(role));
};

module.exports.getRole = () => {
  return localStorage.getItem("career");
};
