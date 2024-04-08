axios.get('/files')
  .then(response => {
    const filesContainer = $('.filesContainer');
    response.data.forEach(fileName => {
      filesContainer.append(`<div class="filesContainer_file">${fileName}</div>`);
      // $('.filesPopup_fileName').html(`${this.fileName}`)
    });
    $('.filesContainer_file').click(()=>{
      $('.filesPopup_container').css('display', 'flex')
    })
    $('.xmark').click(()=>{
      $('.filesPopup_container').css('display', 'none')
    })
  })
  .catch(error => {
    console.error('Error fetching files:', error);
  });
