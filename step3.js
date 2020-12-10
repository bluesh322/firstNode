const argv = process.argv;
const fs = require('fs');
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err)
            process.exit(1);
        }
        
        if (argv[2] === '--out') {
            const to = argv[3];
            fs.writeFile(to, data, "utf8", function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            })
        } else {
            console.log(data);
        }
    });
}

async function webCat(path) {
    await axios.get(path)
    .then(function (res) {
        
        if (argv[2] === '--out') {
            const to = argv[3];
            fs.writeFile(to, res.data, "utf8", function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            })
        } else {
            console.log(res.data)
        }
    })
    .catch((err) => {
        console.log(`Error Fetching ${path}`)
        console.log(`Error: Request failed with status code ${err.response.status}`)
    });

}

if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2]);
} else if (argv[2] == '--out') {
    const from = argv[4];
    if (argv[4].slice(0, 4) === 'http') {
        webCat(from);
    } else {
        cat(from);
    }

} else {
    cat(argv[2])
}