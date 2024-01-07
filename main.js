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

// funzione interval
function createInterval(finalNumber, elemento){

    let counter = 0;
    let interval = setInterval(() =>{
        if(counter < finalNumber){
            counter++
            elemento.innerHTML = counter;

        }else{
            clearInterval(interval);
        }
    },10);
}

// cattura degli span con contatori
let firstSpan = document.querySelector('#first-span');
let secondSpan = document.querySelector('#second-span');
let thirdSpan = document.querySelector('#third-span');



let titoloIntersecato = document.querySelector('#titoloIntersecato')

let check = false;

let observer = new IntersectionObserver((entries) =>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting && check == false){

            createInterval(1789, firstSpan);
            createInterval(1818, secondSpan);
            createInterval(476, thirdSpan);
            check = true;
        }

    });

})
observer.observe(titoloIntersecato);


// mouse enter-leave


let camioncini = document.querySelectorAll('.fa-truck-fast');
let colonne = document.querySelectorAll('.col-custom-trasporti');


colonne.forEach((colonna, i)=>{

    // variabile d'appoggio per tornare all'origine
    let columnsConfirm = false;

    //evento mouseenter che toglie il colore dall'icona .

    colonna.addEventListener('mouseenter', ()=>{
        if(columnsConfirm == false){
            camioncini[i].classList.remove('text-accent');
            camioncini[i].classList.add('text-sec');
        }else{
            camioncini[i].classList.remove('text-blackCus');
            camioncini[i].classList.add('text-main');
        }
    });

    colonna.addEventListener('mouseleave', ()=>{

        if(columnsConfirm == false){
            camioncini[i].classList.remove('text-sec');
            camioncini[i].classList.add('text-blackCus');
            columnsConfirm = true;
        } else {
            camioncini[i].classList.remove('text-main');
            camioncini[i].classList.add('text-accent');
            columnsConfirm = false;
        }
    });

});



// categorie
let categories = [

    {name: 'Lager', icon : `<i class="fa-solid fa-beer-mug-empty fa-beat-fade my-3 fa-2x"style="color: var(--main)"></i>` , announcements : 12},

    {name: 'Ale', icon : `<i class="fa-solid fa-whiskey-glass fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>`, announcements : 26},

    {name: 'Ipa', icon : `<i class="fa-solid fa-burger fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 45},

    {name: 'Belgian tripel', icon : `<i class="fa-solid fa-wheat-awn fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 3},

    {name: 'stout', icon : `<i class="fa-solid fa-pizza-slice fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 300},

    {name: 'Porter', icon : `<i class="fa-solid fa-jar fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 200},

    {name: 'Saison', icon : `<i class="fa-solid fa-bottle-droplet fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 100},

    {name: 'wheat Beer', icon : `<i class="fa-solid fa-bacon fa-beat-fade my-3 fa-2x" style="color: var(--main)"></i>` , announcements : 10},

];

// cattura card categorie
let cardsCategoryWrapper = document.querySelector('#cardsCategoryWrapper');

categories.forEach((categoria)=>{

    let div = document.createElement('div');

    div.classList.add('col-12' , 'col-md-3', 'mb-5');

    div.innerHTML = `

                <div class="category-card">
                    <div class="border-dashed">
                        ${categoria.icon}
                        <h3>${categoria.name}</h3>
                        <p class="fw-bold">${categoria.announcements}</p>
                    </div>
                </div>

    `;

    cardsCategoryWrapper.appendChild(div);
})