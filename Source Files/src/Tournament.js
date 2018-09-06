/* global Sport View */
class Tournament {// eslint-disable-line no-unused-vars
  constructor (newName) {
    this.name = newName
    this.allMySports = []
  }
  toString () {
    return this.name
  }
  addSport (newName, newVenue) {
    let newSport = new Sport(newName, newVenue)
    this.allMySports.push(newSport)
    return newSport
  }

  getSports () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport + View.NEWLINE()
    }
    return result
  }

  getTeams () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getTeams() + View.NEWLINE()
    }
    return result
  }

  getPools () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getPools() + View.NEWLINE()
    }
    return result
  }

  getMatches () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getMatches() + View.NEWLINE()
    }
    return result
  }
  getNZMatches () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getNZMatches() + View.NEWLINE()
    }
    return result
  }
  getParticipation () {
    let netballSet = new Set()
    for (let aTeam of this.allMySports[0].allMyTeams) {
      netballSet.add(aTeam.name)
    }
    let mens7sSet = new Set()
    for (let aTeam of this.allMySports[1].allMyTeams) {
      mens7sSet.add(aTeam.name)
    }
    let womens7sSet = new Set()
    for (let aTeam of this.allMySports[2].allMyTeams) {
      womens7sSet.add(aTeam.name)
    }
    let all3Set = netballSet.intersection(mens7sSet)
    all3Set = all3Set.intersection(womens7sSet)
  }

  getResults () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getResults() + View.NEWLINE()
    }
    return result
  }

  getMatchResults () {
    for (let aSport of this.allMySports) {
      aSport.getMatchResults()
    }
  }

  getTeamResults () {
    let result = ''
    for (let aSport of this.allMySports) {
      result += aSport.getTeamResults() + View.NEWLINE()
    }
    return result
  }

  getAll () {
    // this function creates the HTML to output the information from our program

    // creating output for team results
    var head2_1 = document.createElement('h2')
    var head2_1Node = document.createTextNode('Match Results')
    head2_1.appendChild(head2_1Node)
    matchResultsDiv.appendChild(head2_1)
    returnAll.appendChild(matchResultsDiv)

    // create structure for team results
    var head2_2 = document.createElement('h2')
    var head2_2Node = document.createTextNode('Team Results')
    head2_2.appendChild(head2_2Node)
    teamResultsDiv.appendChild(head2_2)
    returnAll.appendChild(teamResultsDiv)

    // create structure for team results
    var head2_3 = document.createElement('h2')
    var head2_3Node = document.createTextNode('All Matches Results')
    head2_3.appendChild(head2_3Node)
    resultsDiv.appendChild(head2_3)
    returnAll.appendChild(resultsDiv)

    // generate all results
    this.getMatchResults()
    this.getTeamResults()
    this.getResults()

    // append all dynamic content
    let theDisplay = document.getElementById('divDisplay')
    theDisplay.appendChild(returnAll)

    // remove input files so it doesnt break again
    let theInputtoBeBurntAtTheStake = document.getElementById('divloader')
    theInputtoBeBurntAtTheStake.remove()
    let theButtontoBeBurntAtTheStake = document.getElementById('faggot')
    theButtontoBeBurntAtTheStake.remove()
  }

  findSport (targetName) {
    return this.allMySports.find(aSport => aSport.name === targetName)
  }
}
