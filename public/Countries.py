import json
countries = []
with open("countryprovinces.json",mode="r") as f:
    countries = json.load(f)

countries2 = []
with open("countryprovinces2.json",mode="r") as f:
    countries2 = json.load(f)
newindexoldindex = []
for i,country in enumerate(countries2):         
    for j,anothercountry in enumerate(countries):
        if(country[0] == anothercountry[0]):
            newindexoldindex.append(j)

print(newindexoldindex)
outlines = []
with open("countryoutlines.json",mode="r") as f:
    outlines = json.load(f)

for i in range(0,665):
    outlines[i][0] = newindexoldindex[i]
outlines.sort(key=lambda item:item[0])



with open("newoutlines.json",mode="w") as f:
    json.dump(outlines,f,indent=2)


