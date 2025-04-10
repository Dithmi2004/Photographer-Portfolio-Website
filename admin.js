// Animation functionality
const inputs = document.querySelectorAll(".input");  

function addcl() {
    let parent = this.parentNode.parentNode; 
    parent.classList.add("focus");
} 

function remcl() {
    let parent = this.parentNode.parentNode; 	
    if(this.value == "") { 		
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => { 	
    input.addEventListener("focus", addcl); 	
    input.addEventListener("blur", remcl);
});

// Login validation logic
let attempts = 3;
const correctUsername = "malcolm";
const correctPassword = "password1234";


function validateLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    

    if (user === correctUsername && pass === correctPassword) {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        window.location.href = "dashboard.html";
        return false;
    } else {
        attempts--;
        if (attempts > 0) {
            errorMsg.textContent = `Incorrect login. ${attempts} attempt(s) remaining.`;
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";

        } else {
            errorMsg.textContent = "Too many failed attempts. Login disabled.";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";

            document.querySelector(".btn").disabled = true;
        }
        return false;
    }
}
