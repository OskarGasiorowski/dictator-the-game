import { useHttpClient } from './useHttpClient';
import { useMutation } from 'react-query';
import { useToken } from '../useToken';
import { routes } from '#modules';
import { useNavigate } from 'react-router-dom';

interface Body {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
}

export function useJoinGame() {
    const client = useHttpClient();
    const { setToken } = useToken();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation(
        'join-game',
        async (body: Body) =>
            await client.patch('game-room/join', { json: body }).text(),
        {
            onSuccess: (token) => {
                setToken(token);
                navigate(routes.gameRoom);
            },
        },
    );

    return {
        joinGame: mutateAsync,
    };
}
