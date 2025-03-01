const fs = require('fs');
const path = require('path');

const mdFolder = path.join(__dirname, '_tatuajes');
const outputFile = path.join(__dirname, 'tatuajes.json');

const tattoos = [];

// Verificar si la carpeta _tatuajes existe
if (!fs.existsSync(mdFolder)) {
    console.error('❌ La carpeta "_tatuajes" no existe.');
    process.exit(1);
}

// Leer archivos .md
fs.readdirSync(mdFolder).forEach(file => {
    if (!file.endsWith('.md')) return;

    try {
        const filePath = path.join(mdFolder, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Validar formato básico del archivo
        if (!content.includes('---')) {
            console.warn(`⚠️ Archivo ignorado: ${file} (sin frontmatter)`);
            return;
        }

        const parts = content.split('---').slice(1);
        if (parts.length < 2) {
            console.warn(`⚠️ Archivo ignorado: ${file} (formato incorrecto)`);
            return;
        }

        const [frontmatter, body] = parts;
        const data = frontmatter.split('\n').reduce((acc, line) => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) acc[key] = value;
            return acc;
        }, {});

        // Validar campos obligatorios
        if (!data.image || !data.title) {
            console.warn(`⚠️ Archivo ignorado: ${file} (faltan campos)`);
            return;
        }

        tattoos.push({
            image: data.image,
            title: data.title,
            price: data.price ? parseInt(data.price) : 0,
            body: body.trim()
        });

    } catch (error) {
        console.error(`❌ Error procesando ${file}:`, error.message);
    }
});

// Guardar JSON
fs.writeFileSync(outputFile, JSON.stringify(tattoos, null, 2));
console.log(`✅ ${tattoos.length} tatuajes generados en tatuajes.json`);
