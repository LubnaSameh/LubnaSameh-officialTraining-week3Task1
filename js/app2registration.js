
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let firstname = document.querySelector("#firstname")
let lastName = document.querySelector("#lastName")

let btnSignUp = document.querySelector("#btn-signup")
btnSignUp.addEventListener("click", function(e) {
    e.preventDefault() // prevent loading = refresh, this function make swaping from page to another page
    // value=> user elly hyd5lha

    if ( email.value === "" ||
        password.value === "" ||
        firstname.value === "" ||
        lastName.value === "") {
        alert("Make Sure To Fill In The Data ")
    } else { // = submit
     
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        localStorage.setItem("firstname", firstname.value);
        localStorage.setItem("lastName", lastName.value);
        setTimeout(() => {
            window.location = "app2login.html"
        }, 1500) // after 1.5s , user swap to loginPage 
    }

})
