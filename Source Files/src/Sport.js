class Sport {
  constructor (newName, newVenue) {
    this.name = newName
    this.venue = newVenue
    this.allMyPools = []
    this.allMyTeams = []
    this.allMyMatches = []
  }
  toString () {
    return `${this.name} at ${this.venue}`
  }
  findTeam (targetName) {
    return this.allMyTeams.find(aTeam => aTeam.name === targetName)
  }
  addTeam (newName) {
    let aTeam = this.findTeam(newName)
    if (!aTeam) {
      aTeam = new Team(newName)
      this.allMyTeams.push(aTeam)
    }
    return aTeam
  }
  sortTeams () {
    this.allMyTeams.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      } // a must be equal to b
      return 0
    })
  }

  findPool (targetName) {
    return this.allMyPools.find(aPool => aPool.name === targetName)
  }
  sortPools () {
    this.allMyPools.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      } // a must be equal to b
      return 0
    })
  }
  addPool (newName) {
    let name = newName.trim()
    let aPool = this.findPool(name)
    if (!aPool) {
      aPool = new Pool(name)
      this.allMyPools.push(aPool)
    }
    return aPool
  }
  addMatch (newYear, newMonth, newDay, newHour, newMinute, newPoolName, newTeamNameA, newTeamNameB) {
    let when = new Date(newYear, newMonth, newDay, newHour, newMinute)
    let thePool = this.addPool(newPoolName)
    let teamA = this.addTeam(newTeamNameA)
    let teamB = this.addTeam(newTeamNameB)
    thePool.addTeam(teamA)
    thePool.addTeam(teamB)
    let newMatch = new Match(when, thePool, teamA, teamB)
    this.allMyMatches.push(newMatch)
  }
  sortMatches () {
    this.allMyMatches.sort((a, b) => {
      if (a.when < b.when) {
        return -1
      }
      if (a.when > b.when) {
        return 1
      } // same time - now sort by pool
      return 0
    })
  }
  getTeams () {
    this.sortTeams()
    let result = '*' + this.name + View.NEWLINE()
    for (let aTeam of this.allMyTeams) {
      result += aTeam + View.NEWLINE()
    }
    result += View.NEWLINE()
    return result
  }
  getPools () {
    this.sortPools()
    let result = '*' + this.name + View.NEWLINE()
    for (let aPool of this.allMyPools) {
      result += aPool.getTeams() + View.NEWLINE()
    }
    return result
  }

  sortMatchesByPool () {
    this.allMyMatches.sort((a, b) => {
      if (a.myPool.name < b.myPool.name) {
        return -1
      }
      if (a.myPool.name > b.myPool.name) {
        return 1
      } else {
        return 0
      }
    })
  }

  getMatchResults () {
    this.sortMatchesByPool()

    var sportgetmatchdiv = document.createElement('table')
    sportgetmatchdiv.className = 'resultsDiv'

    var getMatchHeading = document.createElement('h3')
    var getMatchHeadingNode = document.createTextNode(this.name)

    getMatchHeading.appendChild(getMatchHeadingNode)
    sportgetmatchdiv.appendChild(getMatchHeading)

    for (let aMatch of this.allMyMatches) {
      let tr = document.createElement('tr')
      let paranode = document.createTextNode(aMatch)
      tr.appendChild(paranode)
      sportgetmatchdiv.appendChild(tr)
    }

    matchResultsDiv.appendChild(sportgetmatchdiv)
  }

  getNZMatches () {
    this.sortMatchesByPool()
    let result = '*' + this.name + View.NEWLINE()
    for (let aMatch of this.allMyMatches) {
      if (aMatch.hasTeam('New Zealand')) {
        result += aMatch + View.NEWLINE()
      }
    }
    return result
  }
  // --------------------------------------------------------------------------
  findMatch (winner, looser) {
    return this.allMyMatches.find(aMatch => ((aMatch.myTeamA === winner && aMatch.myTeamB === looser) || (aMatch.myTeamB === winner && aMatch.myTeamA === looser)))
  }

  addPoolResult (winnerName, looserName, newWinnwerScore, newLooserScore) {
    let winner = this.findTeam(winnerName)
    let looser = this.findTeam(looserName)
    let theMatch = this.findMatch(winner, looser)
    let scoreA = newWinnwerScore
    let scoreB = newLooserScore
    if (theMatch.myTeamA.name !== winner.name) {
      scoreA = newLooserScore
      scoreB = newWinnwerScore
    }
    theMatch.addResult(scoreA, scoreB)
  }

  addShortName (fullTeamName, shortTeamName) {
    let theTeam = this.findTeam(fullTeamName)
    theTeam.shortName = shortTeamName
  }

  getResults () {
  	// sort pools by name.
    this.sortPools()

    // Declare some vars
    var sportresultsdiv = document.createElement('div')
    sportresultsdiv.className = 'sportDiv'
    var getResultsHeading = document.createElement('h3')
    var getResultsHeadingNode = document.createTextNode(this.name)
    // append to parents
    getResultsHeading.appendChild(getResultsHeadingNode)
    sportresultsdiv.appendChild(getResultsHeading)

    for (let aPool of this.allMyPools) {
      // sort Teams
      aPool.sortTeams()

      // declare some variables and generate some dynamic elements.
      var theTable = makeTable(sportresultsdiv)
      var newTableHeaderRow = document.createElement('tr')

      // append to parent
      theTable.appendChild(newTableHeaderRow)
      // add headers to table
      addSecondaryHeaders(newTableHeaderRow, 'POOL ' + aPool.name)

      for (let aTeam of aPool.allMyTeams) {
        // add every team in pool to header of table
        addSecondaryHeaders(newTableHeaderRow, aTeam.shortName)
        // add conflict resolver
        let TeamNameForTop = aTeam
        var newTeamResultsRow = document.createElement('tr')
        addTableData(newTeamResultsRow, aTeam.shortName)
        for (let aTeamforSide of aPool.allMyTeams) {
          // stop values being returned for same team
          if (TeamNameForTop.shortName === aTeamforSide.shortName) {
            addTableData(newTeamResultsRow, 'xxxxxxxx')
            theTable.appendChild(newTeamResultsRow)
          } else {
            let theMatch = this.findMatch(TeamNameForTop, aTeamforSide)
            let leftScore = theMatch.findScore(TeamNameForTop.name)
            let rightScore = theMatch.findScore(aTeamforSide.name)
            addTableData(newTeamResultsRow, leftScore + ' - ' + rightScore)
          }
        }
        addTableData(newTeamResultsRow, aTeam.matchesPlayed, aTeam.matchesWon, aTeam.matchesLost, aTeam.matchesDrawn, aTeam.scoreFor, aTeam.scoreAgainst)
        theTable.appendChild(newTeamResultsRow)
      }
      addSecondaryHeaders(newTableHeaderRow, 'Matches Played', 'Matches Won', 'Matches Lost', 'Matches Drawn', 'Points For', 'Points Against')
    }
    // Deprecated Code Removed 28/08/18
    // append to parent elements
    resultsDiv.appendChild(sportresultsdiv)
  }

  getTeamResults () {
    // sort Teams by name.
    this.sortTeams()

    // Declare some vars
    var sportgetteamsdiv = document.createElement('div')
    sportgetteamsdiv.className = 'sportDiv'

    var getTeamResultsHeading = document.createElement('h3')
    var getTeamResultsHeadingNode = document.createTextNode(this.name)
    // append to parents
    sportgetteamsdiv.appendChild(getTeamResultsHeading)

    // add table headers
    var theTable = makeTable(sportgetteamsdiv)
    addTableHeaders(theTable, 'Team', 'Matches Played', 'Matches Won', 'Matches Lost', 'Matches Drawn', 'Points For', 'Points Against')

    // append node
    getTeamResultsHeading.appendChild(getTeamResultsHeadingNode)

    // return results as a paragraph element for all teams
    for (let aTeam of this.allMyTeams) {
      var theRow = document.createElement('tr')
      addTableData(theRow, aTeam.name, aTeam.matchesPlayed, aTeam.matchesWon, aTeam.matchesLost, aTeam.matchesDrawn, aTeam.scoreFor, aTeam.scoreAgainst)
      theTable.appendChild(theRow)
    }
    // append to parent elements
    teamResultsDiv.appendChild(sportgetteamsdiv)
  }
}
