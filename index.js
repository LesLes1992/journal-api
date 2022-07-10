const express = require("express") // it is CommonJS style to import a module.
const categories = ["Love", "Name","Gender"]
const app = express() //the request come in.
const port = 8080

app.get('/',(request,response) => response.send({info: 'YOYYOUYOU'})) // create a middleware and chaining them . the second parameter will be if the first one routes match running the second one
app.get('/categories',(request,response) => response.send(categories))
app.listen(port, () => console.log(`App is running at http://localhost:8080/`)) // we can provide the second parameter as a callback function.