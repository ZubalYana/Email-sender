axios.get('/files')
    .then(response => {
        const filesContainer = $('.filesContainer');
        response.data.forEach(fileName => {
            const fileElement = $(`<div class="filesContainer_file">${fileName}</div>`);
            filesContainer.append(fileElement);
            fileElement.click(() => {
                axios.get('/file-content', { params: { fileName } })
                    .then(contentResponse => {
                        $('.filesPopup_fileFiling').empty();
                        const content = contentResponse.data;
                        for(let el of content){
                            console.log(el)
                            $('.filesPopup_fileFiling').append(el.gmail + ', ');
                        }
                        $('.filesPopup_fileName').html(fileName);
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
            axios.get('/emails-list')
                .then(response => {
                    const emails = response.data;
                    const emailList = emails.map(entry => entry.gmail).join(', ');
                    
                    axios.post('/send-mail', { to: emailList })
                        .then(() => {
                            console.log('Emails sent successfully');
                        })
                        .catch(error => {
                            console.error('Error sending emails:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching email list:', error);
                });
        });
        
        

    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });

$('.xmark').click(() => {
    $('.filesPopup_container').css('display', 'none');
});
