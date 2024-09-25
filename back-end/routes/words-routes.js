const express = require("express");
const wordsControllers = require("../controllers/words-controllers");
const router = express.Router();

router.get("/", wordsControllers.getAllWords);
router.get(
  "/:wid",

  wordsControllers.getWordById
);
router.post(
  "/",

  wordsControllers.createWord
);

router.patch(
  "/:wid",

  wordsControllers.updateWord
);

router.delete("/:wid", wordsControllers.deleteWord);

module.exports = router;
