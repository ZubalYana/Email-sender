const express = require('express');

const app = express();

const PORT = 3000;
app.use(express.static('public'));
app.use(express.json())

app.post('/send-name', (req, res) => {
    const { name } = req.body;
    console.log(name);
})
app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})