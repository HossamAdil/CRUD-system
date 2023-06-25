import Product from "./product.module.js";
import Validator,{regexObject} from "./validator.module.js";

const addPrtoductBtn =  document.getElementById("btn-addProduct");
const allInputs =  document.querySelectorAll("input");



window.addEventListener('addProduct', function(e){
    let data = JSON.parse(localStorage.getItem("products"))
    console.log(data)
    let table = document.getElementById("tdata")
    table.innerHTML = ""
    for(let i=0;i < data.length;i++){
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        td.innerText = i + 1;
        tr.appendChild(td)
        for(var prop in data[i]){
            if(prop != "id"){
                let td = document.createElement("td")
                td.innerText = data[i][prop]
                tr.appendChild(td)
            }
        }
        for(let l = 0;l<2;l++){
            let td = document.createElement("td");
            let btn = document.createElement("button");


            switch(l){
                case 0: 
                btn.classList.add("btn");
                btn.classList.add("btn-danger");
                btn.innerText = "Delete";
                btn.setAttribute("data-product-delete",`${data[i].id}`)
                    break;
                case 1:
                btn.classList.add("btn");
                btn.classList.add("btn-success");
                btn.innerText = "Update";
                btn.setAttribute("data-product-update",`${data[i].id}`)
                // btn.setAttribute("data-toggle",`modal`)
                // btn.setAttribute("data-target",`#exampleModal`)
                    break;
            }

            td.appendChild(btn)
            tr.appendChild(td)
        }
        table.appendChild(tr)  
    }
    addDeleteEvent()
    addUpdateEvent()
})

if(Product.display())
    document.body.dispatchEvent(Product.event)

 


for(let i=0;i<allInputs.length;i++){
    allInputs[i].addEventListener("focus",function(event){
        let prop = event.target.getAttribute("data-input");
        if(!regexObject[prop].test(event.target.value)){
            event.target.classList.add("is-invalid") 
        }
    })
}
for(let i=0;i<allInputs.length;i++){
    allInputs[i].addEventListener("blur",function(event){
        let prop = event.target.getAttribute("data-input");
        if(!regexObject[prop].test(event.target.value)){
            console.log("aaaa")
             event.target.classList.add("is-invalid") 
        }
    })
}
for(let i=0;i<allInputs.length;i++){
    allInputs[i].addEventListener("keyup",function(event){
    let prop = event.target.getAttribute("data-input");
        if(regexObject[prop].test(event.target.value)){
             event.target.classList.replace("is-invalid","is-valid") 
        }else{
            event.target.classList.replace("is-valid","is-invalid") 
        }

        let validInput = document.querySelectorAll(".is-valid");      
        if(validInput.length == 4){
            addPrtoductBtn.removeAttribute("disabled")
            document.getElementById("formMessage").classList.replace("d-block","d-none")
        }
        else 
        {
            addPrtoductBtn.setAttribute("disabled","disabled")
            document.getElementById("formMessage").classList.replace("d-none","d-block")
        }
    })
}



addPrtoductBtn.addEventListener("click",function(e){
    Product.create();
    Product.saveInLocalStorage()
    document.body.dispatchEvent(Product.event) 
})









function addDeleteEvent(){
    let deleteBtns = document.querySelectorAll("[data-product-delete]");

    for(let i=0;i<deleteBtns.length;i++){
        deleteBtns[i].addEventListener("click",function(e){
            Product.delete(e.target.getAttribute("data-product-delete"))
        })
    }
}



function addUpdateEvent(){
    let deleteBtns = document.querySelectorAll("[data-product-update]");

    for(let i=0;i<deleteBtns.length;i++){
        deleteBtns[i].addEventListener("click",function(e){
            Product.fillData(e.target.getAttribute("data-product-update"))
        })
    }
}





