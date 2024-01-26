const mongodb = require("../db/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Inventory']
    const result = await mongodb.getDatabase().collection('inventory').find()
    result.toArray().then((inventory) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(inventory)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Inventory']
    const invId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().collection('inventory').find({_id: invId});
    result.toArray().then((inventory) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(inventory)
    });
};

const createInventory = async (req, res) => {
    //#swagger.tags=['Inventory']
    const inventory = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        mileage: req.body.mileage,
        price: req.body.price,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        condition: req.body.condition
    }
    const result = await mongodb.getDatabase().collection('inventory').insertOne({inventory});
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the inventory.")
    }
    
};

const updateInventory = async (req, res) => {
    //#swagger.tags=['Inventory']
    const invId = new ObjectId(req.params.id)
    const inventory = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        mileage: req.body.mileage,
        price: req.body.price,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        condition: req.body.condition
    }
    const result = await mongodb.getDatabase().collection('inventory').replaceOne({_id: invId}, inventory);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the inventory.");
    }
};

const deleteInventory = async (req, res) => {
    //#swagger.tags=['Inventory']
    const invId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().collection('inventory').deleteOne({_id: invId});
    if (result.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the inventory.");
    }

};

module.exports = {getAll, getSingle, createInventory, updateInventory, deleteInventory}