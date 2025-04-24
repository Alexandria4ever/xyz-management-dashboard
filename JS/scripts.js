document.addEventListener("DOMContentLoaded", function () {
    console.log("scripts.js loaded");
    const canvas = document.getElementById("starsCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let stars = [];
  
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars(100);
      }
  
      function createStars(count) {
        stars = [];
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            brightness: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
          });
        }
      }
  
      function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let star of stars) {
          star.brightness += star.speed;
          if (star.brightness > 1 || star.brightness < 0.2) {
            star.speed *= -1;
          }
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
          ctx.fill();
        }
        requestAnimationFrame(drawStars);
      }
  
      resizeCanvas();
      drawStars();
      window.addEventListener("resize", resizeCanvas);
    }
  
    
  
  });
  