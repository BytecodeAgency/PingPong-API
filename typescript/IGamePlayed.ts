export default interface IGamePlayed {
    id: number;
    teamid: number;
    player1id: number;
    player1score: number;
    player2id: number;
    player2score: number;
    winner: number;
    addedby: number;
    playedon: Date;
}
