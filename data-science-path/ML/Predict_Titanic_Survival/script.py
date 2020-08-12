# In this project you will create a Logistic Regression model that predicts which passengers survived the sinking of the Titanic, based on features like age and class.
# The data we will be using for training our model is provided by Kaggle.

# import codecademylib3_seaborn
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the Data
# 1.The file passengers.csv contains the data of 892 passengers onboard the Titanic when it sank that fateful day. Let’s begin by loading the data into a pandas DataFrame named passengers. Print passengers and inspect the columns. What features could we use to predict survival?
passengers = pd.read_csv('passengers.csv')      # Load the passenger data
# print(passengers)

# Clean the Data
# 2.Given the saying, “women and children first,” Sex and Age seem like good features to predict survival. Let’s map the text values in the Sex column to a numerical value. Update Sex such that all values female are replaced with 1 and all values male are replaced with 0.
passengers['Sex'] = passengers['Sex'].map({'male': 0,'female': 1})      # Update sex column to numerical
print(passengers)

# 3.Let’s take a look at Age. Print passengers['Age'].values. You can see we have multiple missing values, or nans. Fill all the empty Age values in passengers with the mean age.
passengers['Age'].fillna(value=round(passengers['Age'].mean()),inplace=True)        # Fill the nan values in the age column
print(passengers)

# 4.Given the strict class system onboard the Titanic, let’s utilize the Pclass column, or the passenger class, as another feature. Create a new column named FirstClass that stores 1 for all passengers in first class and 0 for all other passengers.
passengers['FirstClass'] = passengers['Pclass'].apply(lambda x: 1 if x == 1 else 0)     # Create a first class column

# 5.Create a new column named SecondClass that stores 1 for all passengers in second class and 0 for all other passengers.
# Print passengers and inspect the DataFrame to ensure all the updates have been made.
passengers['SecondClass'] = passengers['Pclass'].apply(lambda x: 1 if x == 2 else 0)    # Create a second class column
print(passengers)

# Select and Split the Data
# 6.Now that we have cleaned our data, let’s select the columns we want to build our model on. Select columns Sex, Age, FirstClass, and SecondClass and store them in a variable named features. Select column Survived and store it a variable named survival.
features = passengers[['Sex', 'Age', 'FirstClass', 'SecondClass']]      # Select the desired features
survival = passengers['Survived']

# 7.Split the data into training and test sets using sklearn‘s train_test_split() method. We’ll use the training set to train the model and the test set to evaluate the model.
# X_train, X_test, y_train, y_test = train_test_split(features,labels,test_size = 0.8)
train_features, test_features, train_labels, test_labels = train_test_split(features,survival)      # Perform train, test, split

# Normalize the Data
# 8.Since sklearn‘s Logistic Regression implementation uses Regularization, we need to scale our feature data. Create a StandardScaler object, .fit_transform() it on the training features, and .transform() the test features.
scaler = StandardScaler()       # Scale the feature data so it has mean = 0 and standard deviation = 1
train_features = scaler.fit_transform(train_features)
test_features = scaler.transform(test_features)

# Create and Evaluate the Model
# 9.Create a LogisticRegression model with sklearn and .fit() it on the training data.
# Fitting the model will perform gradient descent to find the feature coefficients that minimize the log-loss for the training data.
model = LogisticRegression()        # Create and train the model
model.fit(train_features, train_labels)

# 10. .score() the model on the training data and print the training score.
# Scoring the model on the training data will run the data through the model and make final classifications on survival for each passenger in the training set. The score returned is the percentage of correct classifications, or the accuracy.
model.score(train_features, train_labels)   # Score the model on the train data

# 11. .score() the model on the test data and print the test score.
# Similarly, scoring the model on the testing data will run the data through the model and make final classifications on survival for each passenger in the test set.
# How well did your model perform?
model.score(test_features, test_labels)     # Score the model on the test data

# 12.Print the feature coefficients determined by the model. Which feature is most important in predicting survival on the sinking of the Titanic?
print(model.coef_)      # Analyze the coefficients
print(list(zip(['Sex','Age','FirstClass','SecondClass'],model.coef_[0])))

# Predict with the Model
# 13.Let’s use our model to make predictions on the survival of a few fateful passengers. Provided in the code editor is information for 3rd class passenger Jack and 1st class passenger Rose, stored in NumPy arrays. The arrays store 4 feature values, in the following order:
#   Sex, represented by a 0 for male and 1 for female
#   Age, represented as an integer in years
#   FirstClass, with a 1 indicating the passenger is in first class
#   SecondClass, with a 1 indicating the passenger is in second class
# A third array, You, is also provided in the code editor with empty feature values. Uncomment the line containing You and update the array with your information, or the information for some fictitious passenger. Make sure to enter all values as floats with a .!
Jack = np.array([0.0,20.0,0.0,0.0])     # Sample passenger features
Rose = np.array([1.0,17.0,1.0,0.0])
You = np.array([0.0,26.0,1.0,0.0])

# 14.Combine Jack, Rose, and You into a single NumPy array named sample_passengers.
sample_passengers = np.array([Jack, Rose, You])     # Combine passenger arrays

# 15.Since our Logistic Regression model was trained on scaled feature data, we must also scale the feature data we are making predictions on. Using the StandardScaler object created earlier, apply its .transform() method to sample_passengers and save the result to sample_passengers.
# Print sample_passengers to view the scaled features.
sample_passengers = scaler.transform(sample_passengers)     # Scale the sample passenger features

# 16.Who will survive, and who will sink? Use your model’s .predict() method on sample_passengers and print the result to find out.
# Want to see the probabilities that led to these predictions? Call your model’s .predict_proba() method on sample_passengers and print the result. The 1st column is the probability of a passenger perishing on the Titanic, and the 2nd column is the probability of a passenger surviving the sinking (which was calculated by our model to make the final classification decision).
print(model.predict(sample_passengers))     # Make survival predictions!
print(model.predict_proba(sample_passengers))
