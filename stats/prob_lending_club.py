import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats as stats

loansData = pd.read_csv('https://github.com/Thinkful-Ed/curric-data-001-data-sets/raw/master/loans/loansData.csv')
loansData.dropna(inplace=True)

loansData.boxplot(column=["Amount.Requested","Amount.Funded.By.Investors"])
plt.savefig("plots/LendingClubRequestedBoxplot2.2.2.png")
plt.show()

loansData.hist(column="Amount.Requested", alpha=0.4)
plt.savefig("plots/LendingClubRequestedHist2.2.2.png")
plt.show()

graph = stats.probplot(loansData['Amount.Requested'], dist="uniform", plot=plt)
plt.savefig("plots/LendingClubRequestedQQ2.2.2.png")
plt.show()

