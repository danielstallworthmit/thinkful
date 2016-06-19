import math
import matplotlib.pyplot as plt
import pandas as pd
import statsmodels.api as sm

plt.style.use('fivethirtyeight')

# Load Data
loansData = pd.read_csv('https://github.com/Thinkful-Ed/curric-data-001-data-sets/raw/master/loans/loansData.csv')
loansData.dropna(inplace=True)

# Clean Data
def cleans(dat, idx, typ):
	return dat.map(lambda x: typ(x[:idx]))
loansData['Interest.Rate'] = cleans(loansData['Interest.Rate'],-1,float)
loansData['Loan.Length'] = cleans(loansData['Loan.Length'], -7, int)
loansData['FICO.Score'] = cleans(loansData['FICO.Range'], 3, int)
#print(loansData['Interest.Rate'].head())

intrate = loansData['Interest.Rate']
loanamt = loansData['Amount.Requested']
fico = loansData['FICO.Score']

# If IR is < 12, then set column to 0, else set to 1
loansData['IR_TF'] = loansData['Interest.Rate'].map(lambda x: 0 if x<12 else 1)

#print(loansData['IR_TF'].head())

loansData['Constant.Intercept'] = 1

intercept = loansData['Constant.Intercept']

#print(loansData.head())

indvars = ['FICO.Score','Amount.Requested','Constant.Intercept']

# Log Regression fit
logit = sm.Logit(loansData['IR_TF'], loansData[indvars])
result = logit.fit()
coeff = result.params
print(coeff)

# Make the prediction based on the logistic function coefficients, p = 1/( 1 + e^(intercept+f_coeff*(fico)+l_coeff*(loan)) )
def logistic_function(score, loan, intercept_coeff, score_coeff, loan_coeff):
	p = 1/(1+math.exp(intercept_coeff + score_coeff*(score) + loan_coeff*(loan)))
	return p

# Plot FICO vs prob IR will be < 12
plt.figure()
fico_arr = range(550,950,50)
p_arr = []

for i in fico_arr:
	p_arr.append(logistic_function(i, 25000, coeff[2], coeff[0], coeff[1]))
plt.plot(fico_arr, p_arr)
plt.show()

# Show overall prediction based on FICO and loan amount request
def pred(score, loan):
	if logistic_function(score, loan, coeff[2], coeff[0], coeff[1]) > .7:
		return "At FICO of %i and loan at $%i, YES! You get money!" % (score, loan)
	else:
		return "At FICO of %i and loan at $%i,Sorry, better luck next time!" % (score, loan)

print(pred(700, 10000))

