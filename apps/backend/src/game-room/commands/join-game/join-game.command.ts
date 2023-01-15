export class JoinGameCommand {
    constructor(
        public readonly playerName: string,
        public readonly gamePassword: string,
        public readonly gameRoomName: string,
    ) {}
}
