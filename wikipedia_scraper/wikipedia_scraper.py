import requests

#Library for parsing HTML
from bs4 import BeautifulSoup

base_url = 'htps://dumps.wikimedia.org/enwiki/'
index = requests.get(base_url).text
soup_index = BeautifulSoup(index, 'html.parser')

# Find the links on the page
dumps = [a['href'] for a in soup_index.find_all('a') if a.has_attr('href')]
dumps

['../',
 '20180620/',
 '20180701/',
 '20180720/',
 '20180801/',
 '20180820/',
 '20180901/',
 '20180920/',
 'latest/']
