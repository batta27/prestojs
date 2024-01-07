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

// cattura omino bottone
let opener = document.querySelector('.opener');
// caattura di tutti i moved con img
let movedDivs = document.querySelectorAll('.moved');

// variabile d'appoggio
let conferma = false;

// cattira conteniore card docente
let cardWrapper = document.querySelector('#cardWrapper');

// array oggegtti professori
let teachers = [
    { name: 'Simon', languages: ['italiano , psicologo , calciatore'], url :'./immagini/bicchirezzo.jpg'},

    { name: 'Alessa', languages: ['italiano , spagnolo , calciatore'], url :'./immagini/carello.jpg'},

    { name: 'Minipippie', languages: ['italiano , inglese , calciatore'], url :'./immagini/scaffale.jpg'},
    
    { name: 'Elena', languages: ['italiano , russo , veneto'], url :'./immagini/scaffale2.jpg'},
];   
// console.log(teachers);

// per ogni moved assegnamo l'immagine di ogni lavoratore.
movedDivs.forEach((moved,i)=>{

    moved.style.backgroundImage = `url('${teachers[i].url}')`;

    moved.addEventListener('click', ()=>{
        // console.log('ciaoooo')

        // svuotamento card
        cardWrapper.innerHTML = '';

        let div = document.createElement('div');

        div.classList.add('teacher-card');

        div.innerHTML = `
            <h3>${teachers[i].name}</h3>
            <p style="color: var(--main)">${teachers[i].languages}</p>
            `;

            cardWrapper.appendChild(div);

            // quando l'utente arriva sulla pagina , la card non esiste, per evitare null in console,sempre all'interno del forEach, dopo il click sul bottone e quindi solo quando la card viene generata, allora la catturiamo.
            let card = document.querySelector('.teacher-card');

            card.style.backgroundImage = `url(${teachers[i].url})`
    });

    

});

// evento click sul bottone omino
opener.addEventListener('click', ()=>{
    // console.log('ciao');
   
    if(conferma == false){

        conferma = true;

        // simbolino omino che gira
        opener.style.transform = 'rotate(360deg)';

        movedDivs.forEach((moved, i)=>{
            // console.log('ciao');
            let angle = (360 * i) / movedDivs.length;
            // console.log('angle');
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`
    
        });
    }else{


        // simbolino omino che torna
        opener.style.transform = 'rotate(0deg)';

        // svuota il wraper delle card sulla destra
        cardWrapper.innerHTML = '';


        movedDivs.forEach((moved)=>{
            moved.style.transform = `rotate(0deg) translate(0px)`;
            conferma = false;
        });
       
    }

});