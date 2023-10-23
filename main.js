const fs = require('fs')
const { parse } = require('csv-parse')

const edges = [-180, 180]

function distanceBetweenAngles (previous, next) {
    if ((previous < 0 && next > 0) || (previous > 0 && next < 0)) {
        if (previous < -90 && next > 90) {
            return (edges[1] - previous) - (edges[0] + next)
        } else if (previous > 90 && next < -90) {
            return (edges[1] - next) - (edges[0] + previous)
        } else {
            Math.abs(previous) + Math.abs(next)
        }
    }

    return next - previous
}

function calculateDeltaBySample (sample) {
    let totalDelta = 0

    for (let i = 0; i < sample.length - 1; i++) {
        let previous = sample[i]
        let next = sample[i + 1]
        let delta = Math.abs(distanceBetweenAngles(previous, next))
        totalDelta += delta
    }

    return totalDelta
}

function readAndProccessSample (fileName, resolve) {
    let massMap = {}
    let currentMass = null

    fs.createReadStream(`./samples/${fileName}`)
        .pipe(parse({ delimiter: ',', from_line: 1 }))
        .on('data', function (row) {
            if (row[1] !== '') {
                massMap[row[1]] = []
                currentMass = row[1]
            }
            massMap[currentMass].push(parseFloat(row[0]))
        }).on('end', function () {
            const results = {}
    
            Object.keys(massMap).forEach((label) => {
                results[label] = (Math.abs(calculateDeltaBySample(massMap[label])).toFixed(2) / massMap[label].length).toFixed(2)
            })

            resolve(results)
        })
}

function writeSampleResults (fileName, result) {
    const writeStream = fs.createWriteStream(`./results/${fileName}`)

    writeStream.on('open', function () {
        writeStream.write('massa,variacao\n')
        Object.keys(result).forEach((name) => {     
            const newLine = [name, result[name]]
            writeStream.write(newLine.join(',')+ '\n')
        })

        writeStream.end()
    })
}

async function main () {
    const files = fs.readdirSync('./samples')
    const proccessableFiles = files.filter((file) => file.includes('.csv'))

    for (let i = 0; i < proccessableFiles.length; i++) {
        const promise = new Promise((resolve, _) => { readAndProccessSample(proccessableFiles[i], resolve) })
        const result = await promise
        writeSampleResults(proccessableFiles[i], result)
        console.log(`Results calculated and written in ./results/${proccessableFiles[i]}`)
    }
}

main()