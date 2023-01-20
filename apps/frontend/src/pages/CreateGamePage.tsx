import { GameRoomPlayerForm } from '#modules';
import { Layout } from '#ui';
import { useCreateGame } from '../hooks';

export function CreateGamePage() {
    const { createGame } = useCreateGame();

    return (
        <Layout>
            <GameRoomPlayerForm
                onSubmit={(formData) => createGame(formData)}
                submitText="Create game"
            />
        </Layout>
    );
}
