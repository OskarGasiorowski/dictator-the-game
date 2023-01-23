import { Button } from '#ui';
import { useNavigate } from 'react-router-dom';
import { routes } from '#modules';
import { useShouldBeInGameRoom } from '../hooks';

export function IndexPage() {
    const navigate = useNavigate();
    useShouldBeInGameRoom();

    return (
        <>
            <Button onClick={() => navigate(routes.joinGame)}>Join game</Button>
            <Button onClick={() => navigate(routes.createGame)}>
                Create new game
            </Button>
        </>
    );
}
