const multer = require("multer");

const fileLocation = (file) => {
  if (file.mimetype === "video/mp4") {
    // if (file.fieldname === "uploadedFiles") {
    if (file.fieldname === "uploadedVideos") {
      return `uploads/recipeVideos/`;
    } else {
      throw new Error("The file type must be jpej or png only!");
    }
  } else {
    if (file.fieldname === "userImg") {
      return `uploads/usersImage/`;
    } else if (file.fieldname === "mainImg") {
      return `uploads/recipeMainImg/`;
    } else {
      return `uploads/recipePhotos/`;
    }
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${fileLocation(file)}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/[./:/-]/g, "")}${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(new Error("You must add jpeg, png or mp4 only!"), false);
  }
};

const uploadFiles = multer({
  fileFilter: fileFilter,
  storage: storage,
})
// .fields([
//   {
//     name: "mainImg",
//     maxCount: 1,
//   },
//   {
//     name: "uploadedImgs",
//     maxCount: 30,
//   },
// ]);

module.exports = uploadFiles;
