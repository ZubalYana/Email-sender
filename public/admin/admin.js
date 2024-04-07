axios.get('/files')
  .then(response => {
    const filesContainer = $('.filesContainer');
    response.data.forEach(fileName => {
      filesContainer.append(`<div class="filesContainer_file">${fileName}</div>`);
    });
  })
  .catch(error => {
    console.error('Error fetching files:', error);
  });
