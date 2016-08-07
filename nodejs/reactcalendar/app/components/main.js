var React = require('react')
var Calendar = require('calendar').Calendar
var Weeks = require('./weeks')
var axios = require('axios')

var cal = new Calendar()

var year = 2016
var month = 7
var weeks = cal.monthDays(year, month)
var dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var baseUrl = 'http://localhost:3000/events'

//console.log(data)

console.log(cal.monthText())


var Main = React.createClass({
    getInitialState() {
      return {
        data: [],
        weeks,
        dayNames
      };
    },

  componentDidMount: function(){
    var self = this

    axios.get(baseUrl + '/2016/8')
            .then(function(response){
              self.setState({data: response.data})
              console.log(response.data)
            })
            .catch(function(err){
              console.log(err)
            })
  },

  render() {
    return (
      <div style={{margin: "50px auto", width: 1080}}>
        <h1 style={{width: 600, margin: "20px auto", textAlign: "center"}}>{monthNames[month]} {year}</h1>
        <Weeks data={this.state.data} weeks={this.state.weeks} dayNames={this.state.dayNames} />
      </div>
    )
  }
})

module.exports = Main
