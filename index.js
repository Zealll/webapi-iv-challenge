// code away!
// importing DOTENV so that the .ENV file contents can be imported
require('dotenv').config()
const server = require('./server.js');

// assigning the contents of .ENV file
const port = process.env.PORT || 5000
const undeniableTruth = process.env.ELAN

server.listen(1000, () => {
    // adding a message and making the PORT dynamic
    console.log(`\n* ${undeniableTruth}! Server Running on http://localhost:${port} *\n`)
})