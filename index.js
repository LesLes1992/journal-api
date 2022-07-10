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
    'mongodb+srv://cademo:cademo@cluster0.ga0axoz.mongodb.net/journal?retryWrites=true&w=majority')
    .then(()=>console.log(mongoose.connection.readyState === 1 ? "Mongoose connected" : "Mongoose connected error"))
    .catch((error) => console.log(error.message))

// create the schema by using new mongoose.Schema
const entrySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    }
})
//create model base on the schema
const EntryModel = mongoose.model('entry', entrySchema)

app.use(express.json()) //app.use tells express execurte some middleware at this stage of the request-response cycle. In this case,we' re executing express.json(), 

app.get('/entries/:id', async (req,res) =>{
    const entry = await EntryModel.findById(req.params.id)
    res.send(entry)})

app.get('/',(req,res) => res.send({info: 'journal API'})) // create a middleware and chaining them . the second parameter will be if the first one routes match running the second one

app.get('/categories',(req,res) => console.log(req))

app.get('/entries',async (req,res) => {
    const entries = await EntryModel.find()
    res.send(entries)
})

app.post('/entries', async (req,res) => {
    const entry = {category: req.body.category , entry: req.body.entry}
    // entries.push(entry)
    const newEntry = await EntryModel.create(entry) // push the entry tp database,which create a new promise
    res.status(201).send(newEntry)
})

// app.delete('/entries/:id', (req,res) =>{res.send(entries[req.params.id])})
    
app.listen(port, () => console.log(`App is running at http://localhost:8080/`)) // we can provide the second parameter as a callback function.