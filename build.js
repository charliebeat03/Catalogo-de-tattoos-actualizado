const fs = require('fs');
const path = require('path');

const mdFolder = path.join(__dirname, '_tatuajes');
const outputFile = path.join(__dirname, 'tatuajes.json');

const tattoos = [];

// Leer archivos .md
fs.readdirSync(mdFolder).forEach(file => {
    if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(mdFolder, file), 'utf8');
        const [frontmatter, body] = content.split('---').slice(1);
        const data = frontmatter.split('\n').reduce((acc, line) => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) acc[key] = value;
            return acc;
        }, {});

        tattoos.push({
            image: data.image,
            title: data.title,
            price: parseInt(data.price),
            body: body.trim()
        });
    }
});

// Guardar en tatuajes.json
fs.writeFileSync(outputFile, JSON.stringify(tattoos, null, 2));
console.log('tatuajes.json generado correctamente.');
