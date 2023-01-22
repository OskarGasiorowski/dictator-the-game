import { useToken } from '../useToken';
import ky from 'ky';

export function useAuthenticatedHttpClient() {
    const { token } = useToken();

    return ky.create({
        prefixUrl: 'http://localhost:8000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
