// Toolkit Logo Carousel — recreación en JS vanilla del componente Logo Carousel de Cult UI
// (columnas independientes que ciclan sus logos con una animación de flip)

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('logoCarousel');
  if (!carousel) return;

  const COLUMN_COUNT = 3;
const CYCLE_INTERVAL = 2200; // ms entre cada cambio de logo por columna
const TRANSITION_TIME = 400; // debe coincidir con el `transition` del CSS

const allLogos = [
  { name: 'Blender', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  { name: 'Premiere Pro', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
  { name: 'Photoshop', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Illustrator', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'Visual Studio', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg' },
  { name: 'Claude', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg' },
];

  // Baraja el array (distribución aleatoria, igual que "randomized logo distribution" de Cult UI)
  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const shuffled = shuffle(allLogos);

  // Reparte los logos entre las columnas (round-robin)
  const columns = Array.from({ length: COLUMN_COUNT }, () => []);
  shuffled.forEach((logo, i) => {
    columns[i % COLUMN_COUNT].push(logo);
  });

  columns.forEach((logos, colIndex) => {
    if (logos.length === 0) return;

    const cell = document.createElement('div');
    cell.className = 'logo-column';

    const img = document.createElement('img');
    img.src = logos[0].src;
    img.alt = logos[0].name;
    cell.appendChild(img);
    carousel.appendChild(cell);

    if (logos.length === 1) return; // nada que ciclar

    let index = 0;
    // Delay inicial distinto por columna para que no cambien todas a la vez
    const startDelay = colIndex * 400;

    setTimeout(() => {
      setInterval(() => {
        img.classList.add('is-hidden');
        setTimeout(() => {
          index = (index + 1) % logos.length;
          img.src = logos[index].src;
          img.alt = logos[index].name;
          img.classList.remove('is-hidden');
        }, TRANSITION_TIME);
      }, CYCLE_INTERVAL);
    }, startDelay);
  });
});
