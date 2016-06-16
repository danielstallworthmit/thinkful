import pandas as pd
from scipy import stats

data = '''Region,Alcohol,Tobacco
North,6.47,4.03
Yorkshire,6.13,3.76
Northeast,6.19,3.77
East Midlands,4.89,3.34
West Midlands,5.63,3.47
East Anglia,4.52,2.92
Southeast,5.89,3.20
Southwest,4.79,2.71
Wales,5.27,3.53
Scotland,6.08,4.51
Northern Ireland,4.02,4.56'''


data = [i.split(',') for i in data.splitlines()]

column_names = data[0]
data_rows = data[1:]
df = pd.DataFrame(data_rows, columns=column_names)

df['Alcohol'] = df['Alcohol'].astype(float)
df['Tobacco'] = df['Tobacco'].astype(float)

amean = df['Alcohol'].mean()
amed = df['Alcohol'].median()
amode = stats.mode(df['Alcohol']).mode[0].astype(float)
astd = df['Alcohol'].std()
avar = df['Alcohol'].var()
arange = max(df['Alcohol']) - min(df['Alcohol'])


tmean = df['Tobacco'].mean()
tmed = df['Tobacco'].median()
tmode = stats.mode(df['Tobacco']).mode[0].astype(float)
tstd = df['Tobacco'].std()
tvar = df['Tobacco'].var()
trange = max(df['Tobacco']) - min(df['Tobacco'])

stat = ['mean', 'median', 'mode', 'standard deviation', 'variance', 'range']
combstats = [[amean, amed, amode, astd, avar, arange], [tmean, tmed, tmode, tstd, tvar, trange]]
datum = ['Alcohol', 'Tobacco']

for i in range(len(datum)):
	for j in range(len(stat)):
		print("The %s for %s in the Dataset is %f." % (stat[j],datum[i],combstats[i][j]))


