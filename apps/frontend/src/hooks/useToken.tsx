import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import jwt_decode from 'jwt-decode';

const LOCALSTORAGE_TOKEN_KEY = 'auth-token';

const Context = createContext<{
    token: string | undefined;
    setToken: (token: string) => void;
}>({
    token: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setToken: (token: string) => {},
});

interface Props {
    children: ReactNode;
}

export function TokenContextProvider({ children }: Props) {
    const [token, setTokenState] = useState(
        localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || undefined,
    );

    function setToken(token: string) {
        setTokenState(token);
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    }

    return (
        <Context.Provider value={{ token, setToken }}>
            {children}
        </Context.Provider>
    );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenPayload {
    username: string;
    exp: number;
    iat: number;
    role: 'player' | 'admin';
    sub: string;
    gameId: string;
}

export function useToken() {
    const { token, setToken } = useContext(Context);

    function getTokenPayload() {
        if (!token) {
            return undefined;
        }

        const tokenPayload = jwt_decode<TokenPayload>(token);
        return {
            ...tokenPayload,
            exp: new Date(tokenPayload.exp * 1000),
            iat: new Date(tokenPayload.iat * 1000),
        };
    }

    return {
        token,
        tokenPayload: getTokenPayload(),
        setToken,
    };
}
