const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 // Import uuid for generating unique IDs

const dbPath = path.join(__dirname, "../database.json");

;  //TODO   ASK ABDOU

 //TODO ASK ABDOU 


 const loginController = (req, res) => {
  const { email, password } = req.body;

  // Read the users data from the database
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database.' });
    }

    try {
      const users = JSON.parse(data).users || [];

      // Find the user with the provided email
      const user = users.find(user => user.email === email);

      // If the user does not exist, return an error
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      // Check if the password matches
      if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password.' });
      }

      // If everything is correct, return success with user data (including ID and status)
      res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: user.status,  // Include the user's status
        },
      });
    } catch (parseErr) {
      return res.status(500).json({ message: 'Error parsing database.' });
    }
  });
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

  // Read the users data from the database
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database.' });
    }

    try {
      const users = JSON.parse(data).users || [];

      // Check if the email already exists
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered.' });
      }

      // Create a new user with a unique ID and default status 'student'
      const newUser = {
        id: uuidv4(),  // Generate a unique ID
        name,
        email,
        password,
        phone,
        status: 'student',  // Default status for new users
      };

      // Add the new user to the users array
      users.push(newUser);

      // Write the updated users list back to the database
      fs.writeFile(dbPath, JSON.stringify({ users }, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving user to database.' });
        }
        res.status(200).json({ message: 'Account created successfully.' });
      });

    } catch (parseErr) {
      return res.status(500).json({ message: 'Error parsing database.' });
    }
  });
};
const fetchUsersController = (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err.message);
      return res.status(500).json({ message: "Error reading database." });
    }

    try {
      const db = JSON.parse(data);
      res.status(200).json({ users: db.users || [] });
    } catch (parseError) {
      console.error("Error parsing database JSON:", parseError.message);
      res.status(500).json({ message: "Error parsing database." });
    }
  });
};


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

module.exports = { loginController, signupController , fetchUsersController :fetchUsersController};

