import json,csv

terrains = []

with open("terrains.json",mode="r") as f:
    terrains = json.load(f)
provinces = []
with open("provinces.csv",mode="r",newline="") as f:
    reader = csv.reader(f)
    for row in reader:
        provinces.append(row)
terraincolors = []
for i,province in enumerate(provinces):
    # if()
    for j,terrain in enumerate(terrains):
        if(province[6] == terrain[0]):
            terraincolors.append([i+1,terrain[1]])
            break
    if(len(terraincolors)!= i+1):
        terraincolors.append([i+1,"rgb(0,0,0)"])

with open("terrcolors.json",mode="w") as f:
    json.dump(terraincolors,f,indent=2)
