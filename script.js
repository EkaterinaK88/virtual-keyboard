window.addEventListener('DOMContentLoaded', () => {

const body = document.body;
let storage = localStorage.getItem('language');
let lang;
storage ? lang = storage : lang = 'ru';
let capsLock = false;

//создаем инпут
const input = document.createElement('textarea');
input.classList.add('textarea');
body.append(input);

//создаем клавиатуру
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
body.append(keyboard);

//комментарии
const comment = document.createElement('p');
comment.classList.add('comment');
comment.textContent = '*Раскладка клавиатуры Alt + Shift. Клавиатура создана в OS Windows';
body.append(comment);

const keys = [
  {ru: ['ё'], en: ['`', '~']},
  {ru: ['1', '!'], en: ['1', '!']},
  {ru: ['2', '"'], en: ['2', '@']},
  {ru: ['3', '№'], en: ['3', '#']},
  {ru: ['4', ';'], en: ['4', '$']},
  {ru: ['5', '%'], en: ['5', '%']},
  {ru: ['6', ':'], en: ['6', '^']},
  {ru: ['7', '?'], en: ['7', '&']},
  {ru: ['8', '*'], en: ['8', '*']},
  {ru: ['9', '('], en: ['9', '(']},
  {ru: ['0', ')'], en: ['0', ')']},
  {ru: ['-', '_'], en: ['-', '_']},
  {ru: ['=', '+'], en: ['=', '+']},
  {ru: ['Backspace'], en: ['Backspace'], class: 'key-wide'},
  {ru: ['Tab'], en: ['Tab'], class: 'key-tab'},
  {ru: ['й'], en: ['q']},
  {ru: ['ц'], en: ['w']},
  {ru: ['у'], en: ['e']},
  {ru: ['к'], en: ['r']},
  {ru: ['е'], en: ['t']},
  {ru: ['н'], en: ['y']},
  {ru: ['г'], en: ['u']},
  {ru: ['ш'], en: ['i']},
  {ru: ['щ'], en: ['o']},
  {ru: ['з'], en: ['p']},
  {ru: ['х'], en: ['[', '{']},
  {ru: ['ъ'], en: [']', '}']},
  {ru: ['\\', '/'], en: ['\\', '|']},
  {ru: ['DEL'], en: ['DEL'], class: 'key-dark'},
  {ru: ['Caps Lock'], en: ['Caps Lock'], class: 'key-wide'},
  {ru: ['ф'], en: ['a']},
  {ru: ['ы'], en: ['s']},
  {ru: ['в'], en: ['d']},
  {ru: ['а'], en: ['f']},
  {ru: ['п'], en: ['g']},
  {ru: ['р'], en: ['h']},
  {ru: ['о'], en: ['j']},
  {ru: ['л'], en: ['k']},
  {ru: ['д'], en: ['l']},
  {ru: ['ж'], en: [';', ':']},
  {ru: ['э'], en: ['\'', '"']},
  {ru: ['ENTER'], en: ['ENTER'], class: 'key-enter'},
  {ru: ['Shift'], en: ['Shift'], class: 'key-wide'},
  {ru: ['\\', '/'], en: ['\\', '|']},
  {ru: ['я'], en: ['z']},
  {ru: ['ч'], en: ['x']},
  {ru: ['с'], en: ['c']},
  {ru: ['м'], en: ['v']},
  {ru: ['и'], en: ['b']},
  {ru: ['т'], en: ['n']},
  {ru: ['ь'], en: ['m']},
  {ru: ['б'], en: [',', '<']},
  {ru: ['ю'], en: ['.', '>']},
  {ru: ['.', ','], en: ['/', '?']},
  {ru: ['arrow_drop_up'], en: ['arrow_drop_up'], class: 'key-dark'},
  {ru: ['Shift'], en: ['Shift'], class: 'key-dark'},
  {ru: ['Ctrl'], en: ['Ctrl'], class: 'key-ctrl'},
  {ru: ['Win'], en: ['Win'], class: 'key-dark'},
  {ru: ['Alt'], en: ['Alt'], class: 'key-dark'},
  {ru: [' ', ' '], en: [' ', ' '], class: 'key-space'},
  {ru: ['Alt'], en: ['Alt'], class: 'key-dark'},
  {ru: ['Ctrl'], en: ['Ctrl'], class: 'key-ctrl'},
  {ru: ['arrow_left'], en: ['arrow_left'], class: 'key-dark'},
  {ru: ['arrow_drop_down'], en: ['arrow_drop_down'], class: 'key-dark'},
  {ru: ['arrow_right'], en: ['arrow_right'], class: 'key-dark'},
]

const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

//создаем фрагмент для клавиш
const fragment = document.createDocumentFragment();

//создаем клавиши
function makeButtons (lang) {
  keys.forEach((item, i) => {
    const key = document.createElement('button');
    key.classList.add('key');
    if (keys[i].class) {key.classList.add(keys[i].class);} 
    key.setAttribute('type', 'button');
    key.setAttribute('name', i);
    keys[i][lang][0].length > 1 ? key.textContent = keys[i][lang][0] : key.textContent = keys[i][lang][0].toUpperCase();
    fragment.append(key);
    //создаем второе значение клавиш, если оно есть
    if (keys[i][lang].length > 1) {
      const shiftValue = document.createElement('span');
      shiftValue.classList.add('shiftValue');
      shiftValue.textContent = keys[i][lang][1];
      key.append(shiftValue);
    }
    //вставляем стрелочки
    if (i === 54 || i >= 62) {
      key.textContent = '';
      const arrowIcon = document.createElement('i');
      arrowIcon.classList.add('material-icons');
      arrowIcon.setAttribute('id', i);
      arrowIcon.textContent = keys[i][lang][0];
      key.append(arrowIcon);
    }
  }); 
}

makeButtons(lang);

keyboard.append(fragment);

const buttons = document.querySelectorAll('button');

//смена языка
function changeLang () {
  lang === 'ru' ? lang = 'en' : lang = 'ru';
  localStorage.setItem('language', lang);

  buttons.forEach((button, i) => {
    //если у клавиши два значения
    if (keys[i][lang].length > 1) {
      button.innerHTML = `${keys[i][lang][0]}<span class='shiftValue'>${keys[i][lang][1]}</span>`;
    }
    //остальные клавиши, кроме стрелочек
    else if (i !== 54 && i < 62) {
      keys[i][lang][0].length > 1 ? button.textContent = keys[i][lang][0] : button.textContent = keys[i][lang][0].toUpperCase();
    }
  })
}

//нажатие на клавиши
window.addEventListener('keydown', (evt) => {
  keyCodes.forEach((item, i) => {
    if (evt.code === item) {
      buttons[i].classList.add('active'); //анимация
      //вставка символов в инпут
      if (keys[i][lang][0].length === 1) {
        evt.preventDefault();
        let symbol; //значение символов с учетом caps lock
        capsLock ? symbol = keys[i][lang][1] || keys[i][lang][0].toUpperCase() : symbol = keys[i][lang][0];
        if ( evt.shiftKey) {
          symbol = keys[i][lang][1] || keys[i][lang][0].toUpperCase();
        }
        insertSymbol(symbol);
      }
    }
  })
  if (evt.altKey && evt.shiftKey) {
    changeLang();
  }
  if (evt.code === 'Tab') {
    evt.preventDefault();
    insertSymbol('\t');  
  }
  if (evt.code === 'CapsLock') {
    capsLock === true ? capsLock = false : capsLock = true;
    buttons[29].classList.toggle('capsOn');
    input.focus();
  }
 });

window.addEventListener('keyup', (evt) => {
  keyCodes.forEach((item, i) => {
    if (evt.code === item) {
      buttons[i].classList.remove('active');
    }
  })
});

//удаление текста для del и backspace
function deleteText (pos) {
  let cursorStart = input.selectionStart;
  let cursorEnd = input.selectionEnd;
  let arr = input.value.split('');
  cursorStart !== cursorEnd ? arr.splice(cursorStart, cursorEnd - cursorStart) : arr.splice(cursorStart + pos, 1);
  input.value = arr.join('');
  //перемещение курсора в нужную позицию
  if ( cursorStart !== cursorEnd && pos < 0) {pos = 0};
  input.selectionStart = input.selectionEnd = cursorStart + pos;
  input.focus();
}

//вставка символа
function insertSymbol(symbol) {
  let cursorStart = input.selectionStart;
  let cursorEnd = input.selectionEnd;
  //вставка символа в позицию курсора или вместо выделенного текста
  let arr = input.value.split('');
  cursorStart !== cursorEnd ? arr.splice(cursorStart, cursorEnd - cursorStart, symbol) : arr.splice(cursorStart, 0, symbol);
  input.value = arr.join('');
  //положение курсора
  input.selectionStart = input.selectionEnd = cursorStart + 1;
  input.focus();
}


//клики по клавишам
keyboard.addEventListener('click', (evt) => {
  if ((evt.target && evt.target.tagName == 'BUTTON') || (evt.target.tagName == 'I')) {
      switch (evt.target.name || evt.target.id) {
        case '13':  //backspace
          deleteText(-1);
          break;

        case '14':  //tab
          insertSymbol('\t');        
          break;

        case '28':  //del
          deleteText(0);
          break;

        case '29':  //caps
          capsLock === true ? capsLock = false : capsLock = true;
          evt.target.classList.toggle('capsOn');
          input.focus();
          break;

        case '41':  //enter
          insertSymbol('\n'); 
          break;

        case '42':  //shift
        case '55':
          input.focus();
          break;

        case '56':  //ctrl
        case '61':
          input.focus();
          break;

        case '58':  //alt
        case '60':
          input.focus();
          break;

        case '57':  //win
          input.focus();
          break;

        case '54':  //arrow up
          let cursorUp = input.selectionStart;
          input.selectionStart = input.selectionEnd = cursorUp - 63;
          input.focus();
          break;

        case '62':  //arrow left
          let cursorL = input.selectionStart;
          input.selectionStart = input.selectionEnd = cursorL - 1;
          input.focus();
          break;

        case '63':  //arrow down
          let cursorD = input.selectionStart;
          input.selectionStart = input.selectionEnd = cursorD + 63;
          input.focus();
          break;

        case '64':  //arrow right
          let cursorR = input.selectionStart;
          input.selectionStart = input.selectionEnd = cursorR + 1;
          input.focus();
          break;

        default:
          let symbol; //значение символов с учетом caps lock
          capsLock ? symbol = keys[evt.target.name][lang][1] || keys[evt.target.name][lang][0].toUpperCase() : symbol = keys[evt.target.name][lang][0];
          
          insertSymbol(symbol);
          break;
      }
    }
  })
  

  
})


