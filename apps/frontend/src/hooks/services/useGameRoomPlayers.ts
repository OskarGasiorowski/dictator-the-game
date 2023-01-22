import { useAuthenticatedHttpClient } from './useAuthenticatedHttpClient';
import { useQuery, useQueryClient } from 'react-query';
import { useSignal } from './useSignal';

interface Player {
    id: string;
    name: string;
}

export function useGameRoomPlayers() {
    const queryClient = useQueryClient();
    const client = useAuthenticatedHttpClient();

    const { data } = useQuery('game-room-players', () =>
        client.get('game-room/players').json<Player[]>(),
    );

    useSignal<Player>('playerJoined', (player) => {
        queryClient.setQueryData('game-room-players', [
            ...(data || []),
            player,
        ]);
    });

    return data || [];
}
