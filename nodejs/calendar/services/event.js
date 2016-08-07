var Event = require('../models/event');

exports.list = () => Event.find()

exports.yrAgg = (year) => Event.aggregate([
											{'$match': {'$or': [{'startYear': year}, {'endYear': year}]}}, 
											{'$project': {'startDay': 1, 'endDay': 1, 
												'dayCount': {'$cond': [ { '$ne': [ '$startDay', '$endDay' ] }, ['$startDay', '$endDay'], ['$startDay'] ]},
												'monthCount': {'$cond': [ { '$ne': [ '$startMonth', '$endMonth' ] }, ['$startMonth', '$endMonth'], ['$startMonth'] ]}
														 }
											},
											{'$unwind': '$dayCount'}, // Need to group by month as well
											{'$group': {'_id': {"month": "$monthCount", "day": '$dayCount'}, 'count': {'$sum': 1}}}
										  ])

exports.month = (year, month) => Event.find().and([
													{'$or': [{'startYear': year}, {'endYear': year}]},
													{'$or': [{'startMonth': month}, {'endMonth': month}]}
												])

exports.days = (year, month, daysStart, daysEnd) => Event.find().and([
																	{'$or': [{'startYear': year}, {'endYear': year}]},
																	{'$or': [{'startMonth': month}, {'endMonth': month}]},
																	{'$or': [{'startDay': {'$gte': daysStart, '$lte': daysEnd}}, 
																			{'endDay': {'$gte': daysStart, '$lte': daysEnd}}]
																	}
																])

exports.save = (event) => Event.create(event)

exports.update = (id, event) => Event.findByIdAndUpdate(id, event)

exports.del = (id) => Event.findByIdAndRemove(id)

