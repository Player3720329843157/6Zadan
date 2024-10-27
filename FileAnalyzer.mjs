import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

const fileAnalyzerEmitter = new EventEmitter();

function analyzeDirectory(directoryPath) {
    fileAnalyzerEmitter.emit('analysisStarted', directoryPath);

    try {
        const items = fs.readdirSync(directoryPath);

        items.forEach(item => {
            const itemPath = path.join(directoryPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                console.log(`Katalog: ${item}`);
            } else {
                console.log(`Plik: ${item}`);
                console.log(`   Rozmiar: ${stats.size} B`);
                console.log(`   Rozszerzenie: ${path.extname(item)}`);
                console.log(`   Data modyfikacji: ${stats.mtime}`);
            }
        });

        fileAnalyzerEmitter.emit('analysisCompleted', directoryPath);

    } catch (error) {
        console.error('Błąd podczas analizy katalogu:', error);
    }
}

fileAnalyzerEmitter.on('analysisStarted', (directoryPath) => {
    console.log(`Analiza katalogu rozpoczęta: ${directoryPath}`);
});

fileAnalyzerEmitter.on('analysisCompleted', (directoryPath) => {
    console.log(`Analiza katalogu zakończona: ${directoryPath}`);
});

const directoryPath = "./dowatchowania";

if (!directoryPath) {
    console.error('Proszę podać ścieżkę do katalogu jako argument.');
    process.exit(1);
}

analyzeDirectory(directoryPath);
