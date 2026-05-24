// ===============================
// CARRUSEL 3 IMÁGENES + LOOP INFINITO
// ===============================

const carrusel = document.querySelector('.carrusel-items');
let items = document.querySelectorAll('.item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;
const visible = 3; // cantidad visible al mismo tiempo

// Clonar los primeros 3 elementos al final para loop infinito
for (let i = 0; i < visible; i++) {
  const clone = items[i].cloneNode(true);
  carrusel.appendChild(clone);
}

items = document.querySelectorAll('.item'); // actualizar lista

function actualizarCarrusel() {
  carrusel.style.transform = `translateX(-${index * (100 / visible)}%)`;
}

// Botón siguiente
next.addEventListener('click', () => {
  index++;
  if (index > items.length - visible) {
    index = 1;
    carrusel.style.transition = 'none';
    carrusel.style.transform = 'translateX(0)';
    setTimeout(() => {
      carrusel.style.transition = 'transform 0.6s ease';
      actualizarCarrusel();
    }, 20);
  } else {
    actualizarCarrusel();
  }
});

// Botón anterior
prev.addEventListener('click', () => {
  index--;
  if (index < 0) {
    index = items.length - visible - 1;
    carrusel.style.transition = 'none';
    carrusel.style.transform = `translateX(-${(items.length - visible) * (100 / visible)}%)`;
    setTimeout(() => {
      carrusel.style.transition = 'transform 0.6s ease';
      actualizarCarrusel();
    }, 20);
  } else {
    actualizarCarrusel();
  }
});

// Activar el primero
actualizarCarrusel();

// ===============================
// AUTOPLAY (opcional)
// ===============================

let autoplay = setInterval(() => {
  index = (index + 1) % items.length;
  actualizarCarrusel();
}, 4000);

carrusel.addEventListener("mouseenter", () => clearInterval(autoplay));
carrusel.addEventListener("mouseleave", () => {
  autoplay = setInterval(() => {
    index = (index + 1) % items.length;
    actualizarCarrusel();
  }, 4000);
});

// ===============================
// SCROLL REVEAL
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
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Cerrar menú al tocar un link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
