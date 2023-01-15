import { useForm } from 'react-hook-form';
import { Button, Input } from '#ui';
import {
    classnames,
    display,
    flexDirection,
    gap,
    sizing,
} from 'tailwindcss-classnames';

interface Props {
    onSubmit: () => void;
    submitText: string;
}

export function GameRoomPlayerForm({ onSubmit, submitText }: Props) {
    const { handleSubmit } = useForm();

    return (
        <form
            className={classnames(
                sizing('w-full'),
                display('flex'),
                gap('gap-5'),
                flexDirection('flex-col'),
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input placeholder="Player name" />
            <Input placeholder="Game name" />
            <Input placeholder="Game password" />
            <Button>{submitText}</Button>
        </form>
    );
}
