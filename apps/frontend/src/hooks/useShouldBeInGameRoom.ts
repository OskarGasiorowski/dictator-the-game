import { useToken } from './useToken';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '#modules';

export function useShouldBeInGameRoom() {
    const navigate = useNavigate();
    const { tokenPayload } = useToken();

    useEffect(() => {
        if (tokenPayload && tokenPayload.exp > new Date(Date.now())) {
            navigate(routes.gameRoom);
        }
    }, []);
}
