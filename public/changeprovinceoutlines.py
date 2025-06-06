import json,csv

colorids = []
provinceoutlines = {}

with open("colorids.json",mode="r",) as f:
    colorids = json.load(f)    

with open("completemap.json",mode="r") as f:
    provinceoutlines =  json.load(f)
# seatiles = []
# with open("seatiles.csv",mode="r",newline="") as f:
#     reader = csv.reader(f)
#     for row in reader :
#         seatiles.append(int(row[0]))

for color in colorids:
    for id in color:
        provinceoutlines[f"{id-1}"] = ""
        # temp.append(id)
# print(temp)
# print(provinceoutlines)

with open("provinces.json",mode="w") as f:
    json.dump(provinceoutlines,f,indent=2)
# for province in provinceoutlines:
#     if province