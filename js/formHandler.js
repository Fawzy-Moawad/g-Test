document.getElementById('appointmentForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const reason = document.getElementById('reason').value;
  const bestTime = document.getElementById('bestTime').value;
  const message = document.getElementById('message').value;

  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      date,
      reason,
      bestTime,
      message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.querySelector('.sent-message').style.display = 'block';
      document.getElementById('appointmentForm').reset();
    } else {
      document.querySelector('.error-message').innerHTML = data.error;
      document.querySelector('.error-message').style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.querySelector('.error-message').innerHTML = 'There was an error submitting the form. Please try again.';
    document.querySelector('.error-message').style.display = 'block';
  });
});
