

const style =`
    .register-container{
        width: 100vw;
        height:100vh;
        background: url('https://www.cancer.org/content/dam/cancer-org/images/photographs/single-use/espresso-coffee-cup-with-beans-on-table-restricted.jpg');
        background-repeat: no-repeat;
         background-size: cover;
         display:flex;
         justify-content:flex-end;
       
    }
    #register-form{
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
        cursor:pointer;
        
        font-size: 25px;
    }
`
import {redirect} from '../index.js'
import {getDataFromDocs} from '../util.js'
class RegisterScreen extends HTMLElement{
    constructor(){
        super();
        this._shadowroot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
this._shadowroot.innerHTML=`
      <style> ${style} </style>
        <div class = 'register-container'>
            <form id='register-form'>
              <h1>CI Project<h1>
              <input-wrapper id='firstname' type='text' placeholder='First name'></input-wrapper>
              <input-wrapper id='lastname' type='text' placeholder='Last name'></input-wrapper>
              <input-wrapper id='email' type='text' placeholder='Email'></input-wrapper>
              <input-wrapper id='password' type='password' placeholder='Password'></input-wrapper>
              <input-wrapper id='confirm-password' type='password' placeholder='Confirm Password'></input-wrapper>
              <button>Register</button>
              <a id='redirect'>Already have account ? login </a>
            </form>
        </div>
`
const registerForm = this._shadowroot.getElementById('register-form')
        registerForm.addEventListener('submit',async (e)=>{
            e.preventDefault();
            const firstname = this._shadowroot.getElementById('firstname').Value;
            const lastname = this._shadowroot.getElementById('lastname').Value;
            const email = this._shadowroot.getElementById('email').Value;
            const password = this._shadowroot.getElementById('password').Value;
            const confirmpassword = this._shadowroot.getElementById('confirm-password').Value;
            let isValid = true;
            if(firstname.trim() === ''){
                isValid = false
                this.setError('firstname','please input firstname')
            }
            if(lastname.trim() === ''){
                isValid = false
                this.setError('lastname','please input lastname')
            }
            if(email.trim() === ''){
                isValid = false

                this.setError('email','please input email')

            }
           if(password.trim() === ''){
            isValid = false

                this.setError('password','please input password')

            }
             if(confirmpassword.trim() === ''){
                isValid = false

                this.setError('confirm-password','please input confirmPassword')
                
            }
            if (password != confirmpassword){
                isValid = false

                this.setError('confirm-password','password does not match')
            
            }
            if(!isValid){
                return
            }
            
            const data ={
                'name': `${firstname} ${lastname}`,
                'email' : email,
                'password': CryptoJS.MD5(password).toString()   
            }
            //email da ton tai tra ra true
            const check = await this.checkEmailExit(email)
            if (check){
               alert('email da duoc dang ky')
            }
            else{
                firebase.firestore().collection('users').add(data);
                alert('Đăng ký thành công')
                
                redirect('login');
            }
            
        })
        this._shadowroot.getElementById('redirect').addEventListener('click',()=>{
            redirect('login')
       })
    }
    setError(id,message){
        this._shadowroot.getElementById(id).setAttribute('error',message)


    }
         async checkEmailExit(email){
             const res = await firebase.firestore().collection('users').where('email','==',email).get()
             return !res.empty
             console.log(res);
         }
}
window.customElements.define('register-screen',RegisterScreen)


