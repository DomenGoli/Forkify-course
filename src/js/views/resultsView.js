import View from './View.js';
import previewView from './previewView.js';
// import icons from 'url:../../img/icons.svg';


class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recepies found for your query! Please try again'
    _message = ''


    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');
        // false rabimo zato ker moramo tukaj returnat string in ne object
    }
}

export default new ResultsView()