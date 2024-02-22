
const fileSystem = require("fs");

const loginController = (request, response) => {
  const body = request.body;

  console.log(body);

  const isUserExist = searchForUserWithEmail(body.email);
  if (!isUserExist) {
    return response
      .status(404)
      .json({ message: "sorry this email doesn't exist" });
  }
  if (isUserExist.password === body.password) {
    return response.status(200).json({ message: "welcome back user" });
  }
  response.status(404).json({ message: "password incorrect" });
};

const searchForUserWithEmail = (incomingEmail) => {
  let dataBase = null;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {
    console.log(err);
  }
  const data = dataBase ? JSON.parse(dataBase) : [];
  const isUserExist = data.find((user) => {
    return user.email === incomingEmail;
  });

  return isUserExist;
};

const signupController = (request, response) => {
  const body = request.body;
  let dataBase = null;
  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {
    console.log(err);
  }
  const data = dataBase ? JSON.parse(dataBase) : [];
  data.push(body);
  fileSystem.writeFileSync("database.json", JSON.stringify(data));
  response.status(200).json({ message: "Account saved" });
};

module.exports = { loginController: loginController, signupController };
