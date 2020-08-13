function salesInputsValidtion(){
    console.log('can be seen')
    var payment_time = parseInt(document.getElementById("payment_time").value);
    console.log(payment_time)

    var money_paid = parseInt(document.getElementById("ammount_paid").value);
    var product_price = parseInt(document.getElementById("price").value);
    var pay_interval = parseInt(document.getElementById("pay_interval").value);
    var next_payable_amount = ( product_price - money_paid )/pay_interval;
    var balance = ( product_price - money_paid );

    document.getElementById("total").value = money_paid;
    document.getElementById("balance").value = balance;
    document.getElementById("next_payable_amount").value = next_payable_amount;

    var initial_pay = document.getElementById("initial_pay").value;
    var now = new Date();
    var current_date = now.setDate(now.getDate());
    var next_date = now.setDate(now.getDate() + payment_time);
    document.getElementById("date_of_pay").value = current_date;
    document.getElementById("next_pay_date").value = next_date;

//................................sales form validation.........................................................
    var customer_name = document.sales_form.customer_name;
    var customer_ref_no = document.sales_form.customer_ref_no;
    var phone_number = document.sales_form.phone_number;
    var email = document.sales_form.email;
    var address = document.sales_form.address;
    var national_id_no = document.sales_form.national_id_no;
    var referee_no = document.sales_form.referee_no;
    var ammount_paid = document.sales_form.ammount_paid;
    var payment_time = document.sales_form.payment_time;
    var purchase_receipt = document.sales_form.purchase_receipt;
    
    console.log(ammount_paid.value);
    var number = /^[0-9]+$/;
    var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    var alphanumeric = /^[a-zA-Z0-9]+$/;
    var NIN = /^[A-Z]{3}[0-9]{8}[A-Z]*$/;

    function alertError(errId,errMsg){
        document.getElementById(errId).innerHTML = errMsg;
    }

    var customer_name_error = customer_ref_no_error = phone_number_error = email_error = address_error = national_id_no_error = referee_no_error = ammount_paid_error = payment_time_error = purchase_receipt_error = true;

    if(customer_name.value.length == " " || !customer_name.value.match(letters)  ){
        alertError("customer_name_error","Customer Name should not be empty and should have only characters *")
        customer_name.style.border = "1px solid red";
        customer_name.style.display = "inline-block"; 
    }
    else {
        alertError("customer_name_error"," ")
        customer_name.style.border = "none";
        customer_name_error = false; 
    };
    
    if(customer_ref_no.value.length == " " || !customer_ref_no.value.match(alphanumeric)  ){
        alertError("customer_ref_no_error","Customer ref No should not be empty and should be alphanumeric *")
        customer_ref_no.style.border = "1px solid red";
        customer_ref_no.style.display = "inline-block";
    }
    else {
        alertError("customer_ref_no_error"," ")
        customer_ref_no.style.border = "none";
        customer_ref_no_error = false; 
    };

    if(phone_number.value.length == " " ){
        alertError("phone_number_error","Phone number should not be empty *")
        phone_number.style.border = "1px solid red";
        phone_number.style.display = "inline-block";
    }
    else {
        alertError("phone_number_error"," ")
        phone_number.style.border = "none";
        phone_number_error = false; 
    };

    if(email.value.length == " " ){
        alertError("email_error","Email should not be empty *")
        email.style.border = "1px solid red";
        email.style.display = "inline-block";
    }
    else {
        alertError("email_error"," ")
        email.style.border = "none";
        email_error = false; 
    };

    if(address.value.length == " " ){
        alertError("address_error","Address should not be empty *")
        address.style.border = "1px solid red";
        address.style.display = "inline-block";
    }
    else {
        alertError("address_error"," ")
        address.style.border = "none";
        address_error = false; 
    };

    if(national_id_no.value.length < 13 || national_id_no.value.length > 13 || !national_id_no.value.match(NIN) ){
        alertError("national_id_no_error","national_id_no should not be empty *")
        national_id_no.style.border = "1px solid red";
        national_id_no.style.display = "inline-block";
    }
    else {
        alertError("national_id_no_error"," ")
        national_id_no.style.border = "none";
        national_id_no_error = false; 
    };

    if(referee_no.value.length == " " ){
        alertError("referee_no_error","referee_no should not be empty *")
        referee_no.style.border = "1px solid red";
        referee_no.style.display = "inline-block";
    }
    else {
        alertError("referee_no_error"," ")
        referee_no.style.border = "none";
        referee_no_error = false; 
    };

    if(ammount_paid.value.length == " " || ammount_paid.value < initial_pay ){
        alertError("ammount_paid_error","ammount_paid should not be empty and should be aleast 50%  *")
        ammount_paid.style.border = "1px solid red";
        ammount_paid.style.display = "inline-block";
    }
    else {
        alertError("ammount_paid_error"," ")
        ammount_paid.style.border = "none";
        ammount_paid_error = false; 
    };

    if(payment_time.value.length == " " || !payment_time.value.match(number)  ){
        alertError("payment_time_error","payment_time should not be empty and should be a number *")
        payment_time.style.border = "1px solid red";
        payment_time.style.display = "inline-block";
    }
    else {
        alertError("payment_time_error"," ")
        payment_time.style.border = "none";
        payment_time_error = false; 
    };

    if(purchase_receipt.value.length == " " ){
        alertError("purchase_receipt_error","purchase_receipt should not be empty *")
        purchase_receipt.style.border = "1px solid red";
        purchase_receipt.style.display = "inline-block";
    }
    else {
        alertError("purchase_receipt_error"," ")
        purchase_receipt.style.border = "none";
        purchase_receipt_error = false; 
    };


    if((customer_name_error || customer_ref_no_error || phone_number_error || email_error || address_error || national_id_no_error || referee_no_error || ammount_paid_error || payment_time_error || purchase_receipt_error )==true){
        event.preventDefault();
    }
    else{
        event.currentTarget.submit();
    }

}
