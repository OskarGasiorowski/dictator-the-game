import io from 'socket.io-client';
import { useEffect, useState } from 'react';

// TODO add settings and better management
const socket = io('localhost:8000');

export function useSignal<TData>(
    room: string,
    onReceived?: (data: TData) => void,
) {
    const [lastReceivedData, setLastReceivedData] = useState<TData>();

    useEffect(() => {
        socket.on(room, (payload: TData) => {
            setLastReceivedData(payload);
            onReceived?.(payload);
        });

        return () => {
            socket.off(room);
        };
    }, [room, onReceived]);

    return lastReceivedData;
}
