var Event = require('../models/event')

exports.list = (userid) => Event.find({'userid': userid})

exports.yrAgg = (year, userid) => Event.aggregate([
											{'$match': {'userid': userid, '$or': [{'startYear': year}, {'endYear': year}]}}, 
											{'$project': {'startDay': 1, 'endDay': 1, 
												'dayCount': {'$cond': [ { '$ne': [ '$startDay', '$endDay' ] }, ['$startDay', '$endDay'], ['$startDay'] ]},
												'monthCount': {'$cond': [ { '$ne': [ '$startMonth', '$endMonth' ] }, ['$startMonth', '$endMonth'], ['$startMonth'] ]}
														 }
											},
											{'$unwind': '$dayCount'}, // Need to group by month as well
											{'$group': {'_id': {"month": "$monthCount", "day": '$dayCount'}, 'count': {'$sum': 1}}}
										  ])

exports.month = (year, month, userid) => Event.find({'userid': userid}).and([
													{'$or': [{'startYear': year}, {'endYear': year}]},
													{'$or': [{'startMonth': month}, {'endMonth': month}]}
												])

exports.days = (year, month, daysStart, daysEnd, userid) => Event.find({'userid': userid}).and([
																	{'$or': [{'startYear': year}, {'endYear': year}]},
																	{'$or': [{'startMonth': month}, {'endMonth': month}]},
																	{'$or': [{'startDay': {'$gte': daysStart, '$lte': daysEnd}}, 
																			{'endDay': {'$gte': daysStart, '$lte': daysEnd}}]
																	}
																])

exports.save = (event, userid) => {
	event.userid = userid
	return Event.create(event)
}

exports.update = (id, event, userid) => Event.findOneAndUpdate({'_id': id, 'userid': userid}, event)

exports.del = (id, userid) => Event.findOneAndRemove({'_id': id, 'userid': userid})

