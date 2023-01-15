import { Button } from '#ui';

export function StartPage() {
    return (
        <div className="bg-gray-800 w-screen h-screen">
            <div className="w-full max-w-screen-sm bg-gray-900 h-full mx-auto">
                <div className="mx-20 py-32 flex flex-col gap-6 h-full justify-end">
                    <Button>Join game</Button>
                    <Button>Create new game</Button>
                </div>
            </div>
        </div>
    );
}
