import json

colors = []

with open("guessregions.json",mode="r") as f:
    colors = json.load(f)
ids = []
with open("regionconsole.txt",mode="r") as f:
    for i,row in enumerate(f):
        if(i):
            a = row.strip()
            b = a.split()
            ids.append(int(b[1]))
colors.append(ids)

with open("guessregions.json",mode="w") as f:
    json.dump(colors,f,indent=2)
