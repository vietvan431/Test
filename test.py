import json

with open('techniques.json', 'r') as f:
    data = json.load(f)
    a = json.dumps(data)
    print(a)