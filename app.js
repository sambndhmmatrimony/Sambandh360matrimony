const SUPABASE_URL = "https://mrzhtybkorajumzunsbr.supabase.co";
const SUPABASE_KEY = "sb_publishable_OpvjMBKiIqL-9tB-k5Xxhw_MkQhWBqz";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "sambandh360-auth"
    }
  }
);

async function register() {
  const message = document.getElementById("message");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const terms = document.getElementById("terms");

  if (!email || !password) {
    message.innerText = "Email और Password डालें";
    return;
  }

  if (terms && !terms.checked) {
    message.innerText = "Terms & Privacy स्वीकार करें";
    return;
  }

  const getValue = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  const formData = {
  full_name: getValue("full_name"),
  mobile: getValue("mobile"),
  gender: getValue("gender"),
  date_of_birth: getValue("date_of_birth"),
  age: Number(getValue("age")) || null,
  marital_status: getValue("marital_status"),
  height: getValue("height"),
  weight: getValue("weight"),
  complexion: getValue("complexion"),

  religion: getValue("religion"),
  caste: getValue("caste"),
  mother_tongue: getValue("mother_tongue"),

  city: getValue("city"),
  state: getValue("state"),

  education: getValue("education"),
  education_details: getValue("education_details"),
  college: getValue("college"),
  occupation: getValue("occupation"),
  company: getValue("company"),
  income: getValue("income"),

  father_name: getValue("father_name"),
  mother_name: getValue("mother_name"),
  siblings: getValue("siblings"),
  family_type: getValue("family_type"),
  family_status: getValue("family_status"),

  food_habit: getValue("food_habit"),
  smoking: getValue("smoking"),
  drinking: getValue("drinking"),

  about: getValue("about"),

  partner_age_min: Number(getValue("partner_age_min")) || null,
  partner_age_max: Number(getValue("partner_age_max")) || null,
  partner_height: getValue("partner_height"),
  partner_education: getValue("partner_education"),
  partner_occupation: getValue("partner_occupation"),
  partner_city: getValue("partner_city"),
  partner_religion: getValue("partner_religion"),
  partner_caste: getValue("partner_caste")
};

  message.innerText = "Registration हो रही है...";

  const { data, error } =
    await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: formData
      }
    });

  if (error) {
    message.innerText = "Registration असफल: " + error.message;
    return;
  }

  if (!data.user) {
    message.innerText = "Registration नहीं हो सकी।";
    return;
  }

  message.innerText =
    "Registration सफल! ✅ अब अपने Email को verify करें।";
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Email और Password डालें";
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
  email: email,
  password: password
});

if (error) {
  message.innerText = "Login असफल: " + error.message;
  return;
}

const { data: sessionData, error: sessionError } =
  await supabaseClient.auth.getSession();

if (sessionError || !sessionData.session) {
  message.innerText =
    "Login हुआ लेकिन Session नहीं बनी। कृपया फिर Login करें।";
  return;
}

message.innerText = "Login सफल हो गया! ✅";

setTimeout(() => {
  window.location.href = "profile.html";
}, 500);
}
async function forgotPassword() {
  const email = document.getElementById("email").value.replace(/\s+/g, "").toLowerCase();

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
