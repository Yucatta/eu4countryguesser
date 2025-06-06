import json

terrcolors = []
uncolonized = []

with open("terrcolors.json",mode="r") as f:
    terrcolors = json.load(f)

with open("uncolonized.json",mode="r") as f:
    uncolonized = json.load(f)
rgbs = [[],[],[],[],[],[]]
for row in terrcolors:
    if str(row[0])  in uncolonized:
        if row[1] == "rgb(235,235,235)":
            rgbs[0].append(row[0])
        elif row[1] == "rgb(126,158,125)":
            rgbs[1].append(row[0])
        elif row[1] == "rgb(199,175,93)":
            rgbs[2].append(row[0])
        elif row[1] == "rgb(240,216,141)":
            rgbs[3].append(row[0])
        elif row[1] == "rgb(40,77,42)":
            rgbs[4].append(row[0])
        elif row[1] == "rgb(64,112,67)":
            rgbs[5].append(row[0]) 

with open("colorids.json",mode="w") as f:
    json.dump(rgbs,f,indent=2)

# SvgMap.tsx:80 "rgb(235,235,235)" 1804
# SvgMap.tsx:80 "rgb(126,158,125)" 1805
# SvgMap.tsx:80 "rgb(199,175,93)" 1808

# SvgMap.tsx:80 "rgb(240,216,141)" 4606

# SvgMap.tsx:80 "rgb(40,77,42)" 1802
# SvgMap.tsx:80 "rgb(64,112,67)" 2658
