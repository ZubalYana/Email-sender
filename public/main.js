$('#file').change((e) => {
    let fileName = e.target.files[0].name;
    axios.post('/send-name', { name: fileName })
})