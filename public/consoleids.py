import json

colors = []

with open("terrcolors.json",mode="r") as f:
    colors = json.load(f)
ids = []
with open("console.txt",mode="r") as f:
    # print()
    for row in f:
        # print(row,"this is row")
        a = row.strip()
        b = a.split()
        ids.append(int(b[2]))

print(ids)
# for id in  ids:
#     colors[id-1][1] = "rgb(191,179,162)"

# with open("terrcolors.json",mode="w") as f:
#     json.dump(colors,f,indent=2)
