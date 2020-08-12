# Getting Familiar with FarmBurg
# Brian is a Product Manager at FarmBurg, a company that makes a farming simulation social network game. In the FarmBurg game, you can plow, plant, and harvest different crops.

# Today, you will be acting as Brian’s data analyst for an A/B Test that he has been conducting.

# Brian tells you that he ran an A/B test with three different groups: A, B, and C. You’re kind of busy today, so you don’t ask too many questions about the differences between A, B, and C. Maybe they were shown three different versions of an ad. Who cares?

# (HINT: you will care later)

# Brian gives you a CSV of results called clicks.csv. It has the following columns:

# user_id: a unique id for each visitor to the FarmBurg site
# ab_test_group: either A, B, or C depending on which group the visitor was assigned to
# click_day: only filled in if the user clicked on a link to purchase

# 1.Start by importing pandas as pd. You’ll be using this module for most of this project.
# import codecademylib
import pandas as pd

# 2.Load clicks.csv into the variable df.
df = pd.read_csv('clicks.csv')

# 3.Examine the first few rows of df using print and head.
print(df.head())


# Calculating Purchase Rates
# We need to help Brian determine whether or not there is a significant difference in the percent of users who purchased the upgrade package among groups A, B, and C.

# 1.Define a new column called is_purchase which is "Purchase" if click_day is not None and "No Purchase" if click_day is None. This will tell us if each visitor clicked on the Purchase link.
df['is_purchase'] = df.click_day.apply(lambda x: 'Purchase' if pd.notnull(x) else 'No Purchase')

# 2.We want to count the number of users who made a purchase from each group. Use groupby to count the number of "Purchase" and "No Purchase" from each group. Save your answer to the variable purchase_counts.
purchase_counts = df.groupby(['group', 'is_purchase']).user_id.count().reset_index()

# 3.Examine purchase_counts using print.
print purchase_counts

# Performing a Significance Test
# The data from this A/B test is categorical data.
# Why? Because a user’s response can be either "Purchase" or "No Purchase".
# There are more than 2 conditions: users could be in either Group A, Group B, or Group C.

# 1.You should perform a chi-squared test to determine if the differences between Groups A, B, and C are significant.
# Import chi2_contingency from scipy.stats so that you can perform the chi-squared test.
from scipy.stats import chi2_contingency

# 2.The function chi2_contingency accepts one argument: a contingency table. Start by filling in the contingency table below with the correct values:
# contingency = [[A_purchases, A_not_purchases], [B_purchases, B_not_purchases], [C_purchases, C_not_purchases]]
contingency = [[316, 1350], [183, 1483], [83, 1583]]

# 3.Use the function chi2_contingency with the data in contingency to calculate the p-value. Save only the p-value to the variable pvalue.
chi2_stat, pvalue, dof, t = chi2_contingency(contingency)

print pvalue
# 4.Is pvalue less than 0.05? If so, there is a significant difference between the three groups.
# Create a variable called is_significant and make it:
# True if pvalue is less than 0.05
# False if pvalue is greater than 0.05
is_significant = True

# Calculating Necessary Purchase Rates
# Your day is a little less busy than you expected, so you decide to ask Brian about his test.
# You: Hey Brian! What was that test you were running anyway?
# Brian: It was awesome! We are trying to get users to purchase a small FarmBurg upgrade package. It’s called a microtransaction. We’re not sure how much to charge for it, so we tested three different price points: $0.99, $1.99, and $4.99. It looks like significantly more people bought the upgrade package for $0.99, so I guess that’s what we’ll charge.
# You: Oh no! I should have asked you this before we did that chi-squared test. I don’t think that this was the right test at all. It’s true that more people wanted to purchase the upgrade at $0.99; you probably expected that. What we really want to know is if each price point allows us to make enough money that we can exceed some target goal. Brian, how much do you think it cost to build this feature?
# Brian: Hmm. I guess that we need to generate a minimum of $1000 per week in order to justify this project.
# You: We have some work to do!

# 1.How many visitors came to the site this week? Save your answer to num_visits.
num_visits = len(df)

# 2.Let’s assume that num_visits is how many visitors we generally get each week. Given that, calculate the percent of visitors who would need to purchase the upgrade package at each price point ($0.99, $1.99, $4.99) in order to generate Brian’s target of $1,000 per week.
# Save the results to: p_clicks_099, p_clicks_199, p_clicks_499
# Note that for higher price points, you’ll need to sell fewer upgrade packages in order to meet your target.
p_clicks_099 = (1000 / 0.99) / num_visits   # num_sales / num_visits
p_clicks_199 = (1000 / 1.99) / num_visits
p_clicks_499 = (1000 / 4.99) / num_visits

# Performing a Significance Test II
# We want to see if the percent of Group A that purchased an upgrade package is significantly greater than p_clicks_099 (the percent of visitors who need to buy an upgrade package at $0.99 in order to make our target of $1,000).
# We are comparing a single set of samples to a target. Our data is still categorical.
# Which type of test should we use?

# 1.We should use a binomial test on each group to see if the observed purchase rate is significantly greater than what we need in order to generate at least $1,000 per week.
# Import binom_test from scipy.stats.
from scipy.stats import binom_test

# 2.For Group A ($0.99 price point), perform a binom_test to see if the observed purchase rate is significantly greater than p_clicks_099.
# x will be the number of purchases for Group A
# n will be the total number of visitors assigned Group A
# p will be the target percent of purchases for that price point (calculated above as p_clicks_099)
# Save the results to pvalueA.
pvalueA = binom_test(316, 1666, p_clicks_099)

# 3.For Group B ($1.99 price point), perform a binom_test to see if the observed purchase rate is significantly greater than p_clicks_199.
# Save the results to pvalueB.
pvalueB = binom_test(183, 1666, p_clicks_199)

# 4.For Group C ($4.99 price point), perform a binom_test to see if the observed purchase rate is significantly greater than p_clicks_499.
# Save the results to pvalueC.
pvalueC = binom_test(83, 1666, p_clicks_499)

# 5.What price should Brian charge for the upgrade package? Save your answer to the variable final_answer.
final_answer = 4.99