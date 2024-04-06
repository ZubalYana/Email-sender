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






// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');

// const PORT = 3000;
//  // Path to your 'emails' folder

// app.use(express.static('public'));
// app.use(express.json());

// app.post('/send-name', (req, res) => {
//     const { name } = req.body;
//     fs.readFile(`./emails/${name}`, function(error, data){
//         if(error){
//             return console.log(error)
//         }
//         console.log(data.toString());
//     })
// })
// app.get('/admin', (req, res) => {
//     res.sendFile(__dirname + '/public/admin/admin.html');
//     // Read the contents of the 'emails' folder

// });
// // const emailsFolderPath = path.join(__dirname, 'emails');
// // app.get('/files', (req, res)=>{
// //     fs.readdir(emailsFolderPath, (err, files) => {
// //         if (err) {
// //             console.error('Error reading emails folder:', err);
// //             res.status(500).send('Internal Server Error');
// //             return;
// //         }

// //         // Send the file names to the client-side
// //         res.send(files);
// //     });
// // })
// app.listen(PORT, () => {
//     console.log(`Server works on PORT: ${PORT}`);
// });
