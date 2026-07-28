let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');
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
  },
  addContact : function(newName,newNumber){
    this.listaContatti.push({name : newName,number : newNumber});
    this.showContacts();
  },
  removeContact : function (removeName){
    let filtered = this.listaContatti.filter(contatto => contatto.name !=removeName);
    this.listaContatti = filtered
  },
  editContact : function(nome,numero){
    this.listaContatti.forEach(contatto=>{
      if(contatto.name==nome){
          contatto.number=numero
      }
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

btnAdd.addEventListener('click',()=>{
  if(nameInput.value != `` && numberInput.value !=``){
    rubrica.addContact(nameInput.value, numberInput.value);
    if(check==false){
      btnShow.innerHTML = `Hide Contacts`;
      check = true
      nameInput.value=``;
      numberInput.value=``
    }else{
    check=false;
    containerContacts.innerHTML =``;
     btnShow.innerHTML = `Show Contacts`;
    }
 
  }else{
    alert(`I campi non possono essere vuoti, compilali`)
  }
})

btnRemove.addEventListener('click',()=>{
  if(nameInput.value !=``){
    rubrica.removeContact(nameInput.value);
    nameInput.value=``
  }else{
    alert(`inserisci il nome del contatto che vuoi rimuovere`)
  }
})

btnEdit.addEventListener('click',()=>{
  if(nameInput.value !=``){
    rubrica.editContact(nameInput.value,numberInput.value);
    nameInput.value=``;
    numberInput.value=``
  }else{
    alert(`inserisci il nome del contatto di cui vuoi modificare il numero`)
  }
})