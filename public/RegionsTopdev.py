import json
regions = []
with open("regions.json",mode="r") as f:
    regions = json.load(f)

def appendtocont(index,count):
    indexofunc = next((i for i, id in enumerate(regions[4][index][2]) if id > 664), -1)
    templist = regions[4][index][2][0:count]
    for id in regions[4][index][2][indexofunc:]:
        templist.append(id)
    regions[5].append([regions[4][index][0] + f" Top {count}",regions[4][index][1],templist])
appendtocont(0,100)
appendtocont(1,100)
appendtocont(1,200)
appendtocont(2,50)
appendtocont(3,50)
appendtocont(3,100)
appendtocont(5,100)
appendtocont(5,200)
appendtocont(5,300)
appendtocont(5,400)
appendtocont(6,100)
appendtocont(6,200)
appendtocont(6,400)
appendtocont(6,300)
appendtocont(6,400)
appendtocont(6,500)
appendtocont(6,600)
with open("tempregions.json",mode="w") as f:
    json.dump(regions,f,indent=2)
# print(regions)

