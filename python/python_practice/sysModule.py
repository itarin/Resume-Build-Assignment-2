import sys

# sys.stderr.write('This is stderr text\n')
# sys.stderr.flush()
# sys.stdout.write('This is stdout text\n')

# print(sys.argv)

arg = "pass this now"

def main(arg):
	print(arg)

main(sys.argv[1])

# terminal$ python sysModule.py "This is my own custom text"
# will print:
# This is stderr text
# This is stdout text
# ['sysModule.py', 'This is my own cusotmo text']