document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter_buttons button");
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filter_buttons .active").classList.remove("active");
            button.classList.add("active");

            const filterName = button.getAttribute("data-name");

            cards.forEach(card => {
                const cardCategory = card.getAttribute("data-name");
                card.style.display = (filterName === "all" || filterName === cardCategory) ? "block" : "none";
            });
        });
    });

    // Image popup functionality
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img").src;
            modal.style.display = "flex";
            modalImage.src = img;
        });
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the image
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
