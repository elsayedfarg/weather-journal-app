const express = require('express');
const app = express();
const port = process.env.PORT || 3400;
let projectData = {};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const cors = require('cors');
app.use(cors());


app.post('/add', (req, res) => {
    const info = req.body;
    if (!info || !info.temp || !info.city) {
        return res.status(400).send({ error: "Invalid data format" });
    }
    projectData = info;
    res.status(201).send(projectData);
});


app.get("/all", (req, res) => {
    res.send(projectData);
});

app.listen(port, _ => console.log(`listening on port ${port}`));


