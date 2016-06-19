import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm
import numpy as np

loansData = pd.read_csv('https://github.com/Thinkful-Ed/curric-data-001-data-sets/raw/master/loans/loansData.csv')

# print(loansData['Interest.Rate'].head())
def cleans(dat, idx, typ):
	return dat.map(lambda x: typ(x[:idx]))
loansData['Interest.Rate'] = cleans(loansData['Interest.Rate'],-1,float)
loansData['Loan.Length'] = cleans(loansData['Loan.Length'], -7, int)
loansData['FICO.Score'] = cleans(loansData['FICO.Range'], 3, int)
#print(loansData['FICO.Score'].head())

intrate = loansData['Interest.Rate']
loanamt = loansData['Amount.Requested']
fico = loansData['FICO.Score']

# Histogram for FICO Score
plt.figure()
loansData['FICO.Score'].hist()
plt.show()

# scatter_matrix
pd.scatter_matrix(loansData, alpha=0.05, figsize=(10,10), diagonal='hist')
plt.show()

y = np.matrix(intrate).transpose()
x1 = np.matrix(fico).transpose()
x2 = np.matrix(loanamt).transpose()

x = np.column_stack([x1,x2])

X = sm.add_constant(x)
model = sm.OLS(y,X)
f = model.fit()

print(f.summary())

