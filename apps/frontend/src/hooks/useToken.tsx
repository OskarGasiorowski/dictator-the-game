import { createContext, ReactNode, useContext, useState } from 'react';

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

export function useToken() {
    const { token, setToken } = useContext(Context);

    return {
        token,
        setToken,
    };
}
