import json

colors = []

with open("terrcolors2.json",mode="r") as f:
    colors = json.load(f)
ids = []
with open("console.txt",mode="r") as f:
    # print()
    for i,row in enumerate(f):
        if(i):
            a = row.strip()
            b = a.split()
            ids.append(int(b[2]))

for id in ids:
    colors[id-1] = [id,"rgb(238,130,238)"]


with open("terrcolors2.json",mode="w") as f:
    json.dump(colors,f,indent=2)

# rgb(255,0,255) Siberia
# rgb(238,130,238) southafrica desert
# rgb(219,112,219)
# rgb(221,160,221)
# rgb(255,105,180)
# rgb(255,20,147)
# rgb(199,21,133)
# rgb(218,112,214)
# rgb(186,85,211)
# rgb(216,191,216)
# rgb(255,0,191)
# rgb(255,77,255)
# rgb(230,0,230)
# rgb(200,0,200)
# rgb(255,102,204)
# rgb(255,0,200)
# rgb(238,96,167)
# rgb(255,51,153)
# rgb(232,62,140)
# rgb(214,0,170)
# rgb(224,17,95)
# rgb(208,32,144)
# rgb(229,43,80)
# rgb(246,83,166)
# rgb(255,64,160)
# rgb(239,71,111)
# rgb(251,96,127)
# rgb(255,85,163)
# rgb(255,51,255)
# rgb(240,50,230)