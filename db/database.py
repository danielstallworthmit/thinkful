import sqlite3 as lite
import pandas as pd

cities = (('New York City', 'NY'),
    ('Boston', 'MA'),
    ('Chicago', 'IL'),
    ('Miami', 'FL'),
    ('Dallas', 'TX'),
    ('Seattle', 'WA'),
    ('Portland', 'OR'),
    ('San Francisco', 'CA'),
    ('Los Angeles', 'CA'))
weather = (('New York City', 2013, 'July', 'January', 62),
  ('Boston', 2013, 'July', 'January', 59),
  ('Chicago', 2013, 'July', 'January', 59),
  ('Miami', 2013, 'August', 'January', 84),
  ('Dallas', 2013, 'July', 'January', 77),
  ('Seattle', 2013, 'July', 'January', 61),
  ('Portland', 2013, 'July', 'December', 63),
  ('San Francisco', 2013, 'September', 'December', 64),
  ('Los Angeles', 2013, 'September', 'December', 75))


con = lite.connect('cities.db')

with con:
	cur = con.cursor()
	cur.execute("drop table if exists cities")
	cur.execute("drop table if exists weather")
	cur.execute("create table cities (name, state)")
	cur.execute("create table weather (city text, year integer, warm_month text, cold_month text, average_high integer)")
	cur.executemany("insert into cities values (?,?)",cities)
	cur.executemany("insert into weather values (?,?,?,?,?)",weather)
	cur.execute("select name, state, year, warm_month, cold_month, average_high from cities inner join weather on name=city and warm_month='July'")
	rows = cur.fetchall()
	cols = [desc[0] for desc in cur.description]
	df = pd.DataFrame(rows, columns=cols)
	statement = "The cities that are warmest in July are:"
	for i in range(len(df.index)):
		if i < len(df.index)-1:
			statement += " %s, %s," % (df.ix[i,'name'], df.ix[i,'state'])
		else:
			statement += " %s, %s." % (df.ix[i,'name'], df.ix[i,'state'])
	print(statement)

