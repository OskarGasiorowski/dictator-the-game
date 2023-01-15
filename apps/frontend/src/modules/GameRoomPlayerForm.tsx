import { useForm } from 'react-hook-form';
import { Button, Input } from '#ui';
import {
    classnames,
    display,
    flexDirection,
    gap,
    sizing,
} from 'tailwindcss-classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Form = {
    playerName: string;
    gameRoomName: string;
    gameRoomPassword: string;
};

const schema: z.ZodType<Form> = z.object({
    playerName: z
        .string()
        .min(3, 'Player name is too short.')
        .max(20, 'Player name is too long.'),
    gameRoomName: z
        .string()
        .min(3, 'Game name is too short.')
        .max(20, 'Game name is too long.'),
    gameRoomPassword: z
        .string()
        .min(5, 'Game password is too short.')
        .max(20, 'Game password is too long.'),
});

interface Props {
    onSubmit: () => void;
    submitText: string;
}

export function GameRoomPlayerForm({ onSubmit, submitText }: Props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Form>({
        resolver: zodResolver(schema),
    });

    console.log(errors);

    return (
        <form
            className={classnames(
                sizing('w-full'),
                display('flex'),
                gap('gap-3'),
                flexDirection('flex-col'),
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                placeholder="Player name"
                {...register('playerName')}
                error={errors.playerName?.message}
            />
            <Input
                placeholder="Game name"
                {...register('gameRoomName')}
                error={errors.gameRoomName?.message}
            />
            <Input
                placeholder="Game password"
                {...register('gameRoomPassword')}
                error={errors.gameRoomPassword?.message}
            />
            <Button>{submitText}</Button>
        </form>
    );
}
