import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function obliczCallback(liczba1, liczba2, operacja, callback) {
    setTimeout(() => {
        let wynik;
        switch (operacja) {
            case 'dodawanie':
                wynik = liczba1 + liczba2;
                break;
            case 'mnozenie':
                wynik = liczba1 * liczba2;
                break;
            default:
                return callback(new Error('Nieprawidłowa operacja!'));
        }
        callback(null, wynik);
    }, 2000); 
}

function obliczPromise(liczba1, liczba2, operacja) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let wynik;
            switch (operacja) {
                case 'dodawanie':
                    wynik = liczba1 + liczba2;
                    break;
                case 'mnozenie':
                    wynik = liczba1 * liczba2;
                    break;
                default:
                    return reject(new Error('Nieprawidłowa operacja!'));
            }
            resolve(wynik);
        }, 2000); 
    });
}

function zapytajUzytkownika() {
    rl.question('Podaj pierwszą liczbę: ', (pierwsza) => {
        rl.question('Podaj drugą liczbę: ', (druga) => {
            rl.question('Jaką operację chcesz wykonać (dodawanie/mnozenie)? ', (operacja) => {
                rl.question('Jaką metodę chcesz użyć (callback/promise)? ', (metoda) => {
                    const liczba1 = parseFloat(pierwsza);
                    const liczba2 = parseFloat(druga);

                    if (isNaN(liczba1) || isNaN(liczba2)) {
                        console.error('Proszę podać poprawne liczby');
                        rl.close();
                        return;
                    }

                    if (metoda === 'callback') {
                        obliczCallback(liczba1, liczba2, operacja, (error, wynik) => {
                            if (error) {
                                console.error(error.message);
                            } else {
                                console.log(`Wynik: ${wynik}`);
                            }
                            rl.close();
                        });
                    } else if (metoda === 'promise') {
                        obliczPromise(liczba1, liczba2, operacja)
                            .then(wynik => {
                                console.log(`Wynik: ${wynik}`);
                                rl.close();
                            })
                            .catch(error => {
                                console.error(error.message);
                                rl.close();
                            });
                    } else {
                        console.error('Nieprawidłowa metoda!');
                        rl.close();
                    }
                });
            });
        });
    });
}

zapytajUzytkownika();
