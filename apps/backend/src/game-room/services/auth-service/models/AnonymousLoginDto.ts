export interface AnonymousLoginDto {
    name: string;
    gameId: string;
    role: 'player' | 'admin';
}
