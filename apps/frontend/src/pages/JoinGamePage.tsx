import { Layout } from '#ui';
import { GameRoomPlayerForm } from '#modules';
import { useJoinGame } from '../hooks';

export function JoinGamePage() {
    const { joinGame } = useJoinGame();

    return (
        <Layout>
            <GameRoomPlayerForm
                onSubmit={(formData) => joinGame(formData)}
                submitText="Join game"
            />
        </Layout>
    );
}
