import readline from "node:readline"
import fs from "node:fs"

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

let imie, nazwisko, wiek, plikW, plikD

function zapytajUzytkownika() {
	rl.question("Chcesz dodac obiekt czy wyswietlic dane: ", dzialanie => {
		if (dzialanie === "dodac") {
			rl.question("Podaj swoje imię: ", odpImie => {
				imie = odpImie
				rl.question("Podaj swoje nazwisko: ", odpNazwisko => {
					nazwisko = odpNazwisko
					rl.question("Podaj swój wiek: ", odpWiek => {
						wiek = odpWiek
						rl.question("Podaj nazwe pliku: ", odpPlikD => {
							plikD = odpPlikD
							rl.close()
							writeFile()
						})
					})
				})
			})
		} else if (dzialanie === "wyswietlic") {
			rl.question("Jaki plik chcesz wyswietlic: ", odpPlik => {
				plikW = odpPlik
				rl.close()
				readFile()
			})
		} else {
			console.error("Nieprawidłowa komenda!")
			rl.close()
		}
	})
}

function writeFile() {
	try {
		fs.writeFileSync(`${plikD}.json`, `Imię: ${imie}, Nazwisko: ${nazwisko}, Wiek: ${wiek}`)
		console.log("Zapisano do pliku!")
	} catch (error) {
		console.error("Błąd podczas zapisu do pliku:", error)
	}
}

function readFile() {
	try {
		const data = fs.readFileSync(`${plikW}.json`, "utf-8")
		console.log(data)
	} catch (error) {
		console.error("Błąd podczas odczytu pliku:", error)
	}
}

zapytajUzytkownika()
