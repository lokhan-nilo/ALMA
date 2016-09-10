import sys

from firebase.firebase import Firebase
import menu.parser
import view.menu_output_generator as generator

firebase = Firebase()

print("Зареждане на менюто.")
menuBlob = firebase.firebase.storage().child('menu.json').get()
menuText = menuBlob.download_as_string().decode("utf-8", "strict") 
menuJson = menu.parser.create_menu(menuText)
print("Менюто е заредено.")
print()
menu.parser.parseMenu(menuText)
print()
print("Създаване на темплейта.")
generator.create_html_template(menuJson)

sys.exit("Операцията завърши успешно.")