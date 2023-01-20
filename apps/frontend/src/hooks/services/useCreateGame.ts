import { useHttpClient } from './useHttpClient';
import { useMutation } from 'react-query';
import { useToken } from '../useToken';

interface Body {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
}

export function useCreateGame() {
    const client = useHttpClient();
    const { setToken } = useToken();

    const { mutateAsync } = useMutation(
        'create-game',
        async (body: Body) =>
            await client.post('game-room', { json: body }).text(),
        {
            onSuccess: (token) => setToken(token),
        },
    );

    return {
        createGame: mutateAsync,
    };
}
