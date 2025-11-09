// --- INICIO DE LA MODIFICACIÓN ---
// Conexión al WebSocket usando la IP del servidor.
// Este método es necesario cuando abres el index.html directamente como un archivo.

// 1. Reemplaza "192.168.1.35" con la IP de la máquina donde corre tu servidor Java.
// 2. Asegúrate de que el puerto (8080) y el context path (/ChatWebSocke) son correctos.
const SERVER_IP_Y_PUERTO = "localhost:8080";
const wsUrl = `ws://${SERVER_IP_Y_PUERTO}/ChatWebSocke/chat`;
// --- FIN DE LA MODIFICACIÓN ---
const socket = new WebSocket(wsUrl);

const chat = document.getElementById("chat");
const estado = document.getElementById("estado");
const mensajeInput = document.getElementById("mensaje");
const nombreInput = document.getElementById("nombre");
const btnEnviar = document.getElementById("btnEnviar");

let messageSentTimestamp; // Variable para registrar el tiempo de envío

mensajeInput.disabled = true;
btnEnviar.disabled = true;

nombreInput.addEventListener("input", () => {
    const nombre = nombreInput.value.trim();
    if (nombre !== "") {
        mensajeInput.disabled = false;
        btnEnviar.disabled = false;
    } else {
        mensajeInput.disabled = true;
        btnEnviar.disabled = true;
    }
});

socket.onopen = () => {
  estado.textContent = "🟢 Conectado al servidor";
  estado.style.color = "#9fffa3";
  nombreInput.focus();
};

socket.onmessage = (event) => {
  const mensajeRecibido = event.data;
  const nombreUsuarioActual = nombreInput.value.trim();

  // Extraemos el nombre de usuario del mensaje recibido.
  // El formato es: "[Usuario | Hora] Mensaje"
  // Se ignora el emoji "💬 " que añade el servidor.
  const mensajeLimpio = mensajeRecibido.startsWith("💬 ") ? mensajeRecibido.substring(2) : mensajeRecibido;
  const match = mensajeLimpio.match(/^\[(.*?)\s\|/);
  const remitente = match ? match[1] : null;

  // Comparamos si el remitente del mensaje es el usuario actual.
  const esPropio = (remitente === nombreUsuarioActual);

  mostrarMensaje(mensajeLimpio, esPropio);
};

socket.onclose = () => {
  estado.textContent = "🔴 Desconectado del servidor";
  estado.style.color = "#ffb3b3";
};

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    enviarMensaje();
});

mensajeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    enviarMensaje();
  }
});

function enviarMensaje() {
  const nombre = nombreInput.value.trim() || "Anónimo";
  const mensaje = mensajeInput.value.trim();

  if (!mensaje) return;

  const hora = new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
  const texto = `[${nombre} | ${hora}] ${mensaje}`;
  
  messageSentTimestamp = performance.now(); // Registra el tiempo antes de enviar
  socket.send(texto);

  mensajeInput.value = "";
  mensajeInput.focus();
}

function mostrarMensaje(texto, esPropio) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  if (esPropio) {
    div.classList.add("propio");
    if (messageSentTimestamp) {
      const timeToLocalDisplay = performance.now() - messageSentTimestamp;
      console.log(`Tiempo hasta la visualización local: ${timeToLocalDisplay.toFixed(2)} ms`);
      messageSentTimestamp = null; // Reiniciar para el siguiente mensaje
    }
  }

  const partes = texto.match(/^\[(.*?)\]\s(.+)$/);
  if (partes) {
    const [_, encabezado, cuerpo] = partes;
    
    const strong = document.createElement("strong");
    strong.textContent = encabezado;
    
    const p = document.createElement("p");
    p.textContent = cuerpo;

    div.appendChild(strong);
    div.appendChild(p);
  } else {
    div.textContent = texto;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
