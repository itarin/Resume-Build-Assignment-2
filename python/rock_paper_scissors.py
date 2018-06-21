print("Rock...")
print("Paper...")
print("Scissors...")
player1 = input(" Make your move : ").lower()
# print("*** NO CHEATING!!!***\n\n" * 20)
import random import randint

random_num = randint(1,3)

if random_num == 1:
    computer = "paper"
elif random_num == 2:
    computer = "rock"
else:
    computer = "scissors"
# text  = f"Computer plays {computer}"
print(f"Computer plays: {computer}")

if player1 == computer:
    print("It's a tie!")
elif player1 == "rock":
    if computer == "scissors":
        print("player1 wins!")
    else:
        print("computer wins!")
elif player1 == "paper":
    if computer == "rock":
        print("player1 wins!")
    else:
        print("computer wins!")
elif player1 == "scissors":
    if computer == "paper":
        print("player1 wins!")
    else:
        print("computer wins!")
else:
    print("Please, enter a valid move")
