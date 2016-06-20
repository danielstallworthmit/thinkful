import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import statsmodels.api as sm

df = pd.read_csv('LoanStats3a.csv',low_memory=False)

df['issue_d_format'] = pd.to_datetime(df['issue_d'])
dfts = df.set_index('issue_d_format')
year_month_summary = dfts.groupby(lambda x: x.year * 100 + x.month).count()
loan_count_summary = year_month_summary['issue_d']

print(loan_count_summary.head())

plt.plot(loan_count_summary)
plt.show()

fig = plt.figure(figsize=(12,8))
ax1 = fig.add_subplot(211)
fig = sm.graphics.tsa.plot_acf(loan_count_summary,ax=ax1)
ax2 = fig.add_subplot(212)
fig = sm.graphics.tsa.plot_pacf(loan_count_summary,ax=ax2)
plt.show()
