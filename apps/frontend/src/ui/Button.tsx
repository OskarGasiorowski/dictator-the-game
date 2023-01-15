import {
    backgroundColor,
    borderRadius,
    classnames,
    padding,
    sizing,
    textColor,
    transitionDuration,
    transitionsAndAnimations,
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
                    'bg-teal-700',
                    'hover:bg-teal-800',
                    'active:bg-teal-700',
                ),
                transitionDuration('duration-150'),
                transitionsAndAnimations('transition', 'ease-in-out'),
                padding('py-3'),
                borderRadius('rounded-md'),
                className,
            )}
        >
            {children}
        </button>
    );
}
