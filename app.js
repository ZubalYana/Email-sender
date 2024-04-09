const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;
const path = require('path')
const emailsFolderPath = path.join(__dirname, 'emails');

app.use(express.static('public'));
app.use(express.json())
app.post('/send-name', (req, res) => {
    const { name } = req.body;
    console.log(name);
})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin/admin.html');
})

app.get('/files', (req, res) => {
    fs.readdir(emailsFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading emails folder:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(files);
    });
});

app.get('/file-content', (req, res) => {
    const { fileName } = req.query;
    const filePath = path.join(emailsFolderPath, fileName);

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(content);
    });
    app.post('/file-newContent', (req, res) => {
        const { content } = req.body;
        console.log(content);
        fs.writeFile(filePath, content, (err, content) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(content);
        });
    })
});


app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})