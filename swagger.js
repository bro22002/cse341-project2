const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "Inventory Api",
        description: "Inventory Api"
    },
    hosts: "localhost:3000",
    schemas: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swaggerAutogen.json
swaggerAutogen(outputFile, endpointsFiles, doc);