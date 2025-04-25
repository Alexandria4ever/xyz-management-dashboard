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



// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const videoFile = document.getElementById('videoFile').files[0];
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoCategory = document.getElementById('videoCategory').value;

    // You can handle the file upload logic here, for example using Firebase storage

    // For now, we'll just log the info and add it to the video management table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${videoTitle}</td>
        <td>${videoCategory}</td>
        <td>${new Date().toLocaleString()}</td>
        <td><button class="btn btn-danger btn-sm">Delete</button></td>
    `;

    document.getElementById('videoTableBody').appendChild(newRow);

    // Reset form after submission
    document.getElementById('uploadForm').reset();
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('userNameSpan').innerHTML = user.displayName || user.email;
    }
});