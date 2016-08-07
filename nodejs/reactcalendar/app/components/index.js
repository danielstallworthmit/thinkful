import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
var axios = require('axios')

var baseUrl = 'http://localhost:3000/events'
var events = []
BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        events: events
      }
      var self = this
      axios.get(baseUrl)
            .then(function(response){
              self.setState({events: response.data})
              console.log(response.data)
            })
            .catch(function(err){
              console.log(err)
            })
      }

  render(){
    return (
      <div>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable
          titleAccessor='summary'
          events={this.state.events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.summary)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
}

module.exports = Calendar;