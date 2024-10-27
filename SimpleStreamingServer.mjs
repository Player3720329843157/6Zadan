import fs from 'node:fs'; 
import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (queryObject.file) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const fileContent = readFile(queryObject.file);
        res.end(fileContent); 
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Brak parametru "file" w URL.');
    }

    function readFile(filename) {
        try {
            const data = fs.readFileSync(filename, 'utf-8');
            console.log(`Zawartość pliku ${filename}:`, data); 
            return data;
        } catch (error) {
            console.error('Błąd podczas odczytu pliku:', error);
            return 'Błąd podczas odczytu pliku.';
        }
    }
});

server.listen(3000, () => {
    console.log('Serwer nasłuchuje na porcie 3000');
});
