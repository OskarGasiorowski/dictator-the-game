import { useToken } from './useToken';

export function useIsAdmin() {
    const { tokenPayload } = useToken();

    return tokenPayload?.role === 'admin';
}
