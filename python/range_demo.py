r = range(0, 30, 3)
print( list(r) )

numbs = range(2,68, 4)
print( list(numbs) )

for num in range(10):
    print(f"Printing range(10): {num}")

for numz in range(10, 20,2):
    print(f"Printing range(10,20,2): {numz}")

print("Enter the start value")
start = int( input() )

print("Enter the stop point")
stop = int( input() )

print("Enter the step size")
step = int( input() )

i = 0
for num  in range(start, stop, step):
    num += i
    print(f"Printing range(10,20,2): {num}")
