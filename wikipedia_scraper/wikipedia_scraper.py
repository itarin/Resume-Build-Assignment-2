import requests

#Library for parsing HTML
from bs4 import BeautifulSoup

base_url = 'https://dumps.wikimedia.org/enwiki/'
index = requests.get(base_url).text
soup_index = BeautifulSoup(index, 'html.parser')

# Find the links on the page
dumps = [a['href'] for a in soup_index.find_all('a') if a.has_attr('href')]

# print(dumps)this was used to print the dumps

# For this project, we’ll take the dump on September 1, 2018
# To find all the available files in the dump, we use the following code:
dump_url = base_url + '20180901/'

# Retrieve th HTML
dump_html = requests.get(dump_url).text

# Convert to a soup
soup_dump = BeautifulSoup(dump_html, 'html.parser')

# Find list elements with the class file, this can also be printed to check li's
soup_dump.find_all('li', {'class': 'file'})[:3]
