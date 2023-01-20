import ky from 'ky';

export function useHttpClient() {
    return ky.create({
        // TODO add env config
        prefixUrl: 'http://localhost:8000/',
    });
}
