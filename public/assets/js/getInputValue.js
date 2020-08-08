
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

    // function product_name_function(){
        if(product_name.value.length == " " || !product_name.value.match(letters)  ){
            document.getElementById("product_name_error").innerHTML="Product Name should not be empty and should have only characters *";
            product_name.style.border = "1px solid red";
            product_name.style.color = "red";
            product_name.style.display = "inline-block";
            return false;
            
        }
    // }


    // function price_function(){
        if(price.value.length == " " || !price.value.match(number)  ){
            document.getElementById("price_error").innerHTML="Price field should not be empty and should be a number *";
            price.style.border = "1px solid red";
            price.style.color = "red";
            price.style.display = "inline-block";
            return false;
        }
    // }

    // function category_function(){
        if(category.value.length == " " || category.value.match(number)  ){
            document.getElementById("category_error").innerHTML="Category field should not be empty and should be a number *";
            category.style.border = "1px solid red";
            category.style.color = "red";
            category.style.display = "inline-block";
            return false;
        }
    // }



    
    // function make_function(){
        if(make.value.length < 2 || make.value.length > 2 || !make.value.match(capitalLetters)   ){
            document.getElementById("make_error").innerHTML="Make should only have 2 letters and in Capital *";
            make.style.border = "1px solid red";
            make.style.color = "red";
            make.style.display = "inline-block";
            return false;
        };
    // }
    // function serial_number_function(){
        if(serial_number.value.length < 6 || serial_number.value.length > 22 || !serial_number.value.match(alphanumeric)  ){
            document.getElementById("serial_number_error").innerHTML="Serial No should have 6-22 alphanumberic Characters *";
            serial_number.style.border = "1px solid red";
            serial_number.style.color = "red";
            serial_number.style.display = "inline-block";
            return false;
        };
    // }

    // function color_function(){
        if(color.value.length ==" "  ){
            document.getElementById("color_error").innerHTML="Color should not be left empty *";
            color.style.border = "1px solid red";
            color.style.color = "red";
            color.style.display = "inline-block";
            return false;
        };
    // }

    // function number_in_stock_function(){
        if(number_in_stock.value.length < 1 || !number_in_stock.value.match(number)  ){
            document.getElementById("number_in_stock_error").innerHTML="No in Stock should not be empty and should be a number *";
            number_in_stock.style.border = "1px solid red";
            number_in_stock.style.color = "red";
            number_in_stock.style.display = "inline-block";
            return false;
        };
    // }

    // function pay_interval_function(){
        if(pay_interval.value.length < 1 || !pay_interval.value.match(number)  ){
            document.getElementById("pay_interval_error").innerHTML="Pay Interval should not be less than 1 and should be a number *";
            pay_interval.style.border = "1px solid red";
            pay_interval.style.color = "red";
            pay_interval.style.display = "inline-block";
            return false;
        };
    // }

    // function product_image_function(){
    // checking if the user has selected an image
        if(product_image.value.length == " " ){
            document.getElementById("product_image_error").innerHTML="Please Select an image *";
            product_image.style.border = "1px solid red";
            product_image.style.color = "red";
            product_image.style.display = "inline-block";
            return false;
        };
    // }

    // product_name_function();
    // price_function();
    // category_function(); 
    // make_function();
    // serial_number_function();
    // color_function();
    // number_in_stock_function();
    // pay_interval_function();
    // product_image_function();



}


// ;
// 
