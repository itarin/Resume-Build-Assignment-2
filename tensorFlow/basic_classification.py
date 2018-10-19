# from the tensorflow tutorial at: https://www.tensorflow.org/tutorials/keras/basic_classification

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# Helper libraries
import numpy as np
import matplotlib.pyplot as plt

# print(tf.__version__)

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()


class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

train_images.shape # When printed shows there are 60,000 images in the training set, with each image represented as 28 x 28 pixels:

len(train_labels) # Likewise, there are 60,000 labels in the training set can also be seen by printing

train_labels # Each label is an integer from 0 and 9 for the data

test_images.shape # There are 10,000 images in the test set. Again, each image is represented as 28 x 28 pixels

len(test_labels) # Th test set contains 10,000 labels

# The data must be preprocessed before training the network
plt.figure()
plt.imshow(train_images[0])
plt.colorbar()
plt.grid(False)

# We scale these values to a range of 0 to 1 before feeding to the neural network model.
# For this, cast the datatype of the image components from an integer to a float, and divide by 255.
# This has to be donoe for the training and testing set
train_images = train_images/255.0
test_images = test_images/255.0

# Display the first 25 images in the training set and display the class name bellow each image.
# This is to verify the data is in the correct format before building
plt.figure(figsize=(10, 10))
for i in range(25):
    plt.subplot(5, 5, i + 1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    plt.imshow(train_images[i], cmap=plt.cm.binary)
    plt.xlabel(class_names[train_labels[i]])
