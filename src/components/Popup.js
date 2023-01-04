export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
       
    }

    close() {
        this._popup.classList.remove('popup_opened');
       
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if(evt.key === "Escape") {
                this.close(); 
            }
          }); 
        
    }   

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__btn-close');
        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this._handleEscClose();

        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_opened')) {
                this.close();
            }

          });
        
    }
    
}