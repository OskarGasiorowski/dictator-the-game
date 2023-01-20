import { useHttpClient } from './useHttpClient';
import { useMutation } from 'react-query';
import { useToken } from '../useToken';

interface Body {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
}

export function useJoinGame() {
    const client = useHttpClient();
    const { setToken } = useToken();

    const { mutateAsync } = useMutation(
        'join-game',
        async (body: Body) =>
            await client.patch('game-room/join', { json: body }).text(),
        {
            onSuccess: (token) => setToken(token),
        },
    );

    return {
        joinGame: mutateAsync,
    };
}
