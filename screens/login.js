

const style =`
.login-container{
    width: 100vw;
    height:100vh;
    background: url('https://www.cancer.org/content/dam/cancer-org/images/photographs/single-use/espresso-coffee-cup-with-beans-on-table-restricted.jpg');
    background-repeat: no-repeat;
     background-size: cover;
     display:flex;
     justify-content:flex-end;
   
}
#login-form{
    width:30vw;
    background: #fff;
    height:100vh;
    padding:0 20px
}
h1{
    text-align:center;
    color:#363636;

}
button{
    background: #1565C0;
    color:white;
    padding: 10px 15px;
    border-radius:5px
}
a{
    cursor:pointer
}
`
import {redirect} from '../index.js'
import {getDataFromDocs,saveToLocalStorage,getItemLocalStorage} from '../util.js'
class loginScreen extends HTMLElement{
constructor(){
    super();
    this._shadowroot = this.attachShadow({mode: 'open'})
}
connectedCallback(){
this._shadowroot.innerHTML=`
  <style> ${style} </style>
    <div class = 'login-container'>
        <form id='login-form'>
          <h1>CI Project<h1>
          <input-wrapper id='email' type='text' placeholder='Email'></input-wrapper>
          <input-wrapper id='password' type='password' placeholder='Password'></input-wrapper>
          <button>login</button>
          <a id='redirect'> Don't have account ? login </a>
        </form>
    </div>
`
const loginForm = this._shadowroot.getElementById('login-form')
    loginForm.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const email = this._shadowroot.getElementById('email').Value;
        const password = this._shadowroot.getElementById('password').Value;
        let isValid = true;
        
        if(email.trim() === ''){
            isValid = false

            this.setError('email','please input email')

        }
       if(password.trim() === ''){
        isValid = false

            this.setError('password','please input password')

        }
         
        if(!isValid){
            return
        }
          
        const user = await firebase.firestore().collection('users').where('email','==',email).
        where('password','==',CryptoJS.MD5(password).toString()).get()
        if(user.empty){
            alert('sai email/password')
        }
        else{
                saveToLocalStorage('currentUser', getDataFromDocs(user)[0])
                redirect('story')
        }

       
        // const check = await this.checkEmailExit(email)
        // if (check){
        //    alert('email da duoc dang ky')
        // }
        // else{
        //     firebase.firestore().collection('users').add(data);
        // }
        
    })
   this._shadowroot.getElementById('redirect').addEventListener('click',()=>{
       redirect('register')
   })
}
setError(id,message){
    this._shadowroot.getElementById(id).setAttribute('error',message)


}
     async checkEmailExit(email,password){
         const resmail = await firebase.firestore().collection('users').where('email','==',email).get()
         const respass = await firebase.firestore().collection('users').where('password','==',password).get()
        
     }
     
}
window.customElements.define('login-screen',loginScreen)


