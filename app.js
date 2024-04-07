const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;
const path = require('path')

app.use(express.static('public'));
app.use(express.json())
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin/admin.html');
})
app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})