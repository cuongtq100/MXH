import {getItemLocalStorage} from '../util.js'


const style = `
#create-post{
    width:60%;
    margin:auto;
    margin-top:20px;
    text-align:right
}
#content{
    width:100%;
    border:1px solid #dbdbdb;
    border-radius:10px;
    outline:none

}
.post{
    background-color:#1976D1;
    color:#fff;
    padding:10px 15px;
    border-radius:5px
}
`
class CreatePost extends HTMLElement{
    constructor(){
        super();
        this._shadowroot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
    this._shadowroot.innerHTML=`
    <style>${style}</style>
    <form id="create-post">
    <textarea id='content' name="content" rows="12"> </textarea>
    <button class='post'>Post</button>
    </form>
    `
const postForm = this._shadowroot.getElementById('create-post')
    postForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const contentPost =postForm.content.value
        if(contentPost.trim() ===''){
            alert('vui long nhap noi dung')
        }
    const user = getItemLocalStorage('currentUser')
    const dataPost  = {
        'createdBy':user.id,
        'createdAt':new Date().toISOString(),
        'content' :contentPost,
        'comments':[],
        'authorName':user.name,
        'isShow':true,
    }
    firebase.firestore().collection('posts').add(dataPost);
    postForm.content.value = ''
    alert('thanh cong')
         })
   
    }
    
}
window.customElements.define('create-post',CreatePost)