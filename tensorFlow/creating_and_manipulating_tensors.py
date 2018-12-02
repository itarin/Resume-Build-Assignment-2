from __future__ import print_function

import tensorflow as tf

try:
    tf.contrib.eager.enable_eager_execution()
    print("TF imported with eager execution!")
except ValueError:
    print("TF already imported with eager execution!")

# A primes vector containing prime numbers.
primes = tf.constant([2, 3, 5, 7, 11, 13], dtype = tf.int32)
print("primes:", primes)

# A ones vector containing all 1 values
ones = tf.ones([6], dtype = tf.int32)
print("ones:", ones)

# A vector created by performing element-wise addition over the first two vectors.
just_beyond_primes = tf.add(primes, ones)
print("just_beyond_primes:", just_beyond_primes)

twos = tf.constant([2, 2, 2, 2, 2, 2], dtype = tf.int32)

# A vector created by doubling the elements in the primes vector.
primes_doubled = primes * twos
print("primes_doubled:", primes_doubled)

# Calling the numpy method of tensor returns the value of the tensor as a numpy array
some_matrix = tf.constant([[1, 2, 3], [4, 5, 6]], dtype = tf.int32)
print(some_matrix)
print("\nvalue of some_matrix is:\n", some_matrix.numpy())

"""
Tensor Shapes are used to characterize the size and number of dimensions of a tensor. The shape of a tensor is expressed as list, with the ith element representing the size along dimension i.
The length of the list then indicates the rank of the tensor (i.e., the number of dimensions).
"""

# A scalar (0-D tensor)
scalar = tf.zeros([])

# A vector with 3 elements
vector = tf.zeros([3])

# A matrix with 2 rows and 3 columnsself.
matrix = tf.zeros([2,3])

print('scalar has shape', scalar.get_shape(), 'and value:\n', scalar.numpy())
print('vector has shape', vector.get_shape(), 'and value:\n', vector.numpy())
print('matrix has shape', matrix.get_shape(), 'and value:\n', matrix.numpy())
