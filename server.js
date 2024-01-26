const express = require('express');
const bodyParser = require('body-parser')
// const mongodb = require("./db/database")
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)})
app.use("/", require("./routes"))

