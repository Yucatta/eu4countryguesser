import json
ids = []
colors = []

with open("terrcolors2.json",mode="r") as f:
    colors = json.load(f)

with open("currentuncolonizedregions.txt",mode="r") as f:
    for i,row in enumerate(f):
        temp = []
        a = row.strip()
        b = a.split()
        for province in colors:
            if(province[1] == b[0]):
                temp.append(province[0])
        ids.append(["UNC",b[2].replace("\"",""),b[1].replace("_"," ").title(),temp])

with open("unccountries.json",mode="w") as f:
    json.dump(ids,f,indent=2)