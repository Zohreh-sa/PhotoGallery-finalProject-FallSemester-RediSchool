// console.log("Hello user!");

// Array of users (add more users as needed)
const users = [
    {
        email: "user@gmail.com",
        username: "Zohreh",
        password: "123456"
    }
];


const span = document.getElementById("log-alert")
// Add an event listener for the form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get email and password values
    const email = document.getElementById("email").value.trim(); /* Trim used to remove white spaces */
    const password = document.getElementById("password").value.trim();

    // Validation checks
    if (email === "" || password === "") {
        alert("Both email and password fields are required.");
        return false;
    }

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        span.innerHTML = ("Please enter a valid email address.");
        return;
    }

    // Check if the user exists in the array
    const user = users.find(user => user.email === email && user.password === password);


    if (user) {

        //save user's data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to index.html
        window.location.href = "./index.html";

    } else {


        span.innerHTML = ("Invalid email or password. Please try again.");
    }
});

