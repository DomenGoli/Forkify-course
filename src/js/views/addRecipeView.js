import View from './View.js';
// import icons from 'url:../img/icons.svg';


class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload')
    _message = 'Recipe was successfuly uploaded'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnclose = document.querySelector('.btn--close-modal')

    constructor() {
        super();
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }
    
    _addHandlerHideWindow() {
        this._btnclose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArray = [...new FormData(this)]; // array z vsemi field value
            const data = Object.fromEntries(dataArray) // ustvarimo objekt iz arrayev
            handler(data);

        })
    }

    _generateMarkup() {
        
    }
}


export default new AddRecipeView()

