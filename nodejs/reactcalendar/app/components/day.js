var React = require('react')
var Event = require('./event')

var Day = React.createClass ({
  render() {

    var events = this.props.data.map(function(event, index){
      return <Event key={index} event={event}/>
    })

    var cardStyle = {
      background: '#f1f1f1',
      width: '12%',
      height: '100%',
      margin: 7,
      //float: 'left',
      position: 'relative',
      display: 'inline-block'
    }

    var dayWeekStyle = {
      float: 'left'
    }

    var dateStyle = {
      float: 'right'
    }

    if (this.props.week > 0){
      return (
        <div style={cardStyle}>
          <div><h5 style={dayWeekStyle}>{this.props.dayNames}</h5>  <h4 style={dateStyle} >{this.props.week}</h4></div>
          {events}
        </div>
      )
    }
    else {
      return (
        <div style={cardStyle}>
        </div>
      )
    }
  }
})

module.exports = Day