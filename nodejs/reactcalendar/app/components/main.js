var React = require('react')
var Calendar = require('calendar').Calendar
var Weeks = require('./weeks')

var cal = new Calendar()

var weeks = cal.monthDays(2016, 6)
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
        <Weeks weeks={this.state.weeks[0]} dayNames={this.state.dayNames} />
      </div>
    )
  }
})

module.exports = Main