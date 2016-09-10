from model.menu_item import MenuItem
from model.menu_header import MenuHeader
from menu import parser_test as Bu

import sys
# Bu

sys.exit("LOL")

def printCategory(category, items):
    print(category.name)
    print('-------------------')
    for value in items:
        print("{} - {}".format(value.name, value.price))

# Create the menu
soupHeader = MenuHeader('Супи')
soupItems = []
soupItems.append(MenuItem('Таратор', '1.00 лв.'))
soupItems.append(MenuItem('Пилешка Супа', '1.50 лв.'))

mainDishesHeader = MenuHeader('Основно')
mainDishesItems = []
mainDishesItems.append(MenuItem('Пиле с ориз', '3.50 лв.'))

# Print the menu
print("********************")
print()
printCategory(soupHeader, soupItems)
print()
printCategory(mainDishesHeader, mainDishesItems)
print()
print("********************")