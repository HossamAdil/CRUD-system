import Validator,{regexObject}  from "./validator.module.js";

const allInputs =  document.querySelectorAll("input");
const addPrtoductBtn =  document.getElementById("btn-addProduct");
let listOfProduct;

export default class Product{

    //#region fields
    #id;
    #name;
    #price;
    #category;
    #description;
    //#endregion



    //#region ctor
    constructor(name,price,category,description){
        this.id = ++Product.id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;

    }
    //#endregion

    //#region properties
    set id(val){
        this.#id = val
    }
    set name(val){
        if(regexObject.name.test(val))
        this.#name = val
        else
        throw "Invalid data"
    }
    set price(val){
        if(regexObject.price.test(val))
        this.#price = val
        else
        throw "Invalid data"
    }
    set category(val){
        if(regexObject.category.test(val))
        this.#category = val
        else
        throw "Invalid data"
    }
    set description(val){
        if(regexObject.description.test(val))
        this.#description = val
        else
        throw "Invalid data"
    }


    get id(){return this.#id }
    get name(){return this.#name }
    get price(){return this.#price }
    get category(){return this.#category }
    get description(){return this.#description }
    //#endregion

    toJSON(){
        return {
            id:this.id,
            name:this.name,
            price:this.price,
            category:this.category,
            description:this.description,
        }
    }

    // toString(){
    //     return `{a:${this.id}}`
    // }
}

Product.id = 0;
Product.event = new Event('addProduct', { bubbles: true, cancelable: false });

Product.create  = function(){
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productCategory = document.getElementById("productCategory").value;
    let productDescription = document.getElementById("productDescription").value;
    
    try{
        // debugger
        let product = new Product(productName,productPrice,productCategory,productDescription);
        listOfProduct.push(product)
        Product.saveInLocalStorage()


        for(let i=0;i<allInputs.length;i++){
            allInputs[i].value = "";
            allInputs[i].classList.remove("is-valid")
            addPrtoductBtn.setAttribute("disabled","disabled") 
        }
    }catch(err){
       document.getElementById("formMessage").classList.replace("d-none","d-block")

    }
}
Product.saveInLocalStorage  = function(){
    localStorage.setItem("products" , JSON.stringify(listOfProduct))
}
Product.getDataFromLocalStorage  = function(){
    return JSON.parse(localStorage.getItem("products"))
}
Product.delete = function(id){
    listOfProduct = listOfProduct.filter(function(product){
        if(product.id != id)
            return product
    })

    Product.saveInLocalStorage()
    document.body.dispatchEvent(Product.event) 
}
Product.display = function(){
    if(localStorage.getItem("products") != null ){
        listOfProduct = JSON.parse(localStorage.getItem("products"))
        console.log("gggggg")
        if(listOfProduct.length)
        Product.id = listOfProduct[listOfProduct.length-1].id;
        else
        Product.id = 0;

        return true
    }else{
        listOfProduct = [];
        console.log("nnnnnnnn")
        return false
    }
}
Product.fillData = function(id){
    if(confirm("are u sure update this product")){
        let product = listOfProduct.find(function(product){
            if(product.id == id)
                return product
        })
        let productName = document.getElementById("productName");
        let productPrice = document.getElementById("productPrice");
        let productCategory = document.getElementById("productCategory");
        let productDescription = document.getElementById("productDescription");
    
        productName.value = product.name;
        productPrice.value = product.price;
        productCategory.value = product.category;
        productDescription.value = product.description;


        let deleteBtns = document.querySelectorAll("[data-product-delete]");
        let updateBtns = document.querySelectorAll("[data-product-update]");
        const updatePrtoductBtn =  document.getElementById("btn-updateProduct");

        addPrtoductBtn.classList.replace("d-block","d-none")
        updatePrtoductBtn.classList.replace("d-none","d-block")
        updatePrtoductBtn.setAttribute("data-prodid",`${id}`)


        updatePrtoductBtn.onclick = function(e){
            Product.update(id,e)
        }
       

        for(let i=0;i<allInputs.length;i++){
            if(regexObject[allInputs[i].getAttribute("data-input")].test(allInputs[i].value)){
                allInputs[i].classList.add("is-valid")
            }else{
                allInputs[i].classList.add("is-invalid") 
            }
        }

        for(let i=0;i<deleteBtns.length;i++){
            console.log(deleteBtns)
            deleteBtns[i].setAttribute("disabled","disabled")
            updateBtns[i].setAttribute("disabled","disabled")
        }
    }

}
Product.update  = function(id , e){

    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productCategory = document.getElementById("productCategory").value;
    let productDescription = document.getElementById("productDescription").value;

    let arr = JSON.parse(localStorage.getItem("products")).map(function(product){
        console.log(product)
        if(product.id == id)
        {
            product.name =productName;
            product.price =productPrice;
            product.category =productCategory;
            product.description =productDescription;
        }
        return product;
    })
    
    listOfProduct = arr;

    Product.saveInLocalStorage()
    document.body.dispatchEvent(Product.event) 

    e.target.classList.replace("d-block","d-none")
    addPrtoductBtn.classList.replace("d-none","d-block")
    addPrtoductBtn.setAttribute("disabled","disabled")
    for(let i=0;i<allInputs.length;i++){
        allInputs[i].value = ""
        allInputs[i].classList.remove("is-valid") 
    }

}