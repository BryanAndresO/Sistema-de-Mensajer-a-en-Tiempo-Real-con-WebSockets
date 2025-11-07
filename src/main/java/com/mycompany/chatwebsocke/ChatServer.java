package com.mycompany.chatwebsocke;

import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.OnClose;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/chat")
public class ChatServer {
    private static final Set<Session> sesiones = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session sesion) {
        sesiones.add(sesion);
        enviarATodos("🟢 Un usuario se ha conectado.");
    }

    @OnMessage
    public void onMessage(String mensaje, Session sesion) {
        enviarATodos("💬 " + mensaje);
    }

    @OnClose
    public void onClose(Session sesion) {
        sesiones.remove(sesion);
        enviarATodos("🔴 Un usuario se ha desconectado.");
    }

    private void enviarATodos(String mensaje) {
        for (Session s : sesiones) {
            try {
                s.getBasicRemote().sendText(mensaje);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
