import json

colors = []

with open("terrcolors.json",mode="r") as f:
    colors = json.load(f)

for i,province in enumerate(colors):
    # print(province[1])
    if(province[1] =="rgb(57,138,54)"):
        # print(colors[i][1],"before")
        colors[i][1] =  "rgb(40,77,42)"
        # print(colors[i][1],"after")



with open("terrcolors.json",mode="w") as f:
    json.dump(colors,f,indent=2)
