const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;
const path = require('path')

app.use(express.static('public'));
app.use(express.json())

app.post('/send-name', (req, res) => {
    const { name } = req.body;
    fs.readFile(`./emails/${name}`, function(error, data){
        if(error){
            return console.log(error)
        }
        console.log(data.toString());
    })
})
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin/admin.html');
})
app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})