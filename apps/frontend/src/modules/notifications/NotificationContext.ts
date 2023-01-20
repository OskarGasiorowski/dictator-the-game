import { createContext } from 'react';

export const NotificationContext = createContext<
    (notification: string) => void
>(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (notification: string) => {},
);
