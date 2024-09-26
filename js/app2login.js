let email = document.querySelector("#email")
let password = document.querySelector("#password")
let btnSignIn = document.querySelector("#btn-signin")

let getemail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

btnSignIn.addEventListener("click", function (e) {
    e.preventDefault() // prevent loading = refresh, this function make swaping from page to another page
    // value=> user elly hyd5lha

    if (email.value === "" || password.value === "") {
        alert("Make Sure To Fill In The Data ")
    } else { // = submit
        if (getemail && getemail.trim() === email.value.trim() && getPassword && getPassword.trim() === password.value) {
            setTimeout(() => {
                window.location = "index.html"
            }, 1500) // after 1.5s , user swap to loginPage 
        } else {
            alert(" your password or user incorrect")
        }

    }

})