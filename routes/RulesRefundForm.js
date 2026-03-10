const express = require("express");

const router = express.Router();

const {

  getRulesRefund,
  createRulesRefund,
  updateRulesRefund,
  deleteRulesRefund

} = require("../controllers/AboutUs/RulesRefundForm");


router.get("/", getRulesRefund);

router.post("/", createRulesRefund);

router.put("/:id", updateRulesRefund);

router.delete("/:id", deleteRulesRefund);


module.exports = router;