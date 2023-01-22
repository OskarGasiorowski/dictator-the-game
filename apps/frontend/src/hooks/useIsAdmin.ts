import jwt_decode from 'jwt-decode';
import { useToken } from './useToken';

export function useIsAdmin() {
    const { token } = useToken();

    return token ? jwt_decode<{ role: string }>(token).role === 'admin' : false;
}
