// cattura navbar
let mainNavbar = document.querySelector('#mainNavbar');
// console.log(mainNavbar)

// catturalogo
let logo1 = document.querySelector('#logo1')
let logo2 = document.querySelector('#logo2')

// cattura toggle bottiglia
let navIcon = document.querySelector('#navIcon');

// evento click sul toggle
let confirm = false;

navIcon.addEventListener('click',() => {
    
    if(confirm == false){

        navIcon.style.transform = 'rotate(-180deg)';
        confirm = true;
    }else{
        navIcon.style.transform = 'rotate(0deg)';
        confirm = false;
    }
    
});

// eventoscroll
// bottone scroller nuovo
let scroller = document.querySelector('#scroller')

window.addEventListener('scroll',() => {
    

    if(window.scrollY > 0){
        mainNavbar.style.backgroundColor = 'var(--accent)';
        mainNavbar.style.padding = '10px';
        logo1.classList.add('d-none');
        logo2.classList.remove('d-none');
        scroller.style.opacity='1';

    }else{
        mainNavbar.style.backgroundColor = 'transparent';
        mainNavbar.style.padding = '0px';
        logo1.classList.remove('d-none');
        logo2.classList.add('d-none');
        scroller.style.opacity='0';
    }

} )


// fetch('./mockdata.json').then((response)=>response.json()).then((data)=>{
//     console.log(data);
// })

fetch('./annunci.json').then((response)=>response.json()).then((data)=>{
    // cattura papa radio buttonper il filtro categorie
    let categoryWrapper = document.querySelector('#categoryWrapper');
    data.sort((a, b)=> b.price - a.price);

    // cattura papa delle card per la funzioneshow card
    let cardsWrapper = document.querySelector('#cardsWrapper');

    // funzione che ci permette di settare le categorie che non si ripetono
    function setCategoryFilter(){

            // creazione clone array ,con solo categorie non doppiate
            let categories = data.map((annuncio)=> annuncio.category); 
            let uniqueCategories = [];

            categories.forEach((categoria) => {

                if(!uniqueCategories.includes(categoria)){
                    uniqueCategories.push(categoria)
                }
                
            });
            // creazione radio button
            uniqueCategories.forEach((category)=>{

                let div = document.createElement('div');
    
                div.classList.add('form-check');
    
                div.innerHTML = `
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
    
                        <label class="form-check-label" for="${category}">
                            ${category}
                        </label>
                `;
    
                categoryWrapper.appendChild(div);
    
            })
        }
    
    // console.log(categories)
    // console.log(uniqueCategories)
    setCategoryFilter();
    // funzione mostra card
    function showCards(array) {

        // svuota contenitore cards
        cardsWrapper.innerHTML = '';
        // sortami le cards in ordine decresente , prima di crearle
        

        array.forEach((annuncio, i)=>{

            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-3')

            div.innerHTML = `
            
                    <div class="announcement-card text-center">
                        <div class="card-head">
                        <img class="img-Card-Custom" src="https://picsum.photos/${200+i}" alt="">
                        </div>
                        
                        <h4>${annuncio.name}</h4>
                        <h5>${annuncio.category}</h5>
                        <p class="fw-bold">${annuncio.price} $</p>

                    </div>
            `;
            cardsWrapper.appendChild(div);
        })
        console.log(array);
    }
    showCards(data);
    // console.log(data)

        // funzione filtrare per categoria
     function filterByCategory(array){

            // istruisco la mia funzione a calcolarsi il parametro reale che le serve, e la categoria.attraverso l'id contenuto all'interno del singolo radio button, quando il bottone è cliccato(con attributo checked)
            // let categoria = Array.from(checkInputs).find((bottone)=> bottone.checked);
            
            // oppure con piu passaggi
            let arrayFromNodeList = Array.from(checkInputs);
            let buttonChecked = arrayFromNodeList.find((bottone)=> bottone.checked);
            let categoria = buttonChecked.id;
            // console.log(categoria)

            if(categoria != 'All'){
                let filtered = array.filter((annuncio)=> annuncio.category == categoria);
                // cardsWrapper.innerHTML='';
               return filtered;
            }else{
                return array;
            }
            
            
        }
                    
                    
  // cattura dei radio button
     let checkInputs = document.querySelectorAll('.form-check-input');
        // console.log(checkInputs);
     // per ogni singolo radio button, deve partire il evento click
     checkInputs.forEach((radio)=>{

         radio.addEventListener('click', ()=>{
            //  filterByCategory(radio.id);
            globalFilter();
         })

     })

    //  cattura dell'input-range
    let priceInput = document.querySelector('#priceInput');

    // cattura del numero sotto l'input range
    let incrementNumber = document.querySelector('#incrementNumber');

    // funzione per settare il valore massimo del prezzo sull'input range
    function setPriceInput(){

        // stiamo creando un clone dell'array di partenza con solo i prezzi
        let prices = data.map((annuncio)=> Number(annuncio.price));
        
        // calcolo il prezzo massimo dall'array prices
        
        let massimoPrice = Math.max(...prices);
        
        // console.log(maxPrice)
        // setto il valore massimo del mio priceInput
        priceInput.max = Math.ceil(massimoPrice);

        // setto il valore massimo anche al value del priceInput
        priceInput.value = Math.ceil(massimoPrice);

        // setto il valore massimo del numerino sotto il priceInput
        incrementNumber.innerHTML = Math.ceil(massimoPrice);
        // console.log(massimoPrice);
        
    }

    setPriceInput();

    // funzione che filtra per prezzo
    function filterByPrice(array){

        // filtro per ottenere gli annunci <= del prezzo che passiamo
        let filtered = array.filter((annuncio)=> Number(annuncio.price) <=  Number(priceInput.value));
        // cardsWrapper.innerHTML='';
        // console.log(filtered);
        return filtered;

    }

    // evento sull'input range che fa partire la funzione filterbyPrice
    priceInput.addEventListener('input', ()=>{
        
        // filterByPrice(Number(priceInput.value));
    
        // cambiamo il valore del numero sotto l'input range a seconda del movimento dell'input
        incrementNumber.innerHTML = priceInput.value;
        globalFilter();
        

    });
                        

    // cattura nell'input per filtro per parola
    let wordInput = document.querySelector('#wordInput');
    

    // funzione filtro per parola
    function filterByWord(array){

        let nome = wordInput.value;
        // filtriamo su data per ritornarci un array con i soli nomi di prodotti
    //    l'utente potra inserire anche solo il nome iniziale del prodotto in queanto stiamo verificando se il nome passato è incluso all'interno del nome completo di ogni singolo annuncio
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
        
        return filtered;
    }

        // evento sull'input di ricerca
        wordInput.addEventListener('input', ()=> {
            // filterByWord(wordInput.value);
                globalFilter();
        });

        // filtro globale per rendere i filtri uniti (dipendenti uno l'altro)
        function globalFilter(){

            let filteredByCategory = filterByCategory(data);
            let filteredByPrice = filterByPrice(filteredByCategory);
            let filteredByWord = filterByWord(filteredByPrice);

            showCards(filteredByWord);
        }        
        globalFilter();


})