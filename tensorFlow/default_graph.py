# from the tensorflow website tutorial at https://colab.research.google.com/notebooks/mlcc/tensorflow_programming_concepts.ipynb?utm_source=mlcc&utm_campaign=colab-external&utm_medium=referral&utm_content=tfprogconcepts-colab&hl=en
from __future__ import print_function

import tensorflow as tf

# Create a graph
g = tf.Graph()

# Establish the graph as the default graph
with g.as_default():
    # Assemble a graph consisting of the following three operations:
    # *Two tf.constant operatoins to create the operands.
    # * One tf.ad operation to add the operands.
    x =  tf.constant(8, name="x_const")
    y = tf.constant(5, name="y_const")
    z = tf.constant(4, name="z_const")
    my_sum = tf.add(x, y, name="x_y_sum")
    my_sum2 = tf.add(my_sum, z, name="x_y_z_sum")

    # Now create a session.
    # The session will run the default graph.
    with tf.Session() as sess:
        print(my_sum2.eval())
