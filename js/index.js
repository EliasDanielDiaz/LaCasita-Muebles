// ===============================
// CARRUSEL PROFESIONAL
// ===============================

// Elementos
const carrusel = document.querySelector('.carrusel-items');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

// Estado
let desplazamiento = 0;
let itemWidth = calcularAnchoItem();
let autoplayInterval;

// ===============================
// FUNCIONES
// ===============================

// Calcula cuántos items entran según el ancho de pantalla
function calcularAnchoItem() {
  const anchoPantalla = window.innerWidth;

  if (anchoPantalla < 600) return 320;     // 1 tarjeta
  if (anchoPantalla < 900) return 340;     // 2 tarjetas
  return 360;                              // 3 tarjetas
}

// Mover carrusel
function moverCarrusel(direccion) {
  desplazamiento += direccion * itemWidth;

  const maxScroll = -(carrusel.scrollWidth - itemWidth);

  if (desplazamiento < maxScroll) desplazamiento = 0;
  if (desplazamiento > 0) desplazamiento = maxScroll;

  carrusel.style.transform = `translateX(${desplazamiento}px)`;
}

// Autoplay
function iniciarAutoplay() {
  autoplayInterval = setInterval(() => {
    moverCarrusel(-1);
  }, 3000); // cada 3 segundos
}

function detenerAutoplay() {
  clearInterval(autoplayInterval);
}

// ===============================
// EVENTOS
// ===============================

// Botones
next.addEventListener('click', () => moverCarrusel(-1));
prev.addEventListener('click', () => moverCarrusel(1));

// Pausar autoplay al pasar el mouse
carrusel.addEventListener('mouseenter', detenerAutoplay);
carrusel.addEventListener('mouseleave', iniciarAutoplay);

// Recalcular al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
  itemWidth = calcularAnchoItem();
  desplazamiento = 0;
  carrusel.style.transform = 'translateX(0px)';
});

// ===============================
// INICIO
// ===============================
itemWidth = calcularAnchoItem();
iniciarAutoplay();

// ===============================
// SCROLL REVEAL DEL CARRUSEL
// ===============================
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// ===============================
// PARALLAX HEADER
// ===============================
const parallaxHeader = document.querySelector('.parallax-header');

window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  parallaxHeader.style.backgroundPositionY = offset * 0.4 + "px";
});

// ===============================
// MENÚ HAMBURGUESA
// ===============================
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
});

// Cerrar menú al tocar un link
document.querySelectorAll(".nav-principal a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
  });
});
