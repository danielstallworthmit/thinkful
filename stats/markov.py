import pandas as pd

df = pd.DataFrame({'rainy': [.4, .7], 
                   'sunny': [.6, .3]
                  }, 
                  index=["rainy", "sunny"])

df1 = pd.DataFrame({'bull':[.9,.15,.25],'bear':[.075,.8,.25],'stagnant':[.025,.05,.5]},index=['bull','bear','stagnant'])

#print(df)

for i in range(4):
	df1 = df1.dot(df1)

print(df1)


