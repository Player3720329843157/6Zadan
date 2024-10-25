import readline from 'node:readline';
import fs from 'node:fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let imie, nazwisko, wiek;

rl.question('Podaj swoje imię: ', (odpImie) => {
    imie = odpImie;
    rl.question('Podaj swoje nazwisko: ', (odpNazwisko) => {
        nazwisko = odpNazwisko;
        rl.question('Podaj swój wiek: ', (odpWiek) => {
            wiek = odpWiek;
            rl.close();
            writeFile();
        });
    });
});

function writeFile() {
    try {
        fs.writeFileSync('userData.json', `Imię: ${imie}, Nazwisko: ${nazwisko}, Wiek: ${wiek}`);
        console.log('Zapisano do pliku!');
        readFile();
    } catch (error) {
        console.error('Błąd podczas zapisu do pliku:', error);
    }
}

function readFile() {
    try {
        const data = fs.readFileSync('userData.json', 'utf-8');
        console.log(data);
    } catch (error) {
        console.error('Błąd podczas odczytu pliku:', error);
    }
}


