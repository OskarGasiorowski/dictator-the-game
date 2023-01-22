import { routes } from '#modules';
import { createBrowserRouter } from 'react-router-dom';
import { IndexPage } from './IndexPage';
import { JoinGamePage } from './JoinGamePage';
import { CreateGamePage } from './CreateGamePage';
import { GameRoomPage } from './GameRoomPage';
import { GamePage } from './GamePage';

export const router = createBrowserRouter([
    {
        path: routes.index,
        element: <IndexPage />,
    },
    {
        path: routes.joinGame,
        element: <JoinGamePage />,
    },
    {
        path: routes.createGame,
        element: <CreateGamePage />,
    },
    {
        path: routes.gameRoom,
        element: <GameRoomPage />,
    },
    {
        path: routes.game,
        element: <GamePage />
    },
]);
