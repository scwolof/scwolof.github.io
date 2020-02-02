import json
from os import listdir
from pathlib import Path


def is_text_file (filename):
    return filename[-4:] == '.txt' and not filename[0] == '_'


def get_text_files ():
    return [file for file in listdir('src/') if is_text_file(file)]


def split_lines_to_sections (lines):
    sections = ''.join(lines).split('#')
    return [s.strip(' \n') for s in sections if len(s)>0]


def section_separation (section):
    i = section.find('\n')
    if i < 1:
        return section.lower(), None
    key = section[:i].lower()
    value = section[i+1:]
    return key, value


def read_file (filename):
    with open('src/'+filename, 'r') as f:
        lines = f.readlines()
    sections = split_lines_to_sections(lines)
    keys_values = [ section_separation(s) for s in sections ]
    recipe_dict = {k:v for (k,v) in keys_values}
    return recipe_dict


def split_strip_join (txt, c):
    return ' '.join([s.strip() for s in txt.split(c)])


def split_lines (txt):
    tmp = txt.split('\n')
    return [t for t in tmp if len(t)>0]


def format_recipe (recipe):
    """
    Must have keys
    """
    must_keys = ['title', 'keywords']
    for key in must_keys:
        assert key in recipe.keys(),\
            'Mandatory key %s not in recipe: ' + str(recipe)
        assert recipe[key] is not None,\
            'Mandatory section %s in recipe is None: ' + str(recipe)
        
    """
    Optional keys
    """
    opt_keys = ['serves','image','ingredients','instructions','note']
    add_keys = [k for k in opt_keys if not k in recipe.keys()]
    for k in add_keys:
        recipe[k] = None

    """
    Title
    """
    assert len(recipe['title']) > 3,\
        'Recipe title must be longer than 3 characters: ' + str(recipe)
    # Remove breaklines
    tmp = split_strip_join(recipe['title'], '\n')
    # Capital first letter
    recipe['title'] = tmp.capitalize()
    
    """
    Keywords
    """
    # Remove breaklines and commas
    tmp = split_strip_join(recipe['keywords'], '\n')
    tmp = split_strip_join(tmp, ',')
    # Split by spaces
    tmp = tmp.split(' ')
    # Split fused keywords
    tmp = [split_strip_join(t, '~') for t in tmp]
    # Get sorted list of keywords
    recipe['keywords'] = sorted(tmp)
    
    """
    Image
    """
    if recipe['image'] is not None:
        filename = recipe['image']
        if not filename[:6] == 'images/':
            filename = 'images/%s'%filename
        assert Path(filename).is_file()
        recipe['image'] = filename
        
    """
    Ingredients
    """
    if recipe['ingredients'] is not None:
        recipe['ingredients'] = split_lines(recipe['ingredients'])
    
    """
    Instructions
    """
    if recipe['instructions'] is not None:
        recipe['instructions'] = split_lines(recipe['instructions'])
        

def get_formatted_recipe (file):
    name = file.strip('.txt')
    recipe = read_file(file)
    format_recipe(recipe)
    recipe['name'] = name
    return recipe


def compile_recipes_json ():
    files = get_text_files()
    recipes = [get_formatted_recipe(file) for file in files]
    jsontxt = json.dumps(recipes, indent=4, sort_keys=True)
    with open('recipes.json', 'w') as f:
        f.write('recipes_json = ' + str(jsontxt))


if __name__ == '__main__':
    compile_recipes_json()