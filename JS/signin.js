import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDiTIyDQBpYPsQ5KOMnd9dDUTK5Cz6krtE",
  authDomain: "xyz-management-dashboard.firebaseapp.com",
  projectId: "xyz-management-dashboard",
  storageBucket: "xyz-management-dashboard.firebasestorage.app",
  messagingSenderId: "864438626372",
  appId: "1:864438626372:web:a90d573bd900ed7c637411"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signinForm = document.getElementById("signin_form");

if (signinForm) {
  const email = document.getElementById("signin-email");
  const password = document.getElementById("signin-password");
  const googleSignInBtn = document.getElementById("google-sign-in");

  // Input validation
  signinForm.addEventListener("input", function () {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    email.classList.toggle("is-valid", email.value.match(emailPattern));
    email.classList.toggle("is-invalid", !email.value.match(emailPattern));

    password.classList.toggle("is-valid", password.value.trim() !== "");
    password.classList.toggle("is-invalid", password.value.trim() === "");
  });

  // Email/password sign-in
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (signinForm.checkValidity()) {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          window.location.href = "/dashboard.html";
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    } else {
      signinForm.classList.add("was-validated");
    }
  });

  // Google sign-in
  googleSignInBtn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
}
