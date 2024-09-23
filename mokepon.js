//Declaracion de variables
const ataquesEspacioEneMon = document.getElementById('ataquesEspacioEneMon')

const ataquesEspacio = document.getElementById('ataquesEspacio')
const tarjetasEspacio = document.getElementById('tarjetasEspacio')

const sectionAtaque = document.getElementById('attack_Pick')
const sectionReiniciar = document.getElementById('Restart')
const botonMonJugador = document.getElementById('boton-mon')
const botonReiniciar = document.getElementById('boton-restart')

const sectionMon = document.getElementById('mon_Pick')
const spanMonName = document.getElementById('mon_Name')

const spanVidasJug = document.getElementById('vidas-jugador')
const spanVidasEne = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const playerAttack = document.getElementById('playerAttack')
const enemyAttack = document.getElementById('enemyAttack')
const verMapa = document.getElementById("verMapa")
const mapa = document.getElementById("mapa")
const anchoMaximoDelMapa = 350

let ataqueJugador;
/* let vidasJugador = 3;
let vidasEneMon = 3; */
/* const damageEmpate = 0.5; */
let ataques
let combate;
let resultado;
let monOptions;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucupama;
let inputPydos;
let botonFuego
let botonAgua
let botonTierra
let monPlayer; 
let monAttack;
let monEneAttack;
let ataquesMonEne;
let iMonPlayer;
let iMonEne;
let winPlayer = 0;
let winEne = 0
let monArray = [];
let botones = [];
let atacando = [];
let ataqueEneMon = [];
let lienzo;
let intervalo;
let miMon;
let mapaBackground = new Image()
mapaBackground.src = 'recursos/mokemap.png'
/* let monAleatorio = aleatorio(0, monArray.length  - 1); */
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

alturaQueBuscamos = (anchoDelMapa * 600) / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20
}

lienzo = mapa.getContext("2d")

//Escuchador de ventana para precargar todo
window.addEventListener('load', iniciarJuego)

//Clase constructora de los mones
class MonGen {
    constructor(nombre, foto, vida, tipo, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.tipo = tipo
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto);
    }
}

//Creacion del objeto
let hipodoge = new MonGen("Hipodoge",'recursos/cute-4784545.png', 5, "Agua", 'recursos/hipodoge.png')
let capipepo = new MonGen("Capipepo",'recursos/pokemon-4784546.png', 45, "Tierra", 'recursos/capipepo.png')
let ratigueya = new MonGen("Ratigueya",'recursos/pokemon-4784547.png', 30, "Fuego", 'recursos/ratigueya.png')
let langostelvis = new MonGen("Langostelvis",'recursos/pokemon-4784549.png', 25, "Agua-fuego", 'recursos/langostelvis.png')
let tucupama = new MonGen("Tucupama",'recursos/pokemon-4784550.png', 50, "Tierra-agua", 'recursos/tucupama.png')
let pydos = new MonGen("Pydos",'recursos/pokemon-4784551.png', 30, "Fuego-tierra", 'recursos/pydos.png')

//Enemigos
let hipodogeEne = new MonGen("Hipodoge",'recursos/cute-4784545.png', 5, "Agua", 'recursos/hipodoge.png')
let capipepoEne = new MonGen("Capipepo",'recursos/pokemon-4784546.png', 45, "Tierra", 'recursos/capipepo.png')
let ratigueyaEne = new MonGen("Ratigueya",'recursos/pokemon-4784547.png', 30, "Fuego", 'recursos/ratigueya.png')
let langostelvisEne = new MonGen("Langostelvis",'recursos/pokemon-4784549.png', 25, "Agua-fuego", 'recursos/langostelvis.png')
let tucupamaEne = new MonGen("Tucupama",'recursos/pokemon-4784550.png', 50, "Tierra-agua", 'recursos/tucupama.png')
let pydosEne = new MonGen("Pydos",'recursos/pokemon-4784551.png', 30, "Fuego-tierra", 'recursos/pydos.png')

//Insercion de objetos en el array
monArray.push(hipodoge,capipepo,ratigueya,langostelvis,tucupama,pydos)

//insercion de conjunto de ataques en el array ataques[] dentro del espacio de los monArray[] 
hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🔥", id: "boton-fuego"  },
)

hipodogeEne.ataques.push(
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🔥", id: "boton-fuego"  },
)

capipepo.ataques.push(
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🔥", id: "boton-fuego"  },
)

capipepoEne.ataques.push(
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🔥", id: "boton-fuego"  },
)

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
)

ratigueyaEne.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
)

langostelvis.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
)

langostelvisEne.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
)

tucupama.ataques.push(
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
)

tucupamaEne.ataques.push(
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
)

pydos.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
)

pydosEne.ataques.push(
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🔥", id: "boton-fuego"  },
    {nombre: "🌱", id: "boton-tierra"  },
    {nombre: "🌱", id: "boton-tierra"  },
)


//funciones
function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min) 
}

function iniciarJuego(){
    //funcion que recorre el array y crea la tarjeta de cado mon
    monArray.forEach((MonGen) => {
        monOptions = `
        <input type="radio" name="mascota" id=${MonGen.nombre} class="radio">
        <label for=${MonGen.nombre} >
            <p>${MonGen.nombre}</p>
            <img src=${MonGen.foto} alt=${MonGen.nombre}>
        </label>
        `
        tarjetasEspacio.innerHTML += monOptions

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputTucupama = document.getElementById('Tucupama')
        inputPydos = document.getElementById('Pydos')
    })
    
    verMapa.style.display = 'none'
    sectionAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    botonMonJugador.addEventListener('click', seleccionarMonJugador)
    botonReiniciar.addEventListener('click', reiniarElYogo)
}

function seleccionarMonJugador(){
    sectionMon.style.display = 'none'
    verMapa.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMonName.innerHTML = inputHipodoge.id
        monPlayer = inputHipodoge.id
        ataquesEspacio.innerHTML += `<img src=${hipodoge.foto} alt="p1" class="monPic">`
    }else if(inputCapipepo.checked){
        spanMonName.innerHTML = inputCapipepo.id
        monPlayer = inputCapipepo.id
        ataquesEspacio.innerHTML += `<img src=${capipepo.foto} alt="p2" class="monPic">`
    }else if(inputRatigueya.checked){
        spanMonName.innerHTML = inputRatigueya.id
        monPlayer = inputRatigueya.id
        ataquesEspacio.innerHTML += `<img src=${ratigueya.foto} alt="p3" class="monPic">`
    }else if(inputLangostelvis.checked){
        spanMonName.innerHTML = inputLangostelvis.id
        monPlayer = inputLangostelvis.id
        ataquesEspacio.innerHTML += `<img src=${langostelvis.foto} alt="p4" class="monPic">`
    }else if(inputTucupama.checked){
        spanMonName.innerHTML = inputTucupama.id
        monPlayer = inputTucupama.id
        ataquesEspacio.innerHTML += `<img src=${tucupama.foto} alt="p5" class="monPic">`
    }else if(inputPydos.checked){
        spanMonName.innerHTML = inputPydos.id
        monPlayer = inputPydos.id
        ataquesEspacio.innerHTML += `<img src=${pydos.foto} alt="p6" class="monPic">`
    }else {
        alert('No has seleccionado un mon')
        reiniarElYogo()
    }

    extraerAtaques(monPlayer)
    iniciarMapa()
}

function iniciarMapa() {

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
    miMon = obtenerObjetoMascota()
}

//funcion para recorrer un Array y guardar uno de los datos en un dato global
function extraerAtaques(monPlayer) {
    for (let i = 0; i < monArray.length; i++) {
        if (monPlayer === monArray[i].nombre) {
            ataques = monArray[i].ataques
        }   
    }
    mostrarAtaques(ataques)
}
//Volvemos a insertar html desde javascript
function mostrarAtaques(ataques) {
    ataques.forEach((ataques) =>{
        monAttack = `<input type="button" value=${ataques.nombre} id=${ataques.id} class="boton-de-ataque BAtaque">`
        
        ataquesEspacio.innerHTML += monAttack
    })

    botonFuego  = document.getElementById('boton-fuego')
    botonAgua   = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque') 
}

function mostrarAtaquesEne() {
    for (let i = 0; i < ataqueEneMon.length; i++) {
        monEneAttack = `<input type="button" value=${ataqueEneMon[i]} class="boton-de-ataque BAtaque">`
        ataquesEspacioEneMon.innerHTML += monEneAttack
    }
}


function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.value === '🔥') {
                atacando.push('Fuego')
                console.log(atacando)
                boton.style.background = '#88D66C'
                boton.disabled = true
            }else if (e.target.value === '💧') {
                atacando.push('Agua')
                console.log(atacando)
                boton.style.background = '#88D66C'
                boton.disabled = true
            }else if (e.target.value === '🌱') {
                atacando.push('Tierra')
                console.log(atacando)
                boton.style.background = '#88D66C'
                boton.disabled = true
            }
            ataqueEnemigo();
        })
    })
}

function seleccionarMonEnemigo(enemigo) {
    let spanMon1EnName = document.getElementById('mon_EnName')
    ataquesEspacioEneMon.innerHTML = `<img src=${enemigo.foto} alt="p1" class="monPic">` 
    /* let spanMon2EnName = document.getElementById('mon_En2Name')
    let spanMon3EnName = document.getElementById('mon_En3Name') */

    spanMon1EnName.innerHTML = enemigo.nombre/* 
    spanMon2EnName.innerHTML = monArray[monAleatorio].nombre
    spanMon3EnName.innerHTML = monArray[monAleatorio].nombre */
    ataquesMonEne = enemigo.ataques
    secuenciaAtaque();
}

function ataqueEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMonEne.length  - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEneMon.push('Fuego');
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEneMon.push('Agua');
    }else {
        ataqueEneMon.push('Tierra');
    }
    console.log(ataqueEneMon)
    iniciarPelea()
}

function iniciarPelea() {
    if (atacando.length === 5) {
        decisionDeBatalla()
    }
}

function iMon(jugador,enemigo) {
    iMonPlayer = atacando[jugador]
    iMonEne = ataqueEneMon[enemigo]
}

function decisionDeBatalla() {

    for (let i = 0; i < atacando.length; i++) {
        if (atacando[i] === ataqueEneMon[i]) {
            iMon(i,i)
            crearMensaje("Empate")
        }else if (atacando[i] === 'Fuego' && ataqueEneMon[i] === 'Tierra' ) {
            iMon(i,i)
            crearMensaje("Ganaste")
            winPlayer++
            spanVidasJug.innerHTML = winPlayer
        }else if (atacando[i] === 'Agua' && ataqueEneMon[i] === 'Fuego') {
            iMon(i,i)
            crearMensaje("Ganaste")
            winPlayer++
            spanVidasJug.innerHTML = winPlayer
        }else if (atacando[i] === 'Tierra' && ataqueEneMon[i] === 'Agua') {
            iMon(i,i)
            crearMensaje("Ganaste")
            winPlayer++
            spanVidasJug.innerHTML = winPlayer
        }else {
            iMon(i,i)
            crearMensaje("Perdiste")
            winEne++
            spanVidasEne.innerHTML = winEne
        }
    }
        mostrarAtaquesEne()
        revisarWins()
}

function revisarWins() {
    if (winPlayer === winEne ) {
        crearMensajeFinal(" Quedaron empate!!")
    }else if(winPlayer > winEne ){
        crearMensajeFinal(" FELICITACIONES! Ganaste :)")
    }else if (winPlayer < winEne) {
        crearMensajeFinal(" Sigue intentando!! Perdiste :(")
    }
}

function reiniarElYogo() {
    location.reload()
}

function crearMensaje(combate) {

    /* let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p') */

    sectionMensajes.innerHTML = combate
    /* newPlayerAttack.innerHTML = iMonPlayer
    newEnemyAttack.innerHTML = iMonEne */

    /* playerAttack.appendChild(newPlayerAttack)
    enemyAttack.appendChild(newEnemyAttack) */
}

function crearMensajeFinal(resultado) {
    sectionMensajes.innerHTML = resultado;
    sectionReiniciar.style.display = 'block'
}

function pintarCanvas() {
    miMon.x += miMon.velocidadX
    miMon.y += miMon.velocidadY
    lienzo.clearRect(0,0,mapa.clientWidth,mapa.clientHeight)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    miMon.pintarMon()
    hipodogeEne.pintarMon()
    capipepoEne.pintarMon()
    ratigueyaEne.pintarMon()
    langostelvisEne.pintarMon()
    tucupamaEne.pintarMon()
    pydosEne.pintarMon()
    if (miMon.velocidadX != 0 || miMon.ImagevelocidadY != 0) {
        revisarColision(hipodogeEne)
        revisarColision(capipepoEne)
        revisarColision(ratigueyaEne)
        revisarColision(langostelvisEne)
        revisarColision(tucupamaEne)
        revisarColision(pydosEne)
    }
}

function obtenerObjetoMascota() {
    for (let i = 0; i < monArray.length; i++) {
        if (monPlayer === monArray[i].nombre) {
            return monArray[i]
        }   
    }
}

function moverCapipepoR() {
    miMon.velocidadX = 5
}

function moverCapipepoL() {
    miMon.velocidadX = -5
}

function moverCapipepoU() {
    miMon.velocidadY = -5
}

function moverCapipepoD() {
    miMon.velocidadY = 5
}

function detenerMovimiento() {
    miMon.velocidadX = 0
    miMon.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoU()
            break;
        
        case 'ArrowRight':
            moverCapipepoR()
            break;

        case 'ArrowDown':
            moverCapipepoD()
            break;
        case 'ArrowLeft':
            moverCapipepoL()
            break;
        default:
            break;
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x +enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = miMon.y
    const abajoMascota = miMon.y + miMon.alto
    const derechaMascota = miMon.x +miMon.ancho
    const izquierdaMascota = miMon.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionAtaque.style.display = 'flex'
    verMapa.style.display = 'none'
    seleccionarMonEnemigo(enemigo);
}