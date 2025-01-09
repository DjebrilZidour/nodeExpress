const fileSystem = require("fs");

const loginController = (req, res) => {
  const { name, email, password, phone } = req.body;

  // Basic validation
  if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required, including phone number.' });
  }

  // Simulate user creation (replace with DB logic)
  const newUser = { id: Date.now(), name, email, password, phone };

  console.log('User registered:', newUser);

  return res.status(200).json({ message: 'User registered successfully' });
};
// (request, response) => {
//   const body = request.body;

//   console.log(body);

//   const isUserExist = searchForUserWithEmail(body.email);

//   if (!isUserExist) {
//     return response
//       .status(404)
//       .json({ message: "sorry this email doesn't exist" });
//   }

//   if (isUserExist.password === body.password) {
//     return response.status(200).json({ message: "welcome back user" });
//   }
//   response.status(404).json({ message: "password incorrect" });
// };

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

  if (!body.firstName) {
    return response.status(400).json({ err: "Please send firstName" });
  }
  if (body.firstName.length <= 2) {
    return response.status(400).json({ err: "Please enter a valid firstName" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ifValidEmail = emailRegex.test(body.email); // true | false

  // firstName , lastName , email , password -> 8char,@#$%^

  // email => check the email with regExp email@gmail.com

  try {
    dataBase = fileSystem.readFileSync("./database.json", "utf-8");
  } catch (err) {
    console.log(err);
  }

  const data = dataBase ? JSON.parse(dataBase) : [];
  if (searchForUserWithEmail(body.email) === undefined) {
    data.push(body);
    fileSystem.writeFileSync("database.json", JSON.stringify(data));
    response.status(200).json({ message: "Account saved" });
  } else {
    response
      .status(420)
      .json({ message: "this email alread exists pls enter a new email" });
  }
};
const usersController= (req, res) => {
  // Replace with actual database logic
  res.status(200).json({ users: mockDatabase });
}

module.exports = { loginController: loginController, signupController , usersController};
