let nameInput = document.querySelector('#nameInput');
let numberImput = document.querySelector('#numberInput');
let btnShow =  document.querySelector('#btnShow');
let btnAdd =  document.querySelector('#btnAdd');
let btnRemove =  document.querySelector('#btnRemove');
let btnEdit =  document.querySelector('#btnEdit');

let check = false;

let containerContacts = document.querySelector('.containerContacts');

let rubrica = {
  listaContatti:[
    {name:`Gianni`, number:3333333333},
    {name:`Leon Scott`, number:4444444444},
    {name:`Ada`, number:5555555555},
  ],
  showContacts : function(){
    this.listaContatti.forEach(contatto =>{
      let p = document.createElement('p');
      p.innerHTML = `${contatto.name} : ${contatto.number}`;
      containerContacts.appendChild(p);
    })
  }
}

btnShow.addEventListener('click',()=>{
  if(check==false){
    rubrica.showContacts();
    btnShow.innerHTML = `Hide Contacts`;
    check = true
  }else{
    check=false;
    containerContacts.innerHTML =``;
     btnShow.innerHTML = `Show Contacts`;
  }
})