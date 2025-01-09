// const fileSystem = require("fs");  
const fs = require('fs');
const path = require('path');  //TODO   ASK ABDOU

const dbPath = path.join(__dirname, 'database.json'); //TODO ASK ABDOU 

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

const signupController = (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Read database.json
  fs.readFile(dbPath, 'utf8', (err, data) => { //TODO ASK ABDOU 
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading database.' });
    }

    const db = JSON.parse(data);

    // Check if the email already exists
    if (db.users.some((user) => user.email === email)) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Add the new user
    const newUser = { name, email, password, phone };
    db.users.push(newUser);

    // Write updated data back to database.json
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => { //TODO ASK ABDOU 
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving user.' });
      }

      res.status(200).json({ message: 'User registered successfully.' });
    });
  });
}
const fetchUsersController = (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading database.' });
    }

    const db = JSON.parse(data);
    res.status(200).json({ users: db.users });
  });
}

// (req, res) => {
//   fs.readFile(dbPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error reading database.' });
//     }

//     const db = JSON.parse(data);
//     res.status(200).json({ users: db.users });
//   });
// }

module.exports = { loginController: loginController, signupController , usersController};
