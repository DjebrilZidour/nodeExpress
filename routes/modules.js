const { Router } = require("express");

const moduleRouter = Router();

const response = [
  {
    moduleName: "Math",
    img: "https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/dashboard/learning/courses/math",
    imgUrl:
      "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    moduleName: "science",
    img: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgUrl:
      "https://images.pexels.com/photos/132477/pexels-photo-132477.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    moduleName: "Arabic",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQflY6FbCbbRtAWx9H6RaiCtOUAYC4keIEQ&usqp=CAU",
    imgUrl: "",
  },
  {
    moduleName: "English",
    img: "https://images.pexels.com/photos/221166/pexels-photo-221166.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgUrl: "",
  },
  {
    moduleName: "French",
    img: "https://images.pexels.com/photos/5781917/pexels-photo-5781917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imgUrl: "",
  },
  {
    moduleName: "Phisics",
    img: "https://images.pexels.com/photos/68173/flash-tesla-coil-experiment-faradayscher-cage-68173.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgUrl: "",
  },
  {
    moduleName: "Islamic",
    img: "https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgUrl: "",
  },
  {
    moduleName: "History and geo",
    img: "https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgUrl: "",
  },
  {
    moduleName: "civil",
    img: "https://images.pexels.com/photos/5191376/pexels-photo-5191376.jpeg?auto=compress&cs=tinysrgb&w=800 ",
    imgUrl: "",
  },
];

moduleRouter.get("/modules", (req, res) => {
  res.json(response);
});

module.exports = moduleRouter;
