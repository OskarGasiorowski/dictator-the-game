import { GameRoomPlayerForm } from '#modules';
import { useJoinGame } from '../hooks';

export function JoinGamePage() {
    const { joinGame } = useJoinGame();

    return (
        <GameRoomPlayerForm
            onSubmit={(formData) => joinGame(formData)}
            submitText="Join game"
        />
    );
}
