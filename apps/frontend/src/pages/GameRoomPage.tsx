import { useGameRoomPlayers } from '../hooks';
import {
    backgroundColor,
    borderRadius,
    classnames,
    padding,
    sizing,
    textAlign,
    typography,
} from 'tailwindcss-classnames';
import { Button } from '#ui';

export function GameRoomPage() {
    const players = useGameRoomPlayers();

    return (
        <>
            {players.map(({ id, name }) => (
                <div
                    key={id}
                    className={classnames(
                        sizing('w-full'),
                        padding('py-5'),
                        backgroundColor('bg-gray-800'),
                        borderRadius('rounded-md'),
                        textAlign('text-center'),
                        typography('text-emerald-400', 'font-semibold'),
                    )}
                >
                    {name}
                </div>
            ))}
            <Button>Start game</Button>
        </>
    );
}
