import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export function useNotification() {
    const context = useContext(NotificationContext);

    return (notification: string) => context(notification);
}
