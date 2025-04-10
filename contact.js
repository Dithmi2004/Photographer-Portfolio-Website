document.addEventListener("DOMContentLoaded", function () {
    // Ensure EmailJS is initialized
    if (!emailjs) {
        console.error("EmailJS not loaded properly.");
        return;
    }

    // Attach event listener to form
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        // Send email using EmailJS
        emailjs.send("service_psvhxov", "template_wh0ur1v", params)
            .then(function (response) {
                alert("Message sent successfully!");
                console.log("Email sent:", response);
                document.getElementById("contact-form").reset(); // Clear form after sending
            })
            .catch(function (error) {
                alert("Failed to send message. Please try again later.");
                console.error("Error:", error);
            });
    });
});
