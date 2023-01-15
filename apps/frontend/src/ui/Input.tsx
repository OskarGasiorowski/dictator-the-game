import {
    backgroundColor,
    borderRadius,
    classnames,
    padding,
    sizing,
    typography,
} from 'tailwindcss-classnames';

interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'className'
    > {
    className?: 'TAILWIND_STRING';
}

export function Input({ className, ...props }: Props) {
    return (
        <input
            {...props}
            className={classnames(
                sizing('w-full'),
                backgroundColor('bg-gray-800'),
                typography(
                    'text-neutral-300',
                    'text-lg',
                    'placeholder-neutral-600',
                ),
                borderRadius('rounded-md'),
                padding('px-6', 'py-3'),
                className,
            )}
        />
    );
}
