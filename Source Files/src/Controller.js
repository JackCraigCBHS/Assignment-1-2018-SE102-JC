/* eslint-disable no-unused-vars */
class Controller {
  static setup (theTournament) {
    const APRIL = 3 // JAN = 0!
    let the2018Games = new Tournament('Gold Coast 2018 Commonwealth Games')
    for (let aSport of theTournament.sports) {
      let mySport = the2018Games.addSport(aSport.name, aSport.venue)
      for (let aMatch of aSport.allMyMatches) {
        let time = new Date(aMatch.when)
        let year = time.getFullYear()
        let month = time.getMonth()
        let day = time.getDay()
        let hour = time.getHours()
        let minute = time.getMinutes()

        let newPool = aMatch.pool
        let newTeamA = aMatch.teamA
        let newTeamB = aMatch.teamB

        mySport.addMatch(year, month, day, hour, minute, newPool, newTeamA, newTeamB)
      }
    }
    console.log(the2018Games)
    return the2018Games
  }
}
