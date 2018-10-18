# based on: https://towardsdatascience.com/lets-code-a-neural-network-in-plain-numpy-ae7e74410795 by Piotr Skalski
"""
    What is a neural network? It is a biologically-inspired method of building computer programs that are able to learn and independently find connections in data. As Figure 2. shows, nets are a collection of software ‘neurons’ arranged in layers, connected together in a way that allows communication.
"""
import numpy as np

""" Architecture for the neural network, not neccesary to be written in this fashion
    as the output of one function is the input of the following it could be written with
    less lines but more difficult to understand for a novice
"""

nn_architecture = [
    {"input_dim": 2, "output_dim": 4, "activation": "relu"},
    {"input_dim": 4, "output_dim": 6, "activation": "relu"},
    {"input_dim": 6, "output_dim": 6, "activation": "relu"},
    {"input_dim": 6, "output_dim": 4, "activation": "relu"},
    {"input_dim": 4, "output_dim": 1, "activation": "sigmoid"},
]

# The function that initiates the values of the weight matrices and bias vectors.
def init_layers( nn_architecture, seed=99):
    np.random.seed(seed)
    number_of_layers = len(nn_architecture)
    params_values = {}

    for idx, layer in enumerate(nn_architecture):
        layer _idx = idx + 1
        layer_input_size = layer["input_dim"]
        layer_output_size = layer["output_dim"]

        params_values['W' + str(layer_idx)] = np.random.randn( layer_output_size, layer_input_size) * 0.1
        params_values['b' + str(layer_idx)] = np.random.randn(layer_output_size, 1) * 0.1

    return params_values

#  ACTIVATION FUNCTIONS - ReLU and Sigmoid including their derivatives.
def sigmoid(Z):
    return 1/(1 + np.exp(-Z))

def relu(Z):
    return np.maximum(0,Z)

def sigmoid_backward(dA, Z):
    sig = sigmoid(Z)
    return dA * sig * (1 - sig)

def relu_backward(dA, Z):
    dZ = np.array(dA, copy = True)
    dZ[Z <= 0] = 0
    return dZ

# Forward propagation is split into two separate functions — step forward for a single layer and step forward for the entire NN.
# This is not neccessart but for readability and edification
def single_layer_forward_propagation(A_prev, W_curr, b_curr, activation="relu"):
    Z_curr = np.dot(W_curr, A_prev) + b_curr

    if activation is "relu":
        activation_func = relu
    elif activation is "sigmoid":
        activation_func = sigmoid
    else:
        raise Exception('Non-supported activation function')

    return activation_func(Z_curr), Z_curr
"""
A slightly more complex function, whose role is not only to perform predictions but also to organize the collection of intermediate values. It returns, among other things, Python dictionary, which contains A and Z values computed for particular layers.
"""
def full_forward_propagation(X, params_values, nn_architecture):
    memory = {}
    A_curr = X
    for idx, layer in enumerate(nn_architecture):
        layer_idx = idx + 1
        A_prev = A_curr

        activ_function_curr = layer["activation"]
        W_curr = params_values["W" + str(layer_idx)]
        b_crr = params_values["b" + str(layer_idx)]
        A_curr, Z_curr = single_layer_forward_propagation(A_prev, W_curr, b_curr, activ_function_curr)
        memory["A" + str(idx)] = A_prev
        memeory["Z" + str(layer_idx)] = Z_curr

    return A_curr, memory
