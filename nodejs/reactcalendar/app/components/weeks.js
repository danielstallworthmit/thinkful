var React = require('react')
var Day = require('./day')

var Weeks = React.createClass({
  render() {
    var dayNames = this.props.dayNames
    var dat = this.props.data
    var days = this.props.weeks.map(function(weeks) {
      return weeks.map(function(week, index){
        var data = dat.filter(function(datum){
          return datum.startDay === week
        })
        //console.log("data: ", data)
        return <Day key={index} week={week} dayNames={dayNames[index]} data={data}/>
      })
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