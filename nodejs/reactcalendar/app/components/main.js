var React = require('react')
var Calendar = require('calendar').Calendar
var Weeks = require('./weeks')
var axios = require('axios')

var cal = new Calendar()
var now = new Date()

var year = now.getFullYear()
var month = now.getMonth()
var weeks = cal.monthDays(year, month)
var dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var baseUrl = 'http://localhost:3000/events'

//console.log(data)

console.log(cal.monthText())


var Main = React.createClass({
    getInitialState() {
      return {
        year,
        month,
        data: [],
        weeks,
        dayNames,
        monthNames
      };
    },

    previous: function(){
      var month = this.state.month
      var weeks = this.state.weeks
      var year = this.state.year
      try{
        cal.monthDays(year, month-1) 
        month = month - 1
      }
      catch (err) {
        year = year - 1
        month = 11
      } 
      var self = this
      axios.get(baseUrl + '/' + year + '/' + (month + 1))
            .then(function(response){
              self.setState({data: response.data})
              console.log(response.data)
            })
            .catch(function(err){
              console.log(err)
            })
      this.setState({month: month, year: year, weeks: cal.monthDays(year, month), data: []})
    },

    next: function(){
      var month = this.state.month
      var weeks = this.state.weeks
      var year = this.state.year
      try{
        cal.monthDays(year, month+1) 
        month = month + 1
      }
      catch (err) {
        year = year + 1
        month = 0
      }
      var self = this
      axios.get(baseUrl + '/' + year + '/' + (month + 1))
            .then(function(response){
              self.setState({data: response.data})
              console.log(response.data)
            })
            .catch(function(err){
              console.log(err)
            })
      this.setState({month: month, year: year, weeks: cal.monthDays(year, month), data: []})
    },

    today: function(){
      var month = now.getMonth()
      var year = now.getFullYear()
      var self = this
      axios.get(baseUrl + '/' + year + '/' + (month + 1))
            .then(function(response){
              self.setState({data: response.data})
              console.log(response.data)
            })
            .catch(function(err){
              console.log(err)
            })
      this.setState({month: month, year: year, weeks: cal.monthDays(year, month), data: []})
    },

  componentDidMount: function(){
    var self = this

    axios.get(baseUrl + '/' + year + '/' + (month + 1))
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
        <div style={{width: 600, margin: "20px auto", textAlign: "center"}}>
          <span style={{display: "inline-block", position: "relative", float: "left", width: "50px"}} onClick={this.previous}>prev</span>
          <h1 style={{display: "inline-block", position: "relative", margin: "0 100px"}} onClick={this.today}>{monthNames[this.state.month]} {this.state.year}</h1>
          <span style={{display: "inline-block", position: "relative", float: "right", width: "50px"}} onClick={this.next}>next</span>
        </div>
        <Weeks data={this.state.data} weeks={this.state.weeks} dayNames={this.state.dayNames} />
      </div>
    )
  }
})

module.exports = Main
