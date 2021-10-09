let emailRegex = /^[a-z][\w\d]+@[a-z]+\.[a-z]{2,}(\.[a-z]+)?$/;

const validateEmail = () => {
    $('#email').keyup(function(e){
        let email = $(this).val().trim();
        if(email){
            if(emailRegex.test(email)){
                $(this).css('borderColor','lime');
            }else{
                $(this).css('borderColor','crimson');
            }
        }else{
            $(this).css('borderColor','lightgray');
        }
    });
}
validateEmail();

const saveEmail = () => {
    $('#save-email').click(function(){
        // Get url, email and csrf token
        let url = $(this).data('addEmailUrl');
        let email = $('#email').val();
        let csrfmiddlewaretoken = $("input[name = csrfmiddlewaretoken]").val();
        // console.log(email);
        // Validate email and save to database
        if(emailRegex.test(email)){
            // Start load
            $(this).html(
                `<div class='spinner-border spinner-border-sm'></div>`
            ).addClass('disabled');
            $.post(
                url,
                {
                    email,
                    csrfmiddlewaretoken
                },
                function(res){
                    // End load 
                    $('#save-email').html("Save").removeClass('disabled');
                    if(res.status == 'success'){
                        // Sucesss message
                        $('#message').text("Your email has been saved.").addClass('alert-success');
                        setTimeout(() => $('#message').text('').removeClass('alert-success'),3500);
                        // Remove default message when no email has bees saved
                        $('#no-email').remove();
                        // Clear input field
                        $('#email').css('borderColor','lightgray').val('');
                        // Append to list of emails
                        $('#emails').append(
                            `<li class='list-group-item'>${email}</li>`
                        );
                    }
                    else if(res.status == 'duplicate'){
                        // Duplicate messsage
                        $('#message').text("The email has aleeady been saved.").addClass('alert-danger');
                        setTimeout(() => $('#message').text('').removeClass('alert-danger'),3500);
                    }
                    console.log(res);
                },
                'json'
            )
        }
    });
}

saveEmail();