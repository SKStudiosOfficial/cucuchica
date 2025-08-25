// ================== CONFIG ==================
const CONFIG = { whatsapp: "+584120702811" };

// ================== NAV: refs ==================
const header   = document.querySelector(".site-header");
const burger   = document.getElementById("burger");
const panel    = document.getElementById("mobileNav");
const backdrop = document.getElementById("backdrop");
const btnClose = document.getElementById("closeMobile");

// Bloqueo de scroll (HTML + body) — compatible iOS
function setNoScroll(state){
  document.documentElement.classList.toggle("no-scroll", state);
  document.body.classList.toggle("no-scroll", state);
}

// Abrir / cerrar panel
function openPanel(){
  if (!panel) return;
  panel.classList.add("open");
  panel.setAttribute("aria-hidden","false");
  backdrop && (backdrop.hidden = false, backdrop.classList.add("show"));
  burger && (burger.classList.add("open"), burger.setAttribute("aria-expanded","true"));
  header && header.classList.add("active");
  setNoScroll(true);
  // primer foco útil
  const first = panel.querySelector("a, button, input, select, textarea");
  first && first.focus();
}
function closePanel(){
  if (!panel) return;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden","true");
  burger && (burger.classList.remove("open"), burger.setAttribute("aria-expanded","false"));
  header && header.classList.remove("active");
  setNoScroll(false);
  if (backdrop){
    backdrop.classList.remove("show");
    // esperar transición para ocultar del árbol accesible
    setTimeout(()=>{ backdrop.hidden = true; }, 200);
  }
}

// Eventos UI
burger && burger.addEventListener("click", () => {
  panel && panel.classList.contains("open") ? closePanel() : openPanel();
});
btnClose && btnClose.addEventListener("click", closePanel);
backdrop && backdrop.addEventListener("click", closePanel);

// Cerrar al navegar o con Escape
panel && panel.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) closePanel();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel && panel.classList.contains("open")) closePanel();
});

// Header sólido al hacer scroll (sin pisar .active)
const onScroll = () => {
  if (!header) return;
  const scrolled = window.scrollY > 10;
  if (!header.classList.contains("active")) {
    header.classList.toggle("scrolled", scrolled);
  }
};
window.addEventListener("scroll", onScroll);
onScroll(); // estado inicial

// Failsafe: al cambiar a >=980px, cerramos panel y restauramos scroll
window.addEventListener("resize", () => {
  if (window.innerWidth >= 980 && panel && panel.classList.contains("open")) {
    closePanel();
  }
});

// ================== RESERVA POR WHATSAPP ==================
const reserveForm = document.getElementById("reserveForm");
if (reserveForm) {
  reserveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(reserveForm);
    const name = data.get("name");
    const date = data.get("date");
    const people = data.get("people");
    const service = data.get("service");
    const notes = data.get("notes") || "";
    const msg = `Hola, quiero reservar en Vegasolita (Cucuchica).%0A` +
      `Nombre: ${name}%0A` +
      `Fecha: ${date}%0A` +
      `Personas: ${people}%0A` +
      `Servicio: ${service}%0A` +
      `Notas: ${notes}`;
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
    window.open(url, "_blank");
  });
}

// ================== CONTACTO (simulado) ==================
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");
if (contactForm && contactMsg) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactMsg.textContent = "¡Gracias! Te responderemos pronto por correo.";
  });
}

// ================== CLIMA (placeholder aleatorio) ==================
const climaEl = document.getElementById("clima");
if (climaEl) {
  const estados = ["despejado", "parcialmente nublado", "probables lluvias", "soleado"];
  const idx = Math.floor(Math.random() * estados.length);
  climaEl.textContent = `Clima: ${estados[idx]}`;
}
