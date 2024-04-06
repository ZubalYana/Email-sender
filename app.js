const express = require('express');
const path = require('path')

const app = express();

const PORT = 3000; 

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/contact', (req, res)=>{
    res.send('Намер компанії: 0972058786');
}) 

app.get('/pay', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'pay.html'))
})
app.get('/cont', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'contact.html'))
})


app.listen(PORT, ()=>{
    console.log(`Server work on PORT: ${PORT}`)
});
