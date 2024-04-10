const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;
const path = require('path')
const emailsFolderPath = path.join(__dirname, 'emails');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
const TOKEN = '7121504275:AAHPive5eXJbB8RssVnYWZeBgloZZ7nXGvs';
require('dotenv').config();

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
    filePath = path.join(emailsFolderPath, fileName); 
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(content);
    });
});

app.post('/file-newContent', (req, res) => {
    const { content } = req.body;
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('File updated successfully');
    });
});

app.use(bodyParser.urlencoded({
    extended: false
  }))
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.LOGIN}`,
      pass: `${process.env.PASSWORD}`
    }
  });
  app.use(bodyParser.json());
  app.post('/send-mail', (req, res)=>{
    console.log(req.body);
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let mailOptions = {
            from: 'Лист від Яни',
            to: req.body,
            subject: 'Високоінтелектуально',
            text: req.body.message,
          };
        
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });

    res.sendStatus(200);
  })
  

app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})