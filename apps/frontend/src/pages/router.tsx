import { createBrowserRouter } from 'react-router-dom';
import { StartPage } from './start';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <StartPage />,
    },
]);
