import { useNavigate } from 'react-router-dom';
import { useSignal } from './useSignal';
import { routes } from '#modules';
import { useMutation } from 'react-query';
import { useAuthenticatedHttpClient } from './useAuthenticatedHttpClient';

export function useStartGame() {
    const client = useAuthenticatedHttpClient();
    const navigate = useNavigate();
    useSignal('gameStarted', () => {
        navigate(routes.game);
    });

    const { mutateAsync } = useMutation('start-game', () =>
        client.patch('game-room/start'),
    );

    return {
        startGame: mutateAsync,
    };
}
