# import codecademylib
from matplotlib import pyplot as plt
import pandas as pd

restaurants = pd.read_csv('restaurants.csv')

print(restaurants.head())

cuisine_options_count = restaurants.cuisine.nunique()

cuisine_counts = restaurants.groupby('cuisine').name.count().reset_index()

print(cuisine_counts)

# What cuisines does FoodWheel offer?
cuisines = cuisine_counts.cuisine.values    # cuisines contains the values of the column cuisine from cuisine_counts.
counts = cuisine_counts.name.values         # counts contains the number of restaurants of each cuisine from cuisine_counts.

plt.pie(counts, labels=cuisines, autopct='%d%%')    # create a pie chart
plt.title('FoodWheel')
plt.axis('equal')
plt.show()

# Orders Over Time
orders = pd.read_csv('orders.csv')
print orders.head()

orders['month'] = orders.date.apply(lambda x: x.split('-')[0])
print orders.head()

avg_order = orders.groupby('month').price.mean().reset_index()  # gives the average amount spent on an order for each month
std_order = orders.groupby('month').price.std().reset_index()   # gives the standard deviation for each month.

ax = plt.subplot()

bar_heights = avg_order.price
bar_errors = std_order.price

plt.bar(range(len(bar_heights)), bar_heights, yerr=bar_errors, capsize=5)
ax.set_xticks(range(len(bar_heights)))
ax.set_xticklabels(['April', 'May', 'June', 'July', 'August', 'September'])
plt.ylabel('Average Order Amount')
plt.title('Order Amount over Time')
plt.show()

# Customer Types
customer_amount = orders.groupby('customer_id').price.sum().reset_index()
print customer_amount.head()
# Create a histogram 
plt.hist(customer_amount.price.values, range=(0, 200), bins=40)
plt.xlabel('Total Spent')
plt.ylabel("Number of Customers")
plt.title('Customer Expenditure Over 6 Months')
plt.show()