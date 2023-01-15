import { GameRoomPlayerForm } from '#modules';
import { Layout } from '#ui';

export function CreateGamePage() {
    return (
        <Layout>
            <GameRoomPlayerForm
                onSubmit={() => console.log('')}
                submitText="Create game"
            />
        </Layout>
    );
}
