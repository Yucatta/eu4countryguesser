import json,csv

# bboxes = []
# with open("boundingboxes.csv",mode="r",newline="")as f:
#     reader = csv.reader(f)
#     for row in reader:
#         bboxes.append([int(row[1]),int(row[2]),int(row[3]),int(row[4])])
# regions = []
# with open("guessregions.json",mode="r") as f:
#     regions = json.load(f)

# for i,row in enumerate(regions):
#     temp = []
#     for id in row:
#         if id not in temp:
#             temp.append(id)
#     regions[i] = [bboxes[i],temp]

# # print(regions)

# with open("regions.json",mode="w") as f:
#     json.dump(regions,f,indent=2)
# regions = []
# with open("regions.json",mode="r") as f:
#     regions = json.load(f)

# for i,continent in enumerate(regions):
#     for j,region in enumerate(continent):
#         regions[i][j][1] = f"{regions[i][j][1][0]} {regions[i][j][1][1]} {regions[i][j][1][2]} {regions[i][j][1][3]}"
#         print(regions[i][j])

# # print(regions)
# with open("regions.json",mode="w") as f:
#     json.dump(regions,f,indent=2)
a = []
for i in range(0,700):
    a.append(i)

print(a)