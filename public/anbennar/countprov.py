import json

with open("terrcolors2.json") as f:
    colors = json.load(f)

with open("anbennarcountries.json") as f:
    counts = json.load(f)

countprovs = []

for country in counts:
    for id in country[2]:
        countprovs.append(id)
    
countries = []

with open("uncs.txt") as f:
    for row in f:
        splittedline = row.split()    
        length = len(splittedline)
        tag = splittedline[length-1]
        mapcolor = splittedline[length-2].replace('"',"")
        identifyer = splittedline[1]
        name = ""
        for i in range(0,length-4): 
            name+= splittedline[2+i]
            if(i != length-5):
                name+=" "
        provinces = []
        for id in colors:
            if id[1] == identifyer and not id[0]  in countprovs: 
                provinces.append(id[0])
        countries.append([tag,mapcolor,name,provinces])
    
with open("uncccountries.json",mode="w") as f: 
    json.dump(countries,f)
