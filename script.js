
// Configuración — cambia por el número real de WhatsApp con código de país
const CONFIG = {
  whatsapp: "+584120702811"
};

// Burger y menú móvil
const burger = document.getElementById("burger");
const panel = document.getElementById("mobile-panel");

if (burger && panel) {
  const toggle = () => {
    const isOpen = panel.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    panel.setAttribute("aria-hidden", String(!isOpen));
    document.documentElement.style.overflow = isOpen ? "hidden" : ""; // bloquear scroll al abrir
  };

  burger.addEventListener("click", toggle);

  panel.querySelectorAll("[data-close]").forEach(a =>
    a.addEventListener("click", () => {
      panel.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      document.documentElement.style.overflow = "";
    })
  );
}

// Reserva vía WhatsApp
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

// Formulario de contacto (simulación)
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");
if (contactForm && contactMsg) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactMsg.textContent = "¡Gracias! Te responderemos pronto por correo.";
  });
}

// Clima (placeholder con estado aleatorio)
const climaEl = document.getElementById("clima");
if (climaEl) {
  const estados = ["despejado", "parcialmente nublado", "probables lluvias", "soleado"];
  const idx = Math.floor(Math.random() * estados.length);
  climaEl.textContent = `Clima: ${estados[idx]}`;
}
