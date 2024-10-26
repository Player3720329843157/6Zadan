import fs from 'fs'

fs.watch("./dowatchowania", (eventType, filename)=>{
    if(filename){
            try {
                fs.appendFileSync('logi.txt', `wykryto zdarzenie ${eventType}, w pliku ${filename} \n`);
                console.log('Zapisano do pliku!');
            } catch (error) {
                console.error('Błąd podczas zapisu do pliku:', error);
            }
    } else{
        try {
            fs.appendFileSync('logi.txt', `zdarzenie${eventType} \n`);
            console.log('Zapisano do pliku!');
        } catch (error) {
            console.error('Błąd podczas zapisu do pliku:', error);
        }
    }
})

console.log("nasluchiwanie zmian")