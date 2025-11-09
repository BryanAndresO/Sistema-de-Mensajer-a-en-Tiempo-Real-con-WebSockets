# Chat-Vivo con Java WebSockets

Este es un proyecto de una aplicación de chat en tiempo real simple pero funcional. Utiliza WebSockets de Jakarta EE para la comunicación bidireccional entre el servidor (backend en Java) y múltiples clientes (frontend en HTML, CSS y JavaScript).

## 📜 Descripción

La aplicación permite a los usuarios unirse a una sala de chat global después de registrar un nombre de usuario. Una vez dentro, pueden enviar y recibir mensajes que son visibles para todos los demás participantes conectados. El servidor se encarga de recibir los mensajes y retransmitirlos a todos los clientes.

## ✨ Características

- **Comunicación en Tiempo Real:** Mensajería instantánea gracias a WebSockets.
- **Chat Global:** Todos los usuarios conectados comparten la misma sala de chat.
- **Interfaz de Usuario Limpia:** Un diseño moderno y responsivo para una experiencia de usuario agradable.
- **Notificaciones de Estado:** Informa a los usuarios cuándo se unen o abandonan otros participantes.
- **Indicador de Conexión:** Muestra el estado actual de la conexión con el servidor (Conectado, Desconectado, Error).
- **Sin Dependencias Frontend Complejas:** Construido con HTML, CSS y JavaScript puros, sin necesidad de frameworks.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 11+**
- **Jakarta EE 9+** (específicamente `jakarta.websocket-api`)
- **Maven** (para la gestión de dependencias y construcción del proyecto)

### Frontend
- **HTML5**
- **CSS3** (con variables para fácil personalización)
- **JavaScript (ES6+)**

### Servidor de Aplicaciones
- Compatible con cualquier servidor que soporte Jakarta EE 9+, como:
  - **Apache Tomcat 10+**
  - **GlassFish 7+**
  - **WildFly 27+**

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para poner en funcionamiento el proyecto.

### Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:
1.  **JDK (Java Development Kit)**: Versión 11 o superior.
2.  **Apache Maven**: Para compilar el proyecto Java.
3.  **Servidor de Aplicaciones**: Un servidor compatible con Jakarta EE 9+, como Apache Tomcat 10.

---

### 1. Configuración del Backend (Servidor)

El primer paso es compilar el código Java en un archivo `.war` que pueda ser desplegado en el servidor de aplicaciones.

1.  **Abre una terminal o línea de comandos.**
2.  **Navega a la raíz del proyecto** (la carpeta `ChatWebSocke` que contiene el archivo `pom.xml`).
    ```bash
    cd ruta/a/tu/proyecto/ChatWebSocke
    ```
3.  **Compila el proyecto con Maven.** Este comando descargará las dependencias y empaquetará la aplicación.
    ```bash
    mvn clean package
    ```
4.  Si la compilación es exitosa, encontrarás un archivo llamado `ChatWebSocke-1.0-SNAPSHOT.war` (o similar) dentro de una nueva carpeta `target/`.

### 2. Despliegue en el Servidor (Ejemplo con Tomcat)

Ahora, desplegaremos el archivo `.war` en tu servidor de aplicaciones.

1.  **Inicia tu servidor Apache Tomcat.**
2.  **Copia el archivo `.war`** generado en el paso anterior (`target/ChatWebSocke-1.0-SNAPSHOT.war`).
3.  **Pega el archivo copiado** en la carpeta `webapps` de tu instalación de Tomcat.

Tomcat detectará automáticamente el nuevo archivo y desplegará la aplicación. El servidor de chat ya estará activo y escuchando conexiones.

---

### 3. Acceder y Usar el Chat (Frontend)

El frontend está diseñado para ser servido directamente por el servidor de aplicaciones, lo que simplifica la configuración.

1.  **Abre tu navegador web** (Chrome, Firefox, etc.).
2.  **Navega a la siguiente URL**:
    ```
    http://localhost:8080/ChatWebSocke-1.0-SNAPSHOT/
    ```
    > **Nota:** El nombre `ChatWebSocke-1.0-SNAPSHOT` depende del nombre del archivo `.war`. Si renombraste el `.war` a `chat.war`, la URL sería `http://localhost:8080/chat/`. El puerto `8080` es el puerto por defecto de Tomcat; ajústalo si has configurado uno diferente.

3.  **¡Listo!** La interfaz del chat aparecerá en tu navegador.

### ¿Cómo usar la aplicación?

1.  **Ingresa un nombre de usuario** (mínimo 3 caracteres) y presiona `Enter`.
2.  El sistema te conectará al servidor WebSocket y te notificará que te has unido al chat.
3.  Escribe tus mensajes en el campo de texto inferior y presiona `Enter` o el botón de enviar.
4.  Tu mensaje aparecerá en el lado derecho, y los mensajes de otros usuarios aparecerán en el lado izquierdo.

Puedes abrir múltiples pestañas o ventanas del navegador en la misma URL para simular una conversación entre varios usuarios.

### Alternativa: Ejecutar el Frontend localmente (para desarrollo)

El proyecto también incluye una carpeta `chat-frontend` con una versión del cliente que puede abrirse directamente como un archivo.

1.  Abre el archivo `chat-frontend/index.html` en tu navegador.
2.  **Importante:** Esta versión no funcionará correctamente porque el archivo `chat-frontend/js/chat.js` está configurado para conectarse a un servidor Java que no está sirviendo el archivo HTML. Para que funcione, deberías modificar el código del servidor Java para que acepte conexiones de orígenes diferentes (CORS), lo cual es más complejo.

> **Recomendación:** Para una experiencia sin problemas, utiliza siempre la versión del cliente a la que se accede a través del servidor de aplicaciones, como se describe en el paso 3.