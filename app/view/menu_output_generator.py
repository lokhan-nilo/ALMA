import os

from jinja2 import Environment, PackageLoader, FileSystemLoader

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
j2_env = Environment(loader=FileSystemLoader(THIS_DIR), trim_blocks=True)
output_file = os.path.expanduser("~/Desktop/Output.html")

def create_html_template(menu):
    with open(output_file, "w", encoding = 'utf-8') as text_file:
        text_file.write(j2_env.get_template('menu_template.html').render(categories=menu))