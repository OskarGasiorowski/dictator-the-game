import {
    backgroundColor,
    borderRadius,
    classnames,
    padding,
    sizing,
    textColor,
    transitionDuration,
    transitionsAndAnimations,
    typography,
} from 'tailwindcss-classnames';
import { ReactNode } from 'react';

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
                padding('py-3'),
                borderRadius('rounded-md'),
                typography('text-gray-800'),
                className,
            )}
        >
            {children}
        </button>
    );
}
