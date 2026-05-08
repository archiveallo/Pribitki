// Firebase Configuration (Приклад)
const firebaseConfig = {
  apiKey: "AIzaSyBRJzUm5zYrsXLSGA7iGGoBZ6bblHnTONs",
  authDomain: "moe-selo-76a49.firebaseapp.com",
  projectId: "moe-selo-76a49",
  storageBucket: "moe-selo-76a49.firebasestorage.app",
  messagingSenderId: "446551102286",
  appId: "1:446551102286:web:08ec3b9a8b3c966dcc441f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Alpine.js Store for Global State
document.addEventListener('alpine:init', () => {
    Alpine.store('auth', {
        user: null,
        isAdmin: false,
        async login() {
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider);
            this.user = res.user;
            this.isAdmin = res.user.email === 'restend88@gmail.com';
        },
        logout() {
            auth.signOut();
            this.user = null;
            this.isAdmin = false;
        }
    });
});

// GSAP General Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 50, opacity: 0, duration: 1, ease: "power2.out"
        });
    });
}

// Drag-to-scroll logic for Gallery
function initGalleryDrag() {
    const slider = document.querySelector('.drag-ribbon');
    if (!slider) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

window.onload = () => {
    initAnimations();
    initGalleryDrag();
};