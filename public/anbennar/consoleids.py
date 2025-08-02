import json

colors = []

with open("terrcolors2.json",mode="r") as f:
    colors = json.load(f)
ids = []
with open("console.txt",mode="r") as f:
    for i,row in enumerate(f):
        if(i):
            a = row.strip()
            b = a.split()
            ids.append(int(b[1]))

for id in ids:
    colors[id-1] = [id,"rgb(0,0,200)"]


with open("terrcolors2.json",mode="w") as f:
    json.dump(colors,f,indent=2)

# rgb(255,0,255) North halann  "rgb(126,158,125)"
# rgb(238,130,238) South Escann  "rgb(64,112,67)"
# rgb(219,112,219) Escann Proper  "rgb(64,112,67)"
# rgb(221,160,221) Deep Woods  "rgb(40,77,42)"
# rgb(255,105,180) SouthWest Serpentspine "rgb(200,200,200)"
# rgb(255,20,147) North Serpentspine "rgb(200,200,200)"
# rgb(199,21,133)  Middle Serpentspine "rgb(200,200,200)"
# rgb(218,112,214) West Serpentspine "rgb(200,200,200)"
# rgb(186,85,211) North Haless 
# rgb(216,191,216) North Sarhal  "rgb(240,216,141)"
# rgb(255,0,191)    Fangaula
# rgb(255,77,255) Really Cool Hordes
# rgb(230,0,230) West Anbennar
# rgb(200,0,200) Forbidden Plains
# rgb(255,102,204) Gozangun
# rgb(255,0,200) Ardimya  "rgb(240,216,141)"
# rgb(238,96,167) North Aelantir Artric
# rgb(255,51,153) North Aelantir Desert 
# rgb(232,62,140) Rest of North Aelantir  "rgb(64,112,67)"
# rgb(214,0,170) Effelai  "rgb(40,77,42)"
# rgb(224,17,95) Torn Gates
# rgb(208,32,144) Kheionai
# rgb(229,43,80) Aelantir Islands  "rgb(64,112,67)"
# rgb(246,83,166) East Sarhal 
# rgb(255,64,160) 
# rgb(239,71,111)
# rgb(251,96,127) 
# rgb(255,85,163)"
# rgb(255,51,255) 
# rgb(240,50,230) 
# rgb(255,0,220) 
# rgb(242,82,201)
# rgb(213,63,156) 