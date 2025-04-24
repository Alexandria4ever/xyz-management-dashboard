import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

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
const db = getFirestore(app);

const signup_form = document.getElementById("signup_form");

if (signup_form) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const dob = document.getElementById("dob");
  const googleSignUpButton = document.getElementById("googleSignUpButton");

  signup_form.addEventListener("input", function () {
    name.classList.toggle("is-valid", name.value.trim() !== "");
    name.classList.toggle("is-invalid", name.value.trim() === "");

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    email.classList.toggle("is-valid", email.value.match(emailPattern));
    email.classList.toggle("is-invalid", !email.value.match(emailPattern));

    password.classList.toggle("is-valid", password.value.trim() !== "");
    password.classList.toggle("is-invalid", password.value.trim() === "");

    confirmPassword.classList.toggle("is-valid", confirmPassword.value === password.value);
    confirmPassword.classList.toggle("is-invalid", confirmPassword.value !== password.value);

    dob.classList.toggle("is-valid", !!dob.value);
    dob.classList.toggle("is-invalid", !dob.value);
  });

  signup_form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (signup_form.checkValidity() && password.value === confirmPassword.value) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;

          setDoc(doc(db, "users", user.uid), {
            name: name.value,
            email: email.value,
            dob: dob.value,
          }).then(() => {
            window.location.href = "/dashboard.html";
          }).catch((error) => {
            alert("Error saving data: " + error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      signup_form.classList.add("was-validated");
    }
  });

  googleSignUpButton.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            dob: "", // Google doesn’t give DOB, so leave it blank or ask later
          }).then(() => {
            window.location.href = "/dashboard.html";
          }).catch((error) => {
            alert("Error saving data: " + error.message);
          });
          
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
}
