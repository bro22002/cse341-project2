const router = require("express").Router()
router.use('/', require('./swagger'));

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello Wolrd")
})

router.use("/inventory", require("./inventory"))

module.exports = router