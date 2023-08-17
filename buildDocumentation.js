// open all files in ../visionscript-docs/std/

const fs = require('fs');
const frontMatter = require('front-matter');

var reference = {};

fs.readdir('../../visionscript-docs/docs/', (err, files) => {
    files.forEach(file => {
        var data = fs.readFileSync('../../visionscript-docs/docs/' + file, 'utf8');
        var content = frontMatter(data);
        var body = content.body;

        // remove [] from title
        content.attributes.title = content.attributes.title.replace(/\[|\]/g, '');

        reference[content.attributes.title] = body;
    });

    fs.writeFile("./reference.json", JSON.stringify(reference), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
});