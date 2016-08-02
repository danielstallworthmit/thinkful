var Event = require('../models/event');

exports.save = (event) => Event.create(event)

exports.list = () => Event.find()

exports.update = (id, event) => Event.findByIdAndUpdate(id, event)

exports.del = (id) => Event.findByIdAndRemove(id)

