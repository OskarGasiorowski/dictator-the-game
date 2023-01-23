import { useToken } from '../useToken';
import ky from 'ky';

export function useAuthenticatedHttpClient() {
    const { token } = useToken();

    console.log(token);
    return ky.create({
        prefixUrl: 'http://localhost:8000/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
