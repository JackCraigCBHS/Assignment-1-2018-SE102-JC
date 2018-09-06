var loadedHandler = function (event) {
  var myData = JSON.parse(event.target.result)
  the2018Games = Controller.setup(myData)
  addPoolResults(the2018Games)
  addShortNames(the2018Games)
}

var fileChangeHandler = function (event) {
  var reader = new FileReader()
  reader.onload = loadedHandler
  console.log('Your file has been loaded')
  alert('Match data has been uploaded')
  var theFile = event.target.files[0]
  reader.readAsText(theFile)
}
