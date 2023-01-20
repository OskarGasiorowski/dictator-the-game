import { useHttpClient } from './useHttpClient';
import { useMutation } from 'react-query';
import { useToken } from '../useToken';
import { useNotification } from '#modules';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

interface Body {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
}

export function useCreateGame() {
    const client = useHttpClient();
    const { setToken } = useToken();
    const notification = useNotification();

    const { mutateAsync } = useMutation<string, { message: string }, Body>(
        'create-game',
        async (body: Body) =>
            await client.post('game-room', { json: body }).text(),
        {
            onSuccess: (token) => setToken(token),
            onError: ({ message }) => notification(message),
        },
    );

    return {
        createGame: mutateAsync,
    };
}
