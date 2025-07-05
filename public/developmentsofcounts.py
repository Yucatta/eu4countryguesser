import json ,csv
countries = []
with open("countryprovinces.json",mode="r") as f:
    countries = json.load(f)
provinces = []
with open("provinces.csv" ,mode="r") as f:
    reader = csv.reader(f) 
    for row in reader:
        provinces.append(int(row[2]))

for i in range(0,665):
    dev  = 0
    for id in  countries[i][3]:
        dev+= provinces[id-1]
    countries[i].append(dev)

with open("countrieswithdev.json",mode="w") as f:
    json.dump(countries,f,indent=2)
