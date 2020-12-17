import {getDataFromDoc,getDataFromDocs} from '../util.js'
const style=`
*{
    margin:0;
    padding:0
}
.list-posts{
    margin-top:10px;
    width:60%;
    margin:auto;
}
`
class ListPost extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode :'open'})
    }
   async connectedCallback(){
        const res = await firebase.firestore().collection('posts').where('isShow', '==', true).get()
        this.listenCollectionChange()
        const listPost = getDataFromDocs(res)
        let html=''
        listPost.forEach(e => {
            html +=`
            <post-item time='${e.createdAt}' author='${e.authorName}' content='${e.content}'></post-item>
            `
        });
        this._shadowDom.innerHTML =`
        <style>${style}</style>

        <div class= 'list-posts'>
        ${html}
        <div>`
    }
    listenCollectionChange(){
        let firstRun = true
        firebase.firestore().collection('posts').where('isShow', '==', true).onSnapshot((snapShot) => {
            if(firstRun){
                firstRun = false;
                return
            }
            const docChange = snapShot.docChanges()
            for(const oneChange of docChange){
                if(oneChange.type == 'added'){
                    this.appendPostItem(getDataFromDoc(oneChange.doc))

                }
            }
        })
    }
    appendPostItem(data){
        const postItem = document.createElement('post-item')
        postItem.setAttribute('time', data.createdAt)
        postItem.setAttribute('author', data.authorName)
        postItem.setAttribute('content', data.content)
        const parent = this._shadowDom.querySelector('.list-posts')
        parent.insertBefore(postItem,parent.firstChild)
        console.log(data);
    }
}
window.customElements.define('list-post',ListPost)