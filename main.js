const nave = document.getElementById("tipos");
const titu = document.getElementById("titulo");
const prods = document.getElementById("productos");
const numCar = document.getElementById("numCar");
let info;
let act=0;
let carrito=[];
let conCar=0;

function buscar(ind)
{
    let idtip = ind.srcElement.id.replace("t","")
    act = parseInt(idtip);
    console.log(idtip)
    prods.innerHTML="";
    disp();
}

function disp()
{
    let food=info[act];
    titu.innerHTML=""+food.name;
    let plates = food.products;
    plates.forEach((p,ind)=>
    {
        let ks = Object.keys(p);
        let vs = Object.values(p);
        vs.forEach((a, index)=>{
            let inf = document.createElement("p");
            inf.innerHTML=""+ks[index]+": "+a;
            prods.appendChild(inf);
        })
        let but = document.createElement("button")
        but.id="c"+ind;
        but.type="button";
        but.innerHTML="Add to car";
        but.onclick=addCar;
        prods.appendChild(but);
        
    })
}

function addCar(ind)
{
    let idcom = parseInt(ind.srcElement.id.replace("c",""));
    console.log(idcom);
    let toAdd=info[act].products[idcom];
    let nToAdd=JSON.parse(JSON.stringify(toAdd));
    carrito.push(nToAdd);
    console.log(nToAdd);
    numCar.innerHTML="Items carrito: "+ carrito.length;
}

fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
  .then(response => response.json())
  .then(data =>{
    info=data;
    cont=0;
    let size=5;
    info.forEach((obj,index) => {
        // let names=Object.keys(obj);
        // let atrs = Object.values(obj);
        let tip = document.createElement("p");
        tip.className="col-"+size;
        tip.id="t"+index;
        tip.onclick=buscar;
        tip.innerHTML=""+obj.name;
        nave.appendChild(tip)
    });
    disp();

});