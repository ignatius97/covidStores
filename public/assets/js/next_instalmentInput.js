function next_instalmentInput(){ 
    console.log("holle")
    var price = parseInt(document.getElementById("price").value);
    var total = parseInt(document.getElementById("total").value);
    var balance = parseInt(document.getElementById("balance").value);

    var pay_interval_left = parseInt(document.getElementById("pay_interval_left").value);
    var new_pay_interval_left = pay_interval_left - 1;
    document.getElementById("new_pay_interval_left").value = new_pay_interval_left;

    var old_next_payable_amount = parseInt(document.getElementById("old_next_payable_amount").value);
    var next_instalment = parseInt(document.getElementById("next_instalment").value);
    var new_total = total + next_instalment;
    var new_balance = price - new_total;
    var new_next_payable_amount = new_balance / new_pay_interval_left;

    document.getElementById("next_payable_amount").value = new_next_payable_amount;
    document.getElementById("ammount_paid").value = next_instalment;
    document.getElementById("new_total").value = new_total;
    document.getElementById("new_balance").value = new_balance;


    var next_instalment = document.next_instalment_form.next_instalment;

    var number = /^[0-9]+$/;

    if(next_instalment.value.length == " " || !next_instalment.value.match(number) || next_instalment.value < old_next_payable_amount || next_instalment.value > balance  ){
        document.getElementById("next_instalment_error").innerHTML="Next Instalment should not be empty, should be numbers, should not be less than the next payable amount and should not be greater than the balance *";
        next_instalment.style.border = "1px solid red";
        next_instalment.style.color = "red";
        next_instalment.style.display = "inline-block";
        return false;   
    }
}

