import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDiTIyDQBpYPsQ5KOMnd9dDUTK5Cz6krtE",
  authDomain: "xyz-management-dashboard.firebaseapp.com",
  projectId: "xyz-management-dashboard",
  storageBucket: "xyz-management-dashboard.appspot.com",
  messagingSenderId: "864438626372",
  appId: "1:864438626372:web:a90d573bd900ed7c637411"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Add staff
document.getElementById('staffForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('staffName').value.trim();
  const email = document.getElementById('staffEmail').value.trim();
  const role = document.getElementById('staffRole').value.trim();

  if (!name || !email || !role) return alert("Fill all fields!");

  try {
    await addDoc(collection(db, "staff"), {
      name,
      email,
      role,
      addedAt: new Date()
    });

    document.getElementById('staffForm').reset();
  } catch (err) {
    console.error("Error adding staff:", err);
    alert("Failed to add staff.");
  }
});

// Display staff
const staffList = document.getElementById('staffList');
onSnapshot(collection(db, "staff"), (snapshot) => {
  staffList.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement('li');
    li.className = "list-group-item bg-dark text-white d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span><strong>${data.name}</strong> | ${data.email} | ${data.role}</span>
      <button class="btn btn-sm btn-danger" data-id="${docSnap.id}">Delete</button>
    `;
    staffList.appendChild(li);
  });
});

// Delete staff
staffList.addEventListener('click', async (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute('data-id');
    if (confirm("Delete this staff member?")) {
      await deleteDoc(doc(db, "staff", id));
    }
  }
});
