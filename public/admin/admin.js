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
                        $('.filesPopup_fileFiling').val(content);
                        $('.filesPopup_container').css('display', 'flex');
                    })
                    .catch(error => {
                        console.error('Error fetching file content:', error);
                    });
            });
        });
        $('.filesPopup_SaveChBtn').click(()=>{
            const updatedData = $('.filesPopup_fileFiling').val();
            console.log(updatedData);
            axios.post('/file-newContent', { content: updatedData })
        })
        
        $('.filesPopup_SendEmailsBtn').click(() => {
            const emailAddresses = [];
            $('.filesContainer_file').each((index, element) => {
                emailAddresses.push($(element).text().trim());
            });
        
            axios.post('/send-mail', { emailAddresses })
                .then(response => {
                    console.log('Emails sent successfully');
                })
                .catch(error => {
                    console.error('Error sending emails:', error);
                });
        });
        

    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });

$('.xmark').click(() => {
    $('.filesPopup_container').css('display', 'none');
});
