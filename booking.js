document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_bookings.php", true);
    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        var pending = 0, accepted = 0, rejected = 0;
        var tbody = document.getElementById("booking-list");

        data.forEach(function (b) {
            if (b.status === "Pending") pending++;
            else if (b.status === "Accepted") accepted++;
            else if (b.status === "Rejected") rejected++;

            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${b.full_name}</td>
                <td>${b.email}</td>
                <td>${b.preferred_date}</td>
                <td>${b.session_type}</td>
                <td>${b.status}</td>
                <td>
                    <button class="accept" onclick="updateBooking(${b.id}, 'Accepted', '${b.email}')">✔</button>
                    <button class="reject" onclick="updateBooking(${b.id}, 'Rejected', '${b.email}')">✖</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById("pending-count").textContent = pending;
        document.getElementById("accepted-count").textContent = accepted;
        document.getElementById("rejected-count").textContent = rejected;
    };
    xhr.send();
});

function updateBooking(id, status, email) {
    var params = `id=${id}&status=${status}&email=${encodeURIComponent(email)}`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "update_status.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        if (xhr.status == 200) {
            alert(xhr.responseText);
            location.reload();
        }
    };
    xhr.send(params);
}
