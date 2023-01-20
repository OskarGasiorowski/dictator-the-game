import { ReactNode } from 'react';
import {
    alignItems,
    backgroundColor,
    borderRadius,
    classnames,
    display,
    interactivity,
    justifyContent,
    padding,
    position,
    sizing,
} from 'tailwindcss-classnames';
import { VscClose } from 'react-icons/vsc';

interface Props {
    children: ReactNode;
    onClose: () => void;
}

export function Notification({ children, onClose }: Props) {
    return (
        <div
            className={classnames(
                backgroundColor('bg-rose-600'),
                padding('px-6', 'py-5'),
                sizing('w-full'),
                borderRadius('rounded-lg'),
                display('flex'),
                justifyContent('justify-between'),
                alignItems('items-center'),
            )}
        >
            <span>{children}</span>
            <VscClose
                className={classnames(
                    sizing('w-5', 'h-5'),
                    interactivity('cursor-pointer'),
                )}
                onClick={onClose}
            />
        </div>
    );
}
