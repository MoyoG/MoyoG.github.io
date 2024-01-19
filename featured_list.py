import json

jsonPath = './publication.json'


with open(jsonPath, 'r') as file:
    data = json.load(file)
featured_list = []
for i in data['articles']:
    print("year=", i["year"])
    print("cite=", i['cited_by']['value'])
    if i['year'] == '':
        i['year'] = 2000
    if i['cited_by']['value'] == None:
        i['cited_by']['value'] = 0
    if int(i['year']) >= 2022 or i['cited_by']['value'] >= 20:
        featured_list.append(i['title'])
print(featured_list)
f = open("featured_papers_list.txt", 'w')
for i in featured_list:
    f.write(i+'\n')
f.close()
