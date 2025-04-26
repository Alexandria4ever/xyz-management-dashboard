import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
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
const auth = getAuth(app);                 

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameSpan = document.getElementById('userNameSpan');

    onAuthStateChanged(auth, (user) => {
        if (user && userNameSpan) {
            userNameSpan.innerHTML = user.displayName || user.email;
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                alert("Logout error: " + error.message);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                alert("Logout error: " + error.message);
            });
        });
    }
});

import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const db = getFirestore(app); // Already initialized above

async function displayUploadedVideos() {
    const container = document.getElementById('uploadedVideosContainer');
    const videosRef = collection(db, 'videos');

    try {
        const snapshot = await getDocs(videosRef);
        snapshot.forEach((doc) => {
            const video = doc.data();

            const card = document.createElement('div');
            card.className = 'col-md-4 mt-3';

            card.innerHTML = `
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title">${video.title || 'Untitled Video'}</h5>
                        <p class="card-text"><strong>Topic:</strong> ${video.topic || 'N/A'}</p>
                        <p class="card-text">${video.description || 'No description'}</p>
                        <p class="card-text text-muted"><small>By: ${video.uploadedBy || 'Unknown'}</small></p>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayUploadedVideos();
});


