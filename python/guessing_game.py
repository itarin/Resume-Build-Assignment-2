import random

random_number = random.randint(1,10)
guess = 0
keep_playing = "y"

while keep_playing == "y":
    guess = input("Guess a number between 1-10: ")
    guess = int(guess)
    if random_number > guess:
        print("Too low, try again!")
    elif random_number < guess:
        print("Too high, try again!")
    else:
        print("You Won!!!")
        keep_playing = input("Would you like to play again?(y/n): ")
        if keep_playing == "y":
            random_number = random.randint(1,10)
            guess = None
        else:
            print("Thank you for playing")
            break
            
