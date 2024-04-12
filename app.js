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
        console.log(content)
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



//   app.use(bodyParser.json());
//   app.post('/send-mail', (req, res) => {


//     const mailOptions = {
//         from: 'Your Name <your.email@gmail.com>',
//         to: 'The gmails here', 
//         subject: 'Your Subject Here',
//         text: 'Your Email Content Here',
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             res.status(500).send('Failed to send email');
//         } else {
//             console.log('Email sent:', info.response);
//             res.sendStatus(200);
//         }
//     });
// });


  
app.get('/emails-list', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading emails file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const emails = JSON.parse(data);
        res.send(emails);
    });
});

app.post('/send-mail', (req, res) => {
    const { to } = req.body;
    const mailOptions = {
        from: 'Your Name <your.email@gmail.com>',
        to: to,
        subject: 'Your Subject Here',
        text: 'Your Email Content Here',
    };
    
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.LOGIN}`,
      pass: `${process.env.PASSWORD}`
    }
  });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.sendStatus(200);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`);
})
