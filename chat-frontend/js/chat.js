// Conecta al WebSocket (cambia la IP si usas otro equipo)
const socket = new WebSocket("ws://192.168.100.154:8080/ChatWebSocke/chat");

const chat = document.getElementById("chat");
const estado = document.getElementById("estado");
const mensajeInput = document.getElementById("mensaje");
const nombreInput = document.getElementById("nombre");
const btnEnviar = document.getElementById("btnEnviar");

socket.onopen = () => {
  estado.textContent = "🟢 Conectado al servidor";
  estado.style.color = "#9fffa3";
};

socket.onmessage = (event) => {
  mostrarMensaje(event.data, false);
};

socket.onclose = () => {
  estado.textContent = "🔴 Desconectado del servidor";
  estado.style.color = "#ffb3b3";
};

btnEnviar.addEventListener("click", enviarMensaje);
mensajeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensaje();
});

function enviarMensaje() {
  const nombre = nombreInput.value.trim() || "Anónimo";
  const mensaje = mensajeInput.value.trim();

  if (!mensaje) return;

  const hora = new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
  const texto = `[${nombre} | ${hora}] ${mensaje}`;
  socket.send(texto);

  mostrarMensaje(texto, true);
  mensajeInput.value = "";
}

function mostrarMensaje(texto, esPropio) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  if (esPropio) div.classList.add("propio");

  const partes = texto.match(/^\[(.*?)\]\s(.+)$/);
  if (partes) {
    const [_, encabezado, cuerpo] = partes;
    div.innerHTML = `<strong>${encabezado}</strong><br>${cuerpo}`;
  } else {
    div.textContent = texto;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
