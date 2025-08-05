import json

with open("terrcolors2.json") as f:
    colors = json.load(f)

with open("uncolonized.json") as f:
    temp = json.load(f)
unc = []
for id in temp:
    unc.append(id[0])
RestoftheHalann = []
for id in unc:
    if(id>7038):
        continue
    if colors[id-1][1] == "rgb(0,0,0)":
        RestoftheHalann.append(id)

with open("uncCountries.json", mode="w") as f:
    json.dump(["UNC","rgb(64,112,67)","Rest of the Halann",RestoftheHalann],f)
