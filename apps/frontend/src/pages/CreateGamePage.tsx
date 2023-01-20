import { GameRoomPlayerForm } from '#modules';
import { useCreateGame } from '../hooks';

export function CreateGamePage() {
    const { createGame } = useCreateGame();

    return (
        <GameRoomPlayerForm
            onSubmit={(formData) => createGame(formData)}
            submitText="Create game"
        />
    );
}
