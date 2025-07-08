// ======================
// USER SIGNUP FORM
// ======================
document.querySelector("#userSignupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    alert("User Sign-Up Successful!");
  });
  
  // ======================
  // LABOUR SIGNUP FORM (NEW)
  // ======================
  document.querySelector("#labourSignupForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("labourName").value;
    const email = document.getElementById("labourEmail").value;
    const password = document.getElementById("labourPassword").value;
    const confirmPassword = document.getElementById("labourConfirmPassword").value;
    const phone = document.getElementById("labourPhone").value;
    const place = document.getElementById("labourPlace").value;
    const skill = document.getElementById("labourSkill").value === "Other" 
                 ? document.getElementById("otherSkill").value 
                 : document.getElementById("labourSkill").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/labour/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, place, skill })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Labour registration successful!");
        window.location.href = "labor-login.html";
      } else {
        alert(`Error: ${data.message || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Labour signup error:", error);
      alert("Network error. Please try again.");
    }
  });
  
  // ======================
  // FEEDBACK FORM
  // ======================
  document.querySelector("#feedbackForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for your feedback!");
  });
  
  // ======================
  // COMPLAINT FORM
  // ======================
  document.querySelector("#complaintForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Your complaint has been submitted. We will get back to you shortly!");
  });
  
  // ======================
  // LABOUR LISTING FUNCTIONALITY
  // ======================
  document.addEventListener("DOMContentLoaded", function () {
    const labourData = [
      { name: "John Doe", type: "plumber", location: "New York", rating: 4, feedback: "Great worker!" },
      { name: "Alex Smith", type: "electrician", location: "Los Angeles", rating: 5, feedback: "Very professional!" },
      // ... (keep your existing labourData array)
    ];
  
    // ... (keep your existing renderLabours(), generateStars(), and event listeners)
  });
  
  // ======================
  // PROFILE PICTURE UPLOAD
  // ======================
  document.getElementById("changeProfilePicButton")?.addEventListener("click", function() {
    document.getElementById("profilePicInput").click();
  });
  
  document.getElementById("profilePicInput")?.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById("profilePic").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // ======================
  // BOOKING FORM
  // ======================
  document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    // ... (keep your existing booking form logic)
  });
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        select: function(info) {
            // Mark the selected date(s) as available (green)
            var selectedDate = info.startStr;
            calendar.addEvent({
                title: 'Available',
                start: selectedDate,
                allDay: true,
                color: 'green'
            });

            // You can make an API call here to save the availability on the backend

            alert('Date selected: ' + selectedDate);
        }
    });

    calendar.render();

    // Fetch and display booking requests dynamically
    fetchBookings();
});

// Function to fetch booking requests and display them in the list
function fetchBookings() {
    // For the sake of example, this will simulate a static list of booking requests
    const bookings = [
        { id: 1, user: 'User1', status: 'pending' },
        { id: 2, user: 'User2', status: 'pending' }
    ];

    const bookingList = document.getElementById('bookingRequests');

    bookings.forEach(booking => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            Booking #${booking.id} - ${booking.user}
            <div>
                <button class="btn btn-success btn-sm" onclick="acceptBooking(${booking.id})">Accept</button>
                <button class="btn btn-danger btn-sm" onclick="rejectBooking(${booking.id})">Reject</button>
            </div>
        `;
        bookingList.appendChild(listItem);
    });
}

// Function to handle booking acceptance
function acceptBooking(bookingId) {
    alert(`Booking #${bookingId} accepted`);
    // You can send a request to the backend to update the booking status to 'confirmed'
}

// Function to handle booking rejection
function rejectBooking(bookingId) {
    alert(`Booking #${bookingId} rejected`);
    // You can send a request to the backend to update the booking status to 'cancelled'
}
