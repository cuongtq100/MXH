const style = `
.error{
    color:red;
    text-align:left;
    font-size:25px
    
}
input{
    border-radius: 5px;
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 12px;
    box-sizing: border-box
}
.input-wrapper{
    padding:10px
}
#register-form{
    margin-bottom:10px
}
`

class InputWrapper extends HTMLElement{
    constructor(){
        super();
        this._shadowroot = this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error') || ''
        this._shadowroot.innerHTML=`
        <style>${style}</style>
            <div class = 'input-wrapper' >
             <input id='input-main' type='${this.type}' placeholder='${this.placeholder}' >
             <div class='error'> ${this.error} </div>
            </div>
        `
            }
        static get observedAttributes() {
            return ['error']
        }
        attributeChangedCallback(name, oldValue, newValue){
            
        if(name === 'error'){
            this._shadowroot.querySelector('.error').innerHTML = newValue
        }
    }
    // getValue(){
    //             const value = this._shadowroot.getElementById('input-main').value
    //             return value
    //         }   
    //getter
    get Value(){
        const value = this._shadowroot.getElementById('input-main').value
        return value
    }     

}
        
window.customElements.define('input-wrapper',InputWrapper)
