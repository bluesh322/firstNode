const argv = process.argv;
const fs = require('fs');
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err)
            process.exit(1);
        }
        console.log(data);
        return data
    });
}

async function webCat(path) {
    await axios.get(path)
    .then(function (res) {
        console.log(res.data)
        return res.data;
    })
    .catch((err) => {
        console.log(`Error Fetching ${path}`)
        console.log(`Error: Request failed with status code ${err.response.status}`)
    });
}

if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2])
}