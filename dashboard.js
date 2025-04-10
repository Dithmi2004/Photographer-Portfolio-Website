document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

function fetchBookings() {
    fetch("fetch_bookings.php")
        .then(response => response.json())
        .then(data => {
            let bookingList = document.getElementById("booking-list");
            let pendingCount = 0, acceptedCount = 0, rejectedCount = 0;

            bookingList.innerHTML = "";

            data.forEach(booking => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${booking.full_name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.preferred_date}</td>
                    <td>${booking.session_type}</td>
                    <td class="${booking.status.toLowerCase()}">${booking.status}</td>
                    <td>
                        <button class="view" onclick="viewBooking(${booking.id})">👁</button>
                        <button class="accept" onclick="updateStatus(${booking.id}, 'Accepted')">✔</button>
                        <button class="reject" onclick="updateStatus(${booking.id}, 'Rejected')">✖</button>
                    </td>
                `;
                bookingList.appendChild(row);

                if (booking.status === "Pending") pendingCount++;
                if (booking.status === "Accepted") acceptedCount++;
                if (booking.status === "Rejected") rejectedCount++;
            });

            document.getElementById("pending-count").textContent = pendingCount;
            document.getElementById("accepted-count").textContent = acceptedCount;
            document.getElementById("rejected-count").textContent = rejectedCount;
        });
}

function updateStatus(id, status) {
    fetch("update_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}&status=${status}`
    })
    .then(response => response.text())
    .then(() => fetchBookings());
}
