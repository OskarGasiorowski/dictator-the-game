import { ReactNode } from 'react';
import {
    backgroundColor,
    classnames,
    display,
    flexDirection,
    margin,
    padding,
    sizing,
    gap,
    justifyContent,
    alignItems,
    position,
} from 'tailwindcss-classnames';
import { NotificationManager } from './notifications';

interface Props {
    children: ReactNode;
}

export function Layout({ children }: Props) {
    return (
        <div
            className={classnames(
                backgroundColor('bg-gray-800'),
                sizing('w-screen', 'h-screen'),
            )}
        >
            <div
                className={classnames(
                    sizing('w-full', 'max-w-screen-sm', 'h-full'),
                    margin('mx-auto'),
                    backgroundColor('bg-gray-900'),
                    padding('px-20', 'py-32'),
                    display('flex'),
                    flexDirection('flex-col'),
                    gap('gap-6'),
                    justifyContent('justify-center'),
                    alignItems('items-center'),
                    position('relative'),
                )}
            >
                <NotificationManager>{children}</NotificationManager>
            </div>
        </div>
    );
}
