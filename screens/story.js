
class StoryScreen extends HTMLElement{
    constructor(){
        super();
        this._shadowroot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
    this._shadowroot.innerHTML=`
      <story-header></story-header>
      <create-post></create-post>
      <list-post></list-post>
    `
}
}
window.customElements.define('story-screen',StoryScreen)