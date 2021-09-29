const nave = document.getElementById("tipos");
const titu = document.getElementById("titulo");
const prods = document.getElementById("productos");
const numCar = document.getElementById("numCar");
let info;
let act=0;
let carrito=[];
let carrito2=[];
let qtyC2=[];
let conCar=0;

function buscar(ind)
{
    let idtip = ind.srcElement.id.replace("t","")
    act = parseInt(idtip);
    prods.innerHTML="";
    disp();
}

function goToCar()
{
    titu.innerHTML="Order detail";
    prods.innerHTML="";
    numCar.innerHTML=carrito.length===1?carrito.length+" item":carrito.length+" items";
    if(carrito.length>0)
    {
        let tab = document.createElement("table");
        tab.className="table table-striped";
        let tabH =document.createElement("thead");
        let tabB =document.createElement("tbody");
    
        let titles=["Item","Qty","Description","Unit Price", "Amount", "Modify"];
        let titleRow = document.createElement("tr");
        titles.forEach((act)=>{
            let elem = document.createElement("td");
            elem.innerHTML=act;
            titleRow.appendChild(elem);
        })
        tabH.appendChild(titleRow);
    
        let total=0;
        carrito2.forEach((act, index)=>{
            let row = document.createElement("tr");
    
            let indElem = document.createElement("td");
            indElem.innerHTML=""+(index+1);
            row.appendChild(indElem);
    
            let qty=document.createElement("td");
            qty.innerHTML=""+qtyC2[index];
            row.appendChild(qty);
    
            let desc = document.createElement("td");
            desc.innerHTML=act.name;
            row.appendChild(desc);
    
            let up = document.createElement("td");
            up.innerHTML=""+act.price;
            row.appendChild(up);
    
            let amou =document.createElement("td");
            let priceAmount = Math.round((act.price*qtyC2[index])*100)/100;
            amou.innerHTML=""+priceAmount;
            row.appendChild(amou);
            total+=act.price*qtyC2[index];
    
            let mod = document.createElement("td");
            let addB=document.createElement("button");
            addB.className="btn gray";
            addB.id="d"+index;
            addB.type="button";
            addB.innerHTML="+";
            addB.onclick=addCar;
            mod.appendChild(addB);
    
            let remB=document.createElement("button");
            remB.id="d"+index;
            remB.className="btn gray";
            remB.type="button";
            remB.innerHTML="-";
            remB.onclick=remCar;
            mod.appendChild(remB);
            row.appendChild(mod);
    
            tabB.appendChild(row);                
        })
        total = Math.round(total*100)/100;
        tab.appendChild(tabH);
        tab.appendChild(tabB);
    
        let rowInf = document.createElement("div");
        rowInf.className="row";

        let tot =document.createElement("p");
        tot.className="col-9"
        tot.innerHTML="Total:$"+total;

        let cancelB=document.createElement("button");
        cancelB.className="btn canc col-1";
        cancelB.type="button";
        cancelB.innerHTML="Cancel";
        cancelB.onclick=on;

        let confirmB=document.createElement("button");
        confirmB.className="btn conf col-1";
        confirmB.type="button";
        confirmB.innerHTML="Confirm order";
        confirmB.onclick=confirmOrder;

        prods.appendChild(tab);
        rowInf.appendChild(tot);
        rowInf.appendChild(cancelB);
        rowInf.appendChild(confirmB);
        prods.appendChild(rowInf);
    }
    else{
        let empt = document.createElement("p");
        empt.style="text-align: center;"
        empt.innerHTML="El carrito se encuentra vacio";
        prods.appendChild(empt);
    }
}

function cancelOrder()
{
    carrito=[];
    carrito2=[];
    qtyC2=[];
    off();
    goToCar();
}

function on()
{
    document.getElementById("overlay").style.display = "block";
}

function off()
{
    document.getElementById("overlay").style.display = "none";
}

function remCar(event)
{
    let idcom = parseInt(event.srcElement.id.replace("d",""));
    let toRem = carrito2[idcom];
    let posCar1=-1;
    for(let i=0;i<carrito.length&&posCar1==-1;i++)
    {
        let namct= carrito[i].name;
        if(namct===toRem.name)
        {
            posCar1=i;
        }
    }
    carrito.splice(posCar1,1);
    if(qtyC2[idcom]>1)
    {
        qtyC2[idcom]--;
    }
    else
    {
        carrito2.splice(qtyC2[idcom],1);
        qtyC2.splice(qtyC2[idcom],1);

    }
    goToCar();
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
        let card = document.createElement("div");
        let cardB = document.createElement("div");
        let img = document.createElement("img");
        let nam = document.createElement("h5");
        let desc = document.createElement("p");
        let pr = document.createElement("p");
        let extra = document.createElement("div");
        card.className="card h-100 col";
        cardB.className="card-body";
        img.className="card-img-top";
        nam.className="card-title";
        pr.className="card-text";
        desc.className="card-text";
        vs.forEach((a, index)=>{
            if(ks[index]==="image")
            {
                img.src=""+a;
            }
            else if(ks[index]==="name")
            {
                nam.innerHTML=a;
            }
            else if(ks[index]==="description")
            {
                desc.innerHTML=a;
            }
            else if(ks[index]==="price")
            {
                pr.innerHTML="$"+a;
            }
            else
            {
                let xtra = document.createElement("p");
                xtra.className="card-text";
                xtra.innerHTML=a;
                extra.appendChild(pr);
            }
        })
        let but = document.createElement("button")
        but.id="c"+ind;
        but.className="btn btn-dark"
        but.type="button";
        but.innerHTML="Add to car";
        but.onclick=addCar;


        card.appendChild(img);
        card.appendChild(nam);
        card.appendChild(desc);
        card.appendChild(extra);
        card.appendChild(pr);
        card.appendChild(but);
        prods.appendChild(card);
        
    })
}

function addCar(ind)
{
    let infoId=ind.srcElement.id;
    let idcom=-1;
    let toAdd=null;
    let gtcar=false;
    if(infoId.includes("c"))
    {
        idcom = parseInt(ind.srcElement.id.replace("c",""));
        toAdd=info[act].products[idcom];
    }
    else
    {
        gtcar=true;
        idcom = parseInt(ind.srcElement.id.replace("d",""));
        toAdd=carrito2[idcom];
    }

    let nToAdd=JSON.parse(JSON.stringify(toAdd));
    let pos = -1;
    for(let i=0;i<carrito2.length&&pos===-1;i++)
    {
        let nAct=carrito2[i].name;
        if(nAct===nToAdd.name)
        {
            pos=i;
        }
    }
    if(pos!=-1)
    {
        qtyC2[pos]+=1;
    }
    else{
        carrito2.push(nToAdd);
        qtyC2.push(1);
    }
    carrito.push(nToAdd);
    numCar.innerHTML=carrito.length===1?carrito.length+" item":carrito.length+" items";
    if(gtcar)
    {
        goToCar();
    }
}

function confirmOrder()
{
    let list = [];
    carrito2.forEach((act,index)=>
    {
        let obj= new Object();
        obj.item=index+1;
        obj.quantity=qtyC2[index];
        obj.description=act.name;
        obj.unitPrice=act.price;
        list.push(obj);
    })
    console.log(list);
}


fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
  .then(response => response.json())
  .then(data =>{
    info=data;
    cont=0;
    let size=5;
    info.forEach((obj,index) => 
    {
        let li = document.createElement("li");
        li.className="nav-item active";
        let tip = document.createElement("a");
        tip.className="nav-link";
        tip.id="t"+index;
        tip.onclick=buscar;
        tip.innerHTML=""+obj.name;
        li.appendChild(tip)
        nave.appendChild(li)
    });
    disp();

});