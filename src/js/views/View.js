import icons from 'url:../../img/icons.svg';


export default class View {
    _data;
    
    /**
     * Render the recieve object ot the DOM
     * @param {Object | Object[]} data The data to be rendered 
     * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM 
     * @returns {undefined | string} A markup string is returned if render=false
     * @this  {Object} View instance
     * @author Domen Goli
     * @todo Finish implemetation
     */
    render(data, render=true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    
    }


    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        ////compare newDOM to DOM on page
        // create new DOM
        const newDOM = document.createRange().createContextualFragment(newMarkup)
        const newElements = Array.from(newDOM.querySelectorAll("*"))
        // actual DOM
        const curElements = Array.from(this._parentElement.querySelectorAll('*'))
        // Compare
        newElements.forEach((newEle, i) => {
            const curEle = curElements[i]

            // Update change text
            if(!newEle.isEqualNode(curEle) && newEle.firstChild?.nodeValue.trim() !== '' ) {
                curEle.textContent = newEle.textContent
                //newEle.firstChild.nodeValue.trim() !== '' preveri ce je node samo text, ker hocemo spremenit samo text
            }
            // Update change atributes (dataset)
            if(!newEle.isEqualNode(curEle)) {
                // copiramo atribute v newDOM
                Array.from(newEle.attributes).forEach(attr => curEle.setAttribute(attr.name, attr.value))
            }
        })
        }

    _clear() {
        this._parentElement.innerHTML = '';
    }


    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>    
        `;
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };


    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    
    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}