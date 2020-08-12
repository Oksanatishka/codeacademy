# When considering buying a car, what factors go into making that decision?
# Each car can fall into four different classes which represent how satisfied someone would be with purchasing the car — unacc (unacceptable), acc (acceptable), good, vgood.
# Each car has 6 features:
#     - The price of the car which can be "vhigh", "high", "med", or "low".
#     - The cost of maintaining the car which can be "vhigh", "high", "med", or "low".
#     - The number of doors which can be "2", "3", "4", "5more".
#     - The number of people the car can hold which can be "2", "4", or "more".
#     - The size of the trunk which can be "small", "med", or "big".
#     - The safety rating of the car which can be "low", "med", or "high".

from tree import tree, classify, data

car = ["low", "low", "4", "4", "big", "high"]
print(classify(car, tree))