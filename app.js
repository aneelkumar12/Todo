

firebase.database().ref('/USER/').on('child_added',function(smit){
    var data = smit.val()
    


        var lst_item = document.createElement('div')
        var rowtext= document.createElement('h6')
        var list_text = document.createTextNode(data.todo)
       
       
        rowtext.setAttribute('class',' tabletext')
        
        rowtext.appendChild(list_text)
        lst_item.appendChild(rowtext)
      

        
        var edit = document.createElement('button')
        var edit_text = document.createTextNode('')
        edit.setAttribute('onclick','edit(this)')
        edit.setAttribute('class','edit_btn fas fa-pencil-alt btn btn-primary')
        edit.setAttribute('id',data.key)

        var edit_2 = document.createElement('button')
        var edit_text_2 = document.createTextNode('')
        edit_2.setAttribute('onclick','delete_todo(this)')
        edit_2.setAttribute('class','edit_btn fas fa-trash-alt btn btn-danger')
        edit_2.setAttribute('id',data.key)
        
        
        edit.appendChild(edit_text)
        edit_2.appendChild(edit_text_2)
        
        
        
        t1=document.createElement('table')
        t2=document.createElement('tr')
        t3=document.createElement('td')
        t4=document.createElement('td')
        t3.setAttribute('class','list_item')
        t4.setAttribute('class','btns')
        
        
        t1.appendChild(t2)
        t2.appendChild(t3)
        t2.appendChild(t4)
        t3.appendChild(lst_item)
        t4.appendChild(edit)
        t4.appendChild(edit_2)
        unorder_item.appendChild(t1)
        // val.value=''







})


var unorder_item = document.getElementById('unorder')
var btuns = document.getElementById('btuns')



function add_todo(){
    var val = document.getElementById('inp')



    if(val.value == ""){
       alert("enter value")
       
    }
    else{



        NEW= firebase.database().ref().push().getKey();
        
        var obj = {
                todo : val.value,
                key : NEW, 
            }
            
            firebase.database().ref(`/USER/`+NEW).set(obj)
            
            
            
            
    val.value=''

       

}
}

function edit(e){
    var val = e.parentNode.parentNode.childNodes[0].childNodes[0].innerText
   
    var inp = prompt("Enter Value",val)
    if(inp == ""){
        alert("enter value")
    }
    else{
        firebase.database().ref('/USER/').child(e.id).set({
            todo:inp,
            key:e.id})
            e.parentNode.parentNode.childNodes[0].childNodes[0].innerText = inp
    }
    }
   


function delete_todo(e){

firebase.database().ref("/USER/"+e.id).remove()
e.parentNode.parentNode.remove()

}
function add_alltodo(){
    firebase.database().ref("/USER/").remove()
    unorder_item.innerHTML=null
}

console.log(firebase.auth)

function signup(){
    var email = document.getElementById('email').value
    var password = document.getElementById("password").value

    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((val)=>{
        console.log(val)
       
        console.log(val.user.email)
       

        var obas={
            email: val.user.email,
            password: password,
            uid: val.user.uid

        }
                    console.log(obas)

     firebase.database().ref(`/USERers/`+obas.uid).set(obas)

      
    })

    .catch((err)=>{
        
        console.log(err)
    })
}

function signin(){
    var email = document.getElementById('email').value
    var password = document.getElementById("password").value

    console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((val)=>{
        console.log(val)
        localStorage.setItem('User_Uid',val.user.uid)
        window.location.replace("index.html")
        
    })
    
    .catch((err)=>{
        alert("nahi hua")
        console.log(err)
    })
}

function logout(){
    localStorage.clear();
  
    

    window.location.replace("login.html")
}

function home(){

    var uid= localStorage.getItem('User_Uid')
    var name = document.getElementById('name')
   console.log(uid)
    firebase.database().ref(`/USERers`).child(uid).once('value', function(my){
        console.log(my.val())
        name.innerText = my.val().email
    })
}

function signinFB(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
    var credential = result.credential;

    
    var token = credential.accessToken;
  


    localStorage.setItem('User_Uid',val.user.uid)
    window.location.replace("index.html")
    
   
}).catch((error) => {
      
   
    var errorCode = error.code;
    var errorMessage = error.message;
   
    var email = error.email;
    
    var credential = error.credential;
    
  });


}