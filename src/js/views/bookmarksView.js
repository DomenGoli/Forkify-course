import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../img/icons.svg';


class bookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No boomarks yet. Find a nice reicpe and bookmark it.'
    _message = ''

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }


    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
        // false rabimo zato ker moramo tukaj returnat string in ne object
    }
}

export default new bookmarksView()