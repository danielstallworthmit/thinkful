import matplotlib.pyplot as plt
import numpy as np
import collections
import scipy.stats as stats

plt.style.use('fivethirtyeight')
plt.figure()
test_data = np.random.normal(size=1000)
#Counter
c = collections.Counter(test_data)
count_sum = sum(c.values())
#for k,v in c.iteritems():
#	print("Frequency of "+str(k)+" is "+str(float(v)/count_sum))
# Boxplot
plt.boxplot(test_data)
plt.savefig("plots/boxplot1.png")
plt.show()
# Histogram
plt.hist(test_data)
plt.savefig("plots/hist1.png")
plt.show()
# QQ plot
graph1 = stats.probplot(test_data, dist="norm", plot=plt)
plt.savefig("plots/qq1.png")
plt.show()

# Second plot
plt.figure()
test2 = np.random.uniform(size=1000)
# Boxplot
plt.boxplot(test2)
plt.savefig("plots/boxplot2.png")
plt.show()
# Histogram
plt.hist(test2)
plt.savefig("plots/hist2.png")
plt.show()
# QQ plot
graph2 = stats.probplot(test2, dist="uniform", plot=plt)
plt.savefig("plots/qq2.png")
plt.show()



