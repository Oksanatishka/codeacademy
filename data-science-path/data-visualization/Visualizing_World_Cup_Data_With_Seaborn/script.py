from matplotlib import pyplot as plt
import pandas as pd
import seaborn as sns

df = pd.read_csv('WorldCupMatches.csv')
df_goals = pd.read_csv('goals.csv')

# df
print(df.head())
df['Total Goals'] = df['Home Team Goals'] + df['Away Team Goals']
print(df.head())

sns.set_style("whitegrid")
# sns.set_context("poster", font_scale=0.8)
sns.set_context("notebook", font_scale=1.25)
# Create a figure and axes for your plot
f, ax = plt.subplots(figsize=(12, 7))
# visualize the columns Year and Total Goals as a bar chart
ax = sns.barplot(x=df['Year'], y=df['Total Goals'])
# Give your bar chart a meaningful title
ax.set_title("Average Number Of Goals Scored In World Cup Matches By Year")
# Render your bar chart
plt.show()

# df_goals
print(df_goals.head())
f, ax2 = plt.subplots(figsize=(12, 7))
ax2 = sns.boxplot(x='year', y='goals', data=df_goals, palette='Spectral')
ax2.set_title("Boxplot - Goals Visualization")
plt.show()
