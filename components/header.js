const style =`
*{
    padding: 0;
    margin: 0;
}
.container{
background-color: #1976D2;
display: flex;
justify-content: space-between;
align-items: center;
height: 64px;
padding: 0 10%;
}
.logo,.user-infor{
display: flex;
align-items: center;
}
.branch{
font-family: 'Montserrat', sans-serif;
font-size: 1rem;
color: #fff;
font-weight: 600px;

}
.user-infor i{
font-size: 1.8rem;

}
.btn{
background-color: transparent;
border: none;
margin-left: 20px ;
cursor: pointer;
}

`

import {redirect} from '../index.js'

class StoryHeader extends HTMLElement{
    constructor(){
        super();
        this._shadowroot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
    this._shadowroot.innerHTML=`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,400&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <style>${style}</style>
    <div class="container">
        <div class="logo">
            <img src="image/T.png" height="70px" width="70px" alt="">
            <div class="branch">Share story</div>
        </div>
        <div class="user-infor">
            <div class="avatar"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>
            <button class="btn" id='logout'>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            </button>
        </div>
      </div>
      
    `

    this._shadowroot.getElementById('logout').addEventListener('click',()=>{
        localStorage.removeItem('currentUser')
        redirect('login')
   })
}
  
   
}
window.customElements.define('story-header',StoryHeader)