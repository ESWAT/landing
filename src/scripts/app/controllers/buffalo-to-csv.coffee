
buffaloData = require './data-dumps/buffalo/collections.json'



results = {}

for collection, objects of buffaloData

    results[collection] = (do ->
        result = [Object.keys(objects[0])]
        result.concat objects.map((object) ->
            row = []
            for header in headers[0]
                row.push object[header]
            return row
        )
        result.map (row) -> row.join(',')
    ).join('\n')


Object.keys(results).forEach (collection) ->
    console.log 'writing:', collection
    fs.writeFile("./#{collection}.csv", results[collection])
