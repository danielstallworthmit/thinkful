var React = require('react')

var Day = React.createClass ({
  render() {
    var cardStyle = {
      background: '#f1f1f1',
      width: '12%',
      height: '17%',
      margin: 7,
      float: 'left',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }

    if (this.props.week > 0){
      return (
        <div style={cardStyle} className={'panel panel-default'}>
          <h5>{this.props.dayNames}</h5>
          <h4>{this.props.week}</h4>
        </div>
      )
    }
    else {
      return (
        <div style={cardStyle} className={'panel panel-default'}>
        </div>
      )
    }
  }
})

module.exports = Day