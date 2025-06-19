// Signup Page Validation
function validateSignupForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Enter a valid email address.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  alert("Signup successful!");
  window.location.href = "index.html";
  return false;
}

// Login Page Validation
function validateLoginForm() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }

  alert("Login successful!");
  window.location.href = "home.html";
  return false;
}

// Contact Page Validation
function validateContactForm() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Enter a valid email address.");
    return false;
  }

  alert("Thank you for contacting us!");
  return false;
}

// Home Page Newsletter Validation (Optional)
function validateNewsletterForm() {
  const email = document.getElementById("newsletterEmail").value.trim();

  if (!email) {
    alert("Please enter your email.");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }

  alert("Thank you for subscribing!");
  return false;
}