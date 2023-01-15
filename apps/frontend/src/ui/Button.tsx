import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function Button({ children }: Props) {
    return (
        <button className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 active:bg-teal-700 active:shadow-lg transition duration-150 ease-in-out">
            {children}
        </button>
    );
}
