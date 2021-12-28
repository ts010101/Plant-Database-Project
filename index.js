const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))

//logging module
const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('port', 10990)

//import express routers
const plants = require('./services/plants')
const months = require('./services/months')
const environs = require('./services/environs')
const regions = require('./services/regions')
const users = require('./services/users')

const regionenv = require('./services/regionenviron')
const plantmonthly = require('./services/plantmonthly')
const plantenv = require('./services/plantenviron')
const plantregion = require('./services/plantregion')
const savedplants = require('./services/saveduserplants')

/*add express routers
If a request comes to URL/plants, that request is then routed to the './services/plants' file*/
app.use('/plants', plants)
app.use('/months', months)
app.use('/environs', environs)
app.use('/regions', regions)
app.use('/users', users)

app.use('/regionenv', regionenv)
app.use('/plantmonthly', plantmonthly)
app.use('/plantenv', plantenv)
app.use('/plantregion', plantregion)
app.use('/savedplants', savedplants)


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
})