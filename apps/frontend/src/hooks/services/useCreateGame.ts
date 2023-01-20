import { useHttpClient } from './useHttpClient';
import { useMutation } from 'react-query';
import { useToken } from '../useToken';
import { routes, useNotification } from '#modules';
import { useNavigate } from 'react-router-dom';

interface Body {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
}

export function useCreateGame() {
    const client = useHttpClient();
    const { setToken } = useToken();
    const notification = useNotification();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation<string, { message: string }, Body>(
        'create-game',
        async (body: Body) =>
            await client.post('game-room', { json: body }).text(),
        {
            onSuccess: (token) => {
                setToken(token);
                navigate(routes.gameRoom);
            },
            onError: ({ message }) => notification(message),
        },
    );

    return {
        createGame: mutateAsync,
    };
}
