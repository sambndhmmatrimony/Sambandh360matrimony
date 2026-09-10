const SUPABASE_URL = "https://mrzhtybkorajumzunsbr.supabase.co";
const SUPABASE_KEY = "sb_publishable_OpvjMBKiIqL-9tB-k5Xxhw_MkQhWBqz";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email और Password डालें";
    return;
  }

  const { error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    message.innerText = error.message;
  } else {
    message.innerText = "Registration सफल! Email verify करें।";
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email और Password डालें";
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    message.innerText = "Login असफल: " + error.message;
  } else {
  message.innerText = "Login सफल हो गया! ✅";
  window.location.href = "profile.html";
}
}
async function forgotPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("पहले अपना Email डालें");
    return;
  }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset-password.html"
  });

  if (error) {
    alert("Password reset नहीं हुआ: " + error.message);
    return;
  }

  alert("Password reset link आपके Email पर भेज दिया गया है।");
}
