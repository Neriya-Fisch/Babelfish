const { User } = require("./user");

var userNameByEmail = async (userEmail) => {
  var query = await User.find({ email: userEmail });
  fullName = `${query[0].firstName} ${query[0].lastName}`;
  return fullName;
};

module.exports = userNameByEmail;
