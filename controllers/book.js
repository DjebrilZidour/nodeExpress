const fileSystem = require("fs");

const searchForBook = (list, typedName) => {

    const isBookExist = list.find((element) => {
        return element.bookName === typedName;
    })
    return isBookExist
}

const createBookController = (req, res) => {

    const body = req.body
    let database = null;

    try {
        database = fileSystem.readFileSync("./bookDataBase.json", "utf-8")
    } catch (error) {
        console.log(error);
    }

    const data = database ? JSON.parse(database) : [];

    if (searchForBook(data, body.bookName)) {
        res.status(404).json({ message: "please add a new book" })
    } else {
        data.push(body)
        fileSystem.writeFileSync("./bookDataBase.json", JSON.stringify(data))
        res.status(200).json({ message: "book added succesfuly " })
    }


}

const getBookController = (req, res)=>{

    const query = req.query
    let dataBase = null

    try {
        dataBase = fileSystem.readFileSync("./bookDataBase.json","utf-8")
    } catch (err) {
        console.log(err);
    }

    const data = dataBase ? JSON.parse(dataBase) : []

    const ifBookExist = searchForBook(data, query.bookName)

    if (ifBookExist) {
        res.status(200).json(ifBookExist);
    }else{
        res.status(404).json({message:"sorry this book is not found"})
    }


}

module.exports = { createBookController , getBookController };