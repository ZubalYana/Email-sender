$('#file').change((e) => {
    // let file = e.target.files[0]
    let fileName = e.target.files[0].name;
    axios.post('/send-name', { name: fileName })
})