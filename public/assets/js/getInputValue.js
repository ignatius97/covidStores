
function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("price").value;
    var intervals = document.getElementById("intervals").value;
    var initial_pay = inputVal * 0.5
    var pay_interval_cash = initial_pay / intervals
    document.getElementById("initial_pay").value = initial_pay;
    document.getElementById("pay_interval_cash").value = pay_interval_cash;

    var now = new Date();
    var current_date = now.setDate(now.getDate());
    document.getElementById("date").value = current_date;

    // form validation
    var product_name = document.product_form.product_name;
    //var price = document.product_form.price;
    var category = document.product_form.category;
    var product_image = document.product_form.product_image;
    var make = document.product_form.make;
    var serial_number = document.product_form.serial_number;
    var color = document.product_form.color;
    var number_in_stock = document.product_form.number_in_stock;
    var pay_interval = document.product_form.pay_interval;

    var number = /^[0-9]+$/;
    var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    var capitalLetters = /^[A-Z]+$/;
    var alphanumeric = /^[A-Z0-9]+$/;

    function alertError(errId,errMsg){
        document.getElementById(errId).innerHTML = errMsg;
    }

    var product_name_error = price_error = category_error = product_image_error = make_error=serial_number_error=color_error=number_in_stock_error=pay_interval_error = true;

        if(product_name.value.length == " " || !product_name.value.match(letters)   ){
            alertError("product_name_error","Product Name should not be empty and should have only characters *")
            product_name.style.border = "1px solid red";
            product_name.style.display = "inline-block";
              
        }
        else {
            alertError("product_name_error"," ")
            product_name.style.border = "none";
            product_name_error = false; 
        };

        if(price.value.length == " " || !price.value.match(number)  ){
            alertError("price_error","Price field should not be empty and should be a number *")
            price.style.border = "1px solid red";
            price.style.display = "inline-block";
        }
        else {
            alertError("price_error"," ")
            price.style.border = "none";
            price_error = false; 
        }
        
        if(category.value.length == " " || category.value.match(number)  ){
            alertError("category_error","Category field should not be empty and should be a number *")
            category.style.border = "1px solid red";
            category.style.display = "inline-block";
        }
        else {
            alertError("category_error"," ")
            category.style.border = "none";
            category_error = false; 
        }
        // checking if the user has selected an image
        if(product_image.value.length == " " ){
            alertError("product_image_error","Please Select an image *")
            product_image.style.border = "1px solid red";
            product_image.style.display = "inline-block";
        }
        else {
            alertError("product_image_error"," ")
            product_image.style.border = "none";
            pay_interval_error = false; 
        }

        if(make.value.length < 2 || make.value.length > 2 || !make.value.match(capitalLetters)   ){
            alertError("make_error","Make should only have 2 letters and in Capital *")
            make.style.border = "1px solid red";
            make.style.display = "inline-block";
        }
        else {
            alertError("make_error"," ")
            make.style.border = "none";
            make_error = false; 
        }
        
        if(serial_number.value.length < 6 || serial_number.value.length > 22 || !serial_number.value.match(alphanumeric)  ){
            alertError("serial_number_error","Serial No should have 6-22 alphanumberic Characters *")
            serial_number.style.border = "1px solid red";
            serial_number.style.display = "inline-block";
        }
        else {
            alertError("serial_number_error"," ")
            serial_number.style.border = "none";
            serial_number_error = false; 
        }
        if(color.value.length ==" "  ){
            alertError("color_error","Color should not be left empty *")
            color.style.border = "1px solid red";
            color.style.display = "inline-block";
        }
        else {
            alertError("color_error"," ")
            color.style.border = "none";
            color_error = false; 
        }
        if(number_in_stock.value.length < 1 || !number_in_stock.value.match(number)  ){
            alertError("number_in_stock_error","No in Stock should not be empty and should be a number *")
            number_in_stock.style.border = "1px solid red";
            number_in_stock.style.display = "inline-block";
        }
        else {
            alertError("number_in_stock_error"," ")
            number_in_stock.style.border = "none";
            number_in_stock_error = false; 
        }
    

        if(pay_interval.value.length < 1 || !pay_interval.value.match(number)  ){
            alertError("pay_interval_error","Pay Interval should not be less than 1 and should be a number *")
            pay_interval.style.border = "1px solid red";
            pay_interval.style.display = "inline-block";
        }
        else {
            alertError("pay_interval_error"," ")
            pay_interval.style.border = "none";
            pay_interval_error = false; 
        }

    


    if((product_name_error || price_error || category_error  || make_error || serial_number_error || color_error || number_in_stock_error || pay_interval_error )==true){
        event.preventDefault();
    }
    else{
        event.currentTarget.submit();
    }

}


