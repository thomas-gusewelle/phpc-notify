import { ReactNode, createContext, useEffect, useState } from "react";

export type PastorData = {
  type: "ON THE WAY" | "ARRIVED" | "NONE";
  time: Date;
};

type ContextType = {
  webSocket: WebSocket | null;
  data: PastorData;
};

export const webSocketContext = createContext<ContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<PastorData>({
    type: "NONE",
    time: new Date(),
  });
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectToWS = () => {
      const url =
        process.env.NODE_ENV == "development"
          ? "ws://localhost:8080"
          : "wss://phpc-notify-backend-production.up.railway.app";
      const ws = new WebSocket(url);

      setWebSocket(ws);
      ws.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      ws.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data.toString());
        setCurrentData({ type: data.type, time: new Date(data.time) });
        // Handle incoming messages
      };
      ws.onclose = () => {
        // ws.close();
        setWebSocket(null);
        setTimeout(() => {
          connectToWS();
        }, 5000);
        console.log("Disconnected from WebSocket server");
      };
    };

    connectToWS();

    return () => {
      webSocket?.close();
    };
  }, []);

  return (
    <webSocketContext.Provider
      value={{ webSocket: webSocket, data: currentData }}>
      {children}
    </webSocketContext.Provider>
  );
};
