var React = require('react')
var Day = require('./day')

var Weeks = React.createClass({
  render() {
    var dayNames = this.props.dayNames
    var days = this.props.weeks.map(function(week, index) {
      return <Day key={index} week={week} dayNames={dayNames[index]}/>
    })

    var containerStyle = {
      width: 1080,
      margin: '0 auto',
      padding: 0
    }

    return (
      <div style={containerStyle} className={'clearfix'}>
        {days}
      </div>
    )
  }
})

module.exports = Weeks