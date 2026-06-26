export const triggerConfetti = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ["#32CD32", "#ffffff", "#4ade80"];
  
  // Create particles
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 22 - 6,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01
    });
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach(p => {
      if (p.alpha > 0) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5; // Gravity force
        p.alpha -= p.decay;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        active = true;
      }
    });
    if (active) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  animate();
};
