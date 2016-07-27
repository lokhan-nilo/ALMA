import parser

with open('menu_template.json', encoding='utf-8') as target:
    parser.parseMenu(target)
    
