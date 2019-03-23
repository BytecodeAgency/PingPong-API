import ILeader from "./ILeader";
import IHeadToHead from "./IHeadToHead";
import IStats from "./IStats";

export default interface ITeamScoreData {
    leaderboard: ILeader[];
    headToHead: IHeadToHead[];
    teamStats: IStats;
}
