const express = require ("express")
const exphbs = require("express-handlebars");
const port = 80

const tasks = require("./data/tasks.js");
let log = ["Log:"];
console.log(log);

const app = express()
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("home", {tasks})

})
app.get("/logs", (req,res) => {
    res.render("logs", {log});
}) 

app.get("/add", (req,res) => {
    res.render("add");
}) 

app.get("/edit/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let task = tasks.find(task => {task.id == id})
    res.render("edit");
}) 

app.get("/remove/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const targetIndex = tasks.findIndex(task => (task.id == id));
    const target = tasks.find(task => (task.id == id));
    tasks.splice(targetIndex, 1);
    logWrite("REMOVED id:" + target.id + " title:'" + target.title + "' time:'" + target.time + "'")
    res.redirect("/");
}) 

app.get("/complete/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let target = tasks.findIndex(task => (task.id == id));
    tasks.splice(target, 1);
    logWrite("COMPLETED id:" + id)
    console.log(log);
    res.redirect("/");
})

app.post("/add", (req,res) => {
    res.render("add");
}) 

function logWrite(string) {
    log.push(string);
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("http://localhost:" + port);
})