var React = require('react')

var Day = React.createClass ({
  render() {
    var cardStyle = {
      background: '#f1f1f1',
      width: '12%',
      height: '17%',
      margin: 10,
      float: 'left',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <div style={cardStyle} className={'panel panel-default'}>
        <h5>{this.props.dayNames}</h5>
        <h5>{this.props.week}</h5>
      </div>
    )
  }
})

module.exports = Day