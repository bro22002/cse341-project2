const express = require('express');
const router = require("express").Router()
const { isAuthenticated } =  require("../middleware/authenticate");
const inventoryController = require("../controllers/inventory")
const Util = require("../middleware/index")
validate = require("../middleware/validate")

router.get("/", Util.handleErrors(inventoryController.getAll))
router.get('/:id', inventoryController.getSingle)

router.post("/", isAuthenticated, validate.createInventoryValidation, inventoryController.createInventory)
router.put("/:id", isAuthenticated, validate.updateInventoryValidation, inventoryController.updateInventory)
router.delete("/:id", isAuthenticated, inventoryController.deleteInventory)

module.exports = router