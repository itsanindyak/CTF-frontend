"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface TeamData {
  position: number;
  Team_Name: string;
  Points: string;
}

interface SocketContextProps {
  tableData: TeamData[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [tableData, setTableData] = useState<TeamData[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io("http://localhost:4000");

    // Handle leaderboard updates
    const handleLeaderboardUpdate = (data: TeamData[]) => {
      setTableData(data);
    };

    socketRef.current.on("leaderboardUpdate", handleLeaderboardUpdate);

    return () => {
      // Cleanup listeners before unmounting
      if (socketRef.current) {
        socketRef.current.off("leaderboardUpdate", handleLeaderboardUpdate);
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ tableData }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("useSocket must be used within a SocketProvider");
  return state;
};

export { SocketProvider, useSocket };
