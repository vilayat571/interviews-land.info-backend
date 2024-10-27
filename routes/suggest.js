const express = require("express");
const { addSuggest, getSuggests } = require("../controllers/suggest.js");

const router = express.Router();

router.post("/api/v1/suggests/add", addSuggest);
router.get("/api/v1/suggests", getSuggests);

module.exports = router;
