import { Button, Layout } from '#ui';
import { useNavigate } from 'react-router-dom';
import { routes } from '#modules';

export function IndexPage() {
    const navigate = useNavigate();

    return (
        <Layout>
            <Button onClick={() => navigate(routes.joinGame)}>Join game</Button>
            <Button onClick={() => navigate(routes.createGame)}>
                Create new game
            </Button>
        </Layout>
    );
}
