/* ================================
   background.js – Animated Gradient
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    [0, 168, 107],
    [0, 121, 191],
    [255, 94, 98],
    [255, 179, 71]
  ];

  let step = 0;
  const colorIndices = [0, 1, 2, 3];
  const gradientSpeed = 0.002;

  function updateGradient() {
    if (!document.body) return;

    const c0_0 = colors[colorIndices[0]];
    const c0_1 = colors[colorIndices[1]];
    const c1_0 = colors[colorIndices[2]];
    const c1_1 = colors[colorIndices[3]];

    const istep = 1 - step;
    const color1 = `rgb(${Math.round(istep * c0_0[0] + step * c0_1[0])}, ${Math.round(istep * c0_0[1] + step * c0_1[1])}, ${Math.round(istep * c0_0[2] + step * c0_1[2])})`;
    const color2 = `rgb(${Math.round(istep * c1_0[0] + step * c1_1[0])}, ${Math.round(istep * c1_0[1] + step * c1_1[1])}, ${Math.round(istep * c1_0[2] + step * c1_1[2])})`;

    document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      // Pick new target colors
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }

  setInterval(updateGradient, 10);
});
