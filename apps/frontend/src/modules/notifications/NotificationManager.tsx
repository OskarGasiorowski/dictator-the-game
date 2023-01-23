import { ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '#ui';
import { NotificationContext } from './NotificationContext';
import {
    classnames,
    display,
    flexDirection,
    gap,
    inset,
    padding,
    position,
    sizing,
} from 'tailwindcss-classnames';

interface Notification {
    id: string;
    text: string;
}

interface Props {
    children: ReactNode;
}

export function NotificationManager({ children }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [timeOuts, setTimeOuts] = useState<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => timeOuts.forEach((timeOut) => clearTimeout(timeOut));
    }, []);

    function addNotification(notificationText: string) {
        const notification = {
            id: uuidv4(),
            text: notificationText,
        };
        setNotifications((prevState) => [...prevState, notification]);
        const timeout = setTimeout(
            () => removeNotification(notification.id),
            5000,
        );

        setTimeOuts((prevState) => [...prevState, timeout]);
    }

    function removeNotification(id: string) {
        setNotifications((prev) => [...prev.filter((n) => n.id !== id)]);
    }

    return (
        <NotificationContext.Provider value={addNotification}>
            {children}
            <div
                className={classnames(
                    position('absolute'),
                    inset('bottom-5'),
                    display('flex'),
                    flexDirection('flex-col'),
                    gap('gap-4'),
                    padding('px-12'),
                    sizing('w-full'),
                )}
            >
                {notifications.map(({ id, text }) => (
                    <Notification
                        key={id}
                        onClose={() => removeNotification(id)}
                    >
                        {text}
                    </Notification>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}
