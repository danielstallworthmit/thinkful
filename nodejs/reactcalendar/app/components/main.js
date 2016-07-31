var React = require('react')
var Calendar = require('calendar').Calendar
var Weeks = require('./weeks')

var cal = new Calendar()

var weeks = cal.monthDays(2017, 6)
var dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']

console.log(cal.monthText())

var Main = React.createClass({
  getInitialState() {
    return {
      weeks,
      dayNames
    };
  },

  render() {
    return (
      <div style={{margin: "50px 0"}}>
        <Weeks weeks={this.state.weeks} dayNames={this.state.dayNames} />
      </div>
    )
  }
})

module.exports = Main