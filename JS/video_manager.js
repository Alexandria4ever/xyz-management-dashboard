import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { getFirestore, collection, addDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDiTIyDQBpYPsQ5KOMnd9dDUTK5Cz6krtE",
  authDomain: "xyz-management-dashboard.firebaseapp.com",
  projectId: "xyz-management-dashboard",
  storageBucket: "xyz-management-dashboard.appspot.com",
  messagingSenderId: "864438626372",
  appId: "1:864438626372:web:a90d573bd900ed7c637411"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Gemini API config
const GEMINI_API_KEY = "AIzaSyDEt3wjhYckM0vP_70cU8S6hJtnzrD5qps";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// State
let aiTitle = "";
let aiDesc = "";
let userPrompt = "";

// Generate title and description
document.getElementById('generateBtn').addEventListener('click', async () => {
  userPrompt = document.getElementById('videoPrompt').value.trim();
  if (!userPrompt) return alert("Please enter what the video is about.");

  const body = {
    contents: [{
      parts: [{ text: `Generate a YouTube-style title and short description for a video about: "${userPrompt}". Make sure you're not too cringe. make the title generally short and concise. Make sure not to use too many emojis. Don't use any formatting. Make it like game reviewers normally make video game review video titles. Format it as:\nTitle: ...\nDescription: ...` }]
    }]
  };

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const titleMatch = reply.match(/Title:\s*(.*)/i);
    const descMatch = reply.match(/Description:\s*(.*)/i);

    aiTitle = titleMatch?.[1] || "Untitled";
    aiDesc = descMatch?.[1] || "No description";

    document.getElementById('videoTitle').value = aiTitle;
    document.getElementById('videoDescription').value = aiDesc;
  } catch (err) {
    console.error("Gemini error:", err);
    alert("Failed to generate title and description.");
  }
});

// Upload to Firestore
document.getElementById('uploadBtn').addEventListener('click', async (e) => {
    e.preventDefault(); 
  
    if (!aiTitle || !aiDesc || !userPrompt) {
      return alert("Please generate a title and description first.");
    }
  
    try {
        await addDoc(collection(db, "videos"), {


        title: aiTitle,
        description: aiDesc,
        topic: userPrompt,
        uploadedBy: auth.currentUser?.uid || "anonymous",
        timestamp: new Date()
      });
      alert("Video data saved to Firestore!");
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      alert("Failed to upload video data.");
    }
  });
  

// Show logged-in user's name or email
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('userNameSpan').textContent = user.displayName || user.email;
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

