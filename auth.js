// auth.js

const SUPABASE_URL = 'https://toclbphgnqpzswkqktxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvY2xicGhnbnFwenN3a3FrdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTQ5NTgsImV4cCI6MjA2NzY3MDk1OH0.SFnaG6dy0FffPBfZXN3mpdEIYG95H9X7Jl_c7F_NP04';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function sendConfirmation() {
  const email = document.getElementById("email").value.trim();
  if (!email) return alert("Please enter your email");

  document.getElementById("step-email").style.display = "none";
  document.getElementById("step-confirm").style.display = "block";
  document.getElementById("step-password").style.display = "block";
}

function checkStrength() {
  const strength = document.getElementById("strength-meter");
  const password = document.getElementById("password").value;
  if (password.length < 6) strength.textContent = "❌ Too weak";
  else if (password.length < 10) strength.textContent = "⚠️ Medium";
  else strength.textContent = "✅ Strong";
}

async function registerAccount() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const country = document.getElementById("country").value;

  if (!email || !password || !confirm || !country) return alert("Please complete all fields.");
  if (password !== confirm) return alert("Passwords do not match.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { country },
      emailRedirectTo: "http://localhost:5500/login.html"
    }
  });

  if (error) {
    alert("❌ " + error.message);
  } else {
    document.getElementById("step-password").style.display = "none";
    document.getElementById("step-confirm").innerHTML =
      "✅ Please check your email to verify and complete registration.";
    document.getElementById("step-confirm").style.display = "block";
  }
}
