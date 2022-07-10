const express = require("express") // it is CommonJS style to import a module.
const mongoose = require('mongoose')
const categories = ["Eat", "Pray","Love"]
const entries = [
    {category: "Eat", entry: "Food is amazing"},
    {category: "Pray", entry: "Pray is good"},
    {category: "Love", entry: "Love is essential"}
    
]
const app = express() //the req come in.
const port = 8080

mongoose.connect(
    'mongodb+srv://cademo:cademo@cluster0.ga0axoz.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log(mongoose.connection.readyState === 1 ? "Mongoose connected" : "Mongoose connected error"))
    .catch((error) => console.log(error.message))

app.use(express.json()) //app.use tells express execurte some middleware at this stage of the request-response cycle. In this case,we' re executing express.json(), 

app.get('/entries/:id', (req,res) =>{res.send(entries[req.params.id])})

app.get('/',(req,res) => res.send({info: 'journal API'})) // create a middleware and chaining them . the second parameter will be if the first one routes match running the second one

app.get('/categories',(req,res) => console.log(req))

app.get('/entries',(req,res) => res.send(entries))

app.post('/entries', (req,res) => {
    const entry = {category: req.body.category , entry: req.body.entry}
    entries.push(entry)
    res.status(201).send(entry)
})

// app.delete('/entries/:id', (req,res) =>{res.send(entries[req.params.id])})
    
app.listen(port, () => console.log(`App is running at http://localhost:8080/`)) // we can provide the second parameter as a callback function.