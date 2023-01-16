import { GameRoomPlayerForm } from '#modules';
import { Layout } from '#ui';
import { useMutation } from 'react-query';
import superagent from 'superagent';

export function CreateGamePage() {
    const { mutateAsync } = useMutation(
        'create-game',
        async (data: any) =>
            await superagent.post('http://localhost:8000/game-room').send(data),
    );

    return (
        <Layout>
            <GameRoomPlayerForm
                onSubmit={(formData) => mutateAsync(formData)}
                submitText="Create game"
            />
        </Layout>
    );
}
