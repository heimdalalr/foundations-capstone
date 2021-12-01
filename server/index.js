const express = require("express");
const cors = require("cors")
const controller = require('./controller.js')

const app = express();

app.use(cors());
app.use(express.json());



// app.get('/',function(req,res) {
//     res.sendFile(path.join(__dirname, 'client/index.html'));
//   });

app.get(`/api/reccommended`, controller.friendRecc);
app.get(`api/progress`, controller.progress);
app.put(`api/update`, controller.update);

app.listen(7777, () => console.log("server running on 7777"));