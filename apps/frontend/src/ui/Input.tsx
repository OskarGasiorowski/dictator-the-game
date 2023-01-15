import {
    backgroundColor,
    borderRadius,
    classnames,
    display,
    flex,
    flexDirection,
    gap,
    padding,
    sizing,
    typography,
} from 'tailwindcss-classnames';
import { ForwardedRef, forwardRef } from 'react';

interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'className'
    > {
    className?: 'TAILWIND_STRING';
    error?: string;
}

function _Input(
    { className, error, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
) {
    return (
        <div
            className={classnames(
                display('flex'),
                flexDirection('flex-col'),
                gap('gap-1.5'),
            )}
        >
            <input
                {...props}
                ref={ref}
                className={classnames(
                    sizing('w-full'),
                    backgroundColor('bg-gray-800'),
                    typography(
                        'text-neutral-300',
                        'text-lg',
                        'placeholder-neutral-600',
                    ),
                    borderRadius('rounded-md'),
                    padding('px-6', 'py-4'),
                    className,
                )}
            />
            <span
                className={classnames(
                    sizing('h-4'),
                    typography('text-red-400', 'text-xs'),
                )}
            >
                {error}
            </span>
        </div>
    );
}

export const Input = forwardRef(_Input);
