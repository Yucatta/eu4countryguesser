import json,csv

bboxes = []
with open("bboxes2.csv",mode="r",newline="")as f:
    reader = csv.reader(f)
    for row in reader:
        bboxes.append([int(row[1]),int(row[2]),int(row[3]),int(row[4])])
guessregions = []
with open("guessregions.json",mode="r") as f:
    guessregions = json.load(f)
regionnames = []
with open("regions.txt",mode="r") as f:
    for line in f:
        regionnames.append(line.strip())

# print(regionnames)
regions = []
for i,continent in enumerate(guessregions):
    # for j,region in enumerate(continent):
    regions.append([regionnames[i],bboxes[i],guessregions[i]])  ;            

with open("organizedguessregions.json",mode="w") as f:
    json.dump(regions,f,indent=2)
# print(regions)

# with open("besttimes.json",mode="w") as f:
#     json.dump(regions,f,indent=2)
# regions = []
# with open("regions2.json",mode="r") as f:
#     regions = json.load(f)
# print(regions)
# for i,continent in enumerate(regions):
#     for j,region in enumerate(continent):
#         regions[i][j][1] = f"{regions[i][j][1][0]} {regions[i][j][1][1]} {regions[i][j][1][2]} {regions[i][j][1][3]}"
#         # prinat(regions[i][j])

# # print(regions)
# with open("regions2.json",mode="w") as f:
#     json.dump(regions,f,indent=2)