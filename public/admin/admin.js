axios.get('/files')
    .then(response => {
        const filesContainer = $('.filesContainer');
        response.data.forEach(fileName => {
            const fileElement = $(`<div class="filesContainer_file">${fileName}</div>`);
            filesContainer.append(fileElement);

            fileElement.click(() => {
                axios.get('/file-content', { params: { fileName } })
                    .then(contentResponse => {
                        const content = contentResponse.data;
                        $('.filesPopup_fileName').html(fileName);
                        $('.filesPopup_fileFiling').html(content);
                        $('.filesPopup_fileFiling_input').val(content);
                        $('.filesPopup_container').css('display', 'flex');
                    })
                    .catch(error => {
                        console.error('Error fetching file content:', error);
                    });
            });
        });
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });

$('.xmark').click(() => {
    $('.filesPopup_container').css('display', 'none');
});
