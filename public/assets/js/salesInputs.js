function salesInputs(){
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

    if(customer_name.value.length == " " || !customer_name.value.match(letters)  ){
        document.getElementById("customer_name_error").innerHTML="Customer Name should not be empty and should have only characters *";
        customer_name.style.border = "1px solid red";
        customer_name.style.color = "red";
        customer_name.style.display = "inline-block";
        return false;   
    }
    if(customer_ref_no.value.length == " " || !customer_ref_no.value.match(alphanumeric)  ){
        document.getElementById("customer_ref_no_error").innerHTML="Customer ref No should not be empty and should be alphanumeric *";
        customer_ref_no.style.border = "1px solid red";
        customer_ref_no.style.color = "red";
        customer_ref_no.style.display = "inline-block";
        return false;   
    }
    if(phone_number.value.length == " " ){
        document.getElementById("phone_number_error").innerHTML="Phone number should not be empty *";
        phone_number.style.border = "1px solid red";
        phone_number.style.color = "red";
        phone_number.style.display = "inline-block";
        return false;   
    }
    if(email.value.length == " " ){
        document.getElementById("email_error").innerHTML="Email should not be empty *";
        email.style.border = "1px solid red";
        email.style.color = "red";
        email.style.display = "inline-block";
        return false;   
    }
    if(address.value.length == " " ){
        document.getElementById("address_error").innerHTML="Address should not be empty *";
        address.style.border = "1px solid red";
        address.style.color = "red";
        address.style.display = "inline-block";
        return false;   
    }
    if(national_id_no.value.length == " " ){
        document.getElementById("national_id_no_error").innerHTML="national_id_no should not be empty *";
        national_id_no.style.border = "1px solid red";
        national_id_no.style.color = "red";
        national_id_no.style.display = "inline-block";
        return false;   
    }
    if(referee_no.value.length == " " ){
        document.getElementById("referee_no_error").innerHTML="referee_no should not be empty *";
        referee_no.style.border = "1px solid red";
        referee_no.style.color = "red";
        referee_no.style.display = "inline-block";
        return false;   
    }
    if(ammount_paid.value.length == " " || ammount_paid.value < initial_pay ){
        document.getElementById("ammount_paid_error").innerHTML="ammount_paid should not be empty and should be aleast 50% *";
        ammount_paid.style.border = "1px solid red";
        ammount_paid.style.color = "red";
        ammount_paid.style.display = "inline-block";
        return false;   
    }
    if(payment_time.value.length == " " || !payment_time.value.match(number)  ){
        document.getElementById("payment_time_error").innerHTML="payment_time should not be empty and should be a number *";
        payment_time.style.border = "1px solid red";
        payment_time.style.color = "red";
        payment_time.style.display = "inline-block";
        return false;   
    }
    if(purchase_receipt.value.length == " " ){
        document.getElementById("purchase_receipt_error").innerHTML="purchase_receipt should not be empty *";
        purchase_receipt.style.border = "1px solid red";
        purchase_receipt.style.color = "red";
        purchase_receipt.style.display = "inline-block";
        return false;   
    }




}
