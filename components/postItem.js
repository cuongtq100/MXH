const style =`

.author-name{
font-weight: 600;
font-size: 1.2rem;
margin-bottom: 5px;
}
.time{
font-size: 12px;
margin-bottom: 10px;
}

.posts-item{
border: 1px solid #dbdbdb;
border-radius: 10px;
padding: 20px;
margin-bottom:15px;
font-family: 'Montserrat', sans-serif;
font-size: 16px;
}
`
import {converDate} from'../util.js'
class PostItem extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode:'open'})
      
    }
    connectedCallback(){
        this.author = this.getAttribute('author')
        this.time =converDate( this.getAttribute('time'))
        this.content = this.getAttribute('content')
        this._shadowDom.innerHTML=`
        <style>${style}</style>
        <div class="posts-item">
                <div class="author-name">${this.author}</div>
                <div class="time">${this.time}</div>
                <div class="content">
                       ${this.content}
                </div>
            </div>
        `
    }
}
window.customElements.define('post-item', PostItem)