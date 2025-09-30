import json

print("This is a useless message")
print("Modified")
Print("third time")

with open('techniques.json', 'r') as f:
    data = json.load(f)
    a = json.dumps(data)
    print(a)
