# In this project, we will be using several Python libraries to make a K-Nearest Neighbor classifier that is trained to predict whether a patient has breast cancer.

# Explore the data
# 1.Let’s begin by importing the breast cancer data from sklearn. We want to import the function load_breast_cancer from sklearn.datasets.
# Once we’ve imported the dataset, let’s load the data into a variable called breast_cancer_data. Do this by setting breast_cancer_data equal to the function load_breast_cancer().
from sklearn.datasets import load_breast_cancer
# Splitting the data into Training and Validation Sets
# 4.We have our data, but now it needs to be split into training and validation sets. Luckily, sklearn has a function that does that for us. Begin by importing the train_test_split function from sklearn.model_selection.
from sklearn.model_selection import train_test_split
# Running the classifier
# 8.Now that we’ve created training and validation sets, we can create a KNeighborsClassifier and test its accuracy. Begin by importing KNeighborsClassifier from sklearn.neighbors.
from sklearn.neighbors import KNeighborsClassifier
# Graphing the results
# 13.We now have the validation accuracy for 100 different ks. Rather than just printing it out, let’s make a graph using matplotlib. Begin by importing matplotlib.pyplot as plt.
import matplotlib.pyplot as plt

breast_cancer_data = load_breast_cancer()
# 2.Before jumping into creating our classifier, let’s take a look at the data. Begin by printing breast_cancer_data.data[0]. That’s the first datapoint in our set. But what do all of those numbers represent? Let’s also print breast_cancer_data.feature_names.
print(breast_cancer_data.data[0])
print(breast_cancer_data.feature_names)
# 3.We now have a sense of what the data looks like, but what are we trying to classify? Let’s print both breast_cancer_data.target and breast_cancer_data.target_names.
# Was the very first data point tagged as malignant or benign?
print(breast_cancer_data.target)
print(breast_cancer_data.target_names)

# 5.Call the train_test_split function. It takes several parameters:
#     - The data you want to split (for us breast_cancer_data.data)
#     - The labels associated with that data (for us, breast_cancer_data.target).
#     - The test_size. This is what percentage of your data you want to be in your testing set. Let’s use test_size = 0.2
#     - random_state. This will ensure that every time you run your code, the data is split in the same way. This can be any number. We used random_state = 100.
# 6.Right now we’re not storing the return value of train_test_split. train_test_split returns four values in the following order:
#     - The training set
#     - The validation set
#     - The training labels
#     - The validation labels
# Store those values in variables named training_data, validation_data, training_labels, and validation_labels.
training_data, validation_data, training_labels, validation_labels = train_test_split(breast_cancer_data.data, breast_cancer_data.target, test_size = 0.2,random_state = 100)

# 7.Let’s confirm that worked correctly. Print out the length of training_data and training_labels. They should be the same size - one label for every piece of data!
print(len(training_data))
print(len(training_labels))

# 14.The x-axis should be the values of k that we tested. This should be a list of numbers between 1 and 100. You can use the range function to make this list. Store it in a variable named k_list.
# x-axis 
k_list = range(1,101)
# 15.The y-axis of our graph should be the validation accuracy. Instead of printing the validation accuracies, we want to add them to a list. Outside of the for loop, create an empty list named accuracies. Inside the for loop, instead of printing each accuracy, append it to accuracies.
# y-axis
accuracies = []

# 12.The classifier does pretty well when k = 3. But maybe there’s a better k! Put the previous 3 lines of code inside a for loop. The loop should have a variable named k that starts at 1 and increases to 100. Rather than n_neighbors always being 3, it should be this new variable k.
# You should now see 100 different validation accuracies print out. Which k seems the best?
for k in range(1,101):
    # 9.Create a KNeighborsClassifier where n_neighbors = 3. Name the classifier classifier.
    classifier = KNeighborsClassifier(n_neighbors = k)
    # 10.Train your classifier using the fit function. This function takes two parameters: the training set and the training labels.
    classifier.fit(training_data, training_labels)
    # 11.Now that the classifier has been trained, let’s find how accurate it is on the validation set. Call the classifier’s score function. score takes two parameters: the validation set and the validation labels. Print the result!
    # classifier.score(validation_data, validation_labels)
    accuracies.append(classifier.score(validation_data, validation_labels))

# 17.Let’s add some labels and a title. Set the x-axis label to "k" using plt.xlabel(). Set the y-axis label to "Validation Accuracy". Set the title to "Breast Cancer Classifier Accuracy".
plt.xlabel('k')
plt.ylabel('Validation Accuracy')
plt.title('Breast Cancer Classifier Accuracy')
# 16.We can now plot our data! Call plt.plot(). The first parameter should be k_list and the second parameter should be accuracies.
# After plotting the graph, show it using plt.show().
plt.plot(k_list, accuracies)
plt.show()

# 18.Great work! If you want to play around with this more, try changing the random_state parameter when making the training set and validation set. This will change which points are in the training set and which are in the validation set.
# Ideally, the graph will look the same no matter how you split up the training set and test set. This data set is fairly small, so there is slightly more variance than usual.

