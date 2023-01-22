import io from 'socket.io-client';
import { useEffect, useState } from 'react';

// TODO add settings and better management
const socket = io('localhost:8000');

export function useSignal<TData>(
    event: string,
    onReceived?: (data: TData) => void,
) {
    const [lastReceivedData, setLastReceivedData] = useState<TData>();

    useEffect(() => {
        socket.on(event, (payload: TData) => {
            setLastReceivedData(payload);
            onReceived?.(payload);
        });

        return () => {
            socket.off(event);
        };
    }, [event, onReceived]);

    return lastReceivedData;
}
