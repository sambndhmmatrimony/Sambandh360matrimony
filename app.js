const SUPABASE_URL = "अपना_PROJECT_URL_यहाँ_डालें";
const SUPABASE_KEY = "अपनी_PUBLISHABLE_KEY_यहाँ_डालें";

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
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.innerText = error.message;
  } else {
    message.innerText = "Login सफल हो गया! ✅";
  }
}
