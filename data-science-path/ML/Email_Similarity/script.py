# In this project, you will use scikit-learn’s Naive Bayes implementation on several different datasets. By reporting the accuracy of the classifier, we can find which datasets are harder to distinguish. For example, how difficult do you think it is to distinguish the difference between emails about hockey and emails about soccer? How hard is it to tell the difference between emails about hockey and emails about tech? In this project, we’ll find out exactly how difficult those two tasks are.

from sklearn.datasets import fetch_20newsgroups
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# emails = fetch_20newsgroups(categories = ['rec.sport.baseball', 'rec.sport.hockey'])

# 1.We’ve imported a dataset of emails from scikit-learn’s datasets. All of these emails are tagged based on their content.
# Print emails.target_names to see the different categories.
print(emails.target_names)

# 2.We’re interested in seeing how effective our Naive Bayes classifier is at telling the difference between a baseball email and a hockey email. We can select the categories of articles we want from fetch_20newsgroups by adding the parameter categories.
# In the function call, set categories equal to the list ['rec.sport.baseball', 'rec.sport.hockey']


# 3.Let’s take a look at one of these emails.
# All of the emails are stored in a list called emails.data. Print the email at index 5 in the list.
print(emails.data[5])

# 4.All of the labels can be found in the list emails.target. Print the label of the email at index 5.
# The labels themselves are numbers, but those numbers correspond to the label names found at emails.target_names.
# Is this a baseball email or a hockey email?

# Hint
# Instead of printing index 5 from emails.data, print it from emails.target.
# Print emails.target_names to see what that number corresponds to.
# The target of email 5 is 1, which corresponds to rec.sport.hockey.

# ??

# Making the Training and Test Sets
# 5.We now want to split our data into training and test sets. Change the name of your variable from emails to train_emails. Add these three parameters to the function call:
# subset='train'
# shuffle = True
# random_state = 108
# Adding the random_state parameter will make sure that every time you run the code, your dataset is split in the same way.

# train_emails = fetch_20newsgroups(categories = ['rec.sport.baseball', 'rec.sport.hockey'],  subset='train', shuffle = True, random_state = 108)
train_emails = fetch_20newsgroups(categories = ['comp.sys.ibm.pc.hardware','rec.sport.hockey'],  subset='train', shuffle = True, random_state = 108)

# 6.Create another variable named test_emails and set it equal to fetch_20newsgroups. The parameters of the function should be the same as before except subset should now be 'test'.

# test_emails = fetch_20newsgroups(categories = ['rec.sport.baseball', 'rec.sport.hockey'],  subset='test', shuffle = True, random_state = 108)
test_emails = fetch_20newsgroups(categories = ['comp.sys.ibm.pc.hardware','rec.sport.hockey'],  subset='test', shuffle = True, random_state = 108)

# Counting Words
# 7.We want to transform these emails into lists of word counts. The CountVectorizer class makes this easy for us.
# Create a CountVectorizer object and name it counter.
counter = CountVectorizer()

# 8.We need to tell counter what possible words can exist in our emails. counter has a .fit() a function that takes a list of all your data.
# Call .fit() with test_emails.data + train_emails.data as a parameter.
counter.fit(test_emails.data + train_emails.data)

# 9.We can now make a list of the counts of our words in our training set.
# Create a variable named train_counts. Set it equal to counter‘s transform function using train_emails.data as a parameter.
train_counts = counter.transform(train_emails.data)

# 10.Let’s also make a variable named test_counts. This should be the same function call as before, but use test_emails.data as the parameter of transform.
test_counts = counter.transform(test_emails.data)

# Making a Naive Bayes Classifier
# 11.Let’s now make a Naive Bayes classifier that we can train and test on. Create a MultinomialNB object named classifier.
classifier = MultinomialNB()

# 12.Call classifier‘s .fit() function. .fit() takes two parameters. The first should be our training set, which for us is train_counts. The second should be the labels associated with the training emails. Those are found in train_emails.target.
classifier.fit(train_counts, train_emails.target)

# 13.Test the Naive Bayes Classifier by printing classifier‘s .score() function. .score() takes the test set and the test labels as parameters.
# .score() returns the accuracy of the classifier on the test data. Accuracy measures the percentage of classifications a classifier correctly made.
print(classifier.score(test_counts, test_emails.target))

# Testing Other Datasets
# 14.Our classifier does a pretty good job distinguishing between soccer emails and hockey emails. But let’s see how it does with emails about really different topics.
# Find where you create train_emails and test_emails. Change the categories to be ['comp.sys.ibm.pc.hardware','rec.sport.hockey'].
# Did your classifier do a better or worse job on these two datasets?


# 15.Play around with different sets of data. Can you find a set that’s incredibly accurate or incredibly inaccurate?
# The possible categories are listed below.
# 'alt.atheism'
# 'comp.graphics'
# 'comp.os.ms-windows.misc'
# 'comp.sys.ibm.pc.hardware'
# 'comp.sys.mac.hardware'
# 'comp.windows.x'
# 'misc.forsale'
# 'rec.autos'
# 'rec.motorcycles'
# 'rec.sport.baseball'
# 'rec.sport.hockey'
# 'sci.crypt'
# 'sci.electronics'
# 'sci.med'
# 'sci.space'
# 'soc.religion.christian'
# 'talk.politics.guns'
# 'talk.politics.mideast'
# 'talk.politics.misc'
# 'talk.religion.misc'