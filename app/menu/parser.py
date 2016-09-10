import json

def create_menu(menu):
    return json.loads(menu)

def printCategory(category, items):
    print(category)
    print('-------------------')
    for value in items:
        print("{} - {}".format(value['name'], value['price']))

def print_menu(menu):
    for category in menu:
        printCategory(category['category'], category['items'])

def parseMenu(menu):
    data = create_menu(menu)
    for category in data:
        printCategory(category['category'], category['items'])
        # print(category['category'], category['items'])
