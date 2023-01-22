import {
    backgroundColor,
    borderRadius,
    classnames,
    interactivity,
    padding,
    sizing,
    textColor,
    transitionDuration,
    transitionsAndAnimations,
    typography,
} from 'tailwindcss-classnames';
import { ReactNode } from 'react';
import { doc } from 'prettier';
import cursor = doc.builders.cursor;

interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        'className'
    > {
    children: ReactNode;
    className?: 'TAILWIND_STRING';
}

export function Button({ children, className, ...props }: Props) {
    const disabled = classnames(
        backgroundColor('disabled:bg-gray-500'),
        interactivity('disabled:cursor-not-allowed'),
    );

    return (
        <button
            {...props}
            className={classnames(
                textColor('text-white'),
                sizing('w-full'),
                backgroundColor(
                    'bg-emerald-400',
                    'hover:bg-emerald-500',
                    'active:bg-emerald-400',
                ),
                transitionDuration('duration-150'),
                transitionsAndAnimations('transition', 'ease-in-out'),
                padding('py-4'),
                borderRadius('rounded-md'),
                typography('text-gray-800'),
                interactivity('cursor-pointer'),
                disabled,
                className,
            )}
        >
            {children}
        </button>
    );
}
