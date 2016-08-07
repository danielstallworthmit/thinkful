var React = require('react')

var Event = React.createClass ({
  render() {

    var eventStyle = {
      background: '#fafafa',
      width: '100%',
      //height: '17%',
      margin: 2,
      float: 'left',
      position: 'relative'
    }

      return (
        <div style={eventStyle}>
          <p>{this.props.event.summary}</p>
        </div>
      )
    
  }
})

module.exports = Event

//           <p>{this.props.event.start} - {this.props.event.end}</p>
