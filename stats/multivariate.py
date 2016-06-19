import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm
import statsmodels.formula.api as smf
import numpy as np

loansData = pd.read_csv('LoanStats3a.csv')[['int_rate','annual_inc','home_ownership']]
loansData.dropna(inplace=True)

#print(loansData.head())
#print(type(loansData['annual_inc'][0]))
#print(loansData.describe())

def cleans(dat, idx, typ):
	return dat.map(lambda x: typ(x[:idx]))
loansData['int_rate'] = cleans(loansData['int_rate'], -1, float)
loansData['home_ownership'] = pd.Categorical(loansData['home_ownership']).labels

intrate = loansData['int_rate']
aninc = loansData['annual_inc']
homeown = loansData['home_ownership']

#plt.figure()
pd.scatter_matrix(loansData, alpha=0.05, figsize=(6,6), diagonal='hist')
plt.show()

y = np.matrix(intrate).transpose()
x = np.matrix(aninc).transpose()

X = sm.add_constant(x)
model = sm.OLS(y, X)
f = model.fit()

print(f.summary())

# Multivariate Regression
x1 = x
x2 = np.matrix(homeown).transpose()

x = np.column_stack([x1,x2])
X = sm.add_constant(x)
f = sm.OLS(y, X).fit()

print(f.summary())

#Another way
y = loansData['int_rate']
X = sm.add_constant(loansData[['annual_inc','home_ownership']])

est = sm.OLS(y, X).fit()

print(est.summary())

# Adding the interaction between inc and homeown
est = smf.ols(formula="int_rate ~ annual_inc * home_ownership", data=loansData).fit()

print(est.summary())

