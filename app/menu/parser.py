import json

def printCategory(category, items):
    print(category)
    print('-------------------')
    for value in items:
        print("{} - {}".format(value['name'], value['price']))

def parseMenu(menu):
    data = json.load(menu)
    for category in data:
        printCategory(category['category'], category['items'])
        # print(category['category'], category['items'])