/*
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 10 secondi.
Dopo 10 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
Bonus:
Gestire l'inserimento dei numeri tramite 5 input diversi.
*/

// PSEUDO CODICE

/*
- creo una funzione che generi un numero casuale per 5 volte
- creo un bottone che se cliccato attiva la mia funzione
- creo un evento click sul bottone che visualizza in pagina i 5 numeri creati
- faccio partire un timer di 10 secondi
- allo scadere del timer i numeri scompaiono
- allo scadere del timer appaino 5 campi di input all'interno dei quali l'utente dovrà inserire i 5 numeri generati
- creo un bottone tramite cui memorizzare i numeri inseriti nei campi di input
- devo controllare se i numeri inseriti corrispondono ai numeri generati in precedenza
- comunico il risultato del gioco:
  ° SE tutti i numeri inseriti corrispondono ai numeri generati:
    - comunico all'utente la vittoria
  ° ALTRIMENTI SE alcuni numeri corrispondono ma non tutti:
    - comunico all'utente i numeri indovinati
  ° ALTRIMENTI:
    - comunico all'utente che non ha indovinato nessun numero
*/
//----------------------------------------------------------------

// DICHIARAZIONE VARIABILI/COSTANTI ---------------------

// - creo una variabile per memerizzare il valore del singolo numero casuale generato dalla funzione
let randomNumber;

// - creo una lista all'interno della quale inserirò tutti i numeri generati dalla funzione
const randomList = [];

// - creo un bottone che se cliccato attiva la mia funzione
let activeElement = document.getElementById('active');

// - richiamo dal Dom il contenitore all'interno del quale inserirò i numeri creati
let containerRandomElement = document.getElementById('container-random');


// SVOLGIMENTO ------------------------------

// - creo un evento click sul bottone che visualizza in pagina i 5 numeri creati
activeElement.addEventListener('click', function(){

    // - aggiungo una classe al bottone per togliere la possibilità di ricliccarlo
    activeElement.classList.add('inactive');

    // - richiamo la funzione che genera 5 numeri casuali
    generateNumbers(100, randomList);

    // - faccio partire un timer di 10 secondi
    // - allo scadere del timer i numeri scompaiono
    // - allo scadere del timer appaino 5 campi di input all'interno dei quali l'utente dovrà inserire i 5 numeri generati
    setTimeout (createInput, 10000);

});

// FINE SVOLGIMENTO -------------------------------

//FUNCTIONS ---------------------------------------------

// - creo una funzione che generi un numero casuale per 5 volte
function generateNumbers (max, array) {

    // creo un contatore per uscire dal ciclo
    contatoreRandom = 0;

    // creo un ciclo per generare numeri casuali
    while (contatoreRandom < 5) {

        // creo una variabile che è uguale a un numero generato casualmente
        let randomNumber = Math.floor(Math.random() * (max - 1 + 1) + 1);

        // aggiunta del numero generato (caso in cui non è mai stato generato come valore) nella lista
        array.push(randomNumber);

        // - richiamo la funzione per aggiungere i nuemeri creati nel Dom
        addNumbers(randomNumber, containerRandomElement);
        
        // aumento il contatore di un unità per non creare un loop infinito
        contatoreRandom++
    }

    // ciò che ottengo dalla funzione
    return randomNumber;
}

// - creo una funzione per aggiungere i numeri creati nel Dom;
function addNumbers (randomNumber, container) {

    // - creo e appendo un elemento nel Dom in cui è inserito il numero generato
    let newNumber = document.createElement('div');
    newNumber.innerHTML = randomNumber;
    container.append(newNumber);
}

// - creo una funzione tramite cui tolgo dal Dom i numeri casuali generati e inserisco i 5 campi di input
function createInput () {

    // - inserisco un messaggio sopra i campi di input in cui andrò ad inserire le risposte
    containerRandomElement.innerHTML = 'Inserisci i numeri';

    // - creo un ciclo che genera i campi di input
    for (i = 0; i < 5; i++) {

        // - creo e appendo nel Dom un nuovo elemento che conterrà un campo di input
        let newInput = document.createElement('input');
        newInput.placeholder = 'number ' + (i + 1);
        newInput.type = 'number';
        containerRandomElement.append(newInput);

    }

    // - creo un bottone a cui aggiungerò un evento click per memorizzare il valore nei campi di input
    let newButton = document.createElement('button');
    newButton.innerHTML = 'Invia numeri';
    containerRandomElement.append(newButton);

    // - richiamo la funzione per controllare se c'è corrispondenza tra i numeri generati e i numeri inseriti dall'utente
    controlNumber(newButton, 5, randomList, containerRandomElement);

}

// - creo una funzione per controllare se i 5 numeri inseriti nei campi di input sono uguali ai 5 generati
function controlNumber(newButton, index, array, containerRandomElement) {

    // - creo un evento click nel bottone creato per memorizzare i valori inseriti nel campo input nella funzione sopracitata
    newButton.addEventListener('click', function(){

        // - creo un contatore per uscire per il ciclo while
        contatore = 0;

        // - creo un contatore per memorizzare il numero di volte che si è indovinato un numero
        positive = 0;

        // - creo il ciclo che ha come limite il numero di input presenti, per verificare la presenza di un singolo numero nell'elenco dei numeri generati
        while (contatore < index) {

            // - creo una condizione in cui verifico se c'è coincidenza

            // - condizione di presenza
            if ( array.includes(Number(containerRandomElement.childNodes[contatore + 1].value))){

                // - creo e appendo un elemento nel Dom in cui è inserito il responso della presenza del numero
                let response = document.createElement('div');
                response.innerHTML = containerRandomElement.childNodes[contatore + 1].value + ' è presente';
                containerRandomElement.append(response);

                // - aumento il contatore delle coincidenze
                positive++

            // - condizione di assenza
            } else {

                // - creo e appendo un elemento nel Dom in cui è inserito il responso della presenza del numero
                let response = document.createElement('div');
                response.innerHTML = containerRandomElement.childNodes[contatore + 1].value + ' non è presente';
                containerRandomElement.append(response);
            }

            // - aggiungo un unità al contatore per non generare un loop infinito
            contatore++
        }

        // - creo una condizione per decretare il risultato del gioco

        // - caso di vittoria (5/5)
        if (positive == 5) {

            // - creo e appendo un elemento nel Dom in cui è inserito il punteggio raggiunto
            let score = document.createElement('div');
            score.innerHTML = 'HAI VINTO';
            containerRandomElement.append(score);

        // - caso di sconfitta
        } else {
            
            // - creo e appendo un elemento nel Dom in cui è inserito il punteggio raggiunto
            let score = document.createElement('div');
            score.innerHTML = 'il tuo punteggio è ' + positive;
            containerRandomElement.append(score);
        }
    })
}