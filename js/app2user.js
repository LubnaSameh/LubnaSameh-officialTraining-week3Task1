const userInfo = document.querySelector("#user-info");
const user = document.querySelector("#user");
const links = document.querySelector("#links"); // May be needed for future use

// put his name user in website, when have an account or sign up
function checkLogin() {
  if (localStorage.getItem("email")) {
    const firstName = localStorage.getItem("firstname");
    userInfo.style.display = "flex";
    user.classList.add("welcome-message"); // Add the class here
    user.textContent = `Welcome ${firstName}`;

    // Remove login/signup links if they exist in the DOM
    const loginSignupLinks = document.querySelectorAll('.login-signup'); // Adjust selector if needed
    if (loginSignupLinks.length > 0) {
      loginSignupLinks.forEach(link => link.remove());
    }
  }
}

checkLogin();

/////////////////////////////////////////////////////////////
// Handle log out button click
const logoutButton = document.querySelector("#logout");
if (logoutButton) { // Check if logout button exists
  logoutButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "app2login.html";
    setTimeout(() => {
      alert("You have been logged out.");
    }, 1500);
  });
}

//////////////////////////
