function managerValidation(){
    var firstname = document.employee_form.firstname;
    var lastname = document.employee_form.lastname;
    var phone_number = document.employee_form.phone_number;
    var email = document.employee_form.email;
    var address = document.employee_form.address;
    var national_id_no = document.employee_form.national_id_no;
    var manager_id_no = document.employee_form.manager_id_no;
    var username = document.employee_form.username;
    var password = document.employee_form.password;

    var number = /^[0-9]+$/;
    var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    var capitalLetters = /^[A-Z]+$/;
    var alphanumeric = /^[A-Z0-9]+$/;
    var NIN = /^[A-Z]{3}[0-9]{8}[A-Z]*$/;

    function alertError(errId,errMsg){
        document.getElementById(errId).innerHTML = errMsg;
    }

    var firstname_error = lastname_error = phone_number_error = email_error = address_error = national_id_no_error = employee_id_no_error = username_error = password_error = true;
    
    if(firstname.value.length == " " || !firstname.value.match(letters)   ){
        alertError("firstname_error","first Name should not be empty and should have only characters *")
        firstname.style.border = "1px solid red";
        firstname.style.display = "inline-block";
          
    }
    else {
        alertError("firstname_error"," ")
        firstname.style.border = "none";
        firstname_error = false; 
    };

    if(lastname.value.length == " " || !lastname.value.match(letters)   ){
        alertError("lastname_error","Last Name should not be empty and should have only characters *")
        lastname.style.border = "1px solid red";
        lastname.style.display = "inline-block";
          
    }
    else {
        alertError("lastname_error"," ")
        lastname.style.border = "none";
        lastname_error = false; 
    };

    if(phone_number.value.length == " " || !phone_number.value.match(number)   ){
        alertError("phone_number_error","Phone number field should not be empty and should be a number  *")
        phone_number.style.border = "1px solid red";
        phone_number.style.display = "inline-block";
          
    }
    else {
        alertError("phone_number_error"," ")
        phone_number.style.border = "none";
        phone_number_error = false; 
    };

    if(email.value.length == " "   ){
        alertError("email_error","Email should not be empty  *")
        email.style.border = "1px solid red";
        email.style.display = "inline-block";
          
    }
    else {
        alertError("email_error"," ")
        email.style.border = "none";
        email_error = false; 
    };

    if(address.value.length == " "   ){
        alertError("address_error","address should not be empty  *")
        address.style.border = "1px solid red";
        address.style.display = "inline-block";
          
    }
    else {
        alertError("address_error"," ")
        address.style.border = "none";
        address_error = false; 
    };

    if(national_id_no.value.length < 13 || national_id_no.value.length > 13 || !national_id_no.value.match(NIN)   ){
        alertError("national_id_no_error","national_id_no field should not be empty and should be correct  *")
        national_id_no.style.border = "1px solid red";
        national_id_no.style.display = "inline-block";
          
    }
    else {
        alertError("national_id_no_error"," ")
        national_id_no.style.border = "none";
        national_id_no_error = false; 
    };
    if(manager_id_no.value.length == " " || !manager_id_no.value.match(alphanumeric)   ){
        alertError("manager_id_no_error","manager_id_no field should not be empty and should be alphanumeric  *")
        manager_id_no.style.border = "1px solid red";
        manager_id_no.style.display = "inline-block";
          
    }
    else {
        alertError("manager_id_no"," ")
        manager_id_no.style.border = "none";
        manager_id_no_error = false; 
    };

    if(username.value.length == " " || !username.value.match(letters)   ){
        alertError("username_error","username field should not be empty and should be letters  *")
        username.style.border = "1px solid red";
        username.style.display = "inline-block";
          
    }
    else {
        alertError("username_error"," ")
        username.style.border = "none";
        username_error = false; 
    };

    if(password.value.length == " "    ){
        alertError("password_error","password field should not be empty  *")
        password.style.border = "1px solid red";
        password.style.display = "inline-block";
          
    }
    else {
        alertError("password_error"," ")
        password.style.border = "none";
        password_error = false; 
    };


    if((firstname_error || lastname_error || phone_number_error || email_error || address_error || national_id_no_error || manager_id_no_error || username_error || password_error )==true){
        event.preventDefault();
    }
    else{
        event.currentTarget.submit();
    }




}