import emoji
import time



for x in range(20):
    for y in range(20):
        print(emoji.emojize(':alien:'*y))
        time.sleep(.09)
