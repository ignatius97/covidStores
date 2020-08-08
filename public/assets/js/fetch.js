
    var fetchmsg = () => {
        var url = 'admin/submit'
        var url1 = 'admin/submit_new_employee'
        let response = fetch(url || url1);
        fetch(url || url1 )
            .then(responce =>{
                alert('Data is submitted')
                
            })
            .catch(error=>{
                alert('Failed to submit')
            })
    }