/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/MobileMenu */ "./src/modules/MobileMenu.js");
/* harmony import */ var _modules_HeroSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/HeroSlider */ "./src/modules/HeroSlider.js");
/* harmony import */ var _modules_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Search */ "./src/modules/Search.js");
/* harmony import */ var _modules_MyNotes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/MyNotes */ "./src/modules/MyNotes.js");


// Our modules / classes





// Instantiate a new object using our modules/classes
const mobileMenu = new _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
const heroSlider = new _modules_HeroSlider__WEBPACK_IMPORTED_MODULE_2__["default"]();
const magicalSearch = new _modules_Search__WEBPACK_IMPORTED_MODULE_3__["default"]();
const notesSection = new _modules_MyNotes__WEBPACK_IMPORTED_MODULE_4__["default"]();

/***/ }),

/***/ "./src/modules/HeroSlider.js":
/*!***********************************!*\
  !*** ./src/modules/HeroSlider.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glidejs_glide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glidejs/glide */ "./node_modules/@glidejs/glide/dist/glide.esm.js");

class HeroSlider {
  constructor() {
    if (document.querySelector(".hero-slider")) {
      // count how many slides there are
      const dotCount = document.querySelectorAll(".hero-slider__slide").length;

      // Generate the HTML for the navigation dots
      let dotHTML = "";
      for (let i = 0; i < dotCount; i++) {
        dotHTML += `<button class="slider__bullet glide__bullet" data-glide-dir="=${i}"></button>`;
      }

      // Add the dots HTML to the DOM
      document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend", dotHTML);

      // Actually initialize the glide / slider script
      var glide = new _glidejs_glide__WEBPACK_IMPORTED_MODULE_0__["default"](".hero-slider", {
        type: "carousel",
        perView: 1,
        autoplay: 3000
      });
      glide.mount();
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (HeroSlider);

/***/ }),

/***/ "./src/modules/MobileMenu.js":
/*!***********************************!*\
  !*** ./src/modules/MobileMenu.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class MobileMenu {
  constructor() {
    this.menu = document.querySelector(".site-header__menu");
    this.openButton = document.querySelector(".site-header__menu-trigger");
    this.events();
  }
  events() {
    this.openButton.addEventListener("click", () => this.openMenu());
  }
  openMenu() {
    this.openButton.classList.toggle("fa-bars");
    this.openButton.classList.toggle("fa-window-close");
    this.menu.classList.toggle("site-header__menu--active");
  }
}
/* harmony default export */ __webpack_exports__["default"] = (MobileMenu);

/***/ }),

/***/ "./src/modules/MyNotes.js":
/*!********************************!*\
  !*** ./src/modules/MyNotes.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/types */ "./node_modules/@babel/types/lib/index.js");
/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);


class Notes {
  constructor() {
    this.events();
  }
  events() {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()("#my-notes").on("click", ".delete-note", this.deleteNote);
    jquery__WEBPACK_IMPORTED_MODULE_1___default()("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_1___default()("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(".submit-note").on("click", this.createNote.bind(this));
  }
  deleteNote(e) {
    console.log("notes clicked");
    const thisNote = jquery__WEBPACK_IMPORTED_MODULE_1___default()(e.target).parents("li");
    jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.data("id")}`,
      type: "DELETE",
      success: response => {
        thisNote.slideUp();
        console.log("Note Deleted!");
        console.log(response);
      },
      error: response => {
        console.log("Error while deleting note!");
        console.log(response);
      }
    });
  }
  editNote(e) {
    const thisNote = jquery__WEBPACK_IMPORTED_MODULE_1___default()(e.target).parents("li");
    if (thisNote.data("state") == "editable") {
      this.makeNoteReadOnly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }
  makeNoteEditable(thisNote) {
    thisNote.find(".edit-note").html('<i class="bi bi-x" aria-hidden="true"></i>Cancel');
    thisNote.find(".note-title-field", ".note-body-field").removeAttr("readonly").addClass("note-active-field");
    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state", "editable");
  }
  makeNoteReadOnly(thisNote) {
    thisNote.find(".edit-note").html('<i class="bi bi-pencil" aria-hidden="true"></i>Edit');
    thisNote.find(".note-title-field", ".note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state", "cancel");
  }
  updateNote(e) {
    const thisNote = jquery__WEBPACK_IMPORTED_MODULE_1___default()(e.target).parents("li");
    const ourUpdatedPost = {
      title: thisNote.find(".note-title-field").val(),
      content: thisNote.find(".note-body-field").val()
    };
    jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.data("id")}`,
      type: "POST",
      data: ourUpdatedPost,
      success: response => {
        this.makeNoteReadOnly(thisNote);
        console.log(response);
      },
      error: response => {
        console.log("Error while deleting note!");
        console.log(response);
      }
    });
  }
  createNote(e) {
    const newNoteData = {
      title: jquery__WEBPACK_IMPORTED_MODULE_1___default()(".new-note-title").val(),
      content: jquery__WEBPACK_IMPORTED_MODULE_1___default()(".new-note-body").val(),
      status: "publish"
    };
    jquery__WEBPACK_IMPORTED_MODULE_1___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: `${universityData.root_url}/wp-json/wp/v2/note/`,
      type: "POST",
      data: newNoteData,
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(".new-note-title", ".new-note-body").val("");
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(`
        <li data-id="${response.id}">
                    <input readonly class="note-title-field" value="${response.title.raw}" />
                    <span class="edit-note"><i class="bi bi-pencil" aria-hidden="true"></i>Edit</span>
                    <span class="delete-note"><i class="bi bi-trash" aria-hidden="true"></i>Delete</span>
                    <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                    <span class="update-note btn btn-sm btn-primary"><i class="bi bi-arrow-right" aria-hidden="true"></i>Save</span>
        </li>
        `).prependTo("#my-notes").hide().slideDown();
        console.log(response);
      },
      error: response => {
        // if(response.responseText = ){

        // }
        console.log("Error while creating note!");
        console.log(response);
      }
    });
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Notes);

/***/ }),

/***/ "./src/modules/Search.js":
/*!*******************************!*\
  !*** ./src/modules/Search.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Search {
  //describe our object or initiate
  constructor() {
    this.addSearchHTML();
    this.openButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".js-search-trigger");
    this.closeButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay__close");
    this.searchOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".search-overlay");
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.resultsDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#search-overlay__results");
    this.isSpinnerVisible = false;
    this.previousValue;
  }

  // events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("keyup", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // methods
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
      this.typingTimer = setTimeout(this.getResults.bind(this), 750);
    }
    this.previousValue = this.searchField.val();
  }
  getResults() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().when(jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(`${universityData.root_url}/wp-json/university/v1/search?term=${this.searchField.val()}`)).then(result => {
      this.resultsDiv.html(`
          <div class="row">
            <div class="one-third">
              <h2 class="search-overlay__section-title">General Information</h2>
        
        
        ${result.generalInfo.length ? '<ul class="link-list min-list">' : "<p> No Search Results</p>"}
            ${result.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.type === "post" ? "by " + item.authorName : ""}</li>`).join("")}
        ${result.generalInfo.length ? "</u>" : ""}
        </ul>
            </div>


            <div class="one-third">
              <h2 class="search-overlay__section-title">Programs</h2>
              ${result.programs.length ? '<ul class="link-list min-list">' : `<p> No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
            ${result.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
        ${result.generalInfo.length ? "</u>" : ""}

              <h2 class="search-overlay__section-title">Professors</h2>
              ${result.professors.length ? '<ul class="professor-cards">' : "<p> No professor match the search result</p>"}
            ${result.professors.map(item => `<li class="professor-card__list-item">
                    <a class="professor-card" href="${item.permalink}">
                        <img src="${item.image}" class="professor-card__image">
                        <span class="professor-card__name">${item.title}</span>
                    </a>
                </li>
                  `).join("")}
        ${result.generalInfo.length ? "</u>" : ""}
            </div>

            <div class="one-third">
              <h2 class="search-overlay__section-title">Events</h2>
              ${result.events.length ? '<ul class="link-list min-list">' : `<p> No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
            ${result.events.map(item => `
                  <div class="event-summary">
    <a class="event-summary__date t-center" href="${item.permalink}">
        <span class="event-summary__month">${item.month}</span>
        <span class="event-summary__day">${item.day}</span>
    </a>
    <div class="event-summary__content">
        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
        <p>${item.content}<a href="${item.permalink}" class="nu gray">Read more</a></p>
    </div>
</div>
                  `).join("")}
        ${result.generalInfo.length ? "</u>" : ""}
            </div>
          </div>
      `);
      this.isSpinnerVisible = false;
    }, () => {
      this.resultsDiv.html("<p>Unexpected error! please try again!</p>");
    });
  }
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => {
      this.searchField.focus();
    }, 301);
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
  keyPressDispatcher(e) {
    if (e.keyCode === 83 && !this.isOverlayOpen && !jquery__WEBPACK_IMPORTED_MODULE_0___default()("input, textarea").is(":focus")) {
      this.openOverlay();
    } else if (e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }
  addSearchHTML() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
        <div class="container">
            <i class="bi bi-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="false">
            <i class="bi bi-x search-overlay__close" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container">
        <div id="search-overlay__results"></div>
      </div>
    </div>
`);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Search);

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/to-fast-properties/index.js":
/*!**************************************************!*\
  !*** ./node_modules/to-fast-properties/index.js ***!
  \**************************************************/
/***/ (function(module) {



let fastProto = null;

// Creates an object with permanently fast properties in V8. See Toon Verwaest's
// post https://medium.com/@tverwaes/setting-up-prototypes-in-v8-ec9c9491dfe2#5f62
// for more details. Use %HasFastProperties(object) and the Node.js flag
// --allow-natives-syntax to check whether an object has fast properties.
function FastObject(o) {
	// A prototype object will have "fast properties" enabled once it is checked
	// against the inline property cache of a function, e.g. fastProto.property:
	// https://github.com/v8/v8/blob/6.0.122/test/mjsunit/fast-prototype.js#L48-L63
	if (fastProto !== null && typeof fastProto.property) {
		const result = fastProto;
		fastProto = FastObject.prototype = null;
		return result;
	}
	fastProto = FastObject.prototype = o == null ? Object.create(null) : o;
	return new FastObject;
}

// Initialize the inline property cache of FastObject
FastObject();

module.exports = function toFastproperties(o) {
	return FastObject(o);
};


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["jQuery"];

/***/ }),

/***/ "./node_modules/@babel/helper-string-parser/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/helper-string-parser/lib/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.readCodePoint = readCodePoint;
exports.readInt = readInt;
exports.readStringContents = readStringContents;
var _isDigit = function isDigit(code) {
  return code >= 48 && code <= 57;
};
const forbiddenNumericSeparatorSiblings = {
  decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
  hex: new Set([46, 88, 95, 120])
};
const isAllowedNumericSeparatorSibling = {
  bin: ch => ch === 48 || ch === 49,
  oct: ch => ch >= 48 && ch <= 55,
  dec: ch => ch >= 48 && ch <= 57,
  hex: ch => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
};
function readStringContents(type, input, pos, lineStart, curLine, errors) {
  const initialPos = pos;
  const initialLineStart = lineStart;
  const initialCurLine = curLine;
  let out = "";
  let firstInvalidLoc = null;
  let chunkStart = pos;
  const {
    length
  } = input;
  for (;;) {
    if (pos >= length) {
      errors.unterminated(initialPos, initialLineStart, initialCurLine);
      out += input.slice(chunkStart, pos);
      break;
    }
    const ch = input.charCodeAt(pos);
    if (isStringEnd(type, ch, input, pos)) {
      out += input.slice(chunkStart, pos);
      break;
    }
    if (ch === 92) {
      out += input.slice(chunkStart, pos);
      const res = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors);
      if (res.ch === null && !firstInvalidLoc) {
        firstInvalidLoc = {
          pos,
          lineStart,
          curLine
        };
      } else {
        out += res.ch;
      }
      ({
        pos,
        lineStart,
        curLine
      } = res);
      chunkStart = pos;
    } else if (ch === 8232 || ch === 8233) {
      ++pos;
      ++curLine;
      lineStart = pos;
    } else if (ch === 10 || ch === 13) {
      if (type === "template") {
        out += input.slice(chunkStart, pos) + "\n";
        ++pos;
        if (ch === 13 && input.charCodeAt(pos) === 10) {
          ++pos;
        }
        ++curLine;
        chunkStart = lineStart = pos;
      } else {
        errors.unterminated(initialPos, initialLineStart, initialCurLine);
      }
    } else {
      ++pos;
    }
  }
  return {
    pos,
    str: out,
    firstInvalidLoc,
    lineStart,
    curLine,
    containsInvalid: !!firstInvalidLoc
  };
}
function isStringEnd(type, ch, input, pos) {
  if (type === "template") {
    return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
  }
  return ch === (type === "double" ? 34 : 39);
}
function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
  const throwOnInvalid = !inTemplate;
  pos++;
  const res = ch => ({
    pos,
    ch,
    lineStart,
    curLine
  });
  const ch = input.charCodeAt(pos++);
  switch (ch) {
    case 110:
      return res("\n");
    case 114:
      return res("\r");
    case 120:
      {
        let code;
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
        return res(code === null ? null : String.fromCharCode(code));
      }
    case 117:
      {
        let code;
        ({
          code,
          pos
        } = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
        return res(code === null ? null : String.fromCodePoint(code));
      }
    case 116:
      return res("\t");
    case 98:
      return res("\b");
    case 118:
      return res("\u000b");
    case 102:
      return res("\f");
    case 13:
      if (input.charCodeAt(pos) === 10) {
        ++pos;
      }
    case 10:
      lineStart = pos;
      ++curLine;
    case 8232:
    case 8233:
      return res("");
    case 56:
    case 57:
      if (inTemplate) {
        return res(null);
      } else {
        errors.strictNumericEscape(pos - 1, lineStart, curLine);
      }
    default:
      if (ch >= 48 && ch <= 55) {
        const startPos = pos - 1;
        const match = input.slice(startPos, pos + 2).match(/^[0-7]+/);
        let octalStr = match[0];
        let octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        pos += octalStr.length - 1;
        const next = input.charCodeAt(pos);
        if (octalStr !== "0" || next === 56 || next === 57) {
          if (inTemplate) {
            return res(null);
          } else {
            errors.strictNumericEscape(startPos, lineStart, curLine);
          }
        }
        return res(String.fromCharCode(octal));
      }
      return res(String.fromCharCode(ch));
  }
}
function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
  const initialPos = pos;
  let n;
  ({
    n,
    pos
  } = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors, !throwOnInvalid));
  if (n === null) {
    if (throwOnInvalid) {
      errors.invalidEscapeSequence(initialPos, lineStart, curLine);
    } else {
      pos = initialPos - 1;
    }
  }
  return {
    code: n,
    pos
  };
}
function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors, bailOnError) {
  const start = pos;
  const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
  const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
  let invalid = false;
  let total = 0;
  for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    const code = input.charCodeAt(pos);
    let val;
    if (code === 95 && allowNumSeparator !== "bail") {
      const prev = input.charCodeAt(pos - 1);
      const next = input.charCodeAt(pos + 1);
      if (!allowNumSeparator) {
        if (bailOnError) return {
          n: null,
          pos
        };
        errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
      } else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
        if (bailOnError) return {
          n: null,
          pos
        };
        errors.unexpectedNumericSeparator(pos, lineStart, curLine);
      }
      ++pos;
      continue;
    }
    if (code >= 97) {
      val = code - 97 + 10;
    } else if (code >= 65) {
      val = code - 65 + 10;
    } else if (_isDigit(code)) {
      val = code - 48;
    } else {
      val = Infinity;
    }
    if (val >= radix) {
      if (val <= 9 && bailOnError) {
        return {
          n: null,
          pos
        };
      } else if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
        val = 0;
      } else if (forceLen) {
        val = 0;
        invalid = true;
      } else {
        break;
      }
    }
    ++pos;
    total = total * radix + val;
  }
  if (pos === start || len != null && pos - start !== len || invalid) {
    return {
      n: null,
      pos
    };
  }
  return {
    n: total,
    pos
  };
}
function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
  const ch = input.charCodeAt(pos);
  let code;
  if (ch === 123) {
    ++pos;
    ({
      code,
      pos
    } = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
    ++pos;
    if (code !== null && code > 0x10ffff) {
      if (throwOnInvalid) {
        errors.invalidCodePoint(pos, lineStart, curLine);
      } else {
        return {
          code: null,
          pos
        };
      }
    }
  } else {
    ({
      code,
      pos
    } = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
  }
  return {
    code,
    pos
  };
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/helper-validator-identifier/lib/identifier.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-identifier/lib/identifier.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isIdentifierChar = isIdentifierChar;
exports.isIdentifierName = isIdentifierName;
exports.isIdentifierStart = isIdentifierStart;
let nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
let nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";
const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function isInAstralSet(code, set) {
  let pos = 0x10000;
  for (let i = 0, length = set.length; i < length; i += 2) {
    pos += set[i];
    if (pos > code) return false;
    pos += set[i + 1];
    if (pos >= code) return true;
  }
  return false;
}
function isIdentifierStart(code) {
  if (code < 65) return code === 36;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function isIdentifierName(name) {
  let isFirst = true;
  for (let i = 0; i < name.length; i++) {
    let cp = name.charCodeAt(i);
    if ((cp & 0xfc00) === 0xd800 && i + 1 < name.length) {
      const trail = name.charCodeAt(++i);
      if ((trail & 0xfc00) === 0xdc00) {
        cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff);
      }
    }
    if (isFirst) {
      isFirst = false;
      if (!isIdentifierStart(cp)) {
        return false;
      }
    } else if (!isIdentifierChar(cp)) {
      return false;
    }
  }
  return !isFirst;
}

//# sourceMappingURL=identifier.js.map


/***/ }),

/***/ "./node_modules/@babel/helper-validator-identifier/lib/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-identifier/lib/index.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "isIdentifierChar", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierChar;
  }
}));
Object.defineProperty(exports, "isIdentifierName", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierName;
  }
}));
Object.defineProperty(exports, "isIdentifierStart", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierStart;
  }
}));
Object.defineProperty(exports, "isKeyword", ({
  enumerable: true,
  get: function () {
    return _keyword.isKeyword;
  }
}));
Object.defineProperty(exports, "isReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictBindOnlyReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictBindOnlyReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictBindReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictBindReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictReservedWord;
  }
}));
var _identifier = __webpack_require__(/*! ./identifier.js */ "./node_modules/@babel/helper-validator-identifier/lib/identifier.js");
var _keyword = __webpack_require__(/*! ./keyword.js */ "./node_modules/@babel/helper-validator-identifier/lib/keyword.js");

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/helper-validator-identifier/lib/keyword.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-identifier/lib/keyword.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isKeyword = isKeyword;
exports.isReservedWord = isReservedWord;
exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
exports.isStrictBindReservedWord = isStrictBindReservedWord;
exports.isStrictReservedWord = isStrictReservedWord;
const reservedWords = {
  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
  strictBind: ["eval", "arguments"]
};
const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
function isReservedWord(word, inModule) {
  return inModule && word === "await" || word === "enum";
}
function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}
function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}
function isStrictBindReservedWord(word, inModule) {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}
function isKeyword(word) {
  return keywords.has(word);
}

//# sourceMappingURL=keyword.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/asserts/assertNode.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/types/lib/asserts/assertNode.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = assertNode;
var _isNode = __webpack_require__(/*! ../validators/isNode.js */ "./node_modules/@babel/types/lib/validators/isNode.js");
function assertNode(node) {
  if (!(0, _isNode.default)(node)) {
    var _node$type;
    const type = (_node$type = node == null ? void 0 : node.type) != null ? _node$type : JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}

//# sourceMappingURL=assertNode.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/asserts/generated/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/asserts/generated/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.assertAccessor = assertAccessor;
exports.assertAnyTypeAnnotation = assertAnyTypeAnnotation;
exports.assertArgumentPlaceholder = assertArgumentPlaceholder;
exports.assertArrayExpression = assertArrayExpression;
exports.assertArrayPattern = assertArrayPattern;
exports.assertArrayTypeAnnotation = assertArrayTypeAnnotation;
exports.assertArrowFunctionExpression = assertArrowFunctionExpression;
exports.assertAssignmentExpression = assertAssignmentExpression;
exports.assertAssignmentPattern = assertAssignmentPattern;
exports.assertAwaitExpression = assertAwaitExpression;
exports.assertBigIntLiteral = assertBigIntLiteral;
exports.assertBinary = assertBinary;
exports.assertBinaryExpression = assertBinaryExpression;
exports.assertBindExpression = assertBindExpression;
exports.assertBlock = assertBlock;
exports.assertBlockParent = assertBlockParent;
exports.assertBlockStatement = assertBlockStatement;
exports.assertBooleanLiteral = assertBooleanLiteral;
exports.assertBooleanLiteralTypeAnnotation = assertBooleanLiteralTypeAnnotation;
exports.assertBooleanTypeAnnotation = assertBooleanTypeAnnotation;
exports.assertBreakStatement = assertBreakStatement;
exports.assertCallExpression = assertCallExpression;
exports.assertCatchClause = assertCatchClause;
exports.assertClass = assertClass;
exports.assertClassAccessorProperty = assertClassAccessorProperty;
exports.assertClassBody = assertClassBody;
exports.assertClassDeclaration = assertClassDeclaration;
exports.assertClassExpression = assertClassExpression;
exports.assertClassImplements = assertClassImplements;
exports.assertClassMethod = assertClassMethod;
exports.assertClassPrivateMethod = assertClassPrivateMethod;
exports.assertClassPrivateProperty = assertClassPrivateProperty;
exports.assertClassProperty = assertClassProperty;
exports.assertCompletionStatement = assertCompletionStatement;
exports.assertConditional = assertConditional;
exports.assertConditionalExpression = assertConditionalExpression;
exports.assertContinueStatement = assertContinueStatement;
exports.assertDebuggerStatement = assertDebuggerStatement;
exports.assertDecimalLiteral = assertDecimalLiteral;
exports.assertDeclaration = assertDeclaration;
exports.assertDeclareClass = assertDeclareClass;
exports.assertDeclareExportAllDeclaration = assertDeclareExportAllDeclaration;
exports.assertDeclareExportDeclaration = assertDeclareExportDeclaration;
exports.assertDeclareFunction = assertDeclareFunction;
exports.assertDeclareInterface = assertDeclareInterface;
exports.assertDeclareModule = assertDeclareModule;
exports.assertDeclareModuleExports = assertDeclareModuleExports;
exports.assertDeclareOpaqueType = assertDeclareOpaqueType;
exports.assertDeclareTypeAlias = assertDeclareTypeAlias;
exports.assertDeclareVariable = assertDeclareVariable;
exports.assertDeclaredPredicate = assertDeclaredPredicate;
exports.assertDecorator = assertDecorator;
exports.assertDirective = assertDirective;
exports.assertDirectiveLiteral = assertDirectiveLiteral;
exports.assertDoExpression = assertDoExpression;
exports.assertDoWhileStatement = assertDoWhileStatement;
exports.assertEmptyStatement = assertEmptyStatement;
exports.assertEmptyTypeAnnotation = assertEmptyTypeAnnotation;
exports.assertEnumBody = assertEnumBody;
exports.assertEnumBooleanBody = assertEnumBooleanBody;
exports.assertEnumBooleanMember = assertEnumBooleanMember;
exports.assertEnumDeclaration = assertEnumDeclaration;
exports.assertEnumDefaultedMember = assertEnumDefaultedMember;
exports.assertEnumMember = assertEnumMember;
exports.assertEnumNumberBody = assertEnumNumberBody;
exports.assertEnumNumberMember = assertEnumNumberMember;
exports.assertEnumStringBody = assertEnumStringBody;
exports.assertEnumStringMember = assertEnumStringMember;
exports.assertEnumSymbolBody = assertEnumSymbolBody;
exports.assertExistsTypeAnnotation = assertExistsTypeAnnotation;
exports.assertExportAllDeclaration = assertExportAllDeclaration;
exports.assertExportDeclaration = assertExportDeclaration;
exports.assertExportDefaultDeclaration = assertExportDefaultDeclaration;
exports.assertExportDefaultSpecifier = assertExportDefaultSpecifier;
exports.assertExportNamedDeclaration = assertExportNamedDeclaration;
exports.assertExportNamespaceSpecifier = assertExportNamespaceSpecifier;
exports.assertExportSpecifier = assertExportSpecifier;
exports.assertExpression = assertExpression;
exports.assertExpressionStatement = assertExpressionStatement;
exports.assertExpressionWrapper = assertExpressionWrapper;
exports.assertFile = assertFile;
exports.assertFlow = assertFlow;
exports.assertFlowBaseAnnotation = assertFlowBaseAnnotation;
exports.assertFlowDeclaration = assertFlowDeclaration;
exports.assertFlowPredicate = assertFlowPredicate;
exports.assertFlowType = assertFlowType;
exports.assertFor = assertFor;
exports.assertForInStatement = assertForInStatement;
exports.assertForOfStatement = assertForOfStatement;
exports.assertForStatement = assertForStatement;
exports.assertForXStatement = assertForXStatement;
exports.assertFunction = assertFunction;
exports.assertFunctionDeclaration = assertFunctionDeclaration;
exports.assertFunctionExpression = assertFunctionExpression;
exports.assertFunctionParent = assertFunctionParent;
exports.assertFunctionTypeAnnotation = assertFunctionTypeAnnotation;
exports.assertFunctionTypeParam = assertFunctionTypeParam;
exports.assertGenericTypeAnnotation = assertGenericTypeAnnotation;
exports.assertIdentifier = assertIdentifier;
exports.assertIfStatement = assertIfStatement;
exports.assertImmutable = assertImmutable;
exports.assertImport = assertImport;
exports.assertImportAttribute = assertImportAttribute;
exports.assertImportDeclaration = assertImportDeclaration;
exports.assertImportDefaultSpecifier = assertImportDefaultSpecifier;
exports.assertImportNamespaceSpecifier = assertImportNamespaceSpecifier;
exports.assertImportOrExportDeclaration = assertImportOrExportDeclaration;
exports.assertImportSpecifier = assertImportSpecifier;
exports.assertIndexedAccessType = assertIndexedAccessType;
exports.assertInferredPredicate = assertInferredPredicate;
exports.assertInterfaceDeclaration = assertInterfaceDeclaration;
exports.assertInterfaceExtends = assertInterfaceExtends;
exports.assertInterfaceTypeAnnotation = assertInterfaceTypeAnnotation;
exports.assertInterpreterDirective = assertInterpreterDirective;
exports.assertIntersectionTypeAnnotation = assertIntersectionTypeAnnotation;
exports.assertJSX = assertJSX;
exports.assertJSXAttribute = assertJSXAttribute;
exports.assertJSXClosingElement = assertJSXClosingElement;
exports.assertJSXClosingFragment = assertJSXClosingFragment;
exports.assertJSXElement = assertJSXElement;
exports.assertJSXEmptyExpression = assertJSXEmptyExpression;
exports.assertJSXExpressionContainer = assertJSXExpressionContainer;
exports.assertJSXFragment = assertJSXFragment;
exports.assertJSXIdentifier = assertJSXIdentifier;
exports.assertJSXMemberExpression = assertJSXMemberExpression;
exports.assertJSXNamespacedName = assertJSXNamespacedName;
exports.assertJSXOpeningElement = assertJSXOpeningElement;
exports.assertJSXOpeningFragment = assertJSXOpeningFragment;
exports.assertJSXSpreadAttribute = assertJSXSpreadAttribute;
exports.assertJSXSpreadChild = assertJSXSpreadChild;
exports.assertJSXText = assertJSXText;
exports.assertLVal = assertLVal;
exports.assertLabeledStatement = assertLabeledStatement;
exports.assertLiteral = assertLiteral;
exports.assertLogicalExpression = assertLogicalExpression;
exports.assertLoop = assertLoop;
exports.assertMemberExpression = assertMemberExpression;
exports.assertMetaProperty = assertMetaProperty;
exports.assertMethod = assertMethod;
exports.assertMiscellaneous = assertMiscellaneous;
exports.assertMixedTypeAnnotation = assertMixedTypeAnnotation;
exports.assertModuleDeclaration = assertModuleDeclaration;
exports.assertModuleExpression = assertModuleExpression;
exports.assertModuleSpecifier = assertModuleSpecifier;
exports.assertNewExpression = assertNewExpression;
exports.assertNoop = assertNoop;
exports.assertNullLiteral = assertNullLiteral;
exports.assertNullLiteralTypeAnnotation = assertNullLiteralTypeAnnotation;
exports.assertNullableTypeAnnotation = assertNullableTypeAnnotation;
exports.assertNumberLiteral = assertNumberLiteral;
exports.assertNumberLiteralTypeAnnotation = assertNumberLiteralTypeAnnotation;
exports.assertNumberTypeAnnotation = assertNumberTypeAnnotation;
exports.assertNumericLiteral = assertNumericLiteral;
exports.assertObjectExpression = assertObjectExpression;
exports.assertObjectMember = assertObjectMember;
exports.assertObjectMethod = assertObjectMethod;
exports.assertObjectPattern = assertObjectPattern;
exports.assertObjectProperty = assertObjectProperty;
exports.assertObjectTypeAnnotation = assertObjectTypeAnnotation;
exports.assertObjectTypeCallProperty = assertObjectTypeCallProperty;
exports.assertObjectTypeIndexer = assertObjectTypeIndexer;
exports.assertObjectTypeInternalSlot = assertObjectTypeInternalSlot;
exports.assertObjectTypeProperty = assertObjectTypeProperty;
exports.assertObjectTypeSpreadProperty = assertObjectTypeSpreadProperty;
exports.assertOpaqueType = assertOpaqueType;
exports.assertOptionalCallExpression = assertOptionalCallExpression;
exports.assertOptionalIndexedAccessType = assertOptionalIndexedAccessType;
exports.assertOptionalMemberExpression = assertOptionalMemberExpression;
exports.assertParenthesizedExpression = assertParenthesizedExpression;
exports.assertPattern = assertPattern;
exports.assertPatternLike = assertPatternLike;
exports.assertPipelineBareFunction = assertPipelineBareFunction;
exports.assertPipelinePrimaryTopicReference = assertPipelinePrimaryTopicReference;
exports.assertPipelineTopicExpression = assertPipelineTopicExpression;
exports.assertPlaceholder = assertPlaceholder;
exports.assertPrivate = assertPrivate;
exports.assertPrivateName = assertPrivateName;
exports.assertProgram = assertProgram;
exports.assertProperty = assertProperty;
exports.assertPureish = assertPureish;
exports.assertQualifiedTypeIdentifier = assertQualifiedTypeIdentifier;
exports.assertRecordExpression = assertRecordExpression;
exports.assertRegExpLiteral = assertRegExpLiteral;
exports.assertRegexLiteral = assertRegexLiteral;
exports.assertRestElement = assertRestElement;
exports.assertRestProperty = assertRestProperty;
exports.assertReturnStatement = assertReturnStatement;
exports.assertScopable = assertScopable;
exports.assertSequenceExpression = assertSequenceExpression;
exports.assertSpreadElement = assertSpreadElement;
exports.assertSpreadProperty = assertSpreadProperty;
exports.assertStandardized = assertStandardized;
exports.assertStatement = assertStatement;
exports.assertStaticBlock = assertStaticBlock;
exports.assertStringLiteral = assertStringLiteral;
exports.assertStringLiteralTypeAnnotation = assertStringLiteralTypeAnnotation;
exports.assertStringTypeAnnotation = assertStringTypeAnnotation;
exports.assertSuper = assertSuper;
exports.assertSwitchCase = assertSwitchCase;
exports.assertSwitchStatement = assertSwitchStatement;
exports.assertSymbolTypeAnnotation = assertSymbolTypeAnnotation;
exports.assertTSAnyKeyword = assertTSAnyKeyword;
exports.assertTSArrayType = assertTSArrayType;
exports.assertTSAsExpression = assertTSAsExpression;
exports.assertTSBaseType = assertTSBaseType;
exports.assertTSBigIntKeyword = assertTSBigIntKeyword;
exports.assertTSBooleanKeyword = assertTSBooleanKeyword;
exports.assertTSCallSignatureDeclaration = assertTSCallSignatureDeclaration;
exports.assertTSConditionalType = assertTSConditionalType;
exports.assertTSConstructSignatureDeclaration = assertTSConstructSignatureDeclaration;
exports.assertTSConstructorType = assertTSConstructorType;
exports.assertTSDeclareFunction = assertTSDeclareFunction;
exports.assertTSDeclareMethod = assertTSDeclareMethod;
exports.assertTSEntityName = assertTSEntityName;
exports.assertTSEnumDeclaration = assertTSEnumDeclaration;
exports.assertTSEnumMember = assertTSEnumMember;
exports.assertTSExportAssignment = assertTSExportAssignment;
exports.assertTSExpressionWithTypeArguments = assertTSExpressionWithTypeArguments;
exports.assertTSExternalModuleReference = assertTSExternalModuleReference;
exports.assertTSFunctionType = assertTSFunctionType;
exports.assertTSImportEqualsDeclaration = assertTSImportEqualsDeclaration;
exports.assertTSImportType = assertTSImportType;
exports.assertTSIndexSignature = assertTSIndexSignature;
exports.assertTSIndexedAccessType = assertTSIndexedAccessType;
exports.assertTSInferType = assertTSInferType;
exports.assertTSInstantiationExpression = assertTSInstantiationExpression;
exports.assertTSInterfaceBody = assertTSInterfaceBody;
exports.assertTSInterfaceDeclaration = assertTSInterfaceDeclaration;
exports.assertTSIntersectionType = assertTSIntersectionType;
exports.assertTSIntrinsicKeyword = assertTSIntrinsicKeyword;
exports.assertTSLiteralType = assertTSLiteralType;
exports.assertTSMappedType = assertTSMappedType;
exports.assertTSMethodSignature = assertTSMethodSignature;
exports.assertTSModuleBlock = assertTSModuleBlock;
exports.assertTSModuleDeclaration = assertTSModuleDeclaration;
exports.assertTSNamedTupleMember = assertTSNamedTupleMember;
exports.assertTSNamespaceExportDeclaration = assertTSNamespaceExportDeclaration;
exports.assertTSNeverKeyword = assertTSNeverKeyword;
exports.assertTSNonNullExpression = assertTSNonNullExpression;
exports.assertTSNullKeyword = assertTSNullKeyword;
exports.assertTSNumberKeyword = assertTSNumberKeyword;
exports.assertTSObjectKeyword = assertTSObjectKeyword;
exports.assertTSOptionalType = assertTSOptionalType;
exports.assertTSParameterProperty = assertTSParameterProperty;
exports.assertTSParenthesizedType = assertTSParenthesizedType;
exports.assertTSPropertySignature = assertTSPropertySignature;
exports.assertTSQualifiedName = assertTSQualifiedName;
exports.assertTSRestType = assertTSRestType;
exports.assertTSSatisfiesExpression = assertTSSatisfiesExpression;
exports.assertTSStringKeyword = assertTSStringKeyword;
exports.assertTSSymbolKeyword = assertTSSymbolKeyword;
exports.assertTSThisType = assertTSThisType;
exports.assertTSTupleType = assertTSTupleType;
exports.assertTSType = assertTSType;
exports.assertTSTypeAliasDeclaration = assertTSTypeAliasDeclaration;
exports.assertTSTypeAnnotation = assertTSTypeAnnotation;
exports.assertTSTypeAssertion = assertTSTypeAssertion;
exports.assertTSTypeElement = assertTSTypeElement;
exports.assertTSTypeLiteral = assertTSTypeLiteral;
exports.assertTSTypeOperator = assertTSTypeOperator;
exports.assertTSTypeParameter = assertTSTypeParameter;
exports.assertTSTypeParameterDeclaration = assertTSTypeParameterDeclaration;
exports.assertTSTypeParameterInstantiation = assertTSTypeParameterInstantiation;
exports.assertTSTypePredicate = assertTSTypePredicate;
exports.assertTSTypeQuery = assertTSTypeQuery;
exports.assertTSTypeReference = assertTSTypeReference;
exports.assertTSUndefinedKeyword = assertTSUndefinedKeyword;
exports.assertTSUnionType = assertTSUnionType;
exports.assertTSUnknownKeyword = assertTSUnknownKeyword;
exports.assertTSVoidKeyword = assertTSVoidKeyword;
exports.assertTaggedTemplateExpression = assertTaggedTemplateExpression;
exports.assertTemplateElement = assertTemplateElement;
exports.assertTemplateLiteral = assertTemplateLiteral;
exports.assertTerminatorless = assertTerminatorless;
exports.assertThisExpression = assertThisExpression;
exports.assertThisTypeAnnotation = assertThisTypeAnnotation;
exports.assertThrowStatement = assertThrowStatement;
exports.assertTopicReference = assertTopicReference;
exports.assertTryStatement = assertTryStatement;
exports.assertTupleExpression = assertTupleExpression;
exports.assertTupleTypeAnnotation = assertTupleTypeAnnotation;
exports.assertTypeAlias = assertTypeAlias;
exports.assertTypeAnnotation = assertTypeAnnotation;
exports.assertTypeCastExpression = assertTypeCastExpression;
exports.assertTypeParameter = assertTypeParameter;
exports.assertTypeParameterDeclaration = assertTypeParameterDeclaration;
exports.assertTypeParameterInstantiation = assertTypeParameterInstantiation;
exports.assertTypeScript = assertTypeScript;
exports.assertTypeofTypeAnnotation = assertTypeofTypeAnnotation;
exports.assertUnaryExpression = assertUnaryExpression;
exports.assertUnaryLike = assertUnaryLike;
exports.assertUnionTypeAnnotation = assertUnionTypeAnnotation;
exports.assertUpdateExpression = assertUpdateExpression;
exports.assertUserWhitespacable = assertUserWhitespacable;
exports.assertV8IntrinsicIdentifier = assertV8IntrinsicIdentifier;
exports.assertVariableDeclaration = assertVariableDeclaration;
exports.assertVariableDeclarator = assertVariableDeclarator;
exports.assertVariance = assertVariance;
exports.assertVoidTypeAnnotation = assertVoidTypeAnnotation;
exports.assertWhile = assertWhile;
exports.assertWhileStatement = assertWhileStatement;
exports.assertWithStatement = assertWithStatement;
exports.assertYieldExpression = assertYieldExpression;
var _is = __webpack_require__(/*! ../../validators/is.js */ "./node_modules/@babel/types/lib/validators/is.js");
var _deprecationWarning = __webpack_require__(/*! ../../utils/deprecationWarning.js */ "./node_modules/@babel/types/lib/utils/deprecationWarning.js");
function assert(type, node, opts) {
  if (!(0, _is.default)(type, node, opts)) {
    throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, ` + `but instead got "${node.type}".`);
  }
}
function assertArrayExpression(node, opts) {
  assert("ArrayExpression", node, opts);
}
function assertAssignmentExpression(node, opts) {
  assert("AssignmentExpression", node, opts);
}
function assertBinaryExpression(node, opts) {
  assert("BinaryExpression", node, opts);
}
function assertInterpreterDirective(node, opts) {
  assert("InterpreterDirective", node, opts);
}
function assertDirective(node, opts) {
  assert("Directive", node, opts);
}
function assertDirectiveLiteral(node, opts) {
  assert("DirectiveLiteral", node, opts);
}
function assertBlockStatement(node, opts) {
  assert("BlockStatement", node, opts);
}
function assertBreakStatement(node, opts) {
  assert("BreakStatement", node, opts);
}
function assertCallExpression(node, opts) {
  assert("CallExpression", node, opts);
}
function assertCatchClause(node, opts) {
  assert("CatchClause", node, opts);
}
function assertConditionalExpression(node, opts) {
  assert("ConditionalExpression", node, opts);
}
function assertContinueStatement(node, opts) {
  assert("ContinueStatement", node, opts);
}
function assertDebuggerStatement(node, opts) {
  assert("DebuggerStatement", node, opts);
}
function assertDoWhileStatement(node, opts) {
  assert("DoWhileStatement", node, opts);
}
function assertEmptyStatement(node, opts) {
  assert("EmptyStatement", node, opts);
}
function assertExpressionStatement(node, opts) {
  assert("ExpressionStatement", node, opts);
}
function assertFile(node, opts) {
  assert("File", node, opts);
}
function assertForInStatement(node, opts) {
  assert("ForInStatement", node, opts);
}
function assertForStatement(node, opts) {
  assert("ForStatement", node, opts);
}
function assertFunctionDeclaration(node, opts) {
  assert("FunctionDeclaration", node, opts);
}
function assertFunctionExpression(node, opts) {
  assert("FunctionExpression", node, opts);
}
function assertIdentifier(node, opts) {
  assert("Identifier", node, opts);
}
function assertIfStatement(node, opts) {
  assert("IfStatement", node, opts);
}
function assertLabeledStatement(node, opts) {
  assert("LabeledStatement", node, opts);
}
function assertStringLiteral(node, opts) {
  assert("StringLiteral", node, opts);
}
function assertNumericLiteral(node, opts) {
  assert("NumericLiteral", node, opts);
}
function assertNullLiteral(node, opts) {
  assert("NullLiteral", node, opts);
}
function assertBooleanLiteral(node, opts) {
  assert("BooleanLiteral", node, opts);
}
function assertRegExpLiteral(node, opts) {
  assert("RegExpLiteral", node, opts);
}
function assertLogicalExpression(node, opts) {
  assert("LogicalExpression", node, opts);
}
function assertMemberExpression(node, opts) {
  assert("MemberExpression", node, opts);
}
function assertNewExpression(node, opts) {
  assert("NewExpression", node, opts);
}
function assertProgram(node, opts) {
  assert("Program", node, opts);
}
function assertObjectExpression(node, opts) {
  assert("ObjectExpression", node, opts);
}
function assertObjectMethod(node, opts) {
  assert("ObjectMethod", node, opts);
}
function assertObjectProperty(node, opts) {
  assert("ObjectProperty", node, opts);
}
function assertRestElement(node, opts) {
  assert("RestElement", node, opts);
}
function assertReturnStatement(node, opts) {
  assert("ReturnStatement", node, opts);
}
function assertSequenceExpression(node, opts) {
  assert("SequenceExpression", node, opts);
}
function assertParenthesizedExpression(node, opts) {
  assert("ParenthesizedExpression", node, opts);
}
function assertSwitchCase(node, opts) {
  assert("SwitchCase", node, opts);
}
function assertSwitchStatement(node, opts) {
  assert("SwitchStatement", node, opts);
}
function assertThisExpression(node, opts) {
  assert("ThisExpression", node, opts);
}
function assertThrowStatement(node, opts) {
  assert("ThrowStatement", node, opts);
}
function assertTryStatement(node, opts) {
  assert("TryStatement", node, opts);
}
function assertUnaryExpression(node, opts) {
  assert("UnaryExpression", node, opts);
}
function assertUpdateExpression(node, opts) {
  assert("UpdateExpression", node, opts);
}
function assertVariableDeclaration(node, opts) {
  assert("VariableDeclaration", node, opts);
}
function assertVariableDeclarator(node, opts) {
  assert("VariableDeclarator", node, opts);
}
function assertWhileStatement(node, opts) {
  assert("WhileStatement", node, opts);
}
function assertWithStatement(node, opts) {
  assert("WithStatement", node, opts);
}
function assertAssignmentPattern(node, opts) {
  assert("AssignmentPattern", node, opts);
}
function assertArrayPattern(node, opts) {
  assert("ArrayPattern", node, opts);
}
function assertArrowFunctionExpression(node, opts) {
  assert("ArrowFunctionExpression", node, opts);
}
function assertClassBody(node, opts) {
  assert("ClassBody", node, opts);
}
function assertClassExpression(node, opts) {
  assert("ClassExpression", node, opts);
}
function assertClassDeclaration(node, opts) {
  assert("ClassDeclaration", node, opts);
}
function assertExportAllDeclaration(node, opts) {
  assert("ExportAllDeclaration", node, opts);
}
function assertExportDefaultDeclaration(node, opts) {
  assert("ExportDefaultDeclaration", node, opts);
}
function assertExportNamedDeclaration(node, opts) {
  assert("ExportNamedDeclaration", node, opts);
}
function assertExportSpecifier(node, opts) {
  assert("ExportSpecifier", node, opts);
}
function assertForOfStatement(node, opts) {
  assert("ForOfStatement", node, opts);
}
function assertImportDeclaration(node, opts) {
  assert("ImportDeclaration", node, opts);
}
function assertImportDefaultSpecifier(node, opts) {
  assert("ImportDefaultSpecifier", node, opts);
}
function assertImportNamespaceSpecifier(node, opts) {
  assert("ImportNamespaceSpecifier", node, opts);
}
function assertImportSpecifier(node, opts) {
  assert("ImportSpecifier", node, opts);
}
function assertMetaProperty(node, opts) {
  assert("MetaProperty", node, opts);
}
function assertClassMethod(node, opts) {
  assert("ClassMethod", node, opts);
}
function assertObjectPattern(node, opts) {
  assert("ObjectPattern", node, opts);
}
function assertSpreadElement(node, opts) {
  assert("SpreadElement", node, opts);
}
function assertSuper(node, opts) {
  assert("Super", node, opts);
}
function assertTaggedTemplateExpression(node, opts) {
  assert("TaggedTemplateExpression", node, opts);
}
function assertTemplateElement(node, opts) {
  assert("TemplateElement", node, opts);
}
function assertTemplateLiteral(node, opts) {
  assert("TemplateLiteral", node, opts);
}
function assertYieldExpression(node, opts) {
  assert("YieldExpression", node, opts);
}
function assertAwaitExpression(node, opts) {
  assert("AwaitExpression", node, opts);
}
function assertImport(node, opts) {
  assert("Import", node, opts);
}
function assertBigIntLiteral(node, opts) {
  assert("BigIntLiteral", node, opts);
}
function assertExportNamespaceSpecifier(node, opts) {
  assert("ExportNamespaceSpecifier", node, opts);
}
function assertOptionalMemberExpression(node, opts) {
  assert("OptionalMemberExpression", node, opts);
}
function assertOptionalCallExpression(node, opts) {
  assert("OptionalCallExpression", node, opts);
}
function assertClassProperty(node, opts) {
  assert("ClassProperty", node, opts);
}
function assertClassAccessorProperty(node, opts) {
  assert("ClassAccessorProperty", node, opts);
}
function assertClassPrivateProperty(node, opts) {
  assert("ClassPrivateProperty", node, opts);
}
function assertClassPrivateMethod(node, opts) {
  assert("ClassPrivateMethod", node, opts);
}
function assertPrivateName(node, opts) {
  assert("PrivateName", node, opts);
}
function assertStaticBlock(node, opts) {
  assert("StaticBlock", node, opts);
}
function assertAnyTypeAnnotation(node, opts) {
  assert("AnyTypeAnnotation", node, opts);
}
function assertArrayTypeAnnotation(node, opts) {
  assert("ArrayTypeAnnotation", node, opts);
}
function assertBooleanTypeAnnotation(node, opts) {
  assert("BooleanTypeAnnotation", node, opts);
}
function assertBooleanLiteralTypeAnnotation(node, opts) {
  assert("BooleanLiteralTypeAnnotation", node, opts);
}
function assertNullLiteralTypeAnnotation(node, opts) {
  assert("NullLiteralTypeAnnotation", node, opts);
}
function assertClassImplements(node, opts) {
  assert("ClassImplements", node, opts);
}
function assertDeclareClass(node, opts) {
  assert("DeclareClass", node, opts);
}
function assertDeclareFunction(node, opts) {
  assert("DeclareFunction", node, opts);
}
function assertDeclareInterface(node, opts) {
  assert("DeclareInterface", node, opts);
}
function assertDeclareModule(node, opts) {
  assert("DeclareModule", node, opts);
}
function assertDeclareModuleExports(node, opts) {
  assert("DeclareModuleExports", node, opts);
}
function assertDeclareTypeAlias(node, opts) {
  assert("DeclareTypeAlias", node, opts);
}
function assertDeclareOpaqueType(node, opts) {
  assert("DeclareOpaqueType", node, opts);
}
function assertDeclareVariable(node, opts) {
  assert("DeclareVariable", node, opts);
}
function assertDeclareExportDeclaration(node, opts) {
  assert("DeclareExportDeclaration", node, opts);
}
function assertDeclareExportAllDeclaration(node, opts) {
  assert("DeclareExportAllDeclaration", node, opts);
}
function assertDeclaredPredicate(node, opts) {
  assert("DeclaredPredicate", node, opts);
}
function assertExistsTypeAnnotation(node, opts) {
  assert("ExistsTypeAnnotation", node, opts);
}
function assertFunctionTypeAnnotation(node, opts) {
  assert("FunctionTypeAnnotation", node, opts);
}
function assertFunctionTypeParam(node, opts) {
  assert("FunctionTypeParam", node, opts);
}
function assertGenericTypeAnnotation(node, opts) {
  assert("GenericTypeAnnotation", node, opts);
}
function assertInferredPredicate(node, opts) {
  assert("InferredPredicate", node, opts);
}
function assertInterfaceExtends(node, opts) {
  assert("InterfaceExtends", node, opts);
}
function assertInterfaceDeclaration(node, opts) {
  assert("InterfaceDeclaration", node, opts);
}
function assertInterfaceTypeAnnotation(node, opts) {
  assert("InterfaceTypeAnnotation", node, opts);
}
function assertIntersectionTypeAnnotation(node, opts) {
  assert("IntersectionTypeAnnotation", node, opts);
}
function assertMixedTypeAnnotation(node, opts) {
  assert("MixedTypeAnnotation", node, opts);
}
function assertEmptyTypeAnnotation(node, opts) {
  assert("EmptyTypeAnnotation", node, opts);
}
function assertNullableTypeAnnotation(node, opts) {
  assert("NullableTypeAnnotation", node, opts);
}
function assertNumberLiteralTypeAnnotation(node, opts) {
  assert("NumberLiteralTypeAnnotation", node, opts);
}
function assertNumberTypeAnnotation(node, opts) {
  assert("NumberTypeAnnotation", node, opts);
}
function assertObjectTypeAnnotation(node, opts) {
  assert("ObjectTypeAnnotation", node, opts);
}
function assertObjectTypeInternalSlot(node, opts) {
  assert("ObjectTypeInternalSlot", node, opts);
}
function assertObjectTypeCallProperty(node, opts) {
  assert("ObjectTypeCallProperty", node, opts);
}
function assertObjectTypeIndexer(node, opts) {
  assert("ObjectTypeIndexer", node, opts);
}
function assertObjectTypeProperty(node, opts) {
  assert("ObjectTypeProperty", node, opts);
}
function assertObjectTypeSpreadProperty(node, opts) {
  assert("ObjectTypeSpreadProperty", node, opts);
}
function assertOpaqueType(node, opts) {
  assert("OpaqueType", node, opts);
}
function assertQualifiedTypeIdentifier(node, opts) {
  assert("QualifiedTypeIdentifier", node, opts);
}
function assertStringLiteralTypeAnnotation(node, opts) {
  assert("StringLiteralTypeAnnotation", node, opts);
}
function assertStringTypeAnnotation(node, opts) {
  assert("StringTypeAnnotation", node, opts);
}
function assertSymbolTypeAnnotation(node, opts) {
  assert("SymbolTypeAnnotation", node, opts);
}
function assertThisTypeAnnotation(node, opts) {
  assert("ThisTypeAnnotation", node, opts);
}
function assertTupleTypeAnnotation(node, opts) {
  assert("TupleTypeAnnotation", node, opts);
}
function assertTypeofTypeAnnotation(node, opts) {
  assert("TypeofTypeAnnotation", node, opts);
}
function assertTypeAlias(node, opts) {
  assert("TypeAlias", node, opts);
}
function assertTypeAnnotation(node, opts) {
  assert("TypeAnnotation", node, opts);
}
function assertTypeCastExpression(node, opts) {
  assert("TypeCastExpression", node, opts);
}
function assertTypeParameter(node, opts) {
  assert("TypeParameter", node, opts);
}
function assertTypeParameterDeclaration(node, opts) {
  assert("TypeParameterDeclaration", node, opts);
}
function assertTypeParameterInstantiation(node, opts) {
  assert("TypeParameterInstantiation", node, opts);
}
function assertUnionTypeAnnotation(node, opts) {
  assert("UnionTypeAnnotation", node, opts);
}
function assertVariance(node, opts) {
  assert("Variance", node, opts);
}
function assertVoidTypeAnnotation(node, opts) {
  assert("VoidTypeAnnotation", node, opts);
}
function assertEnumDeclaration(node, opts) {
  assert("EnumDeclaration", node, opts);
}
function assertEnumBooleanBody(node, opts) {
  assert("EnumBooleanBody", node, opts);
}
function assertEnumNumberBody(node, opts) {
  assert("EnumNumberBody", node, opts);
}
function assertEnumStringBody(node, opts) {
  assert("EnumStringBody", node, opts);
}
function assertEnumSymbolBody(node, opts) {
  assert("EnumSymbolBody", node, opts);
}
function assertEnumBooleanMember(node, opts) {
  assert("EnumBooleanMember", node, opts);
}
function assertEnumNumberMember(node, opts) {
  assert("EnumNumberMember", node, opts);
}
function assertEnumStringMember(node, opts) {
  assert("EnumStringMember", node, opts);
}
function assertEnumDefaultedMember(node, opts) {
  assert("EnumDefaultedMember", node, opts);
}
function assertIndexedAccessType(node, opts) {
  assert("IndexedAccessType", node, opts);
}
function assertOptionalIndexedAccessType(node, opts) {
  assert("OptionalIndexedAccessType", node, opts);
}
function assertJSXAttribute(node, opts) {
  assert("JSXAttribute", node, opts);
}
function assertJSXClosingElement(node, opts) {
  assert("JSXClosingElement", node, opts);
}
function assertJSXElement(node, opts) {
  assert("JSXElement", node, opts);
}
function assertJSXEmptyExpression(node, opts) {
  assert("JSXEmptyExpression", node, opts);
}
function assertJSXExpressionContainer(node, opts) {
  assert("JSXExpressionContainer", node, opts);
}
function assertJSXSpreadChild(node, opts) {
  assert("JSXSpreadChild", node, opts);
}
function assertJSXIdentifier(node, opts) {
  assert("JSXIdentifier", node, opts);
}
function assertJSXMemberExpression(node, opts) {
  assert("JSXMemberExpression", node, opts);
}
function assertJSXNamespacedName(node, opts) {
  assert("JSXNamespacedName", node, opts);
}
function assertJSXOpeningElement(node, opts) {
  assert("JSXOpeningElement", node, opts);
}
function assertJSXSpreadAttribute(node, opts) {
  assert("JSXSpreadAttribute", node, opts);
}
function assertJSXText(node, opts) {
  assert("JSXText", node, opts);
}
function assertJSXFragment(node, opts) {
  assert("JSXFragment", node, opts);
}
function assertJSXOpeningFragment(node, opts) {
  assert("JSXOpeningFragment", node, opts);
}
function assertJSXClosingFragment(node, opts) {
  assert("JSXClosingFragment", node, opts);
}
function assertNoop(node, opts) {
  assert("Noop", node, opts);
}
function assertPlaceholder(node, opts) {
  assert("Placeholder", node, opts);
}
function assertV8IntrinsicIdentifier(node, opts) {
  assert("V8IntrinsicIdentifier", node, opts);
}
function assertArgumentPlaceholder(node, opts) {
  assert("ArgumentPlaceholder", node, opts);
}
function assertBindExpression(node, opts) {
  assert("BindExpression", node, opts);
}
function assertImportAttribute(node, opts) {
  assert("ImportAttribute", node, opts);
}
function assertDecorator(node, opts) {
  assert("Decorator", node, opts);
}
function assertDoExpression(node, opts) {
  assert("DoExpression", node, opts);
}
function assertExportDefaultSpecifier(node, opts) {
  assert("ExportDefaultSpecifier", node, opts);
}
function assertRecordExpression(node, opts) {
  assert("RecordExpression", node, opts);
}
function assertTupleExpression(node, opts) {
  assert("TupleExpression", node, opts);
}
function assertDecimalLiteral(node, opts) {
  assert("DecimalLiteral", node, opts);
}
function assertModuleExpression(node, opts) {
  assert("ModuleExpression", node, opts);
}
function assertTopicReference(node, opts) {
  assert("TopicReference", node, opts);
}
function assertPipelineTopicExpression(node, opts) {
  assert("PipelineTopicExpression", node, opts);
}
function assertPipelineBareFunction(node, opts) {
  assert("PipelineBareFunction", node, opts);
}
function assertPipelinePrimaryTopicReference(node, opts) {
  assert("PipelinePrimaryTopicReference", node, opts);
}
function assertTSParameterProperty(node, opts) {
  assert("TSParameterProperty", node, opts);
}
function assertTSDeclareFunction(node, opts) {
  assert("TSDeclareFunction", node, opts);
}
function assertTSDeclareMethod(node, opts) {
  assert("TSDeclareMethod", node, opts);
}
function assertTSQualifiedName(node, opts) {
  assert("TSQualifiedName", node, opts);
}
function assertTSCallSignatureDeclaration(node, opts) {
  assert("TSCallSignatureDeclaration", node, opts);
}
function assertTSConstructSignatureDeclaration(node, opts) {
  assert("TSConstructSignatureDeclaration", node, opts);
}
function assertTSPropertySignature(node, opts) {
  assert("TSPropertySignature", node, opts);
}
function assertTSMethodSignature(node, opts) {
  assert("TSMethodSignature", node, opts);
}
function assertTSIndexSignature(node, opts) {
  assert("TSIndexSignature", node, opts);
}
function assertTSAnyKeyword(node, opts) {
  assert("TSAnyKeyword", node, opts);
}
function assertTSBooleanKeyword(node, opts) {
  assert("TSBooleanKeyword", node, opts);
}
function assertTSBigIntKeyword(node, opts) {
  assert("TSBigIntKeyword", node, opts);
}
function assertTSIntrinsicKeyword(node, opts) {
  assert("TSIntrinsicKeyword", node, opts);
}
function assertTSNeverKeyword(node, opts) {
  assert("TSNeverKeyword", node, opts);
}
function assertTSNullKeyword(node, opts) {
  assert("TSNullKeyword", node, opts);
}
function assertTSNumberKeyword(node, opts) {
  assert("TSNumberKeyword", node, opts);
}
function assertTSObjectKeyword(node, opts) {
  assert("TSObjectKeyword", node, opts);
}
function assertTSStringKeyword(node, opts) {
  assert("TSStringKeyword", node, opts);
}
function assertTSSymbolKeyword(node, opts) {
  assert("TSSymbolKeyword", node, opts);
}
function assertTSUndefinedKeyword(node, opts) {
  assert("TSUndefinedKeyword", node, opts);
}
function assertTSUnknownKeyword(node, opts) {
  assert("TSUnknownKeyword", node, opts);
}
function assertTSVoidKeyword(node, opts) {
  assert("TSVoidKeyword", node, opts);
}
function assertTSThisType(node, opts) {
  assert("TSThisType", node, opts);
}
function assertTSFunctionType(node, opts) {
  assert("TSFunctionType", node, opts);
}
function assertTSConstructorType(node, opts) {
  assert("TSConstructorType", node, opts);
}
function assertTSTypeReference(node, opts) {
  assert("TSTypeReference", node, opts);
}
function assertTSTypePredicate(node, opts) {
  assert("TSTypePredicate", node, opts);
}
function assertTSTypeQuery(node, opts) {
  assert("TSTypeQuery", node, opts);
}
function assertTSTypeLiteral(node, opts) {
  assert("TSTypeLiteral", node, opts);
}
function assertTSArrayType(node, opts) {
  assert("TSArrayType", node, opts);
}
function assertTSTupleType(node, opts) {
  assert("TSTupleType", node, opts);
}
function assertTSOptionalType(node, opts) {
  assert("TSOptionalType", node, opts);
}
function assertTSRestType(node, opts) {
  assert("TSRestType", node, opts);
}
function assertTSNamedTupleMember(node, opts) {
  assert("TSNamedTupleMember", node, opts);
}
function assertTSUnionType(node, opts) {
  assert("TSUnionType", node, opts);
}
function assertTSIntersectionType(node, opts) {
  assert("TSIntersectionType", node, opts);
}
function assertTSConditionalType(node, opts) {
  assert("TSConditionalType", node, opts);
}
function assertTSInferType(node, opts) {
  assert("TSInferType", node, opts);
}
function assertTSParenthesizedType(node, opts) {
  assert("TSParenthesizedType", node, opts);
}
function assertTSTypeOperator(node, opts) {
  assert("TSTypeOperator", node, opts);
}
function assertTSIndexedAccessType(node, opts) {
  assert("TSIndexedAccessType", node, opts);
}
function assertTSMappedType(node, opts) {
  assert("TSMappedType", node, opts);
}
function assertTSLiteralType(node, opts) {
  assert("TSLiteralType", node, opts);
}
function assertTSExpressionWithTypeArguments(node, opts) {
  assert("TSExpressionWithTypeArguments", node, opts);
}
function assertTSInterfaceDeclaration(node, opts) {
  assert("TSInterfaceDeclaration", node, opts);
}
function assertTSInterfaceBody(node, opts) {
  assert("TSInterfaceBody", node, opts);
}
function assertTSTypeAliasDeclaration(node, opts) {
  assert("TSTypeAliasDeclaration", node, opts);
}
function assertTSInstantiationExpression(node, opts) {
  assert("TSInstantiationExpression", node, opts);
}
function assertTSAsExpression(node, opts) {
  assert("TSAsExpression", node, opts);
}
function assertTSSatisfiesExpression(node, opts) {
  assert("TSSatisfiesExpression", node, opts);
}
function assertTSTypeAssertion(node, opts) {
  assert("TSTypeAssertion", node, opts);
}
function assertTSEnumDeclaration(node, opts) {
  assert("TSEnumDeclaration", node, opts);
}
function assertTSEnumMember(node, opts) {
  assert("TSEnumMember", node, opts);
}
function assertTSModuleDeclaration(node, opts) {
  assert("TSModuleDeclaration", node, opts);
}
function assertTSModuleBlock(node, opts) {
  assert("TSModuleBlock", node, opts);
}
function assertTSImportType(node, opts) {
  assert("TSImportType", node, opts);
}
function assertTSImportEqualsDeclaration(node, opts) {
  assert("TSImportEqualsDeclaration", node, opts);
}
function assertTSExternalModuleReference(node, opts) {
  assert("TSExternalModuleReference", node, opts);
}
function assertTSNonNullExpression(node, opts) {
  assert("TSNonNullExpression", node, opts);
}
function assertTSExportAssignment(node, opts) {
  assert("TSExportAssignment", node, opts);
}
function assertTSNamespaceExportDeclaration(node, opts) {
  assert("TSNamespaceExportDeclaration", node, opts);
}
function assertTSTypeAnnotation(node, opts) {
  assert("TSTypeAnnotation", node, opts);
}
function assertTSTypeParameterInstantiation(node, opts) {
  assert("TSTypeParameterInstantiation", node, opts);
}
function assertTSTypeParameterDeclaration(node, opts) {
  assert("TSTypeParameterDeclaration", node, opts);
}
function assertTSTypeParameter(node, opts) {
  assert("TSTypeParameter", node, opts);
}
function assertStandardized(node, opts) {
  assert("Standardized", node, opts);
}
function assertExpression(node, opts) {
  assert("Expression", node, opts);
}
function assertBinary(node, opts) {
  assert("Binary", node, opts);
}
function assertScopable(node, opts) {
  assert("Scopable", node, opts);
}
function assertBlockParent(node, opts) {
  assert("BlockParent", node, opts);
}
function assertBlock(node, opts) {
  assert("Block", node, opts);
}
function assertStatement(node, opts) {
  assert("Statement", node, opts);
}
function assertTerminatorless(node, opts) {
  assert("Terminatorless", node, opts);
}
function assertCompletionStatement(node, opts) {
  assert("CompletionStatement", node, opts);
}
function assertConditional(node, opts) {
  assert("Conditional", node, opts);
}
function assertLoop(node, opts) {
  assert("Loop", node, opts);
}
function assertWhile(node, opts) {
  assert("While", node, opts);
}
function assertExpressionWrapper(node, opts) {
  assert("ExpressionWrapper", node, opts);
}
function assertFor(node, opts) {
  assert("For", node, opts);
}
function assertForXStatement(node, opts) {
  assert("ForXStatement", node, opts);
}
function assertFunction(node, opts) {
  assert("Function", node, opts);
}
function assertFunctionParent(node, opts) {
  assert("FunctionParent", node, opts);
}
function assertPureish(node, opts) {
  assert("Pureish", node, opts);
}
function assertDeclaration(node, opts) {
  assert("Declaration", node, opts);
}
function assertPatternLike(node, opts) {
  assert("PatternLike", node, opts);
}
function assertLVal(node, opts) {
  assert("LVal", node, opts);
}
function assertTSEntityName(node, opts) {
  assert("TSEntityName", node, opts);
}
function assertLiteral(node, opts) {
  assert("Literal", node, opts);
}
function assertImmutable(node, opts) {
  assert("Immutable", node, opts);
}
function assertUserWhitespacable(node, opts) {
  assert("UserWhitespacable", node, opts);
}
function assertMethod(node, opts) {
  assert("Method", node, opts);
}
function assertObjectMember(node, opts) {
  assert("ObjectMember", node, opts);
}
function assertProperty(node, opts) {
  assert("Property", node, opts);
}
function assertUnaryLike(node, opts) {
  assert("UnaryLike", node, opts);
}
function assertPattern(node, opts) {
  assert("Pattern", node, opts);
}
function assertClass(node, opts) {
  assert("Class", node, opts);
}
function assertImportOrExportDeclaration(node, opts) {
  assert("ImportOrExportDeclaration", node, opts);
}
function assertExportDeclaration(node, opts) {
  assert("ExportDeclaration", node, opts);
}
function assertModuleSpecifier(node, opts) {
  assert("ModuleSpecifier", node, opts);
}
function assertAccessor(node, opts) {
  assert("Accessor", node, opts);
}
function assertPrivate(node, opts) {
  assert("Private", node, opts);
}
function assertFlow(node, opts) {
  assert("Flow", node, opts);
}
function assertFlowType(node, opts) {
  assert("FlowType", node, opts);
}
function assertFlowBaseAnnotation(node, opts) {
  assert("FlowBaseAnnotation", node, opts);
}
function assertFlowDeclaration(node, opts) {
  assert("FlowDeclaration", node, opts);
}
function assertFlowPredicate(node, opts) {
  assert("FlowPredicate", node, opts);
}
function assertEnumBody(node, opts) {
  assert("EnumBody", node, opts);
}
function assertEnumMember(node, opts) {
  assert("EnumMember", node, opts);
}
function assertJSX(node, opts) {
  assert("JSX", node, opts);
}
function assertMiscellaneous(node, opts) {
  assert("Miscellaneous", node, opts);
}
function assertTypeScript(node, opts) {
  assert("TypeScript", node, opts);
}
function assertTSTypeElement(node, opts) {
  assert("TSTypeElement", node, opts);
}
function assertTSType(node, opts) {
  assert("TSType", node, opts);
}
function assertTSBaseType(node, opts) {
  assert("TSBaseType", node, opts);
}
function assertNumberLiteral(node, opts) {
  (0, _deprecationWarning.default)("assertNumberLiteral", "assertNumericLiteral");
  assert("NumberLiteral", node, opts);
}
function assertRegexLiteral(node, opts) {
  (0, _deprecationWarning.default)("assertRegexLiteral", "assertRegExpLiteral");
  assert("RegexLiteral", node, opts);
}
function assertRestProperty(node, opts) {
  (0, _deprecationWarning.default)("assertRestProperty", "assertRestElement");
  assert("RestProperty", node, opts);
}
function assertSpreadProperty(node, opts) {
  (0, _deprecationWarning.default)("assertSpreadProperty", "assertSpreadElement");
  assert("SpreadProperty", node, opts);
}
function assertModuleDeclaration(node, opts) {
  (0, _deprecationWarning.default)("assertModuleDeclaration", "assertImportOrExportDeclaration");
  assert("ModuleDeclaration", node, opts);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createFlowUnionType;
var _index = __webpack_require__(/*! ../generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _removeTypeDuplicates = __webpack_require__(/*! ../../modifications/flow/removeTypeDuplicates.js */ "./node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js");
function createFlowUnionType(types) {
  const flattened = (0, _removeTypeDuplicates.default)(types);
  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _index.unionTypeAnnotation)(flattened);
  }
}

//# sourceMappingURL=createFlowUnionType.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _index = __webpack_require__(/*! ../generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _default = createTypeAnnotationBasedOnTypeof;
exports["default"] = _default;
function createTypeAnnotationBasedOnTypeof(type) {
  switch (type) {
    case "string":
      return (0, _index.stringTypeAnnotation)();
    case "number":
      return (0, _index.numberTypeAnnotation)();
    case "undefined":
      return (0, _index.voidTypeAnnotation)();
    case "boolean":
      return (0, _index.booleanTypeAnnotation)();
    case "function":
      return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Function"));
    case "object":
      return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Object"));
    case "symbol":
      return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Symbol"));
    case "bigint":
      return (0, _index.anyTypeAnnotation)();
  }
  throw new Error("Invalid typeof value: " + type);
}

//# sourceMappingURL=createTypeAnnotationBasedOnTypeof.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/generated/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/generated/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.anyTypeAnnotation = anyTypeAnnotation;
exports.argumentPlaceholder = argumentPlaceholder;
exports.arrayExpression = arrayExpression;
exports.arrayPattern = arrayPattern;
exports.arrayTypeAnnotation = arrayTypeAnnotation;
exports.arrowFunctionExpression = arrowFunctionExpression;
exports.assignmentExpression = assignmentExpression;
exports.assignmentPattern = assignmentPattern;
exports.awaitExpression = awaitExpression;
exports.bigIntLiteral = bigIntLiteral;
exports.binaryExpression = binaryExpression;
exports.bindExpression = bindExpression;
exports.blockStatement = blockStatement;
exports.booleanLiteral = booleanLiteral;
exports.booleanLiteralTypeAnnotation = booleanLiteralTypeAnnotation;
exports.booleanTypeAnnotation = booleanTypeAnnotation;
exports.breakStatement = breakStatement;
exports.callExpression = callExpression;
exports.catchClause = catchClause;
exports.classAccessorProperty = classAccessorProperty;
exports.classBody = classBody;
exports.classDeclaration = classDeclaration;
exports.classExpression = classExpression;
exports.classImplements = classImplements;
exports.classMethod = classMethod;
exports.classPrivateMethod = classPrivateMethod;
exports.classPrivateProperty = classPrivateProperty;
exports.classProperty = classProperty;
exports.conditionalExpression = conditionalExpression;
exports.continueStatement = continueStatement;
exports.debuggerStatement = debuggerStatement;
exports.decimalLiteral = decimalLiteral;
exports.declareClass = declareClass;
exports.declareExportAllDeclaration = declareExportAllDeclaration;
exports.declareExportDeclaration = declareExportDeclaration;
exports.declareFunction = declareFunction;
exports.declareInterface = declareInterface;
exports.declareModule = declareModule;
exports.declareModuleExports = declareModuleExports;
exports.declareOpaqueType = declareOpaqueType;
exports.declareTypeAlias = declareTypeAlias;
exports.declareVariable = declareVariable;
exports.declaredPredicate = declaredPredicate;
exports.decorator = decorator;
exports.directive = directive;
exports.directiveLiteral = directiveLiteral;
exports.doExpression = doExpression;
exports.doWhileStatement = doWhileStatement;
exports.emptyStatement = emptyStatement;
exports.emptyTypeAnnotation = emptyTypeAnnotation;
exports.enumBooleanBody = enumBooleanBody;
exports.enumBooleanMember = enumBooleanMember;
exports.enumDeclaration = enumDeclaration;
exports.enumDefaultedMember = enumDefaultedMember;
exports.enumNumberBody = enumNumberBody;
exports.enumNumberMember = enumNumberMember;
exports.enumStringBody = enumStringBody;
exports.enumStringMember = enumStringMember;
exports.enumSymbolBody = enumSymbolBody;
exports.existsTypeAnnotation = existsTypeAnnotation;
exports.exportAllDeclaration = exportAllDeclaration;
exports.exportDefaultDeclaration = exportDefaultDeclaration;
exports.exportDefaultSpecifier = exportDefaultSpecifier;
exports.exportNamedDeclaration = exportNamedDeclaration;
exports.exportNamespaceSpecifier = exportNamespaceSpecifier;
exports.exportSpecifier = exportSpecifier;
exports.expressionStatement = expressionStatement;
exports.file = file;
exports.forInStatement = forInStatement;
exports.forOfStatement = forOfStatement;
exports.forStatement = forStatement;
exports.functionDeclaration = functionDeclaration;
exports.functionExpression = functionExpression;
exports.functionTypeAnnotation = functionTypeAnnotation;
exports.functionTypeParam = functionTypeParam;
exports.genericTypeAnnotation = genericTypeAnnotation;
exports.identifier = identifier;
exports.ifStatement = ifStatement;
exports["import"] = _import;
exports.importAttribute = importAttribute;
exports.importDeclaration = importDeclaration;
exports.importDefaultSpecifier = importDefaultSpecifier;
exports.importNamespaceSpecifier = importNamespaceSpecifier;
exports.importSpecifier = importSpecifier;
exports.indexedAccessType = indexedAccessType;
exports.inferredPredicate = inferredPredicate;
exports.interfaceDeclaration = interfaceDeclaration;
exports.interfaceExtends = interfaceExtends;
exports.interfaceTypeAnnotation = interfaceTypeAnnotation;
exports.interpreterDirective = interpreterDirective;
exports.intersectionTypeAnnotation = intersectionTypeAnnotation;
exports.jSXAttribute = exports.jsxAttribute = jsxAttribute;
exports.jSXClosingElement = exports.jsxClosingElement = jsxClosingElement;
exports.jSXClosingFragment = exports.jsxClosingFragment = jsxClosingFragment;
exports.jSXElement = exports.jsxElement = jsxElement;
exports.jSXEmptyExpression = exports.jsxEmptyExpression = jsxEmptyExpression;
exports.jSXExpressionContainer = exports.jsxExpressionContainer = jsxExpressionContainer;
exports.jSXFragment = exports.jsxFragment = jsxFragment;
exports.jSXIdentifier = exports.jsxIdentifier = jsxIdentifier;
exports.jSXMemberExpression = exports.jsxMemberExpression = jsxMemberExpression;
exports.jSXNamespacedName = exports.jsxNamespacedName = jsxNamespacedName;
exports.jSXOpeningElement = exports.jsxOpeningElement = jsxOpeningElement;
exports.jSXOpeningFragment = exports.jsxOpeningFragment = jsxOpeningFragment;
exports.jSXSpreadAttribute = exports.jsxSpreadAttribute = jsxSpreadAttribute;
exports.jSXSpreadChild = exports.jsxSpreadChild = jsxSpreadChild;
exports.jSXText = exports.jsxText = jsxText;
exports.labeledStatement = labeledStatement;
exports.logicalExpression = logicalExpression;
exports.memberExpression = memberExpression;
exports.metaProperty = metaProperty;
exports.mixedTypeAnnotation = mixedTypeAnnotation;
exports.moduleExpression = moduleExpression;
exports.newExpression = newExpression;
exports.noop = noop;
exports.nullLiteral = nullLiteral;
exports.nullLiteralTypeAnnotation = nullLiteralTypeAnnotation;
exports.nullableTypeAnnotation = nullableTypeAnnotation;
exports.numberLiteral = NumberLiteral;
exports.numberLiteralTypeAnnotation = numberLiteralTypeAnnotation;
exports.numberTypeAnnotation = numberTypeAnnotation;
exports.numericLiteral = numericLiteral;
exports.objectExpression = objectExpression;
exports.objectMethod = objectMethod;
exports.objectPattern = objectPattern;
exports.objectProperty = objectProperty;
exports.objectTypeAnnotation = objectTypeAnnotation;
exports.objectTypeCallProperty = objectTypeCallProperty;
exports.objectTypeIndexer = objectTypeIndexer;
exports.objectTypeInternalSlot = objectTypeInternalSlot;
exports.objectTypeProperty = objectTypeProperty;
exports.objectTypeSpreadProperty = objectTypeSpreadProperty;
exports.opaqueType = opaqueType;
exports.optionalCallExpression = optionalCallExpression;
exports.optionalIndexedAccessType = optionalIndexedAccessType;
exports.optionalMemberExpression = optionalMemberExpression;
exports.parenthesizedExpression = parenthesizedExpression;
exports.pipelineBareFunction = pipelineBareFunction;
exports.pipelinePrimaryTopicReference = pipelinePrimaryTopicReference;
exports.pipelineTopicExpression = pipelineTopicExpression;
exports.placeholder = placeholder;
exports.privateName = privateName;
exports.program = program;
exports.qualifiedTypeIdentifier = qualifiedTypeIdentifier;
exports.recordExpression = recordExpression;
exports.regExpLiteral = regExpLiteral;
exports.regexLiteral = RegexLiteral;
exports.restElement = restElement;
exports.restProperty = RestProperty;
exports.returnStatement = returnStatement;
exports.sequenceExpression = sequenceExpression;
exports.spreadElement = spreadElement;
exports.spreadProperty = SpreadProperty;
exports.staticBlock = staticBlock;
exports.stringLiteral = stringLiteral;
exports.stringLiteralTypeAnnotation = stringLiteralTypeAnnotation;
exports.stringTypeAnnotation = stringTypeAnnotation;
exports["super"] = _super;
exports.switchCase = switchCase;
exports.switchStatement = switchStatement;
exports.symbolTypeAnnotation = symbolTypeAnnotation;
exports.taggedTemplateExpression = taggedTemplateExpression;
exports.templateElement = templateElement;
exports.templateLiteral = templateLiteral;
exports.thisExpression = thisExpression;
exports.thisTypeAnnotation = thisTypeAnnotation;
exports.throwStatement = throwStatement;
exports.topicReference = topicReference;
exports.tryStatement = tryStatement;
exports.tSAnyKeyword = exports.tsAnyKeyword = tsAnyKeyword;
exports.tSArrayType = exports.tsArrayType = tsArrayType;
exports.tSAsExpression = exports.tsAsExpression = tsAsExpression;
exports.tSBigIntKeyword = exports.tsBigIntKeyword = tsBigIntKeyword;
exports.tSBooleanKeyword = exports.tsBooleanKeyword = tsBooleanKeyword;
exports.tSCallSignatureDeclaration = exports.tsCallSignatureDeclaration = tsCallSignatureDeclaration;
exports.tSConditionalType = exports.tsConditionalType = tsConditionalType;
exports.tSConstructSignatureDeclaration = exports.tsConstructSignatureDeclaration = tsConstructSignatureDeclaration;
exports.tSConstructorType = exports.tsConstructorType = tsConstructorType;
exports.tSDeclareFunction = exports.tsDeclareFunction = tsDeclareFunction;
exports.tSDeclareMethod = exports.tsDeclareMethod = tsDeclareMethod;
exports.tSEnumDeclaration = exports.tsEnumDeclaration = tsEnumDeclaration;
exports.tSEnumMember = exports.tsEnumMember = tsEnumMember;
exports.tSExportAssignment = exports.tsExportAssignment = tsExportAssignment;
exports.tSExpressionWithTypeArguments = exports.tsExpressionWithTypeArguments = tsExpressionWithTypeArguments;
exports.tSExternalModuleReference = exports.tsExternalModuleReference = tsExternalModuleReference;
exports.tSFunctionType = exports.tsFunctionType = tsFunctionType;
exports.tSImportEqualsDeclaration = exports.tsImportEqualsDeclaration = tsImportEqualsDeclaration;
exports.tSImportType = exports.tsImportType = tsImportType;
exports.tSIndexSignature = exports.tsIndexSignature = tsIndexSignature;
exports.tSIndexedAccessType = exports.tsIndexedAccessType = tsIndexedAccessType;
exports.tSInferType = exports.tsInferType = tsInferType;
exports.tSInstantiationExpression = exports.tsInstantiationExpression = tsInstantiationExpression;
exports.tSInterfaceBody = exports.tsInterfaceBody = tsInterfaceBody;
exports.tSInterfaceDeclaration = exports.tsInterfaceDeclaration = tsInterfaceDeclaration;
exports.tSIntersectionType = exports.tsIntersectionType = tsIntersectionType;
exports.tSIntrinsicKeyword = exports.tsIntrinsicKeyword = tsIntrinsicKeyword;
exports.tSLiteralType = exports.tsLiteralType = tsLiteralType;
exports.tSMappedType = exports.tsMappedType = tsMappedType;
exports.tSMethodSignature = exports.tsMethodSignature = tsMethodSignature;
exports.tSModuleBlock = exports.tsModuleBlock = tsModuleBlock;
exports.tSModuleDeclaration = exports.tsModuleDeclaration = tsModuleDeclaration;
exports.tSNamedTupleMember = exports.tsNamedTupleMember = tsNamedTupleMember;
exports.tSNamespaceExportDeclaration = exports.tsNamespaceExportDeclaration = tsNamespaceExportDeclaration;
exports.tSNeverKeyword = exports.tsNeverKeyword = tsNeverKeyword;
exports.tSNonNullExpression = exports.tsNonNullExpression = tsNonNullExpression;
exports.tSNullKeyword = exports.tsNullKeyword = tsNullKeyword;
exports.tSNumberKeyword = exports.tsNumberKeyword = tsNumberKeyword;
exports.tSObjectKeyword = exports.tsObjectKeyword = tsObjectKeyword;
exports.tSOptionalType = exports.tsOptionalType = tsOptionalType;
exports.tSParameterProperty = exports.tsParameterProperty = tsParameterProperty;
exports.tSParenthesizedType = exports.tsParenthesizedType = tsParenthesizedType;
exports.tSPropertySignature = exports.tsPropertySignature = tsPropertySignature;
exports.tSQualifiedName = exports.tsQualifiedName = tsQualifiedName;
exports.tSRestType = exports.tsRestType = tsRestType;
exports.tSSatisfiesExpression = exports.tsSatisfiesExpression = tsSatisfiesExpression;
exports.tSStringKeyword = exports.tsStringKeyword = tsStringKeyword;
exports.tSSymbolKeyword = exports.tsSymbolKeyword = tsSymbolKeyword;
exports.tSThisType = exports.tsThisType = tsThisType;
exports.tSTupleType = exports.tsTupleType = tsTupleType;
exports.tSTypeAliasDeclaration = exports.tsTypeAliasDeclaration = tsTypeAliasDeclaration;
exports.tSTypeAnnotation = exports.tsTypeAnnotation = tsTypeAnnotation;
exports.tSTypeAssertion = exports.tsTypeAssertion = tsTypeAssertion;
exports.tSTypeLiteral = exports.tsTypeLiteral = tsTypeLiteral;
exports.tSTypeOperator = exports.tsTypeOperator = tsTypeOperator;
exports.tSTypeParameter = exports.tsTypeParameter = tsTypeParameter;
exports.tSTypeParameterDeclaration = exports.tsTypeParameterDeclaration = tsTypeParameterDeclaration;
exports.tSTypeParameterInstantiation = exports.tsTypeParameterInstantiation = tsTypeParameterInstantiation;
exports.tSTypePredicate = exports.tsTypePredicate = tsTypePredicate;
exports.tSTypeQuery = exports.tsTypeQuery = tsTypeQuery;
exports.tSTypeReference = exports.tsTypeReference = tsTypeReference;
exports.tSUndefinedKeyword = exports.tsUndefinedKeyword = tsUndefinedKeyword;
exports.tSUnionType = exports.tsUnionType = tsUnionType;
exports.tSUnknownKeyword = exports.tsUnknownKeyword = tsUnknownKeyword;
exports.tSVoidKeyword = exports.tsVoidKeyword = tsVoidKeyword;
exports.tupleExpression = tupleExpression;
exports.tupleTypeAnnotation = tupleTypeAnnotation;
exports.typeAlias = typeAlias;
exports.typeAnnotation = typeAnnotation;
exports.typeCastExpression = typeCastExpression;
exports.typeParameter = typeParameter;
exports.typeParameterDeclaration = typeParameterDeclaration;
exports.typeParameterInstantiation = typeParameterInstantiation;
exports.typeofTypeAnnotation = typeofTypeAnnotation;
exports.unaryExpression = unaryExpression;
exports.unionTypeAnnotation = unionTypeAnnotation;
exports.updateExpression = updateExpression;
exports.v8IntrinsicIdentifier = v8IntrinsicIdentifier;
exports.variableDeclaration = variableDeclaration;
exports.variableDeclarator = variableDeclarator;
exports.variance = variance;
exports.voidTypeAnnotation = voidTypeAnnotation;
exports.whileStatement = whileStatement;
exports.withStatement = withStatement;
exports.yieldExpression = yieldExpression;
var _validateNode = __webpack_require__(/*! ../validateNode.js */ "./node_modules/@babel/types/lib/builders/validateNode.js");
var _deprecationWarning = __webpack_require__(/*! ../../utils/deprecationWarning.js */ "./node_modules/@babel/types/lib/utils/deprecationWarning.js");
function arrayExpression(elements = []) {
  return (0, _validateNode.default)({
    type: "ArrayExpression",
    elements
  });
}
function assignmentExpression(operator, left, right) {
  return (0, _validateNode.default)({
    type: "AssignmentExpression",
    operator,
    left,
    right
  });
}
function binaryExpression(operator, left, right) {
  return (0, _validateNode.default)({
    type: "BinaryExpression",
    operator,
    left,
    right
  });
}
function interpreterDirective(value) {
  return (0, _validateNode.default)({
    type: "InterpreterDirective",
    value
  });
}
function directive(value) {
  return (0, _validateNode.default)({
    type: "Directive",
    value
  });
}
function directiveLiteral(value) {
  return (0, _validateNode.default)({
    type: "DirectiveLiteral",
    value
  });
}
function blockStatement(body, directives = []) {
  return (0, _validateNode.default)({
    type: "BlockStatement",
    body,
    directives
  });
}
function breakStatement(label = null) {
  return (0, _validateNode.default)({
    type: "BreakStatement",
    label
  });
}
function callExpression(callee, _arguments) {
  return (0, _validateNode.default)({
    type: "CallExpression",
    callee,
    arguments: _arguments
  });
}
function catchClause(param = null, body) {
  return (0, _validateNode.default)({
    type: "CatchClause",
    param,
    body
  });
}
function conditionalExpression(test, consequent, alternate) {
  return (0, _validateNode.default)({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate
  });
}
function continueStatement(label = null) {
  return (0, _validateNode.default)({
    type: "ContinueStatement",
    label
  });
}
function debuggerStatement() {
  return {
    type: "DebuggerStatement"
  };
}
function doWhileStatement(test, body) {
  return (0, _validateNode.default)({
    type: "DoWhileStatement",
    test,
    body
  });
}
function emptyStatement() {
  return {
    type: "EmptyStatement"
  };
}
function expressionStatement(expression) {
  return (0, _validateNode.default)({
    type: "ExpressionStatement",
    expression
  });
}
function file(program, comments = null, tokens = null) {
  return (0, _validateNode.default)({
    type: "File",
    program,
    comments,
    tokens
  });
}
function forInStatement(left, right, body) {
  return (0, _validateNode.default)({
    type: "ForInStatement",
    left,
    right,
    body
  });
}
function forStatement(init = null, test = null, update = null, body) {
  return (0, _validateNode.default)({
    type: "ForStatement",
    init,
    test,
    update,
    body
  });
}
function functionDeclaration(id = null, params, body, generator = false, async = false) {
  return (0, _validateNode.default)({
    type: "FunctionDeclaration",
    id,
    params,
    body,
    generator,
    async
  });
}
function functionExpression(id = null, params, body, generator = false, async = false) {
  return (0, _validateNode.default)({
    type: "FunctionExpression",
    id,
    params,
    body,
    generator,
    async
  });
}
function identifier(name) {
  return (0, _validateNode.default)({
    type: "Identifier",
    name
  });
}
function ifStatement(test, consequent, alternate = null) {
  return (0, _validateNode.default)({
    type: "IfStatement",
    test,
    consequent,
    alternate
  });
}
function labeledStatement(label, body) {
  return (0, _validateNode.default)({
    type: "LabeledStatement",
    label,
    body
  });
}
function stringLiteral(value) {
  return (0, _validateNode.default)({
    type: "StringLiteral",
    value
  });
}
function numericLiteral(value) {
  return (0, _validateNode.default)({
    type: "NumericLiteral",
    value
  });
}
function nullLiteral() {
  return {
    type: "NullLiteral"
  };
}
function booleanLiteral(value) {
  return (0, _validateNode.default)({
    type: "BooleanLiteral",
    value
  });
}
function regExpLiteral(pattern, flags = "") {
  return (0, _validateNode.default)({
    type: "RegExpLiteral",
    pattern,
    flags
  });
}
function logicalExpression(operator, left, right) {
  return (0, _validateNode.default)({
    type: "LogicalExpression",
    operator,
    left,
    right
  });
}
function memberExpression(object, property, computed = false, optional = null) {
  return (0, _validateNode.default)({
    type: "MemberExpression",
    object,
    property,
    computed,
    optional
  });
}
function newExpression(callee, _arguments) {
  return (0, _validateNode.default)({
    type: "NewExpression",
    callee,
    arguments: _arguments
  });
}
function program(body, directives = [], sourceType = "script", interpreter = null) {
  return (0, _validateNode.default)({
    type: "Program",
    body,
    directives,
    sourceType,
    interpreter,
    sourceFile: null
  });
}
function objectExpression(properties) {
  return (0, _validateNode.default)({
    type: "ObjectExpression",
    properties
  });
}
function objectMethod(kind = "method", key, params, body, computed = false, generator = false, async = false) {
  return (0, _validateNode.default)({
    type: "ObjectMethod",
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async
  });
}
function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
  return (0, _validateNode.default)({
    type: "ObjectProperty",
    key,
    value,
    computed,
    shorthand,
    decorators
  });
}
function restElement(argument) {
  return (0, _validateNode.default)({
    type: "RestElement",
    argument
  });
}
function returnStatement(argument = null) {
  return (0, _validateNode.default)({
    type: "ReturnStatement",
    argument
  });
}
function sequenceExpression(expressions) {
  return (0, _validateNode.default)({
    type: "SequenceExpression",
    expressions
  });
}
function parenthesizedExpression(expression) {
  return (0, _validateNode.default)({
    type: "ParenthesizedExpression",
    expression
  });
}
function switchCase(test = null, consequent) {
  return (0, _validateNode.default)({
    type: "SwitchCase",
    test,
    consequent
  });
}
function switchStatement(discriminant, cases) {
  return (0, _validateNode.default)({
    type: "SwitchStatement",
    discriminant,
    cases
  });
}
function thisExpression() {
  return {
    type: "ThisExpression"
  };
}
function throwStatement(argument) {
  return (0, _validateNode.default)({
    type: "ThrowStatement",
    argument
  });
}
function tryStatement(block, handler = null, finalizer = null) {
  return (0, _validateNode.default)({
    type: "TryStatement",
    block,
    handler,
    finalizer
  });
}
function unaryExpression(operator, argument, prefix = true) {
  return (0, _validateNode.default)({
    type: "UnaryExpression",
    operator,
    argument,
    prefix
  });
}
function updateExpression(operator, argument, prefix = false) {
  return (0, _validateNode.default)({
    type: "UpdateExpression",
    operator,
    argument,
    prefix
  });
}
function variableDeclaration(kind, declarations) {
  return (0, _validateNode.default)({
    type: "VariableDeclaration",
    kind,
    declarations
  });
}
function variableDeclarator(id, init = null) {
  return (0, _validateNode.default)({
    type: "VariableDeclarator",
    id,
    init
  });
}
function whileStatement(test, body) {
  return (0, _validateNode.default)({
    type: "WhileStatement",
    test,
    body
  });
}
function withStatement(object, body) {
  return (0, _validateNode.default)({
    type: "WithStatement",
    object,
    body
  });
}
function assignmentPattern(left, right) {
  return (0, _validateNode.default)({
    type: "AssignmentPattern",
    left,
    right
  });
}
function arrayPattern(elements) {
  return (0, _validateNode.default)({
    type: "ArrayPattern",
    elements
  });
}
function arrowFunctionExpression(params, body, async = false) {
  return (0, _validateNode.default)({
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    expression: null
  });
}
function classBody(body) {
  return (0, _validateNode.default)({
    type: "ClassBody",
    body
  });
}
function classExpression(id = null, superClass = null, body, decorators = null) {
  return (0, _validateNode.default)({
    type: "ClassExpression",
    id,
    superClass,
    body,
    decorators
  });
}
function classDeclaration(id = null, superClass = null, body, decorators = null) {
  return (0, _validateNode.default)({
    type: "ClassDeclaration",
    id,
    superClass,
    body,
    decorators
  });
}
function exportAllDeclaration(source) {
  return (0, _validateNode.default)({
    type: "ExportAllDeclaration",
    source
  });
}
function exportDefaultDeclaration(declaration) {
  return (0, _validateNode.default)({
    type: "ExportDefaultDeclaration",
    declaration
  });
}
function exportNamedDeclaration(declaration = null, specifiers = [], source = null) {
  return (0, _validateNode.default)({
    type: "ExportNamedDeclaration",
    declaration,
    specifiers,
    source
  });
}
function exportSpecifier(local, exported) {
  return (0, _validateNode.default)({
    type: "ExportSpecifier",
    local,
    exported
  });
}
function forOfStatement(left, right, body, _await = false) {
  return (0, _validateNode.default)({
    type: "ForOfStatement",
    left,
    right,
    body,
    await: _await
  });
}
function importDeclaration(specifiers, source) {
  return (0, _validateNode.default)({
    type: "ImportDeclaration",
    specifiers,
    source
  });
}
function importDefaultSpecifier(local) {
  return (0, _validateNode.default)({
    type: "ImportDefaultSpecifier",
    local
  });
}
function importNamespaceSpecifier(local) {
  return (0, _validateNode.default)({
    type: "ImportNamespaceSpecifier",
    local
  });
}
function importSpecifier(local, imported) {
  return (0, _validateNode.default)({
    type: "ImportSpecifier",
    local,
    imported
  });
}
function metaProperty(meta, property) {
  return (0, _validateNode.default)({
    type: "MetaProperty",
    meta,
    property
  });
}
function classMethod(kind = "method", key, params, body, computed = false, _static = false, generator = false, async = false) {
  return (0, _validateNode.default)({
    type: "ClassMethod",
    kind,
    key,
    params,
    body,
    computed,
    static: _static,
    generator,
    async
  });
}
function objectPattern(properties) {
  return (0, _validateNode.default)({
    type: "ObjectPattern",
    properties
  });
}
function spreadElement(argument) {
  return (0, _validateNode.default)({
    type: "SpreadElement",
    argument
  });
}
function _super() {
  return {
    type: "Super"
  };
}
function taggedTemplateExpression(tag, quasi) {
  return (0, _validateNode.default)({
    type: "TaggedTemplateExpression",
    tag,
    quasi
  });
}
function templateElement(value, tail = false) {
  return (0, _validateNode.default)({
    type: "TemplateElement",
    value,
    tail
  });
}
function templateLiteral(quasis, expressions) {
  return (0, _validateNode.default)({
    type: "TemplateLiteral",
    quasis,
    expressions
  });
}
function yieldExpression(argument = null, delegate = false) {
  return (0, _validateNode.default)({
    type: "YieldExpression",
    argument,
    delegate
  });
}
function awaitExpression(argument) {
  return (0, _validateNode.default)({
    type: "AwaitExpression",
    argument
  });
}
function _import() {
  return {
    type: "Import"
  };
}
function bigIntLiteral(value) {
  return (0, _validateNode.default)({
    type: "BigIntLiteral",
    value
  });
}
function exportNamespaceSpecifier(exported) {
  return (0, _validateNode.default)({
    type: "ExportNamespaceSpecifier",
    exported
  });
}
function optionalMemberExpression(object, property, computed = false, optional) {
  return (0, _validateNode.default)({
    type: "OptionalMemberExpression",
    object,
    property,
    computed,
    optional
  });
}
function optionalCallExpression(callee, _arguments, optional) {
  return (0, _validateNode.default)({
    type: "OptionalCallExpression",
    callee,
    arguments: _arguments,
    optional
  });
}
function classProperty(key, value = null, typeAnnotation = null, decorators = null, computed = false, _static = false) {
  return (0, _validateNode.default)({
    type: "ClassProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static
  });
}
function classAccessorProperty(key, value = null, typeAnnotation = null, decorators = null, computed = false, _static = false) {
  return (0, _validateNode.default)({
    type: "ClassAccessorProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static
  });
}
function classPrivateProperty(key, value = null, decorators = null, _static = false) {
  return (0, _validateNode.default)({
    type: "ClassPrivateProperty",
    key,
    value,
    decorators,
    static: _static
  });
}
function classPrivateMethod(kind = "method", key, params, body, _static = false) {
  return (0, _validateNode.default)({
    type: "ClassPrivateMethod",
    kind,
    key,
    params,
    body,
    static: _static
  });
}
function privateName(id) {
  return (0, _validateNode.default)({
    type: "PrivateName",
    id
  });
}
function staticBlock(body) {
  return (0, _validateNode.default)({
    type: "StaticBlock",
    body
  });
}
function anyTypeAnnotation() {
  return {
    type: "AnyTypeAnnotation"
  };
}
function arrayTypeAnnotation(elementType) {
  return (0, _validateNode.default)({
    type: "ArrayTypeAnnotation",
    elementType
  });
}
function booleanTypeAnnotation() {
  return {
    type: "BooleanTypeAnnotation"
  };
}
function booleanLiteralTypeAnnotation(value) {
  return (0, _validateNode.default)({
    type: "BooleanLiteralTypeAnnotation",
    value
  });
}
function nullLiteralTypeAnnotation() {
  return {
    type: "NullLiteralTypeAnnotation"
  };
}
function classImplements(id, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "ClassImplements",
    id,
    typeParameters
  });
}
function declareClass(id, typeParameters = null, _extends = null, body) {
  return (0, _validateNode.default)({
    type: "DeclareClass",
    id,
    typeParameters,
    extends: _extends,
    body
  });
}
function declareFunction(id) {
  return (0, _validateNode.default)({
    type: "DeclareFunction",
    id
  });
}
function declareInterface(id, typeParameters = null, _extends = null, body) {
  return (0, _validateNode.default)({
    type: "DeclareInterface",
    id,
    typeParameters,
    extends: _extends,
    body
  });
}
function declareModule(id, body, kind = null) {
  return (0, _validateNode.default)({
    type: "DeclareModule",
    id,
    body,
    kind
  });
}
function declareModuleExports(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "DeclareModuleExports",
    typeAnnotation
  });
}
function declareTypeAlias(id, typeParameters = null, right) {
  return (0, _validateNode.default)({
    type: "DeclareTypeAlias",
    id,
    typeParameters,
    right
  });
}
function declareOpaqueType(id, typeParameters = null, supertype = null) {
  return (0, _validateNode.default)({
    type: "DeclareOpaqueType",
    id,
    typeParameters,
    supertype
  });
}
function declareVariable(id) {
  return (0, _validateNode.default)({
    type: "DeclareVariable",
    id
  });
}
function declareExportDeclaration(declaration = null, specifiers = null, source = null) {
  return (0, _validateNode.default)({
    type: "DeclareExportDeclaration",
    declaration,
    specifiers,
    source
  });
}
function declareExportAllDeclaration(source) {
  return (0, _validateNode.default)({
    type: "DeclareExportAllDeclaration",
    source
  });
}
function declaredPredicate(value) {
  return (0, _validateNode.default)({
    type: "DeclaredPredicate",
    value
  });
}
function existsTypeAnnotation() {
  return {
    type: "ExistsTypeAnnotation"
  };
}
function functionTypeAnnotation(typeParameters = null, params, rest = null, returnType) {
  return (0, _validateNode.default)({
    type: "FunctionTypeAnnotation",
    typeParameters,
    params,
    rest,
    returnType
  });
}
function functionTypeParam(name = null, typeAnnotation) {
  return (0, _validateNode.default)({
    type: "FunctionTypeParam",
    name,
    typeAnnotation
  });
}
function genericTypeAnnotation(id, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "GenericTypeAnnotation",
    id,
    typeParameters
  });
}
function inferredPredicate() {
  return {
    type: "InferredPredicate"
  };
}
function interfaceExtends(id, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "InterfaceExtends",
    id,
    typeParameters
  });
}
function interfaceDeclaration(id, typeParameters = null, _extends = null, body) {
  return (0, _validateNode.default)({
    type: "InterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body
  });
}
function interfaceTypeAnnotation(_extends = null, body) {
  return (0, _validateNode.default)({
    type: "InterfaceTypeAnnotation",
    extends: _extends,
    body
  });
}
function intersectionTypeAnnotation(types) {
  return (0, _validateNode.default)({
    type: "IntersectionTypeAnnotation",
    types
  });
}
function mixedTypeAnnotation() {
  return {
    type: "MixedTypeAnnotation"
  };
}
function emptyTypeAnnotation() {
  return {
    type: "EmptyTypeAnnotation"
  };
}
function nullableTypeAnnotation(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "NullableTypeAnnotation",
    typeAnnotation
  });
}
function numberLiteralTypeAnnotation(value) {
  return (0, _validateNode.default)({
    type: "NumberLiteralTypeAnnotation",
    value
  });
}
function numberTypeAnnotation() {
  return {
    type: "NumberTypeAnnotation"
  };
}
function objectTypeAnnotation(properties, indexers = [], callProperties = [], internalSlots = [], exact = false) {
  return (0, _validateNode.default)({
    type: "ObjectTypeAnnotation",
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact
  });
}
function objectTypeInternalSlot(id, value, optional, _static, method) {
  return (0, _validateNode.default)({
    type: "ObjectTypeInternalSlot",
    id,
    value,
    optional,
    static: _static,
    method
  });
}
function objectTypeCallProperty(value) {
  return (0, _validateNode.default)({
    type: "ObjectTypeCallProperty",
    value,
    static: null
  });
}
function objectTypeIndexer(id = null, key, value, variance = null) {
  return (0, _validateNode.default)({
    type: "ObjectTypeIndexer",
    id,
    key,
    value,
    variance,
    static: null
  });
}
function objectTypeProperty(key, value, variance = null) {
  return (0, _validateNode.default)({
    type: "ObjectTypeProperty",
    key,
    value,
    variance,
    kind: null,
    method: null,
    optional: null,
    proto: null,
    static: null
  });
}
function objectTypeSpreadProperty(argument) {
  return (0, _validateNode.default)({
    type: "ObjectTypeSpreadProperty",
    argument
  });
}
function opaqueType(id, typeParameters = null, supertype = null, impltype) {
  return (0, _validateNode.default)({
    type: "OpaqueType",
    id,
    typeParameters,
    supertype,
    impltype
  });
}
function qualifiedTypeIdentifier(id, qualification) {
  return (0, _validateNode.default)({
    type: "QualifiedTypeIdentifier",
    id,
    qualification
  });
}
function stringLiteralTypeAnnotation(value) {
  return (0, _validateNode.default)({
    type: "StringLiteralTypeAnnotation",
    value
  });
}
function stringTypeAnnotation() {
  return {
    type: "StringTypeAnnotation"
  };
}
function symbolTypeAnnotation() {
  return {
    type: "SymbolTypeAnnotation"
  };
}
function thisTypeAnnotation() {
  return {
    type: "ThisTypeAnnotation"
  };
}
function tupleTypeAnnotation(types) {
  return (0, _validateNode.default)({
    type: "TupleTypeAnnotation",
    types
  });
}
function typeofTypeAnnotation(argument) {
  return (0, _validateNode.default)({
    type: "TypeofTypeAnnotation",
    argument
  });
}
function typeAlias(id, typeParameters = null, right) {
  return (0, _validateNode.default)({
    type: "TypeAlias",
    id,
    typeParameters,
    right
  });
}
function typeAnnotation(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TypeAnnotation",
    typeAnnotation
  });
}
function typeCastExpression(expression, typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TypeCastExpression",
    expression,
    typeAnnotation
  });
}
function typeParameter(bound = null, _default = null, variance = null) {
  return (0, _validateNode.default)({
    type: "TypeParameter",
    bound,
    default: _default,
    variance,
    name: null
  });
}
function typeParameterDeclaration(params) {
  return (0, _validateNode.default)({
    type: "TypeParameterDeclaration",
    params
  });
}
function typeParameterInstantiation(params) {
  return (0, _validateNode.default)({
    type: "TypeParameterInstantiation",
    params
  });
}
function unionTypeAnnotation(types) {
  return (0, _validateNode.default)({
    type: "UnionTypeAnnotation",
    types
  });
}
function variance(kind) {
  return (0, _validateNode.default)({
    type: "Variance",
    kind
  });
}
function voidTypeAnnotation() {
  return {
    type: "VoidTypeAnnotation"
  };
}
function enumDeclaration(id, body) {
  return (0, _validateNode.default)({
    type: "EnumDeclaration",
    id,
    body
  });
}
function enumBooleanBody(members) {
  return (0, _validateNode.default)({
    type: "EnumBooleanBody",
    members,
    explicitType: null,
    hasUnknownMembers: null
  });
}
function enumNumberBody(members) {
  return (0, _validateNode.default)({
    type: "EnumNumberBody",
    members,
    explicitType: null,
    hasUnknownMembers: null
  });
}
function enumStringBody(members) {
  return (0, _validateNode.default)({
    type: "EnumStringBody",
    members,
    explicitType: null,
    hasUnknownMembers: null
  });
}
function enumSymbolBody(members) {
  return (0, _validateNode.default)({
    type: "EnumSymbolBody",
    members,
    hasUnknownMembers: null
  });
}
function enumBooleanMember(id) {
  return (0, _validateNode.default)({
    type: "EnumBooleanMember",
    id,
    init: null
  });
}
function enumNumberMember(id, init) {
  return (0, _validateNode.default)({
    type: "EnumNumberMember",
    id,
    init
  });
}
function enumStringMember(id, init) {
  return (0, _validateNode.default)({
    type: "EnumStringMember",
    id,
    init
  });
}
function enumDefaultedMember(id) {
  return (0, _validateNode.default)({
    type: "EnumDefaultedMember",
    id
  });
}
function indexedAccessType(objectType, indexType) {
  return (0, _validateNode.default)({
    type: "IndexedAccessType",
    objectType,
    indexType
  });
}
function optionalIndexedAccessType(objectType, indexType) {
  return (0, _validateNode.default)({
    type: "OptionalIndexedAccessType",
    objectType,
    indexType,
    optional: null
  });
}
function jsxAttribute(name, value = null) {
  return (0, _validateNode.default)({
    type: "JSXAttribute",
    name,
    value
  });
}
function jsxClosingElement(name) {
  return (0, _validateNode.default)({
    type: "JSXClosingElement",
    name
  });
}
function jsxElement(openingElement, closingElement = null, children, selfClosing = null) {
  return (0, _validateNode.default)({
    type: "JSXElement",
    openingElement,
    closingElement,
    children,
    selfClosing
  });
}
function jsxEmptyExpression() {
  return {
    type: "JSXEmptyExpression"
  };
}
function jsxExpressionContainer(expression) {
  return (0, _validateNode.default)({
    type: "JSXExpressionContainer",
    expression
  });
}
function jsxSpreadChild(expression) {
  return (0, _validateNode.default)({
    type: "JSXSpreadChild",
    expression
  });
}
function jsxIdentifier(name) {
  return (0, _validateNode.default)({
    type: "JSXIdentifier",
    name
  });
}
function jsxMemberExpression(object, property) {
  return (0, _validateNode.default)({
    type: "JSXMemberExpression",
    object,
    property
  });
}
function jsxNamespacedName(namespace, name) {
  return (0, _validateNode.default)({
    type: "JSXNamespacedName",
    namespace,
    name
  });
}
function jsxOpeningElement(name, attributes, selfClosing = false) {
  return (0, _validateNode.default)({
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing
  });
}
function jsxSpreadAttribute(argument) {
  return (0, _validateNode.default)({
    type: "JSXSpreadAttribute",
    argument
  });
}
function jsxText(value) {
  return (0, _validateNode.default)({
    type: "JSXText",
    value
  });
}
function jsxFragment(openingFragment, closingFragment, children) {
  return (0, _validateNode.default)({
    type: "JSXFragment",
    openingFragment,
    closingFragment,
    children
  });
}
function jsxOpeningFragment() {
  return {
    type: "JSXOpeningFragment"
  };
}
function jsxClosingFragment() {
  return {
    type: "JSXClosingFragment"
  };
}
function noop() {
  return {
    type: "Noop"
  };
}
function placeholder(expectedNode, name) {
  return (0, _validateNode.default)({
    type: "Placeholder",
    expectedNode,
    name
  });
}
function v8IntrinsicIdentifier(name) {
  return (0, _validateNode.default)({
    type: "V8IntrinsicIdentifier",
    name
  });
}
function argumentPlaceholder() {
  return {
    type: "ArgumentPlaceholder"
  };
}
function bindExpression(object, callee) {
  return (0, _validateNode.default)({
    type: "BindExpression",
    object,
    callee
  });
}
function importAttribute(key, value) {
  return (0, _validateNode.default)({
    type: "ImportAttribute",
    key,
    value
  });
}
function decorator(expression) {
  return (0, _validateNode.default)({
    type: "Decorator",
    expression
  });
}
function doExpression(body, async = false) {
  return (0, _validateNode.default)({
    type: "DoExpression",
    body,
    async
  });
}
function exportDefaultSpecifier(exported) {
  return (0, _validateNode.default)({
    type: "ExportDefaultSpecifier",
    exported
  });
}
function recordExpression(properties) {
  return (0, _validateNode.default)({
    type: "RecordExpression",
    properties
  });
}
function tupleExpression(elements = []) {
  return (0, _validateNode.default)({
    type: "TupleExpression",
    elements
  });
}
function decimalLiteral(value) {
  return (0, _validateNode.default)({
    type: "DecimalLiteral",
    value
  });
}
function moduleExpression(body) {
  return (0, _validateNode.default)({
    type: "ModuleExpression",
    body
  });
}
function topicReference() {
  return {
    type: "TopicReference"
  };
}
function pipelineTopicExpression(expression) {
  return (0, _validateNode.default)({
    type: "PipelineTopicExpression",
    expression
  });
}
function pipelineBareFunction(callee) {
  return (0, _validateNode.default)({
    type: "PipelineBareFunction",
    callee
  });
}
function pipelinePrimaryTopicReference() {
  return {
    type: "PipelinePrimaryTopicReference"
  };
}
function tsParameterProperty(parameter) {
  return (0, _validateNode.default)({
    type: "TSParameterProperty",
    parameter
  });
}
function tsDeclareFunction(id = null, typeParameters = null, params, returnType = null) {
  return (0, _validateNode.default)({
    type: "TSDeclareFunction",
    id,
    typeParameters,
    params,
    returnType
  });
}
function tsDeclareMethod(decorators = null, key, typeParameters = null, params, returnType = null) {
  return (0, _validateNode.default)({
    type: "TSDeclareMethod",
    decorators,
    key,
    typeParameters,
    params,
    returnType
  });
}
function tsQualifiedName(left, right) {
  return (0, _validateNode.default)({
    type: "TSQualifiedName",
    left,
    right
  });
}
function tsCallSignatureDeclaration(typeParameters = null, parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSCallSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation
  });
}
function tsConstructSignatureDeclaration(typeParameters = null, parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSConstructSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation
  });
}
function tsPropertySignature(key, typeAnnotation = null, initializer = null) {
  return (0, _validateNode.default)({
    type: "TSPropertySignature",
    key,
    typeAnnotation,
    initializer,
    kind: null
  });
}
function tsMethodSignature(key, typeParameters = null, parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSMethodSignature",
    key,
    typeParameters,
    parameters,
    typeAnnotation,
    kind: null
  });
}
function tsIndexSignature(parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSIndexSignature",
    parameters,
    typeAnnotation
  });
}
function tsAnyKeyword() {
  return {
    type: "TSAnyKeyword"
  };
}
function tsBooleanKeyword() {
  return {
    type: "TSBooleanKeyword"
  };
}
function tsBigIntKeyword() {
  return {
    type: "TSBigIntKeyword"
  };
}
function tsIntrinsicKeyword() {
  return {
    type: "TSIntrinsicKeyword"
  };
}
function tsNeverKeyword() {
  return {
    type: "TSNeverKeyword"
  };
}
function tsNullKeyword() {
  return {
    type: "TSNullKeyword"
  };
}
function tsNumberKeyword() {
  return {
    type: "TSNumberKeyword"
  };
}
function tsObjectKeyword() {
  return {
    type: "TSObjectKeyword"
  };
}
function tsStringKeyword() {
  return {
    type: "TSStringKeyword"
  };
}
function tsSymbolKeyword() {
  return {
    type: "TSSymbolKeyword"
  };
}
function tsUndefinedKeyword() {
  return {
    type: "TSUndefinedKeyword"
  };
}
function tsUnknownKeyword() {
  return {
    type: "TSUnknownKeyword"
  };
}
function tsVoidKeyword() {
  return {
    type: "TSVoidKeyword"
  };
}
function tsThisType() {
  return {
    type: "TSThisType"
  };
}
function tsFunctionType(typeParameters = null, parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSFunctionType",
    typeParameters,
    parameters,
    typeAnnotation
  });
}
function tsConstructorType(typeParameters = null, parameters, typeAnnotation = null) {
  return (0, _validateNode.default)({
    type: "TSConstructorType",
    typeParameters,
    parameters,
    typeAnnotation
  });
}
function tsTypeReference(typeName, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "TSTypeReference",
    typeName,
    typeParameters
  });
}
function tsTypePredicate(parameterName, typeAnnotation = null, asserts = null) {
  return (0, _validateNode.default)({
    type: "TSTypePredicate",
    parameterName,
    typeAnnotation,
    asserts
  });
}
function tsTypeQuery(exprName, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "TSTypeQuery",
    exprName,
    typeParameters
  });
}
function tsTypeLiteral(members) {
  return (0, _validateNode.default)({
    type: "TSTypeLiteral",
    members
  });
}
function tsArrayType(elementType) {
  return (0, _validateNode.default)({
    type: "TSArrayType",
    elementType
  });
}
function tsTupleType(elementTypes) {
  return (0, _validateNode.default)({
    type: "TSTupleType",
    elementTypes
  });
}
function tsOptionalType(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSOptionalType",
    typeAnnotation
  });
}
function tsRestType(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSRestType",
    typeAnnotation
  });
}
function tsNamedTupleMember(label, elementType, optional = false) {
  return (0, _validateNode.default)({
    type: "TSNamedTupleMember",
    label,
    elementType,
    optional
  });
}
function tsUnionType(types) {
  return (0, _validateNode.default)({
    type: "TSUnionType",
    types
  });
}
function tsIntersectionType(types) {
  return (0, _validateNode.default)({
    type: "TSIntersectionType",
    types
  });
}
function tsConditionalType(checkType, extendsType, trueType, falseType) {
  return (0, _validateNode.default)({
    type: "TSConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType
  });
}
function tsInferType(typeParameter) {
  return (0, _validateNode.default)({
    type: "TSInferType",
    typeParameter
  });
}
function tsParenthesizedType(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSParenthesizedType",
    typeAnnotation
  });
}
function tsTypeOperator(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSTypeOperator",
    typeAnnotation,
    operator: null
  });
}
function tsIndexedAccessType(objectType, indexType) {
  return (0, _validateNode.default)({
    type: "TSIndexedAccessType",
    objectType,
    indexType
  });
}
function tsMappedType(typeParameter, typeAnnotation = null, nameType = null) {
  return (0, _validateNode.default)({
    type: "TSMappedType",
    typeParameter,
    typeAnnotation,
    nameType
  });
}
function tsLiteralType(literal) {
  return (0, _validateNode.default)({
    type: "TSLiteralType",
    literal
  });
}
function tsExpressionWithTypeArguments(expression, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "TSExpressionWithTypeArguments",
    expression,
    typeParameters
  });
}
function tsInterfaceDeclaration(id, typeParameters = null, _extends = null, body) {
  return (0, _validateNode.default)({
    type: "TSInterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body
  });
}
function tsInterfaceBody(body) {
  return (0, _validateNode.default)({
    type: "TSInterfaceBody",
    body
  });
}
function tsTypeAliasDeclaration(id, typeParameters = null, typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSTypeAliasDeclaration",
    id,
    typeParameters,
    typeAnnotation
  });
}
function tsInstantiationExpression(expression, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "TSInstantiationExpression",
    expression,
    typeParameters
  });
}
function tsAsExpression(expression, typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSAsExpression",
    expression,
    typeAnnotation
  });
}
function tsSatisfiesExpression(expression, typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSSatisfiesExpression",
    expression,
    typeAnnotation
  });
}
function tsTypeAssertion(typeAnnotation, expression) {
  return (0, _validateNode.default)({
    type: "TSTypeAssertion",
    typeAnnotation,
    expression
  });
}
function tsEnumDeclaration(id, members) {
  return (0, _validateNode.default)({
    type: "TSEnumDeclaration",
    id,
    members
  });
}
function tsEnumMember(id, initializer = null) {
  return (0, _validateNode.default)({
    type: "TSEnumMember",
    id,
    initializer
  });
}
function tsModuleDeclaration(id, body) {
  return (0, _validateNode.default)({
    type: "TSModuleDeclaration",
    id,
    body
  });
}
function tsModuleBlock(body) {
  return (0, _validateNode.default)({
    type: "TSModuleBlock",
    body
  });
}
function tsImportType(argument, qualifier = null, typeParameters = null) {
  return (0, _validateNode.default)({
    type: "TSImportType",
    argument,
    qualifier,
    typeParameters
  });
}
function tsImportEqualsDeclaration(id, moduleReference) {
  return (0, _validateNode.default)({
    type: "TSImportEqualsDeclaration",
    id,
    moduleReference,
    isExport: null
  });
}
function tsExternalModuleReference(expression) {
  return (0, _validateNode.default)({
    type: "TSExternalModuleReference",
    expression
  });
}
function tsNonNullExpression(expression) {
  return (0, _validateNode.default)({
    type: "TSNonNullExpression",
    expression
  });
}
function tsExportAssignment(expression) {
  return (0, _validateNode.default)({
    type: "TSExportAssignment",
    expression
  });
}
function tsNamespaceExportDeclaration(id) {
  return (0, _validateNode.default)({
    type: "TSNamespaceExportDeclaration",
    id
  });
}
function tsTypeAnnotation(typeAnnotation) {
  return (0, _validateNode.default)({
    type: "TSTypeAnnotation",
    typeAnnotation
  });
}
function tsTypeParameterInstantiation(params) {
  return (0, _validateNode.default)({
    type: "TSTypeParameterInstantiation",
    params
  });
}
function tsTypeParameterDeclaration(params) {
  return (0, _validateNode.default)({
    type: "TSTypeParameterDeclaration",
    params
  });
}
function tsTypeParameter(constraint = null, _default = null, name) {
  return (0, _validateNode.default)({
    type: "TSTypeParameter",
    constraint,
    default: _default,
    name
  });
}
function NumberLiteral(value) {
  (0, _deprecationWarning.default)("NumberLiteral", "NumericLiteral", "The node type ");
  return numericLiteral(value);
}
function RegexLiteral(pattern, flags = "") {
  (0, _deprecationWarning.default)("RegexLiteral", "RegExpLiteral", "The node type ");
  return regExpLiteral(pattern, flags);
}
function RestProperty(argument) {
  (0, _deprecationWarning.default)("RestProperty", "RestElement", "The node type ");
  return restElement(argument);
}
function SpreadProperty(argument) {
  (0, _deprecationWarning.default)("SpreadProperty", "SpreadElement", "The node type ");
  return spreadElement(argument);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/generated/uppercase.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/generated/uppercase.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "AnyTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.anyTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ArgumentPlaceholder", ({
  enumerable: true,
  get: function () {
    return _index.argumentPlaceholder;
  }
}));
Object.defineProperty(exports, "ArrayExpression", ({
  enumerable: true,
  get: function () {
    return _index.arrayExpression;
  }
}));
Object.defineProperty(exports, "ArrayPattern", ({
  enumerable: true,
  get: function () {
    return _index.arrayPattern;
  }
}));
Object.defineProperty(exports, "ArrayTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.arrayTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ArrowFunctionExpression", ({
  enumerable: true,
  get: function () {
    return _index.arrowFunctionExpression;
  }
}));
Object.defineProperty(exports, "AssignmentExpression", ({
  enumerable: true,
  get: function () {
    return _index.assignmentExpression;
  }
}));
Object.defineProperty(exports, "AssignmentPattern", ({
  enumerable: true,
  get: function () {
    return _index.assignmentPattern;
  }
}));
Object.defineProperty(exports, "AwaitExpression", ({
  enumerable: true,
  get: function () {
    return _index.awaitExpression;
  }
}));
Object.defineProperty(exports, "BigIntLiteral", ({
  enumerable: true,
  get: function () {
    return _index.bigIntLiteral;
  }
}));
Object.defineProperty(exports, "BinaryExpression", ({
  enumerable: true,
  get: function () {
    return _index.binaryExpression;
  }
}));
Object.defineProperty(exports, "BindExpression", ({
  enumerable: true,
  get: function () {
    return _index.bindExpression;
  }
}));
Object.defineProperty(exports, "BlockStatement", ({
  enumerable: true,
  get: function () {
    return _index.blockStatement;
  }
}));
Object.defineProperty(exports, "BooleanLiteral", ({
  enumerable: true,
  get: function () {
    return _index.booleanLiteral;
  }
}));
Object.defineProperty(exports, "BooleanLiteralTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.booleanLiteralTypeAnnotation;
  }
}));
Object.defineProperty(exports, "BooleanTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.booleanTypeAnnotation;
  }
}));
Object.defineProperty(exports, "BreakStatement", ({
  enumerable: true,
  get: function () {
    return _index.breakStatement;
  }
}));
Object.defineProperty(exports, "CallExpression", ({
  enumerable: true,
  get: function () {
    return _index.callExpression;
  }
}));
Object.defineProperty(exports, "CatchClause", ({
  enumerable: true,
  get: function () {
    return _index.catchClause;
  }
}));
Object.defineProperty(exports, "ClassAccessorProperty", ({
  enumerable: true,
  get: function () {
    return _index.classAccessorProperty;
  }
}));
Object.defineProperty(exports, "ClassBody", ({
  enumerable: true,
  get: function () {
    return _index.classBody;
  }
}));
Object.defineProperty(exports, "ClassDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.classDeclaration;
  }
}));
Object.defineProperty(exports, "ClassExpression", ({
  enumerable: true,
  get: function () {
    return _index.classExpression;
  }
}));
Object.defineProperty(exports, "ClassImplements", ({
  enumerable: true,
  get: function () {
    return _index.classImplements;
  }
}));
Object.defineProperty(exports, "ClassMethod", ({
  enumerable: true,
  get: function () {
    return _index.classMethod;
  }
}));
Object.defineProperty(exports, "ClassPrivateMethod", ({
  enumerable: true,
  get: function () {
    return _index.classPrivateMethod;
  }
}));
Object.defineProperty(exports, "ClassPrivateProperty", ({
  enumerable: true,
  get: function () {
    return _index.classPrivateProperty;
  }
}));
Object.defineProperty(exports, "ClassProperty", ({
  enumerable: true,
  get: function () {
    return _index.classProperty;
  }
}));
Object.defineProperty(exports, "ConditionalExpression", ({
  enumerable: true,
  get: function () {
    return _index.conditionalExpression;
  }
}));
Object.defineProperty(exports, "ContinueStatement", ({
  enumerable: true,
  get: function () {
    return _index.continueStatement;
  }
}));
Object.defineProperty(exports, "DebuggerStatement", ({
  enumerable: true,
  get: function () {
    return _index.debuggerStatement;
  }
}));
Object.defineProperty(exports, "DecimalLiteral", ({
  enumerable: true,
  get: function () {
    return _index.decimalLiteral;
  }
}));
Object.defineProperty(exports, "DeclareClass", ({
  enumerable: true,
  get: function () {
    return _index.declareClass;
  }
}));
Object.defineProperty(exports, "DeclareExportAllDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.declareExportAllDeclaration;
  }
}));
Object.defineProperty(exports, "DeclareExportDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.declareExportDeclaration;
  }
}));
Object.defineProperty(exports, "DeclareFunction", ({
  enumerable: true,
  get: function () {
    return _index.declareFunction;
  }
}));
Object.defineProperty(exports, "DeclareInterface", ({
  enumerable: true,
  get: function () {
    return _index.declareInterface;
  }
}));
Object.defineProperty(exports, "DeclareModule", ({
  enumerable: true,
  get: function () {
    return _index.declareModule;
  }
}));
Object.defineProperty(exports, "DeclareModuleExports", ({
  enumerable: true,
  get: function () {
    return _index.declareModuleExports;
  }
}));
Object.defineProperty(exports, "DeclareOpaqueType", ({
  enumerable: true,
  get: function () {
    return _index.declareOpaqueType;
  }
}));
Object.defineProperty(exports, "DeclareTypeAlias", ({
  enumerable: true,
  get: function () {
    return _index.declareTypeAlias;
  }
}));
Object.defineProperty(exports, "DeclareVariable", ({
  enumerable: true,
  get: function () {
    return _index.declareVariable;
  }
}));
Object.defineProperty(exports, "DeclaredPredicate", ({
  enumerable: true,
  get: function () {
    return _index.declaredPredicate;
  }
}));
Object.defineProperty(exports, "Decorator", ({
  enumerable: true,
  get: function () {
    return _index.decorator;
  }
}));
Object.defineProperty(exports, "Directive", ({
  enumerable: true,
  get: function () {
    return _index.directive;
  }
}));
Object.defineProperty(exports, "DirectiveLiteral", ({
  enumerable: true,
  get: function () {
    return _index.directiveLiteral;
  }
}));
Object.defineProperty(exports, "DoExpression", ({
  enumerable: true,
  get: function () {
    return _index.doExpression;
  }
}));
Object.defineProperty(exports, "DoWhileStatement", ({
  enumerable: true,
  get: function () {
    return _index.doWhileStatement;
  }
}));
Object.defineProperty(exports, "EmptyStatement", ({
  enumerable: true,
  get: function () {
    return _index.emptyStatement;
  }
}));
Object.defineProperty(exports, "EmptyTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.emptyTypeAnnotation;
  }
}));
Object.defineProperty(exports, "EnumBooleanBody", ({
  enumerable: true,
  get: function () {
    return _index.enumBooleanBody;
  }
}));
Object.defineProperty(exports, "EnumBooleanMember", ({
  enumerable: true,
  get: function () {
    return _index.enumBooleanMember;
  }
}));
Object.defineProperty(exports, "EnumDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.enumDeclaration;
  }
}));
Object.defineProperty(exports, "EnumDefaultedMember", ({
  enumerable: true,
  get: function () {
    return _index.enumDefaultedMember;
  }
}));
Object.defineProperty(exports, "EnumNumberBody", ({
  enumerable: true,
  get: function () {
    return _index.enumNumberBody;
  }
}));
Object.defineProperty(exports, "EnumNumberMember", ({
  enumerable: true,
  get: function () {
    return _index.enumNumberMember;
  }
}));
Object.defineProperty(exports, "EnumStringBody", ({
  enumerable: true,
  get: function () {
    return _index.enumStringBody;
  }
}));
Object.defineProperty(exports, "EnumStringMember", ({
  enumerable: true,
  get: function () {
    return _index.enumStringMember;
  }
}));
Object.defineProperty(exports, "EnumSymbolBody", ({
  enumerable: true,
  get: function () {
    return _index.enumSymbolBody;
  }
}));
Object.defineProperty(exports, "ExistsTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.existsTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ExportAllDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.exportAllDeclaration;
  }
}));
Object.defineProperty(exports, "ExportDefaultDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.exportDefaultDeclaration;
  }
}));
Object.defineProperty(exports, "ExportDefaultSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.exportDefaultSpecifier;
  }
}));
Object.defineProperty(exports, "ExportNamedDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.exportNamedDeclaration;
  }
}));
Object.defineProperty(exports, "ExportNamespaceSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.exportNamespaceSpecifier;
  }
}));
Object.defineProperty(exports, "ExportSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.exportSpecifier;
  }
}));
Object.defineProperty(exports, "ExpressionStatement", ({
  enumerable: true,
  get: function () {
    return _index.expressionStatement;
  }
}));
Object.defineProperty(exports, "File", ({
  enumerable: true,
  get: function () {
    return _index.file;
  }
}));
Object.defineProperty(exports, "ForInStatement", ({
  enumerable: true,
  get: function () {
    return _index.forInStatement;
  }
}));
Object.defineProperty(exports, "ForOfStatement", ({
  enumerable: true,
  get: function () {
    return _index.forOfStatement;
  }
}));
Object.defineProperty(exports, "ForStatement", ({
  enumerable: true,
  get: function () {
    return _index.forStatement;
  }
}));
Object.defineProperty(exports, "FunctionDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.functionDeclaration;
  }
}));
Object.defineProperty(exports, "FunctionExpression", ({
  enumerable: true,
  get: function () {
    return _index.functionExpression;
  }
}));
Object.defineProperty(exports, "FunctionTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.functionTypeAnnotation;
  }
}));
Object.defineProperty(exports, "FunctionTypeParam", ({
  enumerable: true,
  get: function () {
    return _index.functionTypeParam;
  }
}));
Object.defineProperty(exports, "GenericTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.genericTypeAnnotation;
  }
}));
Object.defineProperty(exports, "Identifier", ({
  enumerable: true,
  get: function () {
    return _index.identifier;
  }
}));
Object.defineProperty(exports, "IfStatement", ({
  enumerable: true,
  get: function () {
    return _index.ifStatement;
  }
}));
Object.defineProperty(exports, "Import", ({
  enumerable: true,
  get: function () {
    return _index.import;
  }
}));
Object.defineProperty(exports, "ImportAttribute", ({
  enumerable: true,
  get: function () {
    return _index.importAttribute;
  }
}));
Object.defineProperty(exports, "ImportDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.importDeclaration;
  }
}));
Object.defineProperty(exports, "ImportDefaultSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.importDefaultSpecifier;
  }
}));
Object.defineProperty(exports, "ImportNamespaceSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.importNamespaceSpecifier;
  }
}));
Object.defineProperty(exports, "ImportSpecifier", ({
  enumerable: true,
  get: function () {
    return _index.importSpecifier;
  }
}));
Object.defineProperty(exports, "IndexedAccessType", ({
  enumerable: true,
  get: function () {
    return _index.indexedAccessType;
  }
}));
Object.defineProperty(exports, "InferredPredicate", ({
  enumerable: true,
  get: function () {
    return _index.inferredPredicate;
  }
}));
Object.defineProperty(exports, "InterfaceDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.interfaceDeclaration;
  }
}));
Object.defineProperty(exports, "InterfaceExtends", ({
  enumerable: true,
  get: function () {
    return _index.interfaceExtends;
  }
}));
Object.defineProperty(exports, "InterfaceTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.interfaceTypeAnnotation;
  }
}));
Object.defineProperty(exports, "InterpreterDirective", ({
  enumerable: true,
  get: function () {
    return _index.interpreterDirective;
  }
}));
Object.defineProperty(exports, "IntersectionTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.intersectionTypeAnnotation;
  }
}));
Object.defineProperty(exports, "JSXAttribute", ({
  enumerable: true,
  get: function () {
    return _index.jsxAttribute;
  }
}));
Object.defineProperty(exports, "JSXClosingElement", ({
  enumerable: true,
  get: function () {
    return _index.jsxClosingElement;
  }
}));
Object.defineProperty(exports, "JSXClosingFragment", ({
  enumerable: true,
  get: function () {
    return _index.jsxClosingFragment;
  }
}));
Object.defineProperty(exports, "JSXElement", ({
  enumerable: true,
  get: function () {
    return _index.jsxElement;
  }
}));
Object.defineProperty(exports, "JSXEmptyExpression", ({
  enumerable: true,
  get: function () {
    return _index.jsxEmptyExpression;
  }
}));
Object.defineProperty(exports, "JSXExpressionContainer", ({
  enumerable: true,
  get: function () {
    return _index.jsxExpressionContainer;
  }
}));
Object.defineProperty(exports, "JSXFragment", ({
  enumerable: true,
  get: function () {
    return _index.jsxFragment;
  }
}));
Object.defineProperty(exports, "JSXIdentifier", ({
  enumerable: true,
  get: function () {
    return _index.jsxIdentifier;
  }
}));
Object.defineProperty(exports, "JSXMemberExpression", ({
  enumerable: true,
  get: function () {
    return _index.jsxMemberExpression;
  }
}));
Object.defineProperty(exports, "JSXNamespacedName", ({
  enumerable: true,
  get: function () {
    return _index.jsxNamespacedName;
  }
}));
Object.defineProperty(exports, "JSXOpeningElement", ({
  enumerable: true,
  get: function () {
    return _index.jsxOpeningElement;
  }
}));
Object.defineProperty(exports, "JSXOpeningFragment", ({
  enumerable: true,
  get: function () {
    return _index.jsxOpeningFragment;
  }
}));
Object.defineProperty(exports, "JSXSpreadAttribute", ({
  enumerable: true,
  get: function () {
    return _index.jsxSpreadAttribute;
  }
}));
Object.defineProperty(exports, "JSXSpreadChild", ({
  enumerable: true,
  get: function () {
    return _index.jsxSpreadChild;
  }
}));
Object.defineProperty(exports, "JSXText", ({
  enumerable: true,
  get: function () {
    return _index.jsxText;
  }
}));
Object.defineProperty(exports, "LabeledStatement", ({
  enumerable: true,
  get: function () {
    return _index.labeledStatement;
  }
}));
Object.defineProperty(exports, "LogicalExpression", ({
  enumerable: true,
  get: function () {
    return _index.logicalExpression;
  }
}));
Object.defineProperty(exports, "MemberExpression", ({
  enumerable: true,
  get: function () {
    return _index.memberExpression;
  }
}));
Object.defineProperty(exports, "MetaProperty", ({
  enumerable: true,
  get: function () {
    return _index.metaProperty;
  }
}));
Object.defineProperty(exports, "MixedTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.mixedTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ModuleExpression", ({
  enumerable: true,
  get: function () {
    return _index.moduleExpression;
  }
}));
Object.defineProperty(exports, "NewExpression", ({
  enumerable: true,
  get: function () {
    return _index.newExpression;
  }
}));
Object.defineProperty(exports, "Noop", ({
  enumerable: true,
  get: function () {
    return _index.noop;
  }
}));
Object.defineProperty(exports, "NullLiteral", ({
  enumerable: true,
  get: function () {
    return _index.nullLiteral;
  }
}));
Object.defineProperty(exports, "NullLiteralTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.nullLiteralTypeAnnotation;
  }
}));
Object.defineProperty(exports, "NullableTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.nullableTypeAnnotation;
  }
}));
Object.defineProperty(exports, "NumberLiteral", ({
  enumerable: true,
  get: function () {
    return _index.numberLiteral;
  }
}));
Object.defineProperty(exports, "NumberLiteralTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.numberLiteralTypeAnnotation;
  }
}));
Object.defineProperty(exports, "NumberTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.numberTypeAnnotation;
  }
}));
Object.defineProperty(exports, "NumericLiteral", ({
  enumerable: true,
  get: function () {
    return _index.numericLiteral;
  }
}));
Object.defineProperty(exports, "ObjectExpression", ({
  enumerable: true,
  get: function () {
    return _index.objectExpression;
  }
}));
Object.defineProperty(exports, "ObjectMethod", ({
  enumerable: true,
  get: function () {
    return _index.objectMethod;
  }
}));
Object.defineProperty(exports, "ObjectPattern", ({
  enumerable: true,
  get: function () {
    return _index.objectPattern;
  }
}));
Object.defineProperty(exports, "ObjectProperty", ({
  enumerable: true,
  get: function () {
    return _index.objectProperty;
  }
}));
Object.defineProperty(exports, "ObjectTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ObjectTypeCallProperty", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeCallProperty;
  }
}));
Object.defineProperty(exports, "ObjectTypeIndexer", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeIndexer;
  }
}));
Object.defineProperty(exports, "ObjectTypeInternalSlot", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeInternalSlot;
  }
}));
Object.defineProperty(exports, "ObjectTypeProperty", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeProperty;
  }
}));
Object.defineProperty(exports, "ObjectTypeSpreadProperty", ({
  enumerable: true,
  get: function () {
    return _index.objectTypeSpreadProperty;
  }
}));
Object.defineProperty(exports, "OpaqueType", ({
  enumerable: true,
  get: function () {
    return _index.opaqueType;
  }
}));
Object.defineProperty(exports, "OptionalCallExpression", ({
  enumerable: true,
  get: function () {
    return _index.optionalCallExpression;
  }
}));
Object.defineProperty(exports, "OptionalIndexedAccessType", ({
  enumerable: true,
  get: function () {
    return _index.optionalIndexedAccessType;
  }
}));
Object.defineProperty(exports, "OptionalMemberExpression", ({
  enumerable: true,
  get: function () {
    return _index.optionalMemberExpression;
  }
}));
Object.defineProperty(exports, "ParenthesizedExpression", ({
  enumerable: true,
  get: function () {
    return _index.parenthesizedExpression;
  }
}));
Object.defineProperty(exports, "PipelineBareFunction", ({
  enumerable: true,
  get: function () {
    return _index.pipelineBareFunction;
  }
}));
Object.defineProperty(exports, "PipelinePrimaryTopicReference", ({
  enumerable: true,
  get: function () {
    return _index.pipelinePrimaryTopicReference;
  }
}));
Object.defineProperty(exports, "PipelineTopicExpression", ({
  enumerable: true,
  get: function () {
    return _index.pipelineTopicExpression;
  }
}));
Object.defineProperty(exports, "Placeholder", ({
  enumerable: true,
  get: function () {
    return _index.placeholder;
  }
}));
Object.defineProperty(exports, "PrivateName", ({
  enumerable: true,
  get: function () {
    return _index.privateName;
  }
}));
Object.defineProperty(exports, "Program", ({
  enumerable: true,
  get: function () {
    return _index.program;
  }
}));
Object.defineProperty(exports, "QualifiedTypeIdentifier", ({
  enumerable: true,
  get: function () {
    return _index.qualifiedTypeIdentifier;
  }
}));
Object.defineProperty(exports, "RecordExpression", ({
  enumerable: true,
  get: function () {
    return _index.recordExpression;
  }
}));
Object.defineProperty(exports, "RegExpLiteral", ({
  enumerable: true,
  get: function () {
    return _index.regExpLiteral;
  }
}));
Object.defineProperty(exports, "RegexLiteral", ({
  enumerable: true,
  get: function () {
    return _index.regexLiteral;
  }
}));
Object.defineProperty(exports, "RestElement", ({
  enumerable: true,
  get: function () {
    return _index.restElement;
  }
}));
Object.defineProperty(exports, "RestProperty", ({
  enumerable: true,
  get: function () {
    return _index.restProperty;
  }
}));
Object.defineProperty(exports, "ReturnStatement", ({
  enumerable: true,
  get: function () {
    return _index.returnStatement;
  }
}));
Object.defineProperty(exports, "SequenceExpression", ({
  enumerable: true,
  get: function () {
    return _index.sequenceExpression;
  }
}));
Object.defineProperty(exports, "SpreadElement", ({
  enumerable: true,
  get: function () {
    return _index.spreadElement;
  }
}));
Object.defineProperty(exports, "SpreadProperty", ({
  enumerable: true,
  get: function () {
    return _index.spreadProperty;
  }
}));
Object.defineProperty(exports, "StaticBlock", ({
  enumerable: true,
  get: function () {
    return _index.staticBlock;
  }
}));
Object.defineProperty(exports, "StringLiteral", ({
  enumerable: true,
  get: function () {
    return _index.stringLiteral;
  }
}));
Object.defineProperty(exports, "StringLiteralTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.stringLiteralTypeAnnotation;
  }
}));
Object.defineProperty(exports, "StringTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.stringTypeAnnotation;
  }
}));
Object.defineProperty(exports, "Super", ({
  enumerable: true,
  get: function () {
    return _index.super;
  }
}));
Object.defineProperty(exports, "SwitchCase", ({
  enumerable: true,
  get: function () {
    return _index.switchCase;
  }
}));
Object.defineProperty(exports, "SwitchStatement", ({
  enumerable: true,
  get: function () {
    return _index.switchStatement;
  }
}));
Object.defineProperty(exports, "SymbolTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.symbolTypeAnnotation;
  }
}));
Object.defineProperty(exports, "TSAnyKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsAnyKeyword;
  }
}));
Object.defineProperty(exports, "TSArrayType", ({
  enumerable: true,
  get: function () {
    return _index.tsArrayType;
  }
}));
Object.defineProperty(exports, "TSAsExpression", ({
  enumerable: true,
  get: function () {
    return _index.tsAsExpression;
  }
}));
Object.defineProperty(exports, "TSBigIntKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsBigIntKeyword;
  }
}));
Object.defineProperty(exports, "TSBooleanKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsBooleanKeyword;
  }
}));
Object.defineProperty(exports, "TSCallSignatureDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsCallSignatureDeclaration;
  }
}));
Object.defineProperty(exports, "TSConditionalType", ({
  enumerable: true,
  get: function () {
    return _index.tsConditionalType;
  }
}));
Object.defineProperty(exports, "TSConstructSignatureDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsConstructSignatureDeclaration;
  }
}));
Object.defineProperty(exports, "TSConstructorType", ({
  enumerable: true,
  get: function () {
    return _index.tsConstructorType;
  }
}));
Object.defineProperty(exports, "TSDeclareFunction", ({
  enumerable: true,
  get: function () {
    return _index.tsDeclareFunction;
  }
}));
Object.defineProperty(exports, "TSDeclareMethod", ({
  enumerable: true,
  get: function () {
    return _index.tsDeclareMethod;
  }
}));
Object.defineProperty(exports, "TSEnumDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsEnumDeclaration;
  }
}));
Object.defineProperty(exports, "TSEnumMember", ({
  enumerable: true,
  get: function () {
    return _index.tsEnumMember;
  }
}));
Object.defineProperty(exports, "TSExportAssignment", ({
  enumerable: true,
  get: function () {
    return _index.tsExportAssignment;
  }
}));
Object.defineProperty(exports, "TSExpressionWithTypeArguments", ({
  enumerable: true,
  get: function () {
    return _index.tsExpressionWithTypeArguments;
  }
}));
Object.defineProperty(exports, "TSExternalModuleReference", ({
  enumerable: true,
  get: function () {
    return _index.tsExternalModuleReference;
  }
}));
Object.defineProperty(exports, "TSFunctionType", ({
  enumerable: true,
  get: function () {
    return _index.tsFunctionType;
  }
}));
Object.defineProperty(exports, "TSImportEqualsDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsImportEqualsDeclaration;
  }
}));
Object.defineProperty(exports, "TSImportType", ({
  enumerable: true,
  get: function () {
    return _index.tsImportType;
  }
}));
Object.defineProperty(exports, "TSIndexSignature", ({
  enumerable: true,
  get: function () {
    return _index.tsIndexSignature;
  }
}));
Object.defineProperty(exports, "TSIndexedAccessType", ({
  enumerable: true,
  get: function () {
    return _index.tsIndexedAccessType;
  }
}));
Object.defineProperty(exports, "TSInferType", ({
  enumerable: true,
  get: function () {
    return _index.tsInferType;
  }
}));
Object.defineProperty(exports, "TSInstantiationExpression", ({
  enumerable: true,
  get: function () {
    return _index.tsInstantiationExpression;
  }
}));
Object.defineProperty(exports, "TSInterfaceBody", ({
  enumerable: true,
  get: function () {
    return _index.tsInterfaceBody;
  }
}));
Object.defineProperty(exports, "TSInterfaceDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsInterfaceDeclaration;
  }
}));
Object.defineProperty(exports, "TSIntersectionType", ({
  enumerable: true,
  get: function () {
    return _index.tsIntersectionType;
  }
}));
Object.defineProperty(exports, "TSIntrinsicKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsIntrinsicKeyword;
  }
}));
Object.defineProperty(exports, "TSLiteralType", ({
  enumerable: true,
  get: function () {
    return _index.tsLiteralType;
  }
}));
Object.defineProperty(exports, "TSMappedType", ({
  enumerable: true,
  get: function () {
    return _index.tsMappedType;
  }
}));
Object.defineProperty(exports, "TSMethodSignature", ({
  enumerable: true,
  get: function () {
    return _index.tsMethodSignature;
  }
}));
Object.defineProperty(exports, "TSModuleBlock", ({
  enumerable: true,
  get: function () {
    return _index.tsModuleBlock;
  }
}));
Object.defineProperty(exports, "TSModuleDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsModuleDeclaration;
  }
}));
Object.defineProperty(exports, "TSNamedTupleMember", ({
  enumerable: true,
  get: function () {
    return _index.tsNamedTupleMember;
  }
}));
Object.defineProperty(exports, "TSNamespaceExportDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsNamespaceExportDeclaration;
  }
}));
Object.defineProperty(exports, "TSNeverKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsNeverKeyword;
  }
}));
Object.defineProperty(exports, "TSNonNullExpression", ({
  enumerable: true,
  get: function () {
    return _index.tsNonNullExpression;
  }
}));
Object.defineProperty(exports, "TSNullKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsNullKeyword;
  }
}));
Object.defineProperty(exports, "TSNumberKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsNumberKeyword;
  }
}));
Object.defineProperty(exports, "TSObjectKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsObjectKeyword;
  }
}));
Object.defineProperty(exports, "TSOptionalType", ({
  enumerable: true,
  get: function () {
    return _index.tsOptionalType;
  }
}));
Object.defineProperty(exports, "TSParameterProperty", ({
  enumerable: true,
  get: function () {
    return _index.tsParameterProperty;
  }
}));
Object.defineProperty(exports, "TSParenthesizedType", ({
  enumerable: true,
  get: function () {
    return _index.tsParenthesizedType;
  }
}));
Object.defineProperty(exports, "TSPropertySignature", ({
  enumerable: true,
  get: function () {
    return _index.tsPropertySignature;
  }
}));
Object.defineProperty(exports, "TSQualifiedName", ({
  enumerable: true,
  get: function () {
    return _index.tsQualifiedName;
  }
}));
Object.defineProperty(exports, "TSRestType", ({
  enumerable: true,
  get: function () {
    return _index.tsRestType;
  }
}));
Object.defineProperty(exports, "TSSatisfiesExpression", ({
  enumerable: true,
  get: function () {
    return _index.tsSatisfiesExpression;
  }
}));
Object.defineProperty(exports, "TSStringKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsStringKeyword;
  }
}));
Object.defineProperty(exports, "TSSymbolKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsSymbolKeyword;
  }
}));
Object.defineProperty(exports, "TSThisType", ({
  enumerable: true,
  get: function () {
    return _index.tsThisType;
  }
}));
Object.defineProperty(exports, "TSTupleType", ({
  enumerable: true,
  get: function () {
    return _index.tsTupleType;
  }
}));
Object.defineProperty(exports, "TSTypeAliasDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeAliasDeclaration;
  }
}));
Object.defineProperty(exports, "TSTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeAnnotation;
  }
}));
Object.defineProperty(exports, "TSTypeAssertion", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeAssertion;
  }
}));
Object.defineProperty(exports, "TSTypeLiteral", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeLiteral;
  }
}));
Object.defineProperty(exports, "TSTypeOperator", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeOperator;
  }
}));
Object.defineProperty(exports, "TSTypeParameter", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeParameter;
  }
}));
Object.defineProperty(exports, "TSTypeParameterDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeParameterDeclaration;
  }
}));
Object.defineProperty(exports, "TSTypeParameterInstantiation", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeParameterInstantiation;
  }
}));
Object.defineProperty(exports, "TSTypePredicate", ({
  enumerable: true,
  get: function () {
    return _index.tsTypePredicate;
  }
}));
Object.defineProperty(exports, "TSTypeQuery", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeQuery;
  }
}));
Object.defineProperty(exports, "TSTypeReference", ({
  enumerable: true,
  get: function () {
    return _index.tsTypeReference;
  }
}));
Object.defineProperty(exports, "TSUndefinedKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsUndefinedKeyword;
  }
}));
Object.defineProperty(exports, "TSUnionType", ({
  enumerable: true,
  get: function () {
    return _index.tsUnionType;
  }
}));
Object.defineProperty(exports, "TSUnknownKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsUnknownKeyword;
  }
}));
Object.defineProperty(exports, "TSVoidKeyword", ({
  enumerable: true,
  get: function () {
    return _index.tsVoidKeyword;
  }
}));
Object.defineProperty(exports, "TaggedTemplateExpression", ({
  enumerable: true,
  get: function () {
    return _index.taggedTemplateExpression;
  }
}));
Object.defineProperty(exports, "TemplateElement", ({
  enumerable: true,
  get: function () {
    return _index.templateElement;
  }
}));
Object.defineProperty(exports, "TemplateLiteral", ({
  enumerable: true,
  get: function () {
    return _index.templateLiteral;
  }
}));
Object.defineProperty(exports, "ThisExpression", ({
  enumerable: true,
  get: function () {
    return _index.thisExpression;
  }
}));
Object.defineProperty(exports, "ThisTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.thisTypeAnnotation;
  }
}));
Object.defineProperty(exports, "ThrowStatement", ({
  enumerable: true,
  get: function () {
    return _index.throwStatement;
  }
}));
Object.defineProperty(exports, "TopicReference", ({
  enumerable: true,
  get: function () {
    return _index.topicReference;
  }
}));
Object.defineProperty(exports, "TryStatement", ({
  enumerable: true,
  get: function () {
    return _index.tryStatement;
  }
}));
Object.defineProperty(exports, "TupleExpression", ({
  enumerable: true,
  get: function () {
    return _index.tupleExpression;
  }
}));
Object.defineProperty(exports, "TupleTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.tupleTypeAnnotation;
  }
}));
Object.defineProperty(exports, "TypeAlias", ({
  enumerable: true,
  get: function () {
    return _index.typeAlias;
  }
}));
Object.defineProperty(exports, "TypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.typeAnnotation;
  }
}));
Object.defineProperty(exports, "TypeCastExpression", ({
  enumerable: true,
  get: function () {
    return _index.typeCastExpression;
  }
}));
Object.defineProperty(exports, "TypeParameter", ({
  enumerable: true,
  get: function () {
    return _index.typeParameter;
  }
}));
Object.defineProperty(exports, "TypeParameterDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.typeParameterDeclaration;
  }
}));
Object.defineProperty(exports, "TypeParameterInstantiation", ({
  enumerable: true,
  get: function () {
    return _index.typeParameterInstantiation;
  }
}));
Object.defineProperty(exports, "TypeofTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.typeofTypeAnnotation;
  }
}));
Object.defineProperty(exports, "UnaryExpression", ({
  enumerable: true,
  get: function () {
    return _index.unaryExpression;
  }
}));
Object.defineProperty(exports, "UnionTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.unionTypeAnnotation;
  }
}));
Object.defineProperty(exports, "UpdateExpression", ({
  enumerable: true,
  get: function () {
    return _index.updateExpression;
  }
}));
Object.defineProperty(exports, "V8IntrinsicIdentifier", ({
  enumerable: true,
  get: function () {
    return _index.v8IntrinsicIdentifier;
  }
}));
Object.defineProperty(exports, "VariableDeclaration", ({
  enumerable: true,
  get: function () {
    return _index.variableDeclaration;
  }
}));
Object.defineProperty(exports, "VariableDeclarator", ({
  enumerable: true,
  get: function () {
    return _index.variableDeclarator;
  }
}));
Object.defineProperty(exports, "Variance", ({
  enumerable: true,
  get: function () {
    return _index.variance;
  }
}));
Object.defineProperty(exports, "VoidTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _index.voidTypeAnnotation;
  }
}));
Object.defineProperty(exports, "WhileStatement", ({
  enumerable: true,
  get: function () {
    return _index.whileStatement;
  }
}));
Object.defineProperty(exports, "WithStatement", ({
  enumerable: true,
  get: function () {
    return _index.withStatement;
  }
}));
Object.defineProperty(exports, "YieldExpression", ({
  enumerable: true,
  get: function () {
    return _index.yieldExpression;
  }
}));
var _index = __webpack_require__(/*! ./index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");

//# sourceMappingURL=uppercase.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/react/buildChildren.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/react/buildChildren.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = buildChildren;
var _index = __webpack_require__(/*! ../../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _cleanJSXElementLiteralChild = __webpack_require__(/*! ../../utils/react/cleanJSXElementLiteralChild.js */ "./node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js");
function buildChildren(node) {
  const elements = [];
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    if ((0, _index.isJSXText)(child)) {
      (0, _cleanJSXElementLiteralChild.default)(child, elements);
      continue;
    }
    if ((0, _index.isJSXExpressionContainer)(child)) child = child.expression;
    if ((0, _index.isJSXEmptyExpression)(child)) continue;
    elements.push(child);
  }
  return elements;
}

//# sourceMappingURL=buildChildren.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createTSUnionType;
var _index = __webpack_require__(/*! ../generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _removeTypeDuplicates = __webpack_require__(/*! ../../modifications/typescript/removeTypeDuplicates.js */ "./node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js");
var _index2 = __webpack_require__(/*! ../../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function createTSUnionType(typeAnnotations) {
  const types = typeAnnotations.map(type => {
    return (0, _index2.isTSTypeAnnotation)(type) ? type.typeAnnotation : type;
  });
  const flattened = (0, _removeTypeDuplicates.default)(types);
  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _index.tsUnionType)(flattened);
  }
}

//# sourceMappingURL=createTSUnionType.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/builders/validateNode.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/builders/validateNode.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validateNode;
var _validate = __webpack_require__(/*! ../validators/validate.js */ "./node_modules/@babel/types/lib/validators/validate.js");
var _index = __webpack_require__(/*! ../index.js */ "./node_modules/@babel/types/lib/index.js");
function validateNode(node) {
  const keys = _index.BUILDER_KEYS[node.type];
  for (const key of keys) {
    (0, _validate.default)(node, key, node[key]);
  }
  return node;
}

//# sourceMappingURL=validateNode.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/clone/clone.js":
/*!******************************************************!*\
  !*** ./node_modules/@babel/types/lib/clone/clone.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = clone;
var _cloneNode = __webpack_require__(/*! ./cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
function clone(node) {
  return (0, _cloneNode.default)(node, false);
}

//# sourceMappingURL=clone.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/clone/cloneDeep.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/types/lib/clone/cloneDeep.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = cloneDeep;
var _cloneNode = __webpack_require__(/*! ./cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
function cloneDeep(node) {
  return (0, _cloneNode.default)(node);
}

//# sourceMappingURL=cloneDeep.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = cloneDeepWithoutLoc;
var _cloneNode = __webpack_require__(/*! ./cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
function cloneDeepWithoutLoc(node) {
  return (0, _cloneNode.default)(node, true, true);
}

//# sourceMappingURL=cloneDeepWithoutLoc.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/clone/cloneNode.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/types/lib/clone/cloneNode.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = cloneNode;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
var _index2 = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
const has = Function.call.bind(Object.prototype.hasOwnProperty);
function cloneIfNode(obj, deep, withoutLoc, commentsCache) {
  if (obj && typeof obj.type === "string") {
    return cloneNodeInternal(obj, deep, withoutLoc, commentsCache);
  }
  return obj;
}
function cloneIfNodeOrArray(obj, deep, withoutLoc, commentsCache) {
  if (Array.isArray(obj)) {
    return obj.map(node => cloneIfNode(node, deep, withoutLoc, commentsCache));
  }
  return cloneIfNode(obj, deep, withoutLoc, commentsCache);
}
function cloneNode(node, deep = true, withoutLoc = false) {
  return cloneNodeInternal(node, deep, withoutLoc, new Map());
}
function cloneNodeInternal(node, deep = true, withoutLoc = false, commentsCache) {
  if (!node) return node;
  const {
    type
  } = node;
  const newNode = {
    type: node.type
  };
  if ((0, _index2.isIdentifier)(node)) {
    newNode.name = node.name;
    if (has(node, "optional") && typeof node.optional === "boolean") {
      newNode.optional = node.optional;
    }
    if (has(node, "typeAnnotation")) {
      newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, true, withoutLoc, commentsCache) : node.typeAnnotation;
    }
  } else if (!has(_index.NODE_FIELDS, type)) {
    throw new Error(`Unknown node type: "${type}"`);
  } else {
    for (const field of Object.keys(_index.NODE_FIELDS[type])) {
      if (has(node, field)) {
        if (deep) {
          newNode[field] = (0, _index2.isFile)(node) && field === "comments" ? maybeCloneComments(node.comments, deep, withoutLoc, commentsCache) : cloneIfNodeOrArray(node[field], true, withoutLoc, commentsCache);
        } else {
          newNode[field] = node[field];
        }
      }
    }
  }
  if (has(node, "loc")) {
    if (withoutLoc) {
      newNode.loc = null;
    } else {
      newNode.loc = node.loc;
    }
  }
  if (has(node, "leadingComments")) {
    newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc, commentsCache);
  }
  if (has(node, "innerComments")) {
    newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc, commentsCache);
  }
  if (has(node, "trailingComments")) {
    newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc, commentsCache);
  }
  if (has(node, "extra")) {
    newNode.extra = Object.assign({}, node.extra);
  }
  return newNode;
}
function maybeCloneComments(comments, deep, withoutLoc, commentsCache) {
  if (!comments || !deep) {
    return comments;
  }
  return comments.map(comment => {
    const cache = commentsCache.get(comment);
    if (cache) return cache;
    const {
      type,
      value,
      loc
    } = comment;
    const ret = {
      type,
      value,
      loc
    };
    if (withoutLoc) {
      ret.loc = null;
    }
    commentsCache.set(comment, ret);
    return ret;
  });
}

//# sourceMappingURL=cloneNode.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/clone/cloneWithoutLoc.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/clone/cloneWithoutLoc.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = cloneWithoutLoc;
var _cloneNode = __webpack_require__(/*! ./cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
function cloneWithoutLoc(node) {
  return (0, _cloneNode.default)(node, false, true);
}

//# sourceMappingURL=cloneWithoutLoc.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/addComment.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/addComment.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = addComment;
var _addComments = __webpack_require__(/*! ./addComments.js */ "./node_modules/@babel/types/lib/comments/addComments.js");
function addComment(node, type, content, line) {
  return (0, _addComments.default)(node, type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}

//# sourceMappingURL=addComment.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/addComments.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/addComments.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = addComments;
function addComments(node, type, comments) {
  if (!comments || !node) return node;
  const key = `${type}Comments`;
  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key].push(...comments);
    }
  } else {
    node[key] = comments;
  }
  return node;
}

//# sourceMappingURL=addComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/inheritInnerComments.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/inheritInnerComments.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inheritInnerComments;
var _inherit = __webpack_require__(/*! ../utils/inherit.js */ "./node_modules/@babel/types/lib/utils/inherit.js");
function inheritInnerComments(child, parent) {
  (0, _inherit.default)("innerComments", child, parent);
}

//# sourceMappingURL=inheritInnerComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/inheritLeadingComments.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/inheritLeadingComments.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inheritLeadingComments;
var _inherit = __webpack_require__(/*! ../utils/inherit.js */ "./node_modules/@babel/types/lib/utils/inherit.js");
function inheritLeadingComments(child, parent) {
  (0, _inherit.default)("leadingComments", child, parent);
}

//# sourceMappingURL=inheritLeadingComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/inheritTrailingComments.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/inheritTrailingComments.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inheritTrailingComments;
var _inherit = __webpack_require__(/*! ../utils/inherit.js */ "./node_modules/@babel/types/lib/utils/inherit.js");
function inheritTrailingComments(child, parent) {
  (0, _inherit.default)("trailingComments", child, parent);
}

//# sourceMappingURL=inheritTrailingComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/inheritsComments.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/inheritsComments.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inheritsComments;
var _inheritTrailingComments = __webpack_require__(/*! ./inheritTrailingComments.js */ "./node_modules/@babel/types/lib/comments/inheritTrailingComments.js");
var _inheritLeadingComments = __webpack_require__(/*! ./inheritLeadingComments.js */ "./node_modules/@babel/types/lib/comments/inheritLeadingComments.js");
var _inheritInnerComments = __webpack_require__(/*! ./inheritInnerComments.js */ "./node_modules/@babel/types/lib/comments/inheritInnerComments.js");
function inheritsComments(child, parent) {
  (0, _inheritTrailingComments.default)(child, parent);
  (0, _inheritLeadingComments.default)(child, parent);
  (0, _inheritInnerComments.default)(child, parent);
  return child;
}

//# sourceMappingURL=inheritsComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/comments/removeComments.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/comments/removeComments.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeComments;
var _index = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
function removeComments(node) {
  _index.COMMENT_KEYS.forEach(key => {
    node[key] = null;
  });
  return node;
}

//# sourceMappingURL=removeComments.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/constants/generated/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/constants/generated/index.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WHILE_TYPES = exports.USERWHITESPACABLE_TYPES = exports.UNARYLIKE_TYPES = exports.TYPESCRIPT_TYPES = exports.TSTYPE_TYPES = exports.TSTYPEELEMENT_TYPES = exports.TSENTITYNAME_TYPES = exports.TSBASETYPE_TYPES = exports.TERMINATORLESS_TYPES = exports.STATEMENT_TYPES = exports.STANDARDIZED_TYPES = exports.SCOPABLE_TYPES = exports.PUREISH_TYPES = exports.PROPERTY_TYPES = exports.PRIVATE_TYPES = exports.PATTERN_TYPES = exports.PATTERNLIKE_TYPES = exports.OBJECTMEMBER_TYPES = exports.MODULESPECIFIER_TYPES = exports.MODULEDECLARATION_TYPES = exports.MISCELLANEOUS_TYPES = exports.METHOD_TYPES = exports.LVAL_TYPES = exports.LOOP_TYPES = exports.LITERAL_TYPES = exports.JSX_TYPES = exports.IMPORTOREXPORTDECLARATION_TYPES = exports.IMMUTABLE_TYPES = exports.FUNCTION_TYPES = exports.FUNCTIONPARENT_TYPES = exports.FOR_TYPES = exports.FORXSTATEMENT_TYPES = exports.FLOW_TYPES = exports.FLOWTYPE_TYPES = exports.FLOWPREDICATE_TYPES = exports.FLOWDECLARATION_TYPES = exports.FLOWBASEANNOTATION_TYPES = exports.EXPRESSION_TYPES = exports.EXPRESSIONWRAPPER_TYPES = exports.EXPORTDECLARATION_TYPES = exports.ENUMMEMBER_TYPES = exports.ENUMBODY_TYPES = exports.DECLARATION_TYPES = exports.CONDITIONAL_TYPES = exports.COMPLETIONSTATEMENT_TYPES = exports.CLASS_TYPES = exports.BLOCK_TYPES = exports.BLOCKPARENT_TYPES = exports.BINARY_TYPES = exports.ACCESSOR_TYPES = void 0;
var _index = __webpack_require__(/*! ../../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
const STANDARDIZED_TYPES = _index.FLIPPED_ALIAS_KEYS["Standardized"];
exports.STANDARDIZED_TYPES = STANDARDIZED_TYPES;
const EXPRESSION_TYPES = _index.FLIPPED_ALIAS_KEYS["Expression"];
exports.EXPRESSION_TYPES = EXPRESSION_TYPES;
const BINARY_TYPES = _index.FLIPPED_ALIAS_KEYS["Binary"];
exports.BINARY_TYPES = BINARY_TYPES;
const SCOPABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["Scopable"];
exports.SCOPABLE_TYPES = SCOPABLE_TYPES;
const BLOCKPARENT_TYPES = _index.FLIPPED_ALIAS_KEYS["BlockParent"];
exports.BLOCKPARENT_TYPES = BLOCKPARENT_TYPES;
const BLOCK_TYPES = _index.FLIPPED_ALIAS_KEYS["Block"];
exports.BLOCK_TYPES = BLOCK_TYPES;
const STATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["Statement"];
exports.STATEMENT_TYPES = STATEMENT_TYPES;
const TERMINATORLESS_TYPES = _index.FLIPPED_ALIAS_KEYS["Terminatorless"];
exports.TERMINATORLESS_TYPES = TERMINATORLESS_TYPES;
const COMPLETIONSTATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["CompletionStatement"];
exports.COMPLETIONSTATEMENT_TYPES = COMPLETIONSTATEMENT_TYPES;
const CONDITIONAL_TYPES = _index.FLIPPED_ALIAS_KEYS["Conditional"];
exports.CONDITIONAL_TYPES = CONDITIONAL_TYPES;
const LOOP_TYPES = _index.FLIPPED_ALIAS_KEYS["Loop"];
exports.LOOP_TYPES = LOOP_TYPES;
const WHILE_TYPES = _index.FLIPPED_ALIAS_KEYS["While"];
exports.WHILE_TYPES = WHILE_TYPES;
const EXPRESSIONWRAPPER_TYPES = _index.FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
exports.EXPRESSIONWRAPPER_TYPES = EXPRESSIONWRAPPER_TYPES;
const FOR_TYPES = _index.FLIPPED_ALIAS_KEYS["For"];
exports.FOR_TYPES = FOR_TYPES;
const FORXSTATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["ForXStatement"];
exports.FORXSTATEMENT_TYPES = FORXSTATEMENT_TYPES;
const FUNCTION_TYPES = _index.FLIPPED_ALIAS_KEYS["Function"];
exports.FUNCTION_TYPES = FUNCTION_TYPES;
const FUNCTIONPARENT_TYPES = _index.FLIPPED_ALIAS_KEYS["FunctionParent"];
exports.FUNCTIONPARENT_TYPES = FUNCTIONPARENT_TYPES;
const PUREISH_TYPES = _index.FLIPPED_ALIAS_KEYS["Pureish"];
exports.PUREISH_TYPES = PUREISH_TYPES;
const DECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["Declaration"];
exports.DECLARATION_TYPES = DECLARATION_TYPES;
const PATTERNLIKE_TYPES = _index.FLIPPED_ALIAS_KEYS["PatternLike"];
exports.PATTERNLIKE_TYPES = PATTERNLIKE_TYPES;
const LVAL_TYPES = _index.FLIPPED_ALIAS_KEYS["LVal"];
exports.LVAL_TYPES = LVAL_TYPES;
const TSENTITYNAME_TYPES = _index.FLIPPED_ALIAS_KEYS["TSEntityName"];
exports.TSENTITYNAME_TYPES = TSENTITYNAME_TYPES;
const LITERAL_TYPES = _index.FLIPPED_ALIAS_KEYS["Literal"];
exports.LITERAL_TYPES = LITERAL_TYPES;
const IMMUTABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["Immutable"];
exports.IMMUTABLE_TYPES = IMMUTABLE_TYPES;
const USERWHITESPACABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["UserWhitespacable"];
exports.USERWHITESPACABLE_TYPES = USERWHITESPACABLE_TYPES;
const METHOD_TYPES = _index.FLIPPED_ALIAS_KEYS["Method"];
exports.METHOD_TYPES = METHOD_TYPES;
const OBJECTMEMBER_TYPES = _index.FLIPPED_ALIAS_KEYS["ObjectMember"];
exports.OBJECTMEMBER_TYPES = OBJECTMEMBER_TYPES;
const PROPERTY_TYPES = _index.FLIPPED_ALIAS_KEYS["Property"];
exports.PROPERTY_TYPES = PROPERTY_TYPES;
const UNARYLIKE_TYPES = _index.FLIPPED_ALIAS_KEYS["UnaryLike"];
exports.UNARYLIKE_TYPES = UNARYLIKE_TYPES;
const PATTERN_TYPES = _index.FLIPPED_ALIAS_KEYS["Pattern"];
exports.PATTERN_TYPES = PATTERN_TYPES;
const CLASS_TYPES = _index.FLIPPED_ALIAS_KEYS["Class"];
exports.CLASS_TYPES = CLASS_TYPES;
const IMPORTOREXPORTDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["ImportOrExportDeclaration"];
exports.IMPORTOREXPORTDECLARATION_TYPES = IMPORTOREXPORTDECLARATION_TYPES;
const EXPORTDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["ExportDeclaration"];
exports.EXPORTDECLARATION_TYPES = EXPORTDECLARATION_TYPES;
const MODULESPECIFIER_TYPES = _index.FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
exports.MODULESPECIFIER_TYPES = MODULESPECIFIER_TYPES;
const ACCESSOR_TYPES = _index.FLIPPED_ALIAS_KEYS["Accessor"];
exports.ACCESSOR_TYPES = ACCESSOR_TYPES;
const PRIVATE_TYPES = _index.FLIPPED_ALIAS_KEYS["Private"];
exports.PRIVATE_TYPES = PRIVATE_TYPES;
const FLOW_TYPES = _index.FLIPPED_ALIAS_KEYS["Flow"];
exports.FLOW_TYPES = FLOW_TYPES;
const FLOWTYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowType"];
exports.FLOWTYPE_TYPES = FLOWTYPE_TYPES;
const FLOWBASEANNOTATION_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
exports.FLOWBASEANNOTATION_TYPES = FLOWBASEANNOTATION_TYPES;
const FLOWDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowDeclaration"];
exports.FLOWDECLARATION_TYPES = FLOWDECLARATION_TYPES;
const FLOWPREDICATE_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowPredicate"];
exports.FLOWPREDICATE_TYPES = FLOWPREDICATE_TYPES;
const ENUMBODY_TYPES = _index.FLIPPED_ALIAS_KEYS["EnumBody"];
exports.ENUMBODY_TYPES = ENUMBODY_TYPES;
const ENUMMEMBER_TYPES = _index.FLIPPED_ALIAS_KEYS["EnumMember"];
exports.ENUMMEMBER_TYPES = ENUMMEMBER_TYPES;
const JSX_TYPES = _index.FLIPPED_ALIAS_KEYS["JSX"];
exports.JSX_TYPES = JSX_TYPES;
const MISCELLANEOUS_TYPES = _index.FLIPPED_ALIAS_KEYS["Miscellaneous"];
exports.MISCELLANEOUS_TYPES = MISCELLANEOUS_TYPES;
const TYPESCRIPT_TYPES = _index.FLIPPED_ALIAS_KEYS["TypeScript"];
exports.TYPESCRIPT_TYPES = TYPESCRIPT_TYPES;
const TSTYPEELEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["TSTypeElement"];
exports.TSTYPEELEMENT_TYPES = TSTYPEELEMENT_TYPES;
const TSTYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["TSType"];
exports.TSTYPE_TYPES = TSTYPE_TYPES;
const TSBASETYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["TSBaseType"];
exports.TSBASETYPE_TYPES = TSBASETYPE_TYPES;
const MODULEDECLARATION_TYPES = IMPORTOREXPORTDECLARATION_TYPES;
exports.MODULEDECLARATION_TYPES = MODULEDECLARATION_TYPES;

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/constants/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/types/lib/constants/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UPDATE_OPERATORS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.STATEMENT_OR_BLOCK_KEYS = exports.NUMBER_UNARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.NOT_LOCAL_BINDING = exports.LOGICAL_OPERATORS = exports.INHERIT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.EQUALITY_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.COMMENT_KEYS = exports.BOOLEAN_UNARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.BLOCK_SCOPED_SYMBOL = exports.BINARY_OPERATORS = exports.ASSIGNMENT_OPERATORS = void 0;
const STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
exports.STATEMENT_OR_BLOCK_KEYS = STATEMENT_OR_BLOCK_KEYS;
const FLATTENABLE_KEYS = ["body", "expressions"];
exports.FLATTENABLE_KEYS = FLATTENABLE_KEYS;
const FOR_INIT_KEYS = ["left", "init"];
exports.FOR_INIT_KEYS = FOR_INIT_KEYS;
const COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
exports.COMMENT_KEYS = COMMENT_KEYS;
const LOGICAL_OPERATORS = ["||", "&&", "??"];
exports.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
const UPDATE_OPERATORS = ["++", "--"];
exports.UPDATE_OPERATORS = UPDATE_OPERATORS;
const BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
exports.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
const EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
exports.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
const COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
exports.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
const BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
exports.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
const NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
exports.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
const BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS, "|>"];
exports.BINARY_OPERATORS = BINARY_OPERATORS;
const ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map(op => op + "="), ...LOGICAL_OPERATORS.map(op => op + "=")];
exports.ASSIGNMENT_OPERATORS = ASSIGNMENT_OPERATORS;
const BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
exports.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
const NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
exports.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
const STRING_UNARY_OPERATORS = ["typeof"];
exports.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
const UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
exports.UNARY_OPERATORS = UNARY_OPERATORS;
const INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["start", "loc", "end"]
};
exports.INHERIT_KEYS = INHERIT_KEYS;
const BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
exports.BLOCK_SCOPED_SYMBOL = BLOCK_SCOPED_SYMBOL;
const NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
exports.NOT_LOCAL_BINDING = NOT_LOCAL_BINDING;

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/ensureBlock.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/ensureBlock.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = ensureBlock;
var _toBlock = __webpack_require__(/*! ./toBlock.js */ "./node_modules/@babel/types/lib/converters/toBlock.js");
function ensureBlock(node, key = "body") {
  const result = (0, _toBlock.default)(node[key], node);
  node[key] = result;
  return result;
}

//# sourceMappingURL=ensureBlock.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = gatherSequenceExpressions;
var _getBindingIdentifiers = __webpack_require__(/*! ../retrievers/getBindingIdentifiers.js */ "./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js");
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _cloneNode = __webpack_require__(/*! ../clone/cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
function gatherSequenceExpressions(nodes, scope, declars) {
  const exprs = [];
  let ensureLastUndefined = true;
  for (const node of nodes) {
    if (!(0, _index.isEmptyStatement)(node)) {
      ensureLastUndefined = false;
    }
    if ((0, _index.isExpression)(node)) {
      exprs.push(node);
    } else if ((0, _index.isExpressionStatement)(node)) {
      exprs.push(node.expression);
    } else if ((0, _index.isVariableDeclaration)(node)) {
      if (node.kind !== "var") return;
      for (const declar of node.declarations) {
        const bindings = (0, _getBindingIdentifiers.default)(declar);
        for (const key of Object.keys(bindings)) {
          declars.push({
            kind: node.kind,
            id: (0, _cloneNode.default)(bindings[key])
          });
        }
        if (declar.init) {
          exprs.push((0, _index2.assignmentExpression)("=", declar.id, declar.init));
        }
      }
      ensureLastUndefined = true;
    } else if ((0, _index.isIfStatement)(node)) {
      const consequent = node.consequent ? gatherSequenceExpressions([node.consequent], scope, declars) : scope.buildUndefinedNode();
      const alternate = node.alternate ? gatherSequenceExpressions([node.alternate], scope, declars) : scope.buildUndefinedNode();
      if (!consequent || !alternate) return;
      exprs.push((0, _index2.conditionalExpression)(node.test, consequent, alternate));
    } else if ((0, _index.isBlockStatement)(node)) {
      const body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body) return;
      exprs.push(body);
    } else if ((0, _index.isEmptyStatement)(node)) {
      if (nodes.indexOf(node) === 0) {
        ensureLastUndefined = true;
      }
    } else {
      return;
    }
  }
  if (ensureLastUndefined) {
    exprs.push(scope.buildUndefinedNode());
  }
  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return (0, _index2.sequenceExpression)(exprs);
  }
}

//# sourceMappingURL=gatherSequenceExpressions.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toBindingIdentifierName.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toBindingIdentifierName.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toBindingIdentifierName;
var _toIdentifier = __webpack_require__(/*! ./toIdentifier.js */ "./node_modules/@babel/types/lib/converters/toIdentifier.js");
function toBindingIdentifierName(name) {
  name = (0, _toIdentifier.default)(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}

//# sourceMappingURL=toBindingIdentifierName.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toBlock.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toBlock.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toBlock;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
function toBlock(node, parent) {
  if ((0, _index.isBlockStatement)(node)) {
    return node;
  }
  let blockNodes = [];
  if ((0, _index.isEmptyStatement)(node)) {
    blockNodes = [];
  } else {
    if (!(0, _index.isStatement)(node)) {
      if ((0, _index.isFunction)(parent)) {
        node = (0, _index2.returnStatement)(node);
      } else {
        node = (0, _index2.expressionStatement)(node);
      }
    }
    blockNodes = [node];
  }
  return (0, _index2.blockStatement)(blockNodes);
}

//# sourceMappingURL=toBlock.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toComputedKey.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toComputedKey.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toComputedKey;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
function toComputedKey(node, key = node.key || node.property) {
  if (!node.computed && (0, _index.isIdentifier)(key)) key = (0, _index2.stringLiteral)(key.name);
  return key;
}

//# sourceMappingURL=toComputedKey.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toExpression.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toExpression.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _default = toExpression;
exports["default"] = _default;
function toExpression(node) {
  if ((0, _index.isExpressionStatement)(node)) {
    node = node.expression;
  }
  if ((0, _index.isExpression)(node)) {
    return node;
  }
  if ((0, _index.isClass)(node)) {
    node.type = "ClassExpression";
  } else if ((0, _index.isFunction)(node)) {
    node.type = "FunctionExpression";
  }
  if (!(0, _index.isExpression)(node)) {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }
  return node;
}

//# sourceMappingURL=toExpression.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toIdentifier.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toIdentifier.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toIdentifier;
var _isValidIdentifier = __webpack_require__(/*! ../validators/isValidIdentifier.js */ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js");
var _helperValidatorIdentifier = __webpack_require__(/*! @babel/helper-validator-identifier */ "./node_modules/@babel/helper-validator-identifier/lib/index.js");
function toIdentifier(input) {
  input = input + "";
  let name = "";
  for (const c of input) {
    name += (0, _helperValidatorIdentifier.isIdentifierChar)(c.codePointAt(0)) ? c : "-";
  }
  name = name.replace(/^[-0-9]+/, "");
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
  if (!(0, _isValidIdentifier.default)(name)) {
    name = `_${name}`;
  }
  return name || "_";
}

//# sourceMappingURL=toIdentifier.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toKeyAlias.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toKeyAlias.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toKeyAlias;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _cloneNode = __webpack_require__(/*! ../clone/cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
var _removePropertiesDeep = __webpack_require__(/*! ../modifications/removePropertiesDeep.js */ "./node_modules/@babel/types/lib/modifications/removePropertiesDeep.js");
function toKeyAlias(node, key = node.key) {
  let alias;
  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if ((0, _index.isIdentifier)(key)) {
    alias = key.name;
  } else if ((0, _index.isStringLiteral)(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode.default)(key)));
  }
  if (node.computed) {
    alias = `[${alias}]`;
  }
  if (node.static) {
    alias = `static:${alias}`;
  }
  return alias;
}
toKeyAlias.uid = 0;
toKeyAlias.increment = function () {
  if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
    return toKeyAlias.uid = 0;
  } else {
    return toKeyAlias.uid++;
  }
};

//# sourceMappingURL=toKeyAlias.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toSequenceExpression.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toSequenceExpression.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toSequenceExpression;
var _gatherSequenceExpressions = __webpack_require__(/*! ./gatherSequenceExpressions.js */ "./node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js");
function toSequenceExpression(nodes, scope) {
  if (!(nodes != null && nodes.length)) return;
  const declars = [];
  const result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
  if (!result) return;
  for (const declar of declars) {
    scope.push(declar);
  }
  return result;
}

//# sourceMappingURL=toSequenceExpression.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/toStatement.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/toStatement.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _default = toStatement;
exports["default"] = _default;
function toStatement(node, ignore) {
  if ((0, _index.isStatement)(node)) {
    return node;
  }
  let mustHaveId = false;
  let newType;
  if ((0, _index.isClass)(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if ((0, _index.isFunction)(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if ((0, _index.isAssignmentExpression)(node)) {
    return (0, _index2.expressionStatement)(node);
  }
  if (mustHaveId && !node.id) {
    newType = false;
  }
  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
  }
  node.type = newType;
  return node;
}

//# sourceMappingURL=toStatement.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/converters/valueToNode.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/converters/valueToNode.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _isValidIdentifier = __webpack_require__(/*! ../validators/isValidIdentifier.js */ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js");
var _index = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _default = valueToNode;
exports["default"] = _default;
const objectToString = Function.call.bind(Object.prototype.toString);
function isRegExp(value) {
  return objectToString(value) === "[object RegExp]";
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || Object.getPrototypeOf(proto) === null;
}
function valueToNode(value) {
  if (value === undefined) {
    return (0, _index.identifier)("undefined");
  }
  if (value === true || value === false) {
    return (0, _index.booleanLiteral)(value);
  }
  if (value === null) {
    return (0, _index.nullLiteral)();
  }
  if (typeof value === "string") {
    return (0, _index.stringLiteral)(value);
  }
  if (typeof value === "number") {
    let result;
    if (Number.isFinite(value)) {
      result = (0, _index.numericLiteral)(Math.abs(value));
    } else {
      let numerator;
      if (Number.isNaN(value)) {
        numerator = (0, _index.numericLiteral)(0);
      } else {
        numerator = (0, _index.numericLiteral)(1);
      }
      result = (0, _index.binaryExpression)("/", numerator, (0, _index.numericLiteral)(0));
    }
    if (value < 0 || Object.is(value, -0)) {
      result = (0, _index.unaryExpression)("-", result);
    }
    return result;
  }
  if (isRegExp(value)) {
    const pattern = value.source;
    const flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return (0, _index.regExpLiteral)(pattern, flags);
  }
  if (Array.isArray(value)) {
    return (0, _index.arrayExpression)(value.map(valueToNode));
  }
  if (isPlainObject(value)) {
    const props = [];
    for (const key of Object.keys(value)) {
      let nodeKey;
      if ((0, _isValidIdentifier.default)(key)) {
        nodeKey = (0, _index.identifier)(key);
      } else {
        nodeKey = (0, _index.stringLiteral)(key);
      }
      props.push((0, _index.objectProperty)(nodeKey, valueToNode(value[key])));
    }
    return (0, _index.objectExpression)(props);
  }
  throw new Error("don't know how to turn this value into a node");
}

//# sourceMappingURL=valueToNode.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/core.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/core.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.patternLikeCommon = exports.functionTypeAnnotationCommon = exports.functionDeclarationCommon = exports.functionCommon = exports.classMethodOrPropertyCommon = exports.classMethodOrDeclareMethodCommon = void 0;
var _is = __webpack_require__(/*! ../validators/is.js */ "./node_modules/@babel/types/lib/validators/is.js");
var _isValidIdentifier = __webpack_require__(/*! ../validators/isValidIdentifier.js */ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js");
var _helperValidatorIdentifier = __webpack_require__(/*! @babel/helper-validator-identifier */ "./node_modules/@babel/helper-validator-identifier/lib/index.js");
var _helperStringParser = __webpack_require__(/*! @babel/helper-string-parser */ "./node_modules/@babel/helper-string-parser/lib/index.js");
var _index = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
const defineType = (0, _utils.defineAliasedType)("Standardized");
defineType("ArrayExpression", {
  fields: {
    elements: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
      default: !process.env.BABEL_TYPES_8_BREAKING ? [] : undefined
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});
defineType("AssignmentExpression", {
  fields: {
    operator: {
      validate: function () {
        if (!process.env.BABEL_TYPES_8_BREAKING) {
          return (0, _utils.assertValueType)("string");
        }
        const identifier = (0, _utils.assertOneOf)(..._index.ASSIGNMENT_OPERATORS);
        const pattern = (0, _utils.assertOneOf)("=");
        return function (node, key, val) {
          const validator = (0, _is.default)("Pattern", node.left) ? pattern : identifier;
          validator(node, key, val);
        };
      }()
    },
    left: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal") : (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});
defineType("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: (0, _utils.assertOneOf)(..._index.BINARY_OPERATORS)
    },
    left: {
      validate: function () {
        const expression = (0, _utils.assertNodeType)("Expression");
        const inOp = (0, _utils.assertNodeType)("Expression", "PrivateName");
        const validator = Object.assign(function (node, key, val) {
          const validator = node.operator === "in" ? inOp : expression;
          validator(node, key, val);
        }, {
          oneOfNodeTypes: ["Expression", "PrivateName"]
        });
        return validator;
      }()
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});
defineType("InterpreterDirective", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  }
});
defineType("Directive", {
  visitor: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertNodeType)("DirectiveLiteral")
    }
  }
});
defineType("DirectiveLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  }
});
defineType("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});
defineType("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});
defineType("CallExpression", {
  visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
  builder: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: Object.assign({
    callee: {
      validate: (0, _utils.assertNodeType)("Expression", "Super", "V8IntrinsicIdentifier")
    },
    arguments: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
    }
  }, !process.env.BABEL_TYPES_8_BREAKING ? {
    optional: {
      validate: (0, _utils.assertOneOf)(true, false),
      optional: true
    }
  } : {}, {
    typeArguments: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
      optional: true
    }
  })
});
defineType("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    }
  },
  aliases: ["Scopable", "BlockParent"]
});
defineType("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    alternate: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression", "Conditional"]
});
defineType("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});
defineType("DebuggerStatement", {
  aliases: ["Statement"]
});
defineType("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});
defineType("EmptyStatement", {
  aliases: ["Statement"]
});
defineType("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  aliases: ["Statement", "ExpressionWrapper"]
});
defineType("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: (0, _utils.assertNodeType)("Program")
    },
    comments: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? Object.assign(() => {}, {
        each: {
          oneOfNodeTypes: ["CommentBlock", "CommentLine"]
        }
      }) : (0, _utils.assertEach)((0, _utils.assertNodeType)("CommentBlock", "CommentLine")),
      optional: true
    },
    tokens: {
      validate: (0, _utils.assertEach)(Object.assign(() => {}, {
        type: "any"
      })),
      optional: true
    }
  }
});
defineType("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("VariableDeclaration", "LVal") : (0, _utils.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
defineType("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: (0, _utils.assertNodeType)("VariableDeclaration", "Expression"),
      optional: true
    },
    test: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    update: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
const functionCommon = () => ({
  params: {
    validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement")))
  },
  generator: {
    default: false
  },
  async: {
    default: false
  }
});
exports.functionCommon = functionCommon;
const functionTypeAnnotationCommon = () => ({
  returnType: {
    validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
    optional: true
  },
  typeParameters: {
    validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
    optional: true
  }
});
exports.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
const functionDeclarationCommon = () => Object.assign({}, functionCommon(), {
  declare: {
    validate: (0, _utils.assertValueType)("boolean"),
    optional: true
  },
  id: {
    validate: (0, _utils.assertNodeType)("Identifier"),
    optional: true
  }
});
exports.functionDeclarationCommon = functionDeclarationCommon;
defineType("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: Object.assign({}, functionDeclarationCommon(), functionTypeAnnotationCommon(), {
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    },
    predicate: {
      validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
      optional: true
    }
  }),
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"],
  validate: function () {
    if (!process.env.BABEL_TYPES_8_BREAKING) return () => {};
    const identifier = (0, _utils.assertNodeType)("Identifier");
    return function (parent, key, node) {
      if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
        identifier(node, "id", node.id);
      }
    };
  }()
});
defineType("FunctionExpression", {
  inherits: "FunctionDeclaration",
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
    id: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    },
    predicate: {
      validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
      optional: true
    }
  })
});
const patternLikeCommon = () => ({
  typeAnnotation: {
    validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
    optional: true
  },
  optional: {
    validate: (0, _utils.assertValueType)("boolean"),
    optional: true
  },
  decorators: {
    validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
    optional: true
  }
});
exports.patternLikeCommon = patternLikeCommon;
defineType("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation", "decorators"],
  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
  fields: Object.assign({}, patternLikeCommon(), {
    name: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (!(0, _isValidIdentifier.default)(val, false)) {
          throw new TypeError(`"${val}" is not a valid identifier name`);
        }
      }, {
        type: "string"
      }))
    }
  }),
  validate(parent, key, node) {
    if (!process.env.BABEL_TYPES_8_BREAKING) return;
    const match = /\.(\w+)$/.exec(key);
    if (!match) return;
    const [, parentKey] = match;
    const nonComp = {
      computed: false
    };
    if (parentKey === "property") {
      if ((0, _is.default)("MemberExpression", parent, nonComp)) return;
      if ((0, _is.default)("OptionalMemberExpression", parent, nonComp)) return;
    } else if (parentKey === "key") {
      if ((0, _is.default)("Property", parent, nonComp)) return;
      if ((0, _is.default)("Method", parent, nonComp)) return;
    } else if (parentKey === "exported") {
      if ((0, _is.default)("ExportSpecifier", parent)) return;
    } else if (parentKey === "imported") {
      if ((0, _is.default)("ImportSpecifier", parent, {
        imported: node
      })) return;
    } else if (parentKey === "meta") {
      if ((0, _is.default)("MetaProperty", parent, {
        meta: node
      })) return;
    }
    if (((0, _helperValidatorIdentifier.isKeyword)(node.name) || (0, _helperValidatorIdentifier.isReservedWord)(node.name, false)) && node.name !== "this") {
      throw new TypeError(`"${node.name}" is not a valid identifier`);
    }
  }
});
defineType("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement", "Conditional"],
  fields: {
    test: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _utils.assertNodeType)("Statement")
    },
    alternate: {
      optional: true,
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
defineType("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: (0, _utils.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
defineType("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType("NumericLiteral", {
  builder: ["value"],
  deprecatedAlias: "NumberLiteral",
  fields: {
    value: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("number"), Object.assign(function (node, key, val) {
        if (1 / val < 0 || !Number.isFinite(val)) {
          const error = new Error("NumericLiterals must be non-negative finite numbers. " + `You can use t.valueToNode(${val}) instead.`);
          {}
        }
      }, {
        type: "number"
      }))
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType("NullLiteral", {
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("boolean")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType("RegExpLiteral", {
  builder: ["pattern", "flags"],
  deprecatedAlias: "RegexLiteral",
  aliases: ["Expression", "Pureish", "Literal"],
  fields: {
    pattern: {
      validate: (0, _utils.assertValueType)("string")
    },
    flags: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        const invalid = /[^gimsuy]/.exec(val);
        if (invalid) {
          throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
        }
      }, {
        type: "string"
      })),
      default: ""
    }
  }
});
defineType("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      validate: (0, _utils.assertOneOf)(..._index.LOGICAL_OPERATORS)
    },
    left: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("MemberExpression", {
  builder: ["object", "property", "computed", ...(!process.env.BABEL_TYPES_8_BREAKING ? ["optional"] : [])],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: Object.assign({
    object: {
      validate: (0, _utils.assertNodeType)("Expression", "Super")
    },
    property: {
      validate: function () {
        const normal = (0, _utils.assertNodeType)("Identifier", "PrivateName");
        const computed = (0, _utils.assertNodeType)("Expression");
        const validator = function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
        return validator;
      }()
    },
    computed: {
      default: false
    }
  }, !process.env.BABEL_TYPES_8_BREAKING ? {
    optional: {
      validate: (0, _utils.assertOneOf)(true, false),
      optional: true
    }
  } : {})
});
defineType("NewExpression", {
  inherits: "CallExpression"
});
defineType("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives", "sourceType", "interpreter"],
  fields: {
    sourceFile: {
      validate: (0, _utils.assertValueType)("string")
    },
    sourceType: {
      validate: (0, _utils.assertOneOf)("script", "module"),
      default: "script"
    },
    interpreter: {
      validate: (0, _utils.assertNodeType)("InterpreterDirective"),
      default: null,
      optional: true
    },
    directives: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block"]
});
defineType("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
    }
  }
});
defineType("ObjectMethod", {
  builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
  fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
    kind: Object.assign({
      validate: (0, _utils.assertOneOf)("method", "get", "set")
    }, !process.env.BABEL_TYPES_8_BREAKING ? {
      default: "method"
    } : {}),
    computed: {
      default: false
    },
    key: {
      validate: function () {
        const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
        const computed = (0, _utils.assertNodeType)("Expression");
        const validator = function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral"];
        return validator;
      }()
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    }
  }),
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
});
defineType("ObjectProperty", {
  builder: ["key", "value", "computed", "shorthand", ...(!process.env.BABEL_TYPES_8_BREAKING ? ["decorators"] : [])],
  fields: {
    computed: {
      default: false
    },
    key: {
      validate: function () {
        const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName");
        const computed = (0, _utils.assertNodeType)("Expression");
        const validator = Object.assign(function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        }, {
          oneOfNodeTypes: ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName"]
        });
        return validator;
      }()
    },
    value: {
      validate: (0, _utils.assertNodeType)("Expression", "PatternLike")
    },
    shorthand: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (val && node.computed) {
          throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
        }
      }, {
        type: "boolean"
      }), function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (val && !(0, _is.default)("Identifier", node.key)) {
          throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
        }
      }),
      default: false
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"],
  validate: function () {
    const pattern = (0, _utils.assertNodeType)("Identifier", "Pattern", "TSAsExpression", "TSSatisfiesExpression", "TSNonNullExpression", "TSTypeAssertion");
    const expression = (0, _utils.assertNodeType)("Expression");
    return function (parent, key, node) {
      if (!process.env.BABEL_TYPES_8_BREAKING) return;
      const validator = (0, _is.default)("ObjectPattern", parent) ? pattern : expression;
      validator(node, "value", node.value);
    };
  }()
});
defineType("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  builder: ["argument"],
  aliases: ["LVal", "PatternLike"],
  deprecatedAlias: "RestProperty",
  fields: Object.assign({}, patternLikeCommon(), {
    argument: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal") : (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
    }
  }),
  validate(parent, key) {
    if (!process.env.BABEL_TYPES_8_BREAKING) return;
    const match = /(\w+)\[(\d+)\]/.exec(key);
    if (!match) throw new Error("Internal Babel error: malformed key.");
    const [, listKey, index] = match;
    if (parent[listKey].length > +index + 1) {
      throw new TypeError(`RestElement must be last element of ${listKey}`);
    }
  }
});
defineType("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    }
  }
});
defineType("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression")))
    }
  },
  aliases: ["Expression"]
});
defineType("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    consequent: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
    }
  }
});
defineType("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    discriminant: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    cases: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("SwitchCase")))
    }
  }
});
defineType("ThisExpression", {
  aliases: ["Expression"]
});
defineType("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    block: {
      validate: (0, _utils.chain)((0, _utils.assertNodeType)("BlockStatement"), Object.assign(function (node) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (!node.handler && !node.finalizer) {
          throw new TypeError("TryStatement expects either a handler or finalizer, or both");
        }
      }, {
        oneOfNodeTypes: ["BlockStatement"]
      }))
    },
    handler: {
      optional: true,
      validate: (0, _utils.assertNodeType)("CatchClause")
    },
    finalizer: {
      optional: true,
      validate: (0, _utils.assertNodeType)("BlockStatement")
    }
  }
});
defineType("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: true
    },
    argument: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    operator: {
      validate: (0, _utils.assertOneOf)(..._index.UNARY_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});
defineType("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false
    },
    argument: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Expression") : (0, _utils.assertNodeType)("Identifier", "MemberExpression")
    },
    operator: {
      validate: (0, _utils.assertOneOf)(..._index.UPDATE_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});
defineType("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    declare: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    kind: {
      validate: (0, _utils.assertOneOf)("var", "let", "const", "using", "await using")
    },
    declarations: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("VariableDeclarator")))
    }
  },
  validate(parent, key, node) {
    if (!process.env.BABEL_TYPES_8_BREAKING) return;
    if (!(0, _is.default)("ForXStatement", parent, {
      left: node
    })) return;
    if (node.declarations.length !== 1) {
      throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
    }
  }
});
defineType("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: function () {
        if (!process.env.BABEL_TYPES_8_BREAKING) {
          return (0, _utils.assertNodeType)("LVal");
        }
        const normal = (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern");
        const without = (0, _utils.assertNodeType)("Identifier");
        return function (node, key, val) {
          const validator = node.init ? normal : without;
          validator(node, key, val);
        };
      }()
    },
    definite: {
      optional: true,
      validate: (0, _utils.assertValueType)("boolean")
    },
    init: {
      optional: true,
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
defineType("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    }
  }
});
defineType("AssignmentPattern", {
  visitor: ["left", "right", "decorators"],
  builder: ["left", "right"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon(), {
    left: {
      validate: (0, _utils.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    }
  })
});
defineType("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  builder: ["elements"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon(), {
    elements: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "PatternLike", "LVal")))
    }
  })
});
defineType("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
    expression: {
      validate: (0, _utils.assertValueType)("boolean")
    },
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement", "Expression")
    },
    predicate: {
      validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
      optional: true
    }
  })
});
defineType("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")))
    }
  }
});
defineType("ClassExpression", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"],
  fields: {
    id: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _utils.assertNodeType)("Expression")
    },
    superTypeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    },
    implements: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    mixins: {
      validate: (0, _utils.assertNodeType)("InterfaceExtends"),
      optional: true
    }
  }
});
defineType("ClassDeclaration", {
  inherits: "ClassExpression",
  aliases: ["Scopable", "Class", "Statement", "Declaration"],
  fields: {
    id: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
      optional: true
    },
    body: {
      validate: (0, _utils.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _utils.assertNodeType)("Expression")
    },
    superTypeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    },
    implements: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    mixins: {
      validate: (0, _utils.assertNodeType)("InterfaceExtends"),
      optional: true
    },
    declare: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    abstract: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    }
  },
  validate: function () {
    const identifier = (0, _utils.assertNodeType)("Identifier");
    return function (parent, key, node) {
      if (!process.env.BABEL_TYPES_8_BREAKING) return;
      if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
        identifier(node, "id", node.id);
      }
    };
  }()
});
defineType("ExportAllDeclaration", {
  builder: ["source"],
  visitor: ["source", "attributes", "assertions"],
  aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
  fields: {
    source: {
      validate: (0, _utils.assertNodeType)("StringLiteral")
    },
    exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value")),
    attributes: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    },
    assertions: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    }
  }
});
defineType("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: (0, _utils.assertNodeType)("TSDeclareFunction", "FunctionDeclaration", "ClassDeclaration", "Expression")
    },
    exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("value"))
  }
});
defineType("ExportNamedDeclaration", {
  builder: ["declaration", "specifiers", "source"],
  visitor: ["declaration", "specifiers", "source", "attributes", "assertions"],
  aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertNodeType)("Declaration"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (val && node.specifiers.length) {
          throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
        }
      }, {
        oneOfNodeTypes: ["Declaration"]
      }), function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (val && node.source) {
          throw new TypeError("Cannot export a declaration from a source");
        }
      })
    },
    attributes: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    },
    assertions: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    },
    specifiers: {
      default: [],
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)(function () {
        const sourced = (0, _utils.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier");
        const sourceless = (0, _utils.assertNodeType)("ExportSpecifier");
        if (!process.env.BABEL_TYPES_8_BREAKING) return sourced;
        return function (node, key, val) {
          const validator = node.source ? sourced : sourceless;
          validator(node, key, val);
        };
      }()))
    },
    source: {
      validate: (0, _utils.assertNodeType)("StringLiteral"),
      optional: true
    },
    exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
  }
});
defineType("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils.assertNodeType)("Identifier")
    },
    exported: {
      validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
    },
    exportKind: {
      validate: (0, _utils.assertOneOf)("type", "value"),
      optional: true
    }
  }
});
defineType("ForOfStatement", {
  visitor: ["left", "right", "body"],
  builder: ["left", "right", "body", "await"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: function () {
        if (!process.env.BABEL_TYPES_8_BREAKING) {
          return (0, _utils.assertNodeType)("VariableDeclaration", "LVal");
        }
        const declaration = (0, _utils.assertNodeType)("VariableDeclaration");
        const lval = (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression");
        return function (node, key, val) {
          if ((0, _is.default)("VariableDeclaration", val)) {
            declaration(node, key, val);
          } else {
            lval(node, key, val);
          }
        };
      }()
    },
    right: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils.assertNodeType)("Statement")
    },
    await: {
      default: false
    }
  }
});
defineType("ImportDeclaration", {
  builder: ["specifiers", "source"],
  visitor: ["specifiers", "source", "attributes", "assertions"],
  aliases: ["Statement", "Declaration", "ImportOrExportDeclaration"],
  fields: {
    attributes: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    },
    assertions: {
      optional: true,
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
    },
    module: {
      optional: true,
      validate: (0, _utils.assertValueType)("boolean")
    },
    specifiers: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
    },
    source: {
      validate: (0, _utils.assertNodeType)("StringLiteral")
    },
    importKind: {
      validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
      optional: true
    }
  }
});
defineType("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
defineType("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
defineType("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils.assertNodeType)("Identifier")
    },
    imported: {
      validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
    },
    importKind: {
      validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
      optional: true
    }
  }
});
defineType("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    meta: {
      validate: (0, _utils.chain)((0, _utils.assertNodeType)("Identifier"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        let property;
        switch (val.name) {
          case "function":
            property = "sent";
            break;
          case "new":
            property = "target";
            break;
          case "import":
            property = "meta";
            break;
        }
        if (!(0, _is.default)("Identifier", node.property, {
          name: property
        })) {
          throw new TypeError("Unrecognised MetaProperty");
        }
      }, {
        oneOfNodeTypes: ["Identifier"]
      }))
    },
    property: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
const classMethodOrPropertyCommon = () => ({
  abstract: {
    validate: (0, _utils.assertValueType)("boolean"),
    optional: true
  },
  accessibility: {
    validate: (0, _utils.assertOneOf)("public", "private", "protected"),
    optional: true
  },
  static: {
    default: false
  },
  override: {
    default: false
  },
  computed: {
    default: false
  },
  optional: {
    validate: (0, _utils.assertValueType)("boolean"),
    optional: true
  },
  key: {
    validate: (0, _utils.chain)(function () {
      const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral");
      const computed = (0, _utils.assertNodeType)("Expression");
      return function (node, key, val) {
        const validator = node.computed ? computed : normal;
        validator(node, key, val);
      };
    }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression"))
  }
});
exports.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
const classMethodOrDeclareMethodCommon = () => Object.assign({}, functionCommon(), classMethodOrPropertyCommon(), {
  params: {
    validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
  },
  kind: {
    validate: (0, _utils.assertOneOf)("get", "set", "method", "constructor"),
    default: "method"
  },
  access: {
    validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), (0, _utils.assertOneOf)("public", "private", "protected")),
    optional: true
  },
  decorators: {
    validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
    optional: true
  }
});
exports.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon;
defineType("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "computed", "static", "generator", "async"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    }
  })
});
defineType("ObjectPattern", {
  visitor: ["properties", "typeAnnotation", "decorators"],
  builder: ["properties"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon(), {
    properties: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("RestElement", "ObjectProperty")))
    }
  })
});
defineType("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  deprecatedAlias: "SpreadProperty",
  fields: {
    argument: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("Super", {
  aliases: ["Expression"]
});
defineType("TaggedTemplateExpression", {
  visitor: ["tag", "quasi", "typeParameters"],
  builder: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    quasi: {
      validate: (0, _utils.assertNodeType)("TemplateLiteral")
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {
      validate: (0, _utils.chain)((0, _utils.assertShape)({
        raw: {
          validate: (0, _utils.assertValueType)("string")
        },
        cooked: {
          validate: (0, _utils.assertValueType)("string"),
          optional: true
        }
      }), function templateElementCookedValidator(node) {
        const raw = node.value.raw;
        let unterminatedCalled = false;
        const error = () => {
          throw new Error("Internal @babel/types error.");
        };
        const {
          str,
          firstInvalidLoc
        } = (0, _helperStringParser.readStringContents)("template", raw, 0, 0, 0, {
          unterminated() {
            unterminatedCalled = true;
          },
          strictNumericEscape: error,
          invalidEscapeSequence: error,
          numericSeparatorInEscapeSequence: error,
          unexpectedNumericSeparator: error,
          invalidDigit: error,
          invalidCodePoint: error
        });
        if (!unterminatedCalled) throw new Error("Invalid raw");
        node.value.cooked = firstInvalidLoc ? null : str;
      })
    },
    tail: {
      default: false
    }
  }
});
defineType("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    quasis: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TemplateElement")))
    },
    expressions: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "TSType")), function (node, key, val) {
        if (node.quasis.length !== val.length + 1) {
          throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.\nExpected ${val.length + 1} quasis but got ${node.quasis.length}`);
        }
      })
    }
  }
});
defineType("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function (node, key, val) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (val && !node.argument) {
          throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
        }
      }, {
        type: "boolean"
      })),
      default: false
    },
    argument: {
      optional: true,
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("Import", {
  aliases: ["Expression"]
});
defineType("BigIntLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
defineType("OptionalMemberExpression", {
  builder: ["object", "property", "computed", "optional"],
  visitor: ["object", "property"],
  aliases: ["Expression"],
  fields: {
    object: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    property: {
      validate: function () {
        const normal = (0, _utils.assertNodeType)("Identifier");
        const computed = (0, _utils.assertNodeType)("Expression");
        const validator = Object.assign(function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        }, {
          oneOfNodeTypes: ["Expression", "Identifier"]
        });
        return validator;
      }()
    },
    computed: {
      default: false
    },
    optional: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
    }
  }
});
defineType("OptionalCallExpression", {
  visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
  builder: ["callee", "arguments", "optional"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    arguments: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
    },
    optional: {
      validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
    },
    typeArguments: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
  aliases: ["Property"],
  fields: Object.assign({}, classMethodOrPropertyCommon(), {
    value: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    definite: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    readonly: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    declare: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils.assertNodeType)("Variance"),
      optional: true
    }
  })
});
defineType("ClassAccessorProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
  aliases: ["Property", "Accessor"],
  fields: Object.assign({}, classMethodOrPropertyCommon(), {
    key: {
      validate: (0, _utils.chain)(function () {
        const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "PrivateName");
        const computed = (0, _utils.assertNodeType)("Expression");
        return function (node, key, val) {
          const validator = node.computed ? computed : normal;
          validator(node, key, val);
        };
      }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression", "PrivateName"))
    },
    value: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    definite: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    readonly: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    declare: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils.assertNodeType)("Variance"),
      optional: true
    }
  })
});
defineType("ClassPrivateProperty", {
  visitor: ["key", "value", "decorators", "typeAnnotation"],
  builder: ["key", "value", "decorators", "static"],
  aliases: ["Property", "Private"],
  fields: {
    key: {
      validate: (0, _utils.assertNodeType)("PrivateName")
    },
    value: {
      validate: (0, _utils.assertNodeType)("Expression"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    },
    static: {
      validate: (0, _utils.assertValueType)("boolean"),
      default: false
    },
    readonly: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    definite: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils.assertNodeType)("Variance"),
      optional: true
    }
  }
});
defineType("ClassPrivateMethod", {
  builder: ["kind", "key", "params", "body", "static"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private"],
  fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
    kind: {
      validate: (0, _utils.assertOneOf)("get", "set", "method"),
      default: "method"
    },
    key: {
      validate: (0, _utils.assertNodeType)("PrivateName")
    },
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    }
  })
});
defineType("PrivateName", {
  visitor: ["id"],
  aliases: ["Private"],
  fields: {
    id: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
defineType("StaticBlock", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "FunctionParent"]
});

//# sourceMappingURL=core.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/deprecated-aliases.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/deprecated-aliases.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DEPRECATED_ALIASES = void 0;
const DEPRECATED_ALIASES = {
  ModuleDeclaration: "ImportOrExportDeclaration"
};
exports.DEPRECATED_ALIASES = DEPRECATED_ALIASES;

//# sourceMappingURL=deprecated-aliases.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/experimental.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/experimental.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
(0, _utils.default)("ArgumentPlaceholder", {});
(0, _utils.default)("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: !process.env.BABEL_TYPES_8_BREAKING ? {
    object: {
      validate: Object.assign(() => {}, {
        oneOfNodeTypes: ["Expression"]
      })
    },
    callee: {
      validate: Object.assign(() => {}, {
        oneOfNodeTypes: ["Expression"]
      })
    }
  } : {
    object: {
      validate: (0, _utils.assertNodeType)("Expression")
    },
    callee: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
(0, _utils.default)("ImportAttribute", {
  visitor: ["key", "value"],
  fields: {
    key: {
      validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
    },
    value: {
      validate: (0, _utils.assertNodeType)("StringLiteral")
    }
  }
});
(0, _utils.default)("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
(0, _utils.default)("DoExpression", {
  visitor: ["body"],
  builder: ["body", "async"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: (0, _utils.assertNodeType)("BlockStatement")
    },
    async: {
      validate: (0, _utils.assertValueType)("boolean"),
      default: false
    }
  }
});
(0, _utils.default)("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _utils.assertNodeType)("Identifier")
    }
  }
});
(0, _utils.default)("RecordExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectProperty", "SpreadElement")))
    }
  }
});
(0, _utils.default)("TupleExpression", {
  fields: {
    elements: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement"))),
      default: []
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});
(0, _utils.default)("DecimalLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
(0, _utils.default)("ModuleExpression", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils.assertNodeType)("Program")
    }
  },
  aliases: ["Expression"]
});
(0, _utils.default)("TopicReference", {
  aliases: ["Expression"]
});
(0, _utils.default)("PipelineTopicExpression", {
  builder: ["expression"],
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression"]
});
(0, _utils.default)("PipelineBareFunction", {
  builder: ["callee"],
  visitor: ["callee"],
  fields: {
    callee: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression"]
});
(0, _utils.default)("PipelinePrimaryTopicReference", {
  aliases: ["Expression"]
});

//# sourceMappingURL=experimental.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/flow.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/flow.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
const defineType = (0, _utils.defineAliasedType)("Flow");
const defineInterfaceishType = name => {
  const isDeclareClass = name === "DeclareClass";
  defineType(name, {
    builder: ["id", "typeParameters", "extends", "body"],
    visitor: ["id", "typeParameters", "extends", ...(isDeclareClass ? ["mixins", "implements"] : []), "body"],
    aliases: ["FlowDeclaration", "Statement", "Declaration"],
    fields: Object.assign({
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends"))
    }, isDeclareClass ? {
      mixins: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
      implements: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ClassImplements"))
    } : {}, {
      body: (0, _utils.validateType)("ObjectTypeAnnotation")
    })
  });
};
defineType("AnyTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["FlowType"],
  fields: {
    elementType: (0, _utils.validateType)("FlowType")
  }
});
defineType("BooleanTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("BooleanLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("NullLiteralTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("ClassImplements", {
  visitor: ["id", "typeParameters"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineInterfaceishType("DeclareClass");
defineType("DeclareFunction", {
  visitor: ["id"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    predicate: (0, _utils.validateOptionalType)("DeclaredPredicate")
  }
});
defineInterfaceishType("DeclareInterface");
defineType("DeclareModule", {
  builder: ["id", "body", "kind"],
  visitor: ["id", "body"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    body: (0, _utils.validateType)("BlockStatement"),
    kind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("CommonJS", "ES"))
  }
});
defineType("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
  }
});
defineType("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
    right: (0, _utils.validateType)("FlowType")
  }
});
defineType("DeclareOpaqueType", {
  visitor: ["id", "typeParameters", "supertype"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
    supertype: (0, _utils.validateOptionalType)("FlowType"),
    impltype: (0, _utils.validateOptionalType)("FlowType")
  }
});
defineType("DeclareVariable", {
  visitor: ["id"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier")
  }
});
defineType("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    declaration: (0, _utils.validateOptionalType)("Flow"),
    specifiers: (0, _utils.validateOptional)((0, _utils.arrayOfType)(["ExportSpecifier", "ExportNamespaceSpecifier"])),
    source: (0, _utils.validateOptionalType)("StringLiteral"),
    default: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("DeclareExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    source: (0, _utils.validateType)("StringLiteral"),
    exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
  }
});
defineType("DeclaredPredicate", {
  visitor: ["value"],
  aliases: ["FlowPredicate"],
  fields: {
    value: (0, _utils.validateType)("Flow")
  }
});
defineType("ExistsTypeAnnotation", {
  aliases: ["FlowType"]
});
defineType("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["FlowType"],
  fields: {
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
    params: (0, _utils.validate)((0, _utils.arrayOfType)("FunctionTypeParam")),
    rest: (0, _utils.validateOptionalType)("FunctionTypeParam"),
    this: (0, _utils.validateOptionalType)("FunctionTypeParam"),
    returnType: (0, _utils.validateType)("FlowType")
  }
});
defineType("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  fields: {
    name: (0, _utils.validateOptionalType)("Identifier"),
    typeAnnotation: (0, _utils.validateType)("FlowType"),
    optional: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["FlowType"],
  fields: {
    id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineType("InferredPredicate", {
  aliases: ["FlowPredicate"]
});
defineType("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  fields: {
    id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineInterfaceishType("InterfaceDeclaration");
defineType("InterfaceTypeAnnotation", {
  visitor: ["extends", "body"],
  aliases: ["FlowType"],
  fields: {
    extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
    body: (0, _utils.validateType)("ObjectTypeAnnotation")
  }
});
defineType("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
  }
});
defineType("MixedTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("EmptyTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["FlowType"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("FlowType")
  }
});
defineType("NumberLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils.validate)((0, _utils.assertValueType)("number"))
  }
});
defineType("NumberTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties", "internalSlots"],
  aliases: ["FlowType"],
  builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
  fields: {
    properties: (0, _utils.validate)((0, _utils.arrayOfType)(["ObjectTypeProperty", "ObjectTypeSpreadProperty"])),
    indexers: {
      validate: (0, _utils.arrayOfType)("ObjectTypeIndexer"),
      optional: true,
      default: []
    },
    callProperties: {
      validate: (0, _utils.arrayOfType)("ObjectTypeCallProperty"),
      optional: true,
      default: []
    },
    internalSlots: {
      validate: (0, _utils.arrayOfType)("ObjectTypeInternalSlot"),
      optional: true,
      default: []
    },
    exact: {
      validate: (0, _utils.assertValueType)("boolean"),
      default: false
    },
    inexact: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("ObjectTypeInternalSlot", {
  visitor: ["id", "value", "optional", "static", "method"],
  aliases: ["UserWhitespacable"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    value: (0, _utils.validateType)("FlowType"),
    optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["UserWhitespacable"],
  fields: {
    value: (0, _utils.validateType)("FlowType"),
    static: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("ObjectTypeIndexer", {
  visitor: ["id", "key", "value", "variance"],
  aliases: ["UserWhitespacable"],
  fields: {
    id: (0, _utils.validateOptionalType)("Identifier"),
    key: (0, _utils.validateType)("FlowType"),
    value: (0, _utils.validateType)("FlowType"),
    static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    variance: (0, _utils.validateOptionalType)("Variance")
  }
});
defineType("ObjectTypeProperty", {
  visitor: ["key", "value", "variance"],
  aliases: ["UserWhitespacable"],
  fields: {
    key: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    value: (0, _utils.validateType)("FlowType"),
    kind: (0, _utils.validate)((0, _utils.assertOneOf)("init", "get", "set")),
    static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    proto: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    variance: (0, _utils.validateOptionalType)("Variance"),
    method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["UserWhitespacable"],
  fields: {
    argument: (0, _utils.validateType)("FlowType")
  }
});
defineType("OpaqueType", {
  visitor: ["id", "typeParameters", "supertype", "impltype"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
    supertype: (0, _utils.validateOptionalType)("FlowType"),
    impltype: (0, _utils.validateType)("FlowType")
  }
});
defineType("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    qualification: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"])
  }
});
defineType("StringLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils.validate)((0, _utils.assertValueType)("string"))
  }
});
defineType("StringTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("SymbolTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("ThisTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
  }
});
defineType("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["FlowType"],
  fields: {
    argument: (0, _utils.validateType)("FlowType")
  }
});
defineType("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
    right: (0, _utils.validateType)("FlowType")
  }
});
defineType("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("FlowType")
  }
});
defineType("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["ExpressionWrapper", "Expression"],
  fields: {
    expression: (0, _utils.validateType)("Expression"),
    typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
  }
});
defineType("TypeParameter", {
  visitor: ["bound", "default", "variance"],
  fields: {
    name: (0, _utils.validate)((0, _utils.assertValueType)("string")),
    bound: (0, _utils.validateOptionalType)("TypeAnnotation"),
    default: (0, _utils.validateOptionalType)("FlowType"),
    variance: (0, _utils.validateOptionalType)("Variance")
  }
});
defineType("TypeParameterDeclaration", {
  visitor: ["params"],
  fields: {
    params: (0, _utils.validate)((0, _utils.arrayOfType)("TypeParameter"))
  }
});
defineType("TypeParameterInstantiation", {
  visitor: ["params"],
  fields: {
    params: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
  }
});
defineType("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
  }
});
defineType("Variance", {
  builder: ["kind"],
  fields: {
    kind: (0, _utils.validate)((0, _utils.assertOneOf)("minus", "plus"))
  }
});
defineType("VoidTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType("EnumDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    body: (0, _utils.validateType)(["EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody"])
  }
});
defineType("EnumBooleanBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    members: (0, _utils.validateArrayOfType)("EnumBooleanMember"),
    hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("EnumNumberBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    members: (0, _utils.validateArrayOfType)("EnumNumberMember"),
    hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("EnumStringBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
    members: (0, _utils.validateArrayOfType)(["EnumStringMember", "EnumDefaultedMember"]),
    hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("EnumSymbolBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    members: (0, _utils.validateArrayOfType)("EnumDefaultedMember"),
    hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});
defineType("EnumBooleanMember", {
  aliases: ["EnumMember"],
  visitor: ["id"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    init: (0, _utils.validateType)("BooleanLiteral")
  }
});
defineType("EnumNumberMember", {
  aliases: ["EnumMember"],
  visitor: ["id", "init"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    init: (0, _utils.validateType)("NumericLiteral")
  }
});
defineType("EnumStringMember", {
  aliases: ["EnumMember"],
  visitor: ["id", "init"],
  fields: {
    id: (0, _utils.validateType)("Identifier"),
    init: (0, _utils.validateType)("StringLiteral")
  }
});
defineType("EnumDefaultedMember", {
  aliases: ["EnumMember"],
  visitor: ["id"],
  fields: {
    id: (0, _utils.validateType)("Identifier")
  }
});
defineType("IndexedAccessType", {
  visitor: ["objectType", "indexType"],
  aliases: ["FlowType"],
  fields: {
    objectType: (0, _utils.validateType)("FlowType"),
    indexType: (0, _utils.validateType)("FlowType")
  }
});
defineType("OptionalIndexedAccessType", {
  visitor: ["objectType", "indexType"],
  aliases: ["FlowType"],
  fields: {
    objectType: (0, _utils.validateType)("FlowType"),
    indexType: (0, _utils.validateType)("FlowType"),
    optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
  }
});

//# sourceMappingURL=flow.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "ALIAS_KEYS", ({
  enumerable: true,
  get: function () {
    return _utils.ALIAS_KEYS;
  }
}));
Object.defineProperty(exports, "BUILDER_KEYS", ({
  enumerable: true,
  get: function () {
    return _utils.BUILDER_KEYS;
  }
}));
Object.defineProperty(exports, "DEPRECATED_ALIASES", ({
  enumerable: true,
  get: function () {
    return _deprecatedAliases.DEPRECATED_ALIASES;
  }
}));
Object.defineProperty(exports, "DEPRECATED_KEYS", ({
  enumerable: true,
  get: function () {
    return _utils.DEPRECATED_KEYS;
  }
}));
Object.defineProperty(exports, "FLIPPED_ALIAS_KEYS", ({
  enumerable: true,
  get: function () {
    return _utils.FLIPPED_ALIAS_KEYS;
  }
}));
Object.defineProperty(exports, "NODE_FIELDS", ({
  enumerable: true,
  get: function () {
    return _utils.NODE_FIELDS;
  }
}));
Object.defineProperty(exports, "NODE_PARENT_VALIDATIONS", ({
  enumerable: true,
  get: function () {
    return _utils.NODE_PARENT_VALIDATIONS;
  }
}));
Object.defineProperty(exports, "PLACEHOLDERS", ({
  enumerable: true,
  get: function () {
    return _placeholders.PLACEHOLDERS;
  }
}));
Object.defineProperty(exports, "PLACEHOLDERS_ALIAS", ({
  enumerable: true,
  get: function () {
    return _placeholders.PLACEHOLDERS_ALIAS;
  }
}));
Object.defineProperty(exports, "PLACEHOLDERS_FLIPPED_ALIAS", ({
  enumerable: true,
  get: function () {
    return _placeholders.PLACEHOLDERS_FLIPPED_ALIAS;
  }
}));
exports.TYPES = void 0;
Object.defineProperty(exports, "VISITOR_KEYS", ({
  enumerable: true,
  get: function () {
    return _utils.VISITOR_KEYS;
  }
}));
var _toFastProperties = __webpack_require__(/*! to-fast-properties */ "./node_modules/to-fast-properties/index.js");
__webpack_require__(/*! ./core.js */ "./node_modules/@babel/types/lib/definitions/core.js");
__webpack_require__(/*! ./flow.js */ "./node_modules/@babel/types/lib/definitions/flow.js");
__webpack_require__(/*! ./jsx.js */ "./node_modules/@babel/types/lib/definitions/jsx.js");
__webpack_require__(/*! ./misc.js */ "./node_modules/@babel/types/lib/definitions/misc.js");
__webpack_require__(/*! ./experimental.js */ "./node_modules/@babel/types/lib/definitions/experimental.js");
__webpack_require__(/*! ./typescript.js */ "./node_modules/@babel/types/lib/definitions/typescript.js");
var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
var _placeholders = __webpack_require__(/*! ./placeholders.js */ "./node_modules/@babel/types/lib/definitions/placeholders.js");
var _deprecatedAliases = __webpack_require__(/*! ./deprecated-aliases.js */ "./node_modules/@babel/types/lib/definitions/deprecated-aliases.js");
Object.keys(_deprecatedAliases.DEPRECATED_ALIASES).forEach(deprecatedAlias => {
  _utils.FLIPPED_ALIAS_KEYS[deprecatedAlias] = _utils.FLIPPED_ALIAS_KEYS[_deprecatedAliases.DEPRECATED_ALIASES[deprecatedAlias]];
});
_toFastProperties(_utils.VISITOR_KEYS);
_toFastProperties(_utils.ALIAS_KEYS);
_toFastProperties(_utils.FLIPPED_ALIAS_KEYS);
_toFastProperties(_utils.NODE_FIELDS);
_toFastProperties(_utils.BUILDER_KEYS);
_toFastProperties(_utils.DEPRECATED_KEYS);
_toFastProperties(_placeholders.PLACEHOLDERS_ALIAS);
_toFastProperties(_placeholders.PLACEHOLDERS_FLIPPED_ALIAS);
const TYPES = [].concat(Object.keys(_utils.VISITOR_KEYS), Object.keys(_utils.FLIPPED_ALIAS_KEYS), Object.keys(_utils.DEPRECATED_KEYS));
exports.TYPES = TYPES;

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/jsx.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/jsx.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
const defineType = (0, _utils.defineAliasedType)("JSX");
defineType("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
    },
    value: {
      optional: true,
      validate: (0, _utils.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
    }
  }
});
defineType("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
    }
  }
});
defineType("JSXElement", {
  builder: ["openingElement", "closingElement", "children", "selfClosing"],
  visitor: ["openingElement", "children", "closingElement"],
  aliases: ["Immutable", "Expression"],
  fields: Object.assign({
    openingElement: {
      validate: (0, _utils.assertNodeType)("JSXOpeningElement")
    },
    closingElement: {
      optional: true,
      validate: (0, _utils.assertNodeType)("JSXClosingElement")
    },
    children: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
    }
  }, {
    selfClosing: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    }
  })
});
defineType("JSXEmptyExpression", {});
defineType("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["Immutable"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression", "JSXEmptyExpression")
    }
  }
});
defineType("JSXSpreadChild", {
  visitor: ["expression"],
  aliases: ["Immutable"],
  fields: {
    expression: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("JSXIdentifier", {
  builder: ["name"],
  fields: {
    name: {
      validate: (0, _utils.assertValueType)("string")
    }
  }
});
defineType("JSXMemberExpression", {
  visitor: ["object", "property"],
  fields: {
    object: {
      validate: (0, _utils.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
    },
    property: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier")
    }
  }
});
defineType("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  fields: {
    namespace: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier")
    },
    name: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier")
    }
  }
});
defineType("JSXOpeningElement", {
  builder: ["name", "attributes", "selfClosing"],
  visitor: ["name", "attributes"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
    },
    selfClosing: {
      default: false
    },
    attributes: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType("JSXSpreadAttribute", {
  visitor: ["argument"],
  fields: {
    argument: {
      validate: (0, _utils.assertNodeType)("Expression")
    }
  }
});
defineType("JSXText", {
  aliases: ["Immutable"],
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils.assertValueType)("string")
    }
  }
});
defineType("JSXFragment", {
  builder: ["openingFragment", "closingFragment", "children"],
  visitor: ["openingFragment", "children", "closingFragment"],
  aliases: ["Immutable", "Expression"],
  fields: {
    openingFragment: {
      validate: (0, _utils.assertNodeType)("JSXOpeningFragment")
    },
    closingFragment: {
      validate: (0, _utils.assertNodeType)("JSXClosingFragment")
    },
    children: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
    }
  }
});
defineType("JSXOpeningFragment", {
  aliases: ["Immutable"]
});
defineType("JSXClosingFragment", {
  aliases: ["Immutable"]
});

//# sourceMappingURL=jsx.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/misc.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/misc.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
var _placeholders = __webpack_require__(/*! ./placeholders.js */ "./node_modules/@babel/types/lib/definitions/placeholders.js");
const defineType = (0, _utils.defineAliasedType)("Miscellaneous");
{
  defineType("Noop", {
    visitor: []
  });
}
defineType("Placeholder", {
  visitor: [],
  builder: ["expectedNode", "name"],
  fields: {
    name: {
      validate: (0, _utils.assertNodeType)("Identifier")
    },
    expectedNode: {
      validate: (0, _utils.assertOneOf)(..._placeholders.PLACEHOLDERS)
    }
  }
});
defineType("V8IntrinsicIdentifier", {
  builder: ["name"],
  fields: {
    name: {
      validate: (0, _utils.assertValueType)("string")
    }
  }
});

//# sourceMappingURL=misc.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/placeholders.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/placeholders.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS = void 0;
var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
const PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
exports.PLACEHOLDERS = PLACEHOLDERS;
const PLACEHOLDERS_ALIAS = {
  Declaration: ["Statement"],
  Pattern: ["PatternLike", "LVal"]
};
exports.PLACEHOLDERS_ALIAS = PLACEHOLDERS_ALIAS;
for (const type of PLACEHOLDERS) {
  const alias = _utils.ALIAS_KEYS[type];
  if (alias != null && alias.length) PLACEHOLDERS_ALIAS[type] = alias;
}
const PLACEHOLDERS_FLIPPED_ALIAS = {};
exports.PLACEHOLDERS_FLIPPED_ALIAS = PLACEHOLDERS_FLIPPED_ALIAS;
Object.keys(PLACEHOLDERS_ALIAS).forEach(type => {
  PLACEHOLDERS_ALIAS[type].forEach(alias => {
    if (!Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
      PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
    }
    PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
  });
});

//# sourceMappingURL=placeholders.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/typescript.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/typescript.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _utils = __webpack_require__(/*! ./utils.js */ "./node_modules/@babel/types/lib/definitions/utils.js");
var _core = __webpack_require__(/*! ./core.js */ "./node_modules/@babel/types/lib/definitions/core.js");
var _is = __webpack_require__(/*! ../validators/is.js */ "./node_modules/@babel/types/lib/validators/is.js");
const defineType = (0, _utils.defineAliasedType)("TypeScript");
const bool = (0, _utils.assertValueType)("boolean");
const tSFunctionTypeAnnotationCommon = () => ({
  returnType: {
    validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
    optional: true
  },
  typeParameters: {
    validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
    optional: true
  }
});
defineType("TSParameterProperty", {
  aliases: ["LVal"],
  visitor: ["parameter"],
  fields: {
    accessibility: {
      validate: (0, _utils.assertOneOf)("public", "private", "protected"),
      optional: true
    },
    readonly: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    parameter: {
      validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
    },
    override: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    }
  }
});
defineType("TSDeclareFunction", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "params", "returnType"],
  fields: Object.assign({}, (0, _core.functionDeclarationCommon)(), tSFunctionTypeAnnotationCommon())
});
defineType("TSDeclareMethod", {
  visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
  fields: Object.assign({}, (0, _core.classMethodOrDeclareMethodCommon)(), tSFunctionTypeAnnotationCommon())
});
defineType("TSQualifiedName", {
  aliases: ["TSEntityName"],
  visitor: ["left", "right"],
  fields: {
    left: (0, _utils.validateType)("TSEntityName"),
    right: (0, _utils.validateType)("Identifier")
  }
});
const signatureDeclarationCommon = () => ({
  typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
  ["parameters"]: (0, _utils.validateArrayOfType)(["ArrayPattern", "Identifier", "ObjectPattern", "RestElement"]),
  ["typeAnnotation"]: (0, _utils.validateOptionalType)("TSTypeAnnotation")
});
const callConstructSignatureDeclaration = {
  aliases: ["TSTypeElement"],
  visitor: ["typeParameters", "parameters", "typeAnnotation"],
  fields: signatureDeclarationCommon()
};
defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
const namedTypeElementCommon = () => ({
  key: (0, _utils.validateType)("Expression"),
  computed: {
    default: false
  },
  optional: (0, _utils.validateOptional)(bool)
});
defineType("TSPropertySignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeAnnotation", "initializer"],
  fields: Object.assign({}, namedTypeElementCommon(), {
    readonly: (0, _utils.validateOptional)(bool),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
    initializer: (0, _utils.validateOptionalType)("Expression"),
    kind: {
      validate: (0, _utils.assertOneOf)("get", "set")
    }
  })
});
defineType("TSMethodSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
  fields: Object.assign({}, signatureDeclarationCommon(), namedTypeElementCommon(), {
    kind: {
      validate: (0, _utils.assertOneOf)("method", "get", "set")
    }
  })
});
defineType("TSIndexSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["parameters", "typeAnnotation"],
  fields: {
    readonly: (0, _utils.validateOptional)(bool),
    static: (0, _utils.validateOptional)(bool),
    parameters: (0, _utils.validateArrayOfType)("Identifier"),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
  }
});
const tsKeywordTypes = ["TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword"];
for (const type of tsKeywordTypes) {
  defineType(type, {
    aliases: ["TSType", "TSBaseType"],
    visitor: [],
    fields: {}
  });
}
defineType("TSThisType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: [],
  fields: {}
});
const fnOrCtrBase = {
  aliases: ["TSType"],
  visitor: ["typeParameters", "parameters", "typeAnnotation"]
};
defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
  fields: signatureDeclarationCommon()
}));
defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
  fields: Object.assign({}, signatureDeclarationCommon(), {
    abstract: (0, _utils.validateOptional)(bool)
  })
}));
defineType("TSTypeReference", {
  aliases: ["TSType"],
  visitor: ["typeName", "typeParameters"],
  fields: {
    typeName: (0, _utils.validateType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSTypePredicate", {
  aliases: ["TSType"],
  visitor: ["parameterName", "typeAnnotation"],
  builder: ["parameterName", "typeAnnotation", "asserts"],
  fields: {
    parameterName: (0, _utils.validateType)(["Identifier", "TSThisType"]),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
    asserts: (0, _utils.validateOptional)(bool)
  }
});
defineType("TSTypeQuery", {
  aliases: ["TSType"],
  visitor: ["exprName", "typeParameters"],
  fields: {
    exprName: (0, _utils.validateType)(["TSEntityName", "TSImportType"]),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSTypeLiteral", {
  aliases: ["TSType"],
  visitor: ["members"],
  fields: {
    members: (0, _utils.validateArrayOfType)("TSTypeElement")
  }
});
defineType("TSArrayType", {
  aliases: ["TSType"],
  visitor: ["elementType"],
  fields: {
    elementType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSTupleType", {
  aliases: ["TSType"],
  visitor: ["elementTypes"],
  fields: {
    elementTypes: (0, _utils.validateArrayOfType)(["TSType", "TSNamedTupleMember"])
  }
});
defineType("TSOptionalType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSRestType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSNamedTupleMember", {
  visitor: ["label", "elementType"],
  builder: ["label", "elementType", "optional"],
  fields: {
    label: (0, _utils.validateType)("Identifier"),
    optional: {
      validate: bool,
      default: false
    },
    elementType: (0, _utils.validateType)("TSType")
  }
});
const unionOrIntersection = {
  aliases: ["TSType"],
  visitor: ["types"],
  fields: {
    types: (0, _utils.validateArrayOfType)("TSType")
  }
};
defineType("TSUnionType", unionOrIntersection);
defineType("TSIntersectionType", unionOrIntersection);
defineType("TSConditionalType", {
  aliases: ["TSType"],
  visitor: ["checkType", "extendsType", "trueType", "falseType"],
  fields: {
    checkType: (0, _utils.validateType)("TSType"),
    extendsType: (0, _utils.validateType)("TSType"),
    trueType: (0, _utils.validateType)("TSType"),
    falseType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSInferType", {
  aliases: ["TSType"],
  visitor: ["typeParameter"],
  fields: {
    typeParameter: (0, _utils.validateType)("TSTypeParameter")
  }
});
defineType("TSParenthesizedType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSTypeOperator", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSIndexedAccessType", {
  aliases: ["TSType"],
  visitor: ["objectType", "indexType"],
  fields: {
    objectType: (0, _utils.validateType)("TSType"),
    indexType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSMappedType", {
  aliases: ["TSType"],
  visitor: ["typeParameter", "typeAnnotation", "nameType"],
  fields: {
    readonly: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
    typeParameter: (0, _utils.validateType)("TSTypeParameter"),
    optional: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
    typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
    nameType: (0, _utils.validateOptionalType)("TSType")
  }
});
defineType("TSLiteralType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: ["literal"],
  fields: {
    literal: {
      validate: function () {
        const unaryExpression = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral");
        const unaryOperator = (0, _utils.assertOneOf)("-");
        const literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral");
        function validator(parent, key, node) {
          if ((0, _is.default)("UnaryExpression", node)) {
            unaryOperator(node, "operator", node.operator);
            unaryExpression(node, "argument", node.argument);
          } else {
            literal(parent, key, node);
          }
        }
        validator.oneOfNodeTypes = ["NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral", "UnaryExpression"];
        return validator;
      }()
    }
  }
});
defineType("TSExpressionWithTypeArguments", {
  aliases: ["TSType"],
  visitor: ["expression", "typeParameters"],
  fields: {
    expression: (0, _utils.validateType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSInterfaceDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "extends", "body"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
    extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
    body: (0, _utils.validateType)("TSInterfaceBody")
  }
});
defineType("TSInterfaceBody", {
  visitor: ["body"],
  fields: {
    body: (0, _utils.validateArrayOfType)("TSTypeElement")
  }
});
defineType("TSTypeAliasDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "typeAnnotation"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSInstantiationExpression", {
  aliases: ["Expression"],
  visitor: ["expression", "typeParameters"],
  fields: {
    expression: (0, _utils.validateType)("Expression"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
const TSTypeExpression = {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["expression", "typeAnnotation"],
  fields: {
    expression: (0, _utils.validateType)("Expression"),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
};
defineType("TSAsExpression", TSTypeExpression);
defineType("TSSatisfiesExpression", TSTypeExpression);
defineType("TSTypeAssertion", {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["typeAnnotation", "expression"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType"),
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSEnumDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "members"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    const: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    members: (0, _utils.validateArrayOfType)("TSEnumMember"),
    initializer: (0, _utils.validateOptionalType)("Expression")
  }
});
defineType("TSEnumMember", {
  visitor: ["id", "initializer"],
  fields: {
    id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    initializer: (0, _utils.validateOptionalType)("Expression")
  }
});
defineType("TSModuleDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    global: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    body: (0, _utils.validateType)(["TSModuleBlock", "TSModuleDeclaration"])
  }
});
defineType("TSModuleBlock", {
  aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
  visitor: ["body"],
  fields: {
    body: (0, _utils.validateArrayOfType)("Statement")
  }
});
defineType("TSImportType", {
  aliases: ["TSType"],
  visitor: ["argument", "qualifier", "typeParameters"],
  fields: {
    argument: (0, _utils.validateType)("StringLiteral"),
    qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSImportEqualsDeclaration", {
  aliases: ["Statement"],
  visitor: ["id", "moduleReference"],
  fields: {
    isExport: (0, _utils.validate)(bool),
    id: (0, _utils.validateType)("Identifier"),
    moduleReference: (0, _utils.validateType)(["TSEntityName", "TSExternalModuleReference"]),
    importKind: {
      validate: (0, _utils.assertOneOf)("type", "value"),
      optional: true
    }
  }
});
defineType("TSExternalModuleReference", {
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("StringLiteral")
  }
});
defineType("TSNonNullExpression", {
  aliases: ["Expression", "LVal", "PatternLike"],
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSExportAssignment", {
  aliases: ["Statement"],
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSNamespaceExportDeclaration", {
  aliases: ["Statement"],
  visitor: ["id"],
  fields: {
    id: (0, _utils.validateType)("Identifier")
  }
});
defineType("TSTypeAnnotation", {
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TSType")
    }
  }
});
defineType("TSTypeParameterInstantiation", {
  visitor: ["params"],
  fields: {
    params: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSType")))
    }
  }
});
defineType("TSTypeParameterDeclaration", {
  visitor: ["params"],
  fields: {
    params: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSTypeParameter")))
    }
  }
});
defineType("TSTypeParameter", {
  builder: ["constraint", "default", "name"],
  visitor: ["constraint", "default"],
  fields: {
    name: {
      validate: (0, _utils.assertValueType)("string")
    },
    in: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    out: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    const: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    constraint: {
      validate: (0, _utils.assertNodeType)("TSType"),
      optional: true
    },
    default: {
      validate: (0, _utils.assertNodeType)("TSType"),
      optional: true
    }
  }
});

//# sourceMappingURL=typescript.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/definitions/utils.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/types/lib/definitions/utils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.VISITOR_KEYS = exports.NODE_PARENT_VALIDATIONS = exports.NODE_FIELDS = exports.FLIPPED_ALIAS_KEYS = exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.ALIAS_KEYS = void 0;
exports.arrayOf = arrayOf;
exports.arrayOfType = arrayOfType;
exports.assertEach = assertEach;
exports.assertNodeOrValueType = assertNodeOrValueType;
exports.assertNodeType = assertNodeType;
exports.assertOneOf = assertOneOf;
exports.assertOptionalChainStart = assertOptionalChainStart;
exports.assertShape = assertShape;
exports.assertValueType = assertValueType;
exports.chain = chain;
exports["default"] = defineType;
exports.defineAliasedType = defineAliasedType;
exports.typeIs = typeIs;
exports.validate = validate;
exports.validateArrayOfType = validateArrayOfType;
exports.validateOptional = validateOptional;
exports.validateOptionalType = validateOptionalType;
exports.validateType = validateType;
var _is = __webpack_require__(/*! ../validators/is.js */ "./node_modules/@babel/types/lib/validators/is.js");
var _validate = __webpack_require__(/*! ../validators/validate.js */ "./node_modules/@babel/types/lib/validators/validate.js");
const VISITOR_KEYS = {};
exports.VISITOR_KEYS = VISITOR_KEYS;
const ALIAS_KEYS = {};
exports.ALIAS_KEYS = ALIAS_KEYS;
const FLIPPED_ALIAS_KEYS = {};
exports.FLIPPED_ALIAS_KEYS = FLIPPED_ALIAS_KEYS;
const NODE_FIELDS = {};
exports.NODE_FIELDS = NODE_FIELDS;
const BUILDER_KEYS = {};
exports.BUILDER_KEYS = BUILDER_KEYS;
const DEPRECATED_KEYS = {};
exports.DEPRECATED_KEYS = DEPRECATED_KEYS;
const NODE_PARENT_VALIDATIONS = {};
exports.NODE_PARENT_VALIDATIONS = NODE_PARENT_VALIDATIONS;
function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else {
    return typeof val;
  }
}
function validate(validate) {
  return {
    validate
  };
}
function typeIs(typeName) {
  return typeof typeName === "string" ? assertNodeType(typeName) : assertNodeType(...typeName);
}
function validateType(typeName) {
  return validate(typeIs(typeName));
}
function validateOptional(validate) {
  return {
    validate,
    optional: true
  };
}
function validateOptionalType(typeName) {
  return {
    validate: typeIs(typeName),
    optional: true
  };
}
function arrayOf(elementType) {
  return chain(assertValueType("array"), assertEach(elementType));
}
function arrayOfType(typeName) {
  return arrayOf(typeIs(typeName));
}
function validateArrayOfType(typeName) {
  return validate(arrayOfType(typeName));
}
function assertEach(callback) {
  function validator(node, key, val) {
    if (!Array.isArray(val)) return;
    for (let i = 0; i < val.length; i++) {
      const subkey = `${key}[${i}]`;
      const v = val[i];
      callback(node, subkey, v);
      if (process.env.BABEL_TYPES_8_BREAKING) (0, _validate.validateChild)(node, subkey, v);
    }
  }
  validator.each = callback;
  return validator;
}
function assertOneOf(...values) {
  function validate(node, key, val) {
    if (values.indexOf(val) < 0) {
      throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
    }
  }
  validate.oneOf = values;
  return validate;
}
function assertNodeType(...types) {
  function validate(node, key, val) {
    for (const type of types) {
      if ((0, _is.default)(type, val)) {
        (0, _validate.validateChild)(node, key, val);
        return;
      }
    }
    throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
  }
  validate.oneOfNodeTypes = types;
  return validate;
}
function assertNodeOrValueType(...types) {
  function validate(node, key, val) {
    for (const type of types) {
      if (getType(val) === type || (0, _is.default)(type, val)) {
        (0, _validate.validateChild)(node, key, val);
        return;
      }
    }
    throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
  }
  validate.oneOfNodeOrValueTypes = types;
  return validate;
}
function assertValueType(type) {
  function validate(node, key, val) {
    const valid = getType(val) === type;
    if (!valid) {
      throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
    }
  }
  validate.type = type;
  return validate;
}
function assertShape(shape) {
  function validate(node, key, val) {
    const errors = [];
    for (const property of Object.keys(shape)) {
      try {
        (0, _validate.validateField)(node, property, val[property], shape[property]);
      } catch (error) {
        if (error instanceof TypeError) {
          errors.push(error.message);
          continue;
        }
        throw error;
      }
    }
    if (errors.length) {
      throw new TypeError(`Property ${key} of ${node.type} expected to have the following:\n${errors.join("\n")}`);
    }
  }
  validate.shapeOf = shape;
  return validate;
}
function assertOptionalChainStart() {
  function validate(node) {
    var _current;
    let current = node;
    while (node) {
      const {
        type
      } = current;
      if (type === "OptionalCallExpression") {
        if (current.optional) return;
        current = current.callee;
        continue;
      }
      if (type === "OptionalMemberExpression") {
        if (current.optional) return;
        current = current.object;
        continue;
      }
      break;
    }
    throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${(_current = current) == null ? void 0 : _current.type}`);
  }
  return validate;
}
function chain(...fns) {
  function validate(...args) {
    for (const fn of fns) {
      fn(...args);
    }
  }
  validate.chainOf = fns;
  if (fns.length >= 2 && "type" in fns[0] && fns[0].type === "array" && !("each" in fns[1])) {
    throw new Error(`An assertValueType("array") validator can only be followed by an assertEach(...) validator.`);
  }
  return validate;
}
const validTypeOpts = ["aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate"];
const validFieldKeys = ["default", "optional", "deprecated", "validate"];
const store = {};
function defineAliasedType(...aliases) {
  return (type, opts = {}) => {
    let defined = opts.aliases;
    if (!defined) {
      var _store$opts$inherits$, _defined;
      if (opts.inherits) defined = (_store$opts$inherits$ = store[opts.inherits].aliases) == null ? void 0 : _store$opts$inherits$.slice();
      (_defined = defined) != null ? _defined : defined = [];
      opts.aliases = defined;
    }
    const additional = aliases.filter(a => !defined.includes(a));
    defined.unshift(...additional);
    defineType(type, opts);
  };
}
function defineType(type, opts = {}) {
  const inherits = opts.inherits && store[opts.inherits] || {};
  let fields = opts.fields;
  if (!fields) {
    fields = {};
    if (inherits.fields) {
      const keys = Object.getOwnPropertyNames(inherits.fields);
      for (const key of keys) {
        const field = inherits.fields[key];
        const def = field.default;
        if (Array.isArray(def) ? def.length > 0 : def && typeof def === "object") {
          throw new Error("field defaults can only be primitives or empty arrays currently");
        }
        fields[key] = {
          default: Array.isArray(def) ? [] : def,
          optional: field.optional,
          deprecated: field.deprecated,
          validate: field.validate
        };
      }
    }
  }
  const visitor = opts.visitor || inherits.visitor || [];
  const aliases = opts.aliases || inherits.aliases || [];
  const builder = opts.builder || inherits.builder || opts.visitor || [];
  for (const k of Object.keys(opts)) {
    if (validTypeOpts.indexOf(k) === -1) {
      throw new Error(`Unknown type option "${k}" on ${type}`);
    }
  }
  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }
  for (const key of visitor.concat(builder)) {
    fields[key] = fields[key] || {};
  }
  for (const key of Object.keys(fields)) {
    const field = fields[key];
    if (field.default !== undefined && builder.indexOf(key) === -1) {
      field.optional = true;
    }
    if (field.default === undefined) {
      field.default = null;
    } else if (!field.validate && field.default != null) {
      field.validate = assertValueType(getType(field.default));
    }
    for (const k of Object.keys(field)) {
      if (validFieldKeys.indexOf(k) === -1) {
        throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
      }
    }
  }
  VISITOR_KEYS[type] = opts.visitor = visitor;
  BUILDER_KEYS[type] = opts.builder = builder;
  NODE_FIELDS[type] = opts.fields = fields;
  ALIAS_KEYS[type] = opts.aliases = aliases;
  aliases.forEach(alias => {
    FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
    FLIPPED_ALIAS_KEYS[alias].push(type);
  });
  if (opts.validate) {
    NODE_PARENT_VALIDATIONS[type] = opts.validate;
  }
  store[type] = opts;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/@babel/types/lib/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  react: true,
  assertNode: true,
  createTypeAnnotationBasedOnTypeof: true,
  createUnionTypeAnnotation: true,
  createFlowUnionType: true,
  createTSUnionType: true,
  cloneNode: true,
  clone: true,
  cloneDeep: true,
  cloneDeepWithoutLoc: true,
  cloneWithoutLoc: true,
  addComment: true,
  addComments: true,
  inheritInnerComments: true,
  inheritLeadingComments: true,
  inheritsComments: true,
  inheritTrailingComments: true,
  removeComments: true,
  ensureBlock: true,
  toBindingIdentifierName: true,
  toBlock: true,
  toComputedKey: true,
  toExpression: true,
  toIdentifier: true,
  toKeyAlias: true,
  toSequenceExpression: true,
  toStatement: true,
  valueToNode: true,
  appendToMemberExpression: true,
  inherits: true,
  prependToMemberExpression: true,
  removeProperties: true,
  removePropertiesDeep: true,
  removeTypeDuplicates: true,
  getBindingIdentifiers: true,
  getOuterBindingIdentifiers: true,
  traverse: true,
  traverseFast: true,
  shallowEqual: true,
  is: true,
  isBinding: true,
  isBlockScoped: true,
  isImmutable: true,
  isLet: true,
  isNode: true,
  isNodesEquivalent: true,
  isPlaceholderType: true,
  isReferenced: true,
  isScope: true,
  isSpecifierDefault: true,
  isType: true,
  isValidES3Identifier: true,
  isValidIdentifier: true,
  isVar: true,
  matchesPattern: true,
  validate: true,
  buildMatchMemberExpression: true,
  __internal__deprecationWarning: true
};
Object.defineProperty(exports, "__internal__deprecationWarning", ({
  enumerable: true,
  get: function () {
    return _deprecationWarning.default;
  }
}));
Object.defineProperty(exports, "addComment", ({
  enumerable: true,
  get: function () {
    return _addComment.default;
  }
}));
Object.defineProperty(exports, "addComments", ({
  enumerable: true,
  get: function () {
    return _addComments.default;
  }
}));
Object.defineProperty(exports, "appendToMemberExpression", ({
  enumerable: true,
  get: function () {
    return _appendToMemberExpression.default;
  }
}));
Object.defineProperty(exports, "assertNode", ({
  enumerable: true,
  get: function () {
    return _assertNode.default;
  }
}));
Object.defineProperty(exports, "buildMatchMemberExpression", ({
  enumerable: true,
  get: function () {
    return _buildMatchMemberExpression.default;
  }
}));
Object.defineProperty(exports, "clone", ({
  enumerable: true,
  get: function () {
    return _clone.default;
  }
}));
Object.defineProperty(exports, "cloneDeep", ({
  enumerable: true,
  get: function () {
    return _cloneDeep.default;
  }
}));
Object.defineProperty(exports, "cloneDeepWithoutLoc", ({
  enumerable: true,
  get: function () {
    return _cloneDeepWithoutLoc.default;
  }
}));
Object.defineProperty(exports, "cloneNode", ({
  enumerable: true,
  get: function () {
    return _cloneNode.default;
  }
}));
Object.defineProperty(exports, "cloneWithoutLoc", ({
  enumerable: true,
  get: function () {
    return _cloneWithoutLoc.default;
  }
}));
Object.defineProperty(exports, "createFlowUnionType", ({
  enumerable: true,
  get: function () {
    return _createFlowUnionType.default;
  }
}));
Object.defineProperty(exports, "createTSUnionType", ({
  enumerable: true,
  get: function () {
    return _createTSUnionType.default;
  }
}));
Object.defineProperty(exports, "createTypeAnnotationBasedOnTypeof", ({
  enumerable: true,
  get: function () {
    return _createTypeAnnotationBasedOnTypeof.default;
  }
}));
Object.defineProperty(exports, "createUnionTypeAnnotation", ({
  enumerable: true,
  get: function () {
    return _createFlowUnionType.default;
  }
}));
Object.defineProperty(exports, "ensureBlock", ({
  enumerable: true,
  get: function () {
    return _ensureBlock.default;
  }
}));
Object.defineProperty(exports, "getBindingIdentifiers", ({
  enumerable: true,
  get: function () {
    return _getBindingIdentifiers.default;
  }
}));
Object.defineProperty(exports, "getOuterBindingIdentifiers", ({
  enumerable: true,
  get: function () {
    return _getOuterBindingIdentifiers.default;
  }
}));
Object.defineProperty(exports, "inheritInnerComments", ({
  enumerable: true,
  get: function () {
    return _inheritInnerComments.default;
  }
}));
Object.defineProperty(exports, "inheritLeadingComments", ({
  enumerable: true,
  get: function () {
    return _inheritLeadingComments.default;
  }
}));
Object.defineProperty(exports, "inheritTrailingComments", ({
  enumerable: true,
  get: function () {
    return _inheritTrailingComments.default;
  }
}));
Object.defineProperty(exports, "inherits", ({
  enumerable: true,
  get: function () {
    return _inherits.default;
  }
}));
Object.defineProperty(exports, "inheritsComments", ({
  enumerable: true,
  get: function () {
    return _inheritsComments.default;
  }
}));
Object.defineProperty(exports, "is", ({
  enumerable: true,
  get: function () {
    return _is.default;
  }
}));
Object.defineProperty(exports, "isBinding", ({
  enumerable: true,
  get: function () {
    return _isBinding.default;
  }
}));
Object.defineProperty(exports, "isBlockScoped", ({
  enumerable: true,
  get: function () {
    return _isBlockScoped.default;
  }
}));
Object.defineProperty(exports, "isImmutable", ({
  enumerable: true,
  get: function () {
    return _isImmutable.default;
  }
}));
Object.defineProperty(exports, "isLet", ({
  enumerable: true,
  get: function () {
    return _isLet.default;
  }
}));
Object.defineProperty(exports, "isNode", ({
  enumerable: true,
  get: function () {
    return _isNode.default;
  }
}));
Object.defineProperty(exports, "isNodesEquivalent", ({
  enumerable: true,
  get: function () {
    return _isNodesEquivalent.default;
  }
}));
Object.defineProperty(exports, "isPlaceholderType", ({
  enumerable: true,
  get: function () {
    return _isPlaceholderType.default;
  }
}));
Object.defineProperty(exports, "isReferenced", ({
  enumerable: true,
  get: function () {
    return _isReferenced.default;
  }
}));
Object.defineProperty(exports, "isScope", ({
  enumerable: true,
  get: function () {
    return _isScope.default;
  }
}));
Object.defineProperty(exports, "isSpecifierDefault", ({
  enumerable: true,
  get: function () {
    return _isSpecifierDefault.default;
  }
}));
Object.defineProperty(exports, "isType", ({
  enumerable: true,
  get: function () {
    return _isType.default;
  }
}));
Object.defineProperty(exports, "isValidES3Identifier", ({
  enumerable: true,
  get: function () {
    return _isValidES3Identifier.default;
  }
}));
Object.defineProperty(exports, "isValidIdentifier", ({
  enumerable: true,
  get: function () {
    return _isValidIdentifier.default;
  }
}));
Object.defineProperty(exports, "isVar", ({
  enumerable: true,
  get: function () {
    return _isVar.default;
  }
}));
Object.defineProperty(exports, "matchesPattern", ({
  enumerable: true,
  get: function () {
    return _matchesPattern.default;
  }
}));
Object.defineProperty(exports, "prependToMemberExpression", ({
  enumerable: true,
  get: function () {
    return _prependToMemberExpression.default;
  }
}));
exports.react = void 0;
Object.defineProperty(exports, "removeComments", ({
  enumerable: true,
  get: function () {
    return _removeComments.default;
  }
}));
Object.defineProperty(exports, "removeProperties", ({
  enumerable: true,
  get: function () {
    return _removeProperties.default;
  }
}));
Object.defineProperty(exports, "removePropertiesDeep", ({
  enumerable: true,
  get: function () {
    return _removePropertiesDeep.default;
  }
}));
Object.defineProperty(exports, "removeTypeDuplicates", ({
  enumerable: true,
  get: function () {
    return _removeTypeDuplicates.default;
  }
}));
Object.defineProperty(exports, "shallowEqual", ({
  enumerable: true,
  get: function () {
    return _shallowEqual.default;
  }
}));
Object.defineProperty(exports, "toBindingIdentifierName", ({
  enumerable: true,
  get: function () {
    return _toBindingIdentifierName.default;
  }
}));
Object.defineProperty(exports, "toBlock", ({
  enumerable: true,
  get: function () {
    return _toBlock.default;
  }
}));
Object.defineProperty(exports, "toComputedKey", ({
  enumerable: true,
  get: function () {
    return _toComputedKey.default;
  }
}));
Object.defineProperty(exports, "toExpression", ({
  enumerable: true,
  get: function () {
    return _toExpression.default;
  }
}));
Object.defineProperty(exports, "toIdentifier", ({
  enumerable: true,
  get: function () {
    return _toIdentifier.default;
  }
}));
Object.defineProperty(exports, "toKeyAlias", ({
  enumerable: true,
  get: function () {
    return _toKeyAlias.default;
  }
}));
Object.defineProperty(exports, "toSequenceExpression", ({
  enumerable: true,
  get: function () {
    return _toSequenceExpression.default;
  }
}));
Object.defineProperty(exports, "toStatement", ({
  enumerable: true,
  get: function () {
    return _toStatement.default;
  }
}));
Object.defineProperty(exports, "traverse", ({
  enumerable: true,
  get: function () {
    return _traverse.default;
  }
}));
Object.defineProperty(exports, "traverseFast", ({
  enumerable: true,
  get: function () {
    return _traverseFast.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "valueToNode", ({
  enumerable: true,
  get: function () {
    return _valueToNode.default;
  }
}));
var _isReactComponent = __webpack_require__(/*! ./validators/react/isReactComponent.js */ "./node_modules/@babel/types/lib/validators/react/isReactComponent.js");
var _isCompatTag = __webpack_require__(/*! ./validators/react/isCompatTag.js */ "./node_modules/@babel/types/lib/validators/react/isCompatTag.js");
var _buildChildren = __webpack_require__(/*! ./builders/react/buildChildren.js */ "./node_modules/@babel/types/lib/builders/react/buildChildren.js");
var _assertNode = __webpack_require__(/*! ./asserts/assertNode.js */ "./node_modules/@babel/types/lib/asserts/assertNode.js");
var _index = __webpack_require__(/*! ./asserts/generated/index.js */ "./node_modules/@babel/types/lib/asserts/generated/index.js");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var _createTypeAnnotationBasedOnTypeof = __webpack_require__(/*! ./builders/flow/createTypeAnnotationBasedOnTypeof.js */ "./node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js");
var _createFlowUnionType = __webpack_require__(/*! ./builders/flow/createFlowUnionType.js */ "./node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js");
var _createTSUnionType = __webpack_require__(/*! ./builders/typescript/createTSUnionType.js */ "./node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js");
var _index2 = __webpack_require__(/*! ./builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});
var _uppercase = __webpack_require__(/*! ./builders/generated/uppercase.js */ "./node_modules/@babel/types/lib/builders/generated/uppercase.js");
Object.keys(_uppercase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _uppercase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _uppercase[key];
    }
  });
});
var _cloneNode = __webpack_require__(/*! ./clone/cloneNode.js */ "./node_modules/@babel/types/lib/clone/cloneNode.js");
var _clone = __webpack_require__(/*! ./clone/clone.js */ "./node_modules/@babel/types/lib/clone/clone.js");
var _cloneDeep = __webpack_require__(/*! ./clone/cloneDeep.js */ "./node_modules/@babel/types/lib/clone/cloneDeep.js");
var _cloneDeepWithoutLoc = __webpack_require__(/*! ./clone/cloneDeepWithoutLoc.js */ "./node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js");
var _cloneWithoutLoc = __webpack_require__(/*! ./clone/cloneWithoutLoc.js */ "./node_modules/@babel/types/lib/clone/cloneWithoutLoc.js");
var _addComment = __webpack_require__(/*! ./comments/addComment.js */ "./node_modules/@babel/types/lib/comments/addComment.js");
var _addComments = __webpack_require__(/*! ./comments/addComments.js */ "./node_modules/@babel/types/lib/comments/addComments.js");
var _inheritInnerComments = __webpack_require__(/*! ./comments/inheritInnerComments.js */ "./node_modules/@babel/types/lib/comments/inheritInnerComments.js");
var _inheritLeadingComments = __webpack_require__(/*! ./comments/inheritLeadingComments.js */ "./node_modules/@babel/types/lib/comments/inheritLeadingComments.js");
var _inheritsComments = __webpack_require__(/*! ./comments/inheritsComments.js */ "./node_modules/@babel/types/lib/comments/inheritsComments.js");
var _inheritTrailingComments = __webpack_require__(/*! ./comments/inheritTrailingComments.js */ "./node_modules/@babel/types/lib/comments/inheritTrailingComments.js");
var _removeComments = __webpack_require__(/*! ./comments/removeComments.js */ "./node_modules/@babel/types/lib/comments/removeComments.js");
var _index3 = __webpack_require__(/*! ./constants/generated/index.js */ "./node_modules/@babel/types/lib/constants/generated/index.js");
Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index3[key];
    }
  });
});
var _index4 = __webpack_require__(/*! ./constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
Object.keys(_index4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index4[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index4[key];
    }
  });
});
var _ensureBlock = __webpack_require__(/*! ./converters/ensureBlock.js */ "./node_modules/@babel/types/lib/converters/ensureBlock.js");
var _toBindingIdentifierName = __webpack_require__(/*! ./converters/toBindingIdentifierName.js */ "./node_modules/@babel/types/lib/converters/toBindingIdentifierName.js");
var _toBlock = __webpack_require__(/*! ./converters/toBlock.js */ "./node_modules/@babel/types/lib/converters/toBlock.js");
var _toComputedKey = __webpack_require__(/*! ./converters/toComputedKey.js */ "./node_modules/@babel/types/lib/converters/toComputedKey.js");
var _toExpression = __webpack_require__(/*! ./converters/toExpression.js */ "./node_modules/@babel/types/lib/converters/toExpression.js");
var _toIdentifier = __webpack_require__(/*! ./converters/toIdentifier.js */ "./node_modules/@babel/types/lib/converters/toIdentifier.js");
var _toKeyAlias = __webpack_require__(/*! ./converters/toKeyAlias.js */ "./node_modules/@babel/types/lib/converters/toKeyAlias.js");
var _toSequenceExpression = __webpack_require__(/*! ./converters/toSequenceExpression.js */ "./node_modules/@babel/types/lib/converters/toSequenceExpression.js");
var _toStatement = __webpack_require__(/*! ./converters/toStatement.js */ "./node_modules/@babel/types/lib/converters/toStatement.js");
var _valueToNode = __webpack_require__(/*! ./converters/valueToNode.js */ "./node_modules/@babel/types/lib/converters/valueToNode.js");
var _index5 = __webpack_require__(/*! ./definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
Object.keys(_index5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index5[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index5[key];
    }
  });
});
var _appendToMemberExpression = __webpack_require__(/*! ./modifications/appendToMemberExpression.js */ "./node_modules/@babel/types/lib/modifications/appendToMemberExpression.js");
var _inherits = __webpack_require__(/*! ./modifications/inherits.js */ "./node_modules/@babel/types/lib/modifications/inherits.js");
var _prependToMemberExpression = __webpack_require__(/*! ./modifications/prependToMemberExpression.js */ "./node_modules/@babel/types/lib/modifications/prependToMemberExpression.js");
var _removeProperties = __webpack_require__(/*! ./modifications/removeProperties.js */ "./node_modules/@babel/types/lib/modifications/removeProperties.js");
var _removePropertiesDeep = __webpack_require__(/*! ./modifications/removePropertiesDeep.js */ "./node_modules/@babel/types/lib/modifications/removePropertiesDeep.js");
var _removeTypeDuplicates = __webpack_require__(/*! ./modifications/flow/removeTypeDuplicates.js */ "./node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js");
var _getBindingIdentifiers = __webpack_require__(/*! ./retrievers/getBindingIdentifiers.js */ "./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js");
var _getOuterBindingIdentifiers = __webpack_require__(/*! ./retrievers/getOuterBindingIdentifiers.js */ "./node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js");
var _traverse = __webpack_require__(/*! ./traverse/traverse.js */ "./node_modules/@babel/types/lib/traverse/traverse.js");
Object.keys(_traverse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _traverse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _traverse[key];
    }
  });
});
var _traverseFast = __webpack_require__(/*! ./traverse/traverseFast.js */ "./node_modules/@babel/types/lib/traverse/traverseFast.js");
var _shallowEqual = __webpack_require__(/*! ./utils/shallowEqual.js */ "./node_modules/@babel/types/lib/utils/shallowEqual.js");
var _is = __webpack_require__(/*! ./validators/is.js */ "./node_modules/@babel/types/lib/validators/is.js");
var _isBinding = __webpack_require__(/*! ./validators/isBinding.js */ "./node_modules/@babel/types/lib/validators/isBinding.js");
var _isBlockScoped = __webpack_require__(/*! ./validators/isBlockScoped.js */ "./node_modules/@babel/types/lib/validators/isBlockScoped.js");
var _isImmutable = __webpack_require__(/*! ./validators/isImmutable.js */ "./node_modules/@babel/types/lib/validators/isImmutable.js");
var _isLet = __webpack_require__(/*! ./validators/isLet.js */ "./node_modules/@babel/types/lib/validators/isLet.js");
var _isNode = __webpack_require__(/*! ./validators/isNode.js */ "./node_modules/@babel/types/lib/validators/isNode.js");
var _isNodesEquivalent = __webpack_require__(/*! ./validators/isNodesEquivalent.js */ "./node_modules/@babel/types/lib/validators/isNodesEquivalent.js");
var _isPlaceholderType = __webpack_require__(/*! ./validators/isPlaceholderType.js */ "./node_modules/@babel/types/lib/validators/isPlaceholderType.js");
var _isReferenced = __webpack_require__(/*! ./validators/isReferenced.js */ "./node_modules/@babel/types/lib/validators/isReferenced.js");
var _isScope = __webpack_require__(/*! ./validators/isScope.js */ "./node_modules/@babel/types/lib/validators/isScope.js");
var _isSpecifierDefault = __webpack_require__(/*! ./validators/isSpecifierDefault.js */ "./node_modules/@babel/types/lib/validators/isSpecifierDefault.js");
var _isType = __webpack_require__(/*! ./validators/isType.js */ "./node_modules/@babel/types/lib/validators/isType.js");
var _isValidES3Identifier = __webpack_require__(/*! ./validators/isValidES3Identifier.js */ "./node_modules/@babel/types/lib/validators/isValidES3Identifier.js");
var _isValidIdentifier = __webpack_require__(/*! ./validators/isValidIdentifier.js */ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js");
var _isVar = __webpack_require__(/*! ./validators/isVar.js */ "./node_modules/@babel/types/lib/validators/isVar.js");
var _matchesPattern = __webpack_require__(/*! ./validators/matchesPattern.js */ "./node_modules/@babel/types/lib/validators/matchesPattern.js");
var _validate = __webpack_require__(/*! ./validators/validate.js */ "./node_modules/@babel/types/lib/validators/validate.js");
var _buildMatchMemberExpression = __webpack_require__(/*! ./validators/buildMatchMemberExpression.js */ "./node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js");
var _index6 = __webpack_require__(/*! ./validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
Object.keys(_index6).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index6[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index6[key];
    }
  });
});
var _deprecationWarning = __webpack_require__(/*! ./utils/deprecationWarning.js */ "./node_modules/@babel/types/lib/utils/deprecationWarning.js");
const react = {
  isReactComponent: _isReactComponent.default,
  isCompatTag: _isCompatTag.default,
  buildChildren: _buildChildren.default
};
exports.react = react;

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/appendToMemberExpression.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/appendToMemberExpression.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = appendToMemberExpression;
var _index = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
function appendToMemberExpression(member, append, computed = false) {
  member.object = (0, _index.memberExpression)(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

//# sourceMappingURL=appendToMemberExpression.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeTypeDuplicates;
var _index = __webpack_require__(/*! ../../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function getQualifiedName(node) {
  return (0, _index.isIdentifier)(node) ? node.name : `${node.id.name}.${getQualifiedName(node.qualification)}`;
}
function removeTypeDuplicates(nodesIn) {
  const nodes = Array.from(nodesIn);
  const generics = new Map();
  const bases = new Map();
  const typeGroups = new Set();
  const types = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;
    if (types.indexOf(node) >= 0) {
      continue;
    }
    if ((0, _index.isAnyTypeAnnotation)(node)) {
      return [node];
    }
    if ((0, _index.isFlowBaseAnnotation)(node)) {
      bases.set(node.type, node);
      continue;
    }
    if ((0, _index.isUnionTypeAnnotation)(node)) {
      if (!typeGroups.has(node.types)) {
        nodes.push(...node.types);
        typeGroups.add(node.types);
      }
      continue;
    }
    if ((0, _index.isGenericTypeAnnotation)(node)) {
      const name = getQualifiedName(node.id);
      if (generics.has(name)) {
        let existing = generics.get(name);
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params.push(...node.typeParameters.params);
            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params);
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics.set(name, node);
      }
      continue;
    }
    types.push(node);
  }
  for (const [, baseType] of bases) {
    types.push(baseType);
  }
  for (const [, genericName] of generics) {
    types.push(genericName);
  }
  return types;
}

//# sourceMappingURL=removeTypeDuplicates.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/inherits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/inherits.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inherits;
var _index = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
var _inheritsComments = __webpack_require__(/*! ../comments/inheritsComments.js */ "./node_modules/@babel/types/lib/comments/inheritsComments.js");
function inherits(child, parent) {
  if (!child || !parent) return child;
  for (const key of _index.INHERIT_KEYS.optional) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }
  for (const key of Object.keys(parent)) {
    if (key[0] === "_" && key !== "__clone") {
      child[key] = parent[key];
    }
  }
  for (const key of _index.INHERIT_KEYS.force) {
    child[key] = parent[key];
  }
  (0, _inheritsComments.default)(child, parent);
  return child;
}

//# sourceMappingURL=inherits.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/prependToMemberExpression.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/prependToMemberExpression.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = prependToMemberExpression;
var _index = __webpack_require__(/*! ../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _index2 = __webpack_require__(/*! ../index.js */ "./node_modules/@babel/types/lib/index.js");
function prependToMemberExpression(member, prepend) {
  if ((0, _index2.isSuper)(member.object)) {
    throw new Error("Cannot prepend node to super property access (`super.foo`).");
  }
  member.object = (0, _index.memberExpression)(prepend, member.object);
  return member;
}

//# sourceMappingURL=prependToMemberExpression.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/removeProperties.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/removeProperties.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeProperties;
var _index = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
const CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];
const CLEAR_KEYS_PLUS_COMMENTS = [..._index.COMMENT_KEYS, "comments", ...CLEAR_KEYS];
function removeProperties(node, opts = {}) {
  const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (const key of map) {
    if (node[key] != null) node[key] = undefined;
  }
  for (const key of Object.keys(node)) {
    if (key[0] === "_" && node[key] != null) node[key] = undefined;
  }
  const symbols = Object.getOwnPropertySymbols(node);
  for (const sym of symbols) {
    node[sym] = null;
  }
}

//# sourceMappingURL=removeProperties.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/removePropertiesDeep.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/removePropertiesDeep.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removePropertiesDeep;
var _traverseFast = __webpack_require__(/*! ../traverse/traverseFast.js */ "./node_modules/@babel/types/lib/traverse/traverseFast.js");
var _removeProperties = __webpack_require__(/*! ./removeProperties.js */ "./node_modules/@babel/types/lib/modifications/removeProperties.js");
function removePropertiesDeep(tree, opts) {
  (0, _traverseFast.default)(tree, _removeProperties.default, opts);
  return tree;
}

//# sourceMappingURL=removePropertiesDeep.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeTypeDuplicates;
var _index = __webpack_require__(/*! ../../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function getQualifiedName(node) {
  return (0, _index.isIdentifier)(node) ? node.name : `${node.right.name}.${getQualifiedName(node.left)}`;
}
function removeTypeDuplicates(nodesIn) {
  const nodes = Array.from(nodesIn);
  const generics = new Map();
  const bases = new Map();
  const typeGroups = new Set();
  const types = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;
    if (types.indexOf(node) >= 0) {
      continue;
    }
    if ((0, _index.isTSAnyKeyword)(node)) {
      return [node];
    }
    if ((0, _index.isTSBaseType)(node)) {
      bases.set(node.type, node);
      continue;
    }
    if ((0, _index.isTSUnionType)(node)) {
      if (!typeGroups.has(node.types)) {
        nodes.push(...node.types);
        typeGroups.add(node.types);
      }
      continue;
    }
    if ((0, _index.isTSTypeReference)(node) && node.typeParameters) {
      const name = getQualifiedName(node.typeName);
      if (generics.has(name)) {
        let existing = generics.get(name);
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params.push(...node.typeParameters.params);
            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params);
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics.set(name, node);
      }
      continue;
    }
    types.push(node);
  }
  for (const [, baseType] of bases) {
    types.push(baseType);
  }
  for (const [, genericName] of generics) {
    types.push(genericName);
  }
  return types;
}

//# sourceMappingURL=removeTypeDuplicates.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getBindingIdentifiers;
var _index = __webpack_require__(/*! ../validators/generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function getBindingIdentifiers(node, duplicates, outerOnly) {
  const search = [].concat(node);
  const ids = Object.create(null);
  while (search.length) {
    const id = search.shift();
    if (!id) continue;
    const keys = getBindingIdentifiers.keys[id.type];
    if ((0, _index.isIdentifier)(id)) {
      if (duplicates) {
        const _ids = ids[id.name] = ids[id.name] || [];
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
      continue;
    }
    if ((0, _index.isExportDeclaration)(id) && !(0, _index.isExportAllDeclaration)(id)) {
      if ((0, _index.isDeclaration)(id.declaration)) {
        search.push(id.declaration);
      }
      continue;
    }
    if (outerOnly) {
      if ((0, _index.isFunctionDeclaration)(id)) {
        search.push(id.id);
        continue;
      }
      if ((0, _index.isFunctionExpression)(id)) {
        continue;
      }
    }
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const nodes = id[key];
        if (nodes) {
          Array.isArray(nodes) ? search.push(...nodes) : search.push(nodes);
        }
      }
    }
  }
  return ids;
}
getBindingIdentifiers.keys = {
  DeclareClass: ["id"],
  DeclareFunction: ["id"],
  DeclareModule: ["id"],
  DeclareVariable: ["id"],
  DeclareInterface: ["id"],
  DeclareTypeAlias: ["id"],
  DeclareOpaqueType: ["id"],
  InterfaceDeclaration: ["id"],
  TypeAlias: ["id"],
  OpaqueType: ["id"],
  CatchClause: ["param"],
  LabeledStatement: ["label"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],
  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  ImportDeclaration: ["specifiers"],
  ExportSpecifier: ["exported"],
  ExportNamespaceSpecifier: ["exported"],
  ExportDefaultSpecifier: ["exported"],
  FunctionDeclaration: ["id", "params"],
  FunctionExpression: ["id", "params"],
  ArrowFunctionExpression: ["params"],
  ObjectMethod: ["params"],
  ClassMethod: ["params"],
  ClassPrivateMethod: ["params"],
  ForInStatement: ["left"],
  ForOfStatement: ["left"],
  ClassDeclaration: ["id"],
  ClassExpression: ["id"],
  RestElement: ["argument"],
  UpdateExpression: ["argument"],
  ObjectProperty: ["value"],
  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"]
};

//# sourceMappingURL=getBindingIdentifiers.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _getBindingIdentifiers = __webpack_require__(/*! ./getBindingIdentifiers.js */ "./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js");
var _default = getOuterBindingIdentifiers;
exports["default"] = _default;
function getOuterBindingIdentifiers(node, duplicates) {
  return (0, _getBindingIdentifiers.default)(node, duplicates, true);
}

//# sourceMappingURL=getOuterBindingIdentifiers.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/traverse/traverse.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/types/lib/traverse/traverse.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = traverse;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function traverse(node, handlers, state) {
  if (typeof handlers === "function") {
    handlers = {
      enter: handlers
    };
  }
  const {
    enter,
    exit
  } = handlers;
  traverseSimpleImpl(node, enter, exit, state, []);
}
function traverseSimpleImpl(node, enter, exit, state, ancestors) {
  const keys = _index.VISITOR_KEYS[node.type];
  if (!keys) return;
  if (enter) enter(node, ancestors, state);
  for (const key of keys) {
    const subNode = node[key];
    if (Array.isArray(subNode)) {
      for (let i = 0; i < subNode.length; i++) {
        const child = subNode[i];
        if (!child) continue;
        ancestors.push({
          node,
          key,
          index: i
        });
        traverseSimpleImpl(child, enter, exit, state, ancestors);
        ancestors.pop();
      }
    } else if (subNode) {
      ancestors.push({
        node,
        key
      });
      traverseSimpleImpl(subNode, enter, exit, state, ancestors);
      ancestors.pop();
    }
  }
  if (exit) exit(node, ancestors, state);
}

//# sourceMappingURL=traverse.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/traverse/traverseFast.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/traverse/traverseFast.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = traverseFast;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function traverseFast(node, enter, opts) {
  if (!node) return;
  const keys = _index.VISITOR_KEYS[node.type];
  if (!keys) return;
  opts = opts || {};
  enter(node, opts);
  for (const key of keys) {
    const subNode = node[key];
    if (Array.isArray(subNode)) {
      for (const node of subNode) {
        traverseFast(node, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}

//# sourceMappingURL=traverseFast.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/utils/deprecationWarning.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/utils/deprecationWarning.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = deprecationWarning;
const warnings = new Set();
function deprecationWarning(oldName, newName, prefix = "") {
  if (warnings.has(oldName)) return;
  warnings.add(oldName);
  const {
    internal,
    trace
  } = captureShortStackTrace(1, 2);
  if (internal) {
    return;
  }
  console.warn(`${prefix}\`${oldName}\` has been deprecated, please migrate to \`${newName}\`\n${trace}`);
}
function captureShortStackTrace(skip, length) {
  const {
    stackTraceLimit,
    prepareStackTrace
  } = Error;
  let stackTrace;
  Error.stackTraceLimit = 1 + skip + length;
  Error.prepareStackTrace = function (err, stack) {
    stackTrace = stack;
  };
  new Error().stack;
  Error.stackTraceLimit = stackTraceLimit;
  Error.prepareStackTrace = prepareStackTrace;
  if (!stackTrace) return {
    internal: false,
    trace: ""
  };
  const shortStackTrace = stackTrace.slice(1 + skip, 1 + skip + length);
  return {
    internal: /[\\/]@babel[\\/]/.test(shortStackTrace[1].getFileName()),
    trace: shortStackTrace.map(frame => `    at ${frame}`).join("\n")
  };
}

//# sourceMappingURL=deprecationWarning.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/utils/inherit.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/types/lib/utils/inherit.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = inherit;
function inherit(key, child, parent) {
  if (child && parent) {
    child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
  }
}

//# sourceMappingURL=inherit.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = cleanJSXElementLiteralChild;
var _index = __webpack_require__(/*! ../../builders/generated/index.js */ "./node_modules/@babel/types/lib/builders/generated/index.js");
var _index2 = __webpack_require__(/*! ../../index.js */ "./node_modules/@babel/types/lib/index.js");
function cleanJSXElementLiteralChild(child, args) {
  const lines = child.value.split(/\r\n|\n|\r/);
  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
    }
  }
  let str = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isFirstLine = i === 0;
    const isLastLine = i === lines.length - 1;
    const isLastNonEmptyLine = i === lastNonEmptyLine;
    let trimmedLine = line.replace(/\t/g, " ");
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    }
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    }
    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }
      str += trimmedLine;
    }
  }
  if (str) args.push((0, _index2.inherits)((0, _index.stringLiteral)(str), child));
}

//# sourceMappingURL=cleanJSXElementLiteralChild.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/utils/shallowEqual.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/types/lib/utils/shallowEqual.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = shallowEqual;
function shallowEqual(actual, expected) {
  const keys = Object.keys(expected);
  for (const key of keys) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=shallowEqual.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = buildMatchMemberExpression;
var _matchesPattern = __webpack_require__(/*! ./matchesPattern.js */ "./node_modules/@babel/types/lib/validators/matchesPattern.js");
function buildMatchMemberExpression(match, allowPartial) {
  const parts = match.split(".");
  return member => (0, _matchesPattern.default)(member, parts, allowPartial);
}

//# sourceMappingURL=buildMatchMemberExpression.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/generated/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/generated/index.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isAccessor = isAccessor;
exports.isAnyTypeAnnotation = isAnyTypeAnnotation;
exports.isArgumentPlaceholder = isArgumentPlaceholder;
exports.isArrayExpression = isArrayExpression;
exports.isArrayPattern = isArrayPattern;
exports.isArrayTypeAnnotation = isArrayTypeAnnotation;
exports.isArrowFunctionExpression = isArrowFunctionExpression;
exports.isAssignmentExpression = isAssignmentExpression;
exports.isAssignmentPattern = isAssignmentPattern;
exports.isAwaitExpression = isAwaitExpression;
exports.isBigIntLiteral = isBigIntLiteral;
exports.isBinary = isBinary;
exports.isBinaryExpression = isBinaryExpression;
exports.isBindExpression = isBindExpression;
exports.isBlock = isBlock;
exports.isBlockParent = isBlockParent;
exports.isBlockStatement = isBlockStatement;
exports.isBooleanLiteral = isBooleanLiteral;
exports.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
exports.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
exports.isBreakStatement = isBreakStatement;
exports.isCallExpression = isCallExpression;
exports.isCatchClause = isCatchClause;
exports.isClass = isClass;
exports.isClassAccessorProperty = isClassAccessorProperty;
exports.isClassBody = isClassBody;
exports.isClassDeclaration = isClassDeclaration;
exports.isClassExpression = isClassExpression;
exports.isClassImplements = isClassImplements;
exports.isClassMethod = isClassMethod;
exports.isClassPrivateMethod = isClassPrivateMethod;
exports.isClassPrivateProperty = isClassPrivateProperty;
exports.isClassProperty = isClassProperty;
exports.isCompletionStatement = isCompletionStatement;
exports.isConditional = isConditional;
exports.isConditionalExpression = isConditionalExpression;
exports.isContinueStatement = isContinueStatement;
exports.isDebuggerStatement = isDebuggerStatement;
exports.isDecimalLiteral = isDecimalLiteral;
exports.isDeclaration = isDeclaration;
exports.isDeclareClass = isDeclareClass;
exports.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
exports.isDeclareExportDeclaration = isDeclareExportDeclaration;
exports.isDeclareFunction = isDeclareFunction;
exports.isDeclareInterface = isDeclareInterface;
exports.isDeclareModule = isDeclareModule;
exports.isDeclareModuleExports = isDeclareModuleExports;
exports.isDeclareOpaqueType = isDeclareOpaqueType;
exports.isDeclareTypeAlias = isDeclareTypeAlias;
exports.isDeclareVariable = isDeclareVariable;
exports.isDeclaredPredicate = isDeclaredPredicate;
exports.isDecorator = isDecorator;
exports.isDirective = isDirective;
exports.isDirectiveLiteral = isDirectiveLiteral;
exports.isDoExpression = isDoExpression;
exports.isDoWhileStatement = isDoWhileStatement;
exports.isEmptyStatement = isEmptyStatement;
exports.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
exports.isEnumBody = isEnumBody;
exports.isEnumBooleanBody = isEnumBooleanBody;
exports.isEnumBooleanMember = isEnumBooleanMember;
exports.isEnumDeclaration = isEnumDeclaration;
exports.isEnumDefaultedMember = isEnumDefaultedMember;
exports.isEnumMember = isEnumMember;
exports.isEnumNumberBody = isEnumNumberBody;
exports.isEnumNumberMember = isEnumNumberMember;
exports.isEnumStringBody = isEnumStringBody;
exports.isEnumStringMember = isEnumStringMember;
exports.isEnumSymbolBody = isEnumSymbolBody;
exports.isExistsTypeAnnotation = isExistsTypeAnnotation;
exports.isExportAllDeclaration = isExportAllDeclaration;
exports.isExportDeclaration = isExportDeclaration;
exports.isExportDefaultDeclaration = isExportDefaultDeclaration;
exports.isExportDefaultSpecifier = isExportDefaultSpecifier;
exports.isExportNamedDeclaration = isExportNamedDeclaration;
exports.isExportNamespaceSpecifier = isExportNamespaceSpecifier;
exports.isExportSpecifier = isExportSpecifier;
exports.isExpression = isExpression;
exports.isExpressionStatement = isExpressionStatement;
exports.isExpressionWrapper = isExpressionWrapper;
exports.isFile = isFile;
exports.isFlow = isFlow;
exports.isFlowBaseAnnotation = isFlowBaseAnnotation;
exports.isFlowDeclaration = isFlowDeclaration;
exports.isFlowPredicate = isFlowPredicate;
exports.isFlowType = isFlowType;
exports.isFor = isFor;
exports.isForInStatement = isForInStatement;
exports.isForOfStatement = isForOfStatement;
exports.isForStatement = isForStatement;
exports.isForXStatement = isForXStatement;
exports.isFunction = isFunction;
exports.isFunctionDeclaration = isFunctionDeclaration;
exports.isFunctionExpression = isFunctionExpression;
exports.isFunctionParent = isFunctionParent;
exports.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
exports.isFunctionTypeParam = isFunctionTypeParam;
exports.isGenericTypeAnnotation = isGenericTypeAnnotation;
exports.isIdentifier = isIdentifier;
exports.isIfStatement = isIfStatement;
exports.isImmutable = isImmutable;
exports.isImport = isImport;
exports.isImportAttribute = isImportAttribute;
exports.isImportDeclaration = isImportDeclaration;
exports.isImportDefaultSpecifier = isImportDefaultSpecifier;
exports.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
exports.isImportOrExportDeclaration = isImportOrExportDeclaration;
exports.isImportSpecifier = isImportSpecifier;
exports.isIndexedAccessType = isIndexedAccessType;
exports.isInferredPredicate = isInferredPredicate;
exports.isInterfaceDeclaration = isInterfaceDeclaration;
exports.isInterfaceExtends = isInterfaceExtends;
exports.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
exports.isInterpreterDirective = isInterpreterDirective;
exports.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
exports.isJSX = isJSX;
exports.isJSXAttribute = isJSXAttribute;
exports.isJSXClosingElement = isJSXClosingElement;
exports.isJSXClosingFragment = isJSXClosingFragment;
exports.isJSXElement = isJSXElement;
exports.isJSXEmptyExpression = isJSXEmptyExpression;
exports.isJSXExpressionContainer = isJSXExpressionContainer;
exports.isJSXFragment = isJSXFragment;
exports.isJSXIdentifier = isJSXIdentifier;
exports.isJSXMemberExpression = isJSXMemberExpression;
exports.isJSXNamespacedName = isJSXNamespacedName;
exports.isJSXOpeningElement = isJSXOpeningElement;
exports.isJSXOpeningFragment = isJSXOpeningFragment;
exports.isJSXSpreadAttribute = isJSXSpreadAttribute;
exports.isJSXSpreadChild = isJSXSpreadChild;
exports.isJSXText = isJSXText;
exports.isLVal = isLVal;
exports.isLabeledStatement = isLabeledStatement;
exports.isLiteral = isLiteral;
exports.isLogicalExpression = isLogicalExpression;
exports.isLoop = isLoop;
exports.isMemberExpression = isMemberExpression;
exports.isMetaProperty = isMetaProperty;
exports.isMethod = isMethod;
exports.isMiscellaneous = isMiscellaneous;
exports.isMixedTypeAnnotation = isMixedTypeAnnotation;
exports.isModuleDeclaration = isModuleDeclaration;
exports.isModuleExpression = isModuleExpression;
exports.isModuleSpecifier = isModuleSpecifier;
exports.isNewExpression = isNewExpression;
exports.isNoop = isNoop;
exports.isNullLiteral = isNullLiteral;
exports.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
exports.isNullableTypeAnnotation = isNullableTypeAnnotation;
exports.isNumberLiteral = isNumberLiteral;
exports.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
exports.isNumberTypeAnnotation = isNumberTypeAnnotation;
exports.isNumericLiteral = isNumericLiteral;
exports.isObjectExpression = isObjectExpression;
exports.isObjectMember = isObjectMember;
exports.isObjectMethod = isObjectMethod;
exports.isObjectPattern = isObjectPattern;
exports.isObjectProperty = isObjectProperty;
exports.isObjectTypeAnnotation = isObjectTypeAnnotation;
exports.isObjectTypeCallProperty = isObjectTypeCallProperty;
exports.isObjectTypeIndexer = isObjectTypeIndexer;
exports.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
exports.isObjectTypeProperty = isObjectTypeProperty;
exports.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
exports.isOpaqueType = isOpaqueType;
exports.isOptionalCallExpression = isOptionalCallExpression;
exports.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
exports.isOptionalMemberExpression = isOptionalMemberExpression;
exports.isParenthesizedExpression = isParenthesizedExpression;
exports.isPattern = isPattern;
exports.isPatternLike = isPatternLike;
exports.isPipelineBareFunction = isPipelineBareFunction;
exports.isPipelinePrimaryTopicReference = isPipelinePrimaryTopicReference;
exports.isPipelineTopicExpression = isPipelineTopicExpression;
exports.isPlaceholder = isPlaceholder;
exports.isPrivate = isPrivate;
exports.isPrivateName = isPrivateName;
exports.isProgram = isProgram;
exports.isProperty = isProperty;
exports.isPureish = isPureish;
exports.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
exports.isRecordExpression = isRecordExpression;
exports.isRegExpLiteral = isRegExpLiteral;
exports.isRegexLiteral = isRegexLiteral;
exports.isRestElement = isRestElement;
exports.isRestProperty = isRestProperty;
exports.isReturnStatement = isReturnStatement;
exports.isScopable = isScopable;
exports.isSequenceExpression = isSequenceExpression;
exports.isSpreadElement = isSpreadElement;
exports.isSpreadProperty = isSpreadProperty;
exports.isStandardized = isStandardized;
exports.isStatement = isStatement;
exports.isStaticBlock = isStaticBlock;
exports.isStringLiteral = isStringLiteral;
exports.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
exports.isStringTypeAnnotation = isStringTypeAnnotation;
exports.isSuper = isSuper;
exports.isSwitchCase = isSwitchCase;
exports.isSwitchStatement = isSwitchStatement;
exports.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
exports.isTSAnyKeyword = isTSAnyKeyword;
exports.isTSArrayType = isTSArrayType;
exports.isTSAsExpression = isTSAsExpression;
exports.isTSBaseType = isTSBaseType;
exports.isTSBigIntKeyword = isTSBigIntKeyword;
exports.isTSBooleanKeyword = isTSBooleanKeyword;
exports.isTSCallSignatureDeclaration = isTSCallSignatureDeclaration;
exports.isTSConditionalType = isTSConditionalType;
exports.isTSConstructSignatureDeclaration = isTSConstructSignatureDeclaration;
exports.isTSConstructorType = isTSConstructorType;
exports.isTSDeclareFunction = isTSDeclareFunction;
exports.isTSDeclareMethod = isTSDeclareMethod;
exports.isTSEntityName = isTSEntityName;
exports.isTSEnumDeclaration = isTSEnumDeclaration;
exports.isTSEnumMember = isTSEnumMember;
exports.isTSExportAssignment = isTSExportAssignment;
exports.isTSExpressionWithTypeArguments = isTSExpressionWithTypeArguments;
exports.isTSExternalModuleReference = isTSExternalModuleReference;
exports.isTSFunctionType = isTSFunctionType;
exports.isTSImportEqualsDeclaration = isTSImportEqualsDeclaration;
exports.isTSImportType = isTSImportType;
exports.isTSIndexSignature = isTSIndexSignature;
exports.isTSIndexedAccessType = isTSIndexedAccessType;
exports.isTSInferType = isTSInferType;
exports.isTSInstantiationExpression = isTSInstantiationExpression;
exports.isTSInterfaceBody = isTSInterfaceBody;
exports.isTSInterfaceDeclaration = isTSInterfaceDeclaration;
exports.isTSIntersectionType = isTSIntersectionType;
exports.isTSIntrinsicKeyword = isTSIntrinsicKeyword;
exports.isTSLiteralType = isTSLiteralType;
exports.isTSMappedType = isTSMappedType;
exports.isTSMethodSignature = isTSMethodSignature;
exports.isTSModuleBlock = isTSModuleBlock;
exports.isTSModuleDeclaration = isTSModuleDeclaration;
exports.isTSNamedTupleMember = isTSNamedTupleMember;
exports.isTSNamespaceExportDeclaration = isTSNamespaceExportDeclaration;
exports.isTSNeverKeyword = isTSNeverKeyword;
exports.isTSNonNullExpression = isTSNonNullExpression;
exports.isTSNullKeyword = isTSNullKeyword;
exports.isTSNumberKeyword = isTSNumberKeyword;
exports.isTSObjectKeyword = isTSObjectKeyword;
exports.isTSOptionalType = isTSOptionalType;
exports.isTSParameterProperty = isTSParameterProperty;
exports.isTSParenthesizedType = isTSParenthesizedType;
exports.isTSPropertySignature = isTSPropertySignature;
exports.isTSQualifiedName = isTSQualifiedName;
exports.isTSRestType = isTSRestType;
exports.isTSSatisfiesExpression = isTSSatisfiesExpression;
exports.isTSStringKeyword = isTSStringKeyword;
exports.isTSSymbolKeyword = isTSSymbolKeyword;
exports.isTSThisType = isTSThisType;
exports.isTSTupleType = isTSTupleType;
exports.isTSType = isTSType;
exports.isTSTypeAliasDeclaration = isTSTypeAliasDeclaration;
exports.isTSTypeAnnotation = isTSTypeAnnotation;
exports.isTSTypeAssertion = isTSTypeAssertion;
exports.isTSTypeElement = isTSTypeElement;
exports.isTSTypeLiteral = isTSTypeLiteral;
exports.isTSTypeOperator = isTSTypeOperator;
exports.isTSTypeParameter = isTSTypeParameter;
exports.isTSTypeParameterDeclaration = isTSTypeParameterDeclaration;
exports.isTSTypeParameterInstantiation = isTSTypeParameterInstantiation;
exports.isTSTypePredicate = isTSTypePredicate;
exports.isTSTypeQuery = isTSTypeQuery;
exports.isTSTypeReference = isTSTypeReference;
exports.isTSUndefinedKeyword = isTSUndefinedKeyword;
exports.isTSUnionType = isTSUnionType;
exports.isTSUnknownKeyword = isTSUnknownKeyword;
exports.isTSVoidKeyword = isTSVoidKeyword;
exports.isTaggedTemplateExpression = isTaggedTemplateExpression;
exports.isTemplateElement = isTemplateElement;
exports.isTemplateLiteral = isTemplateLiteral;
exports.isTerminatorless = isTerminatorless;
exports.isThisExpression = isThisExpression;
exports.isThisTypeAnnotation = isThisTypeAnnotation;
exports.isThrowStatement = isThrowStatement;
exports.isTopicReference = isTopicReference;
exports.isTryStatement = isTryStatement;
exports.isTupleExpression = isTupleExpression;
exports.isTupleTypeAnnotation = isTupleTypeAnnotation;
exports.isTypeAlias = isTypeAlias;
exports.isTypeAnnotation = isTypeAnnotation;
exports.isTypeCastExpression = isTypeCastExpression;
exports.isTypeParameter = isTypeParameter;
exports.isTypeParameterDeclaration = isTypeParameterDeclaration;
exports.isTypeParameterInstantiation = isTypeParameterInstantiation;
exports.isTypeScript = isTypeScript;
exports.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
exports.isUnaryExpression = isUnaryExpression;
exports.isUnaryLike = isUnaryLike;
exports.isUnionTypeAnnotation = isUnionTypeAnnotation;
exports.isUpdateExpression = isUpdateExpression;
exports.isUserWhitespacable = isUserWhitespacable;
exports.isV8IntrinsicIdentifier = isV8IntrinsicIdentifier;
exports.isVariableDeclaration = isVariableDeclaration;
exports.isVariableDeclarator = isVariableDeclarator;
exports.isVariance = isVariance;
exports.isVoidTypeAnnotation = isVoidTypeAnnotation;
exports.isWhile = isWhile;
exports.isWhileStatement = isWhileStatement;
exports.isWithStatement = isWithStatement;
exports.isYieldExpression = isYieldExpression;
var _shallowEqual = __webpack_require__(/*! ../../utils/shallowEqual.js */ "./node_modules/@babel/types/lib/utils/shallowEqual.js");
var _deprecationWarning = __webpack_require__(/*! ../../utils/deprecationWarning.js */ "./node_modules/@babel/types/lib/utils/deprecationWarning.js");
function isArrayExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ArrayExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isAssignmentExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "AssignmentExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBinaryExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "BinaryExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isInterpreterDirective(node, opts) {
  if (!node) return false;
  if (node.type !== "InterpreterDirective") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDirective(node, opts) {
  if (!node) return false;
  if (node.type !== "Directive") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDirectiveLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "DirectiveLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBlockStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "BlockStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBreakStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "BreakStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isCallExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "CallExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isCatchClause(node, opts) {
  if (!node) return false;
  if (node.type !== "CatchClause") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isConditionalExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ConditionalExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isContinueStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ContinueStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDebuggerStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "DebuggerStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDoWhileStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "DoWhileStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEmptyStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "EmptyStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExpressionStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ExpressionStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFile(node, opts) {
  if (!node) return false;
  if (node.type !== "File") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isForInStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ForInStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isForStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ForStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunctionDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "FunctionDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunctionExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "FunctionExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isIdentifier(node, opts) {
  if (!node) return false;
  if (node.type !== "Identifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isIfStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "IfStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isLabeledStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "LabeledStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStringLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "StringLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNumericLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "NumericLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNullLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "NullLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBooleanLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "BooleanLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isRegExpLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "RegExpLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isLogicalExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "LogicalExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isMemberExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "MemberExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNewExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "NewExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isProgram(node, opts) {
  if (!node) return false;
  if (node.type !== "Program") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectMethod(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectMethod") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isRestElement(node, opts) {
  if (!node) return false;
  if (node.type !== "RestElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isReturnStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ReturnStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSequenceExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "SequenceExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isParenthesizedExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ParenthesizedExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSwitchCase(node, opts) {
  if (!node) return false;
  if (node.type !== "SwitchCase") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSwitchStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "SwitchStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isThisExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ThisExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isThrowStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ThrowStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTryStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "TryStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isUnaryExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "UnaryExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isUpdateExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "UpdateExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isVariableDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "VariableDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isVariableDeclarator(node, opts) {
  if (!node) return false;
  if (node.type !== "VariableDeclarator") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isWhileStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "WhileStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isWithStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "WithStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isAssignmentPattern(node, opts) {
  if (!node) return false;
  if (node.type !== "AssignmentPattern") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isArrayPattern(node, opts) {
  if (!node) return false;
  if (node.type !== "ArrayPattern") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isArrowFunctionExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ArrowFunctionExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassBody(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportAllDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportAllDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportDefaultDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportDefaultDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportNamedDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportNamedDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isForOfStatement(node, opts) {
  if (!node) return false;
  if (node.type !== "ForOfStatement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "ImportDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportDefaultSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ImportDefaultSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportNamespaceSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ImportNamespaceSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ImportSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isMetaProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "MetaProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassMethod(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassMethod") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectPattern(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectPattern") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSpreadElement(node, opts) {
  if (!node) return false;
  if (node.type !== "SpreadElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSuper(node, opts) {
  if (!node) return false;
  if (node.type !== "Super") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTaggedTemplateExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TaggedTemplateExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTemplateElement(node, opts) {
  if (!node) return false;
  if (node.type !== "TemplateElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTemplateLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "TemplateLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isYieldExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "YieldExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isAwaitExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "AwaitExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImport(node, opts) {
  if (!node) return false;
  if (node.type !== "Import") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBigIntLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "BigIntLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportNamespaceSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportNamespaceSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isOptionalMemberExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "OptionalMemberExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isOptionalCallExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "OptionalCallExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassAccessorProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassAccessorProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassPrivateProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassPrivateProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassPrivateMethod(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassPrivateMethod") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPrivateName(node, opts) {
  if (!node) return false;
  if (node.type !== "PrivateName") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStaticBlock(node, opts) {
  if (!node) return false;
  if (node.type !== "StaticBlock") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isAnyTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "AnyTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isArrayTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "ArrayTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBooleanTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "BooleanTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBooleanLiteralTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "BooleanLiteralTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNullLiteralTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "NullLiteralTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClassImplements(node, opts) {
  if (!node) return false;
  if (node.type !== "ClassImplements") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareClass(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareClass") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareFunction(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareFunction") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareInterface(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareInterface") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareModule(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareModule") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareModuleExports(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareModuleExports") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareTypeAlias(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareTypeAlias") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareOpaqueType(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareOpaqueType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareVariable(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareVariable") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareExportDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareExportDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclareExportAllDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclareExportAllDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclaredPredicate(node, opts) {
  if (!node) return false;
  if (node.type !== "DeclaredPredicate") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExistsTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "ExistsTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunctionTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "FunctionTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunctionTypeParam(node, opts) {
  if (!node) return false;
  if (node.type !== "FunctionTypeParam") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isGenericTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "GenericTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isInferredPredicate(node, opts) {
  if (!node) return false;
  if (node.type !== "InferredPredicate") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isInterfaceExtends(node, opts) {
  if (!node) return false;
  if (node.type !== "InterfaceExtends") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isInterfaceDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "InterfaceDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isInterfaceTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "InterfaceTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isIntersectionTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "IntersectionTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isMixedTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "MixedTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEmptyTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "EmptyTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNullableTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "NullableTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNumberLiteralTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "NumberLiteralTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNumberTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "NumberTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeInternalSlot(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeInternalSlot") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeCallProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeCallProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeIndexer(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeIndexer") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectTypeSpreadProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "ObjectTypeSpreadProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isOpaqueType(node, opts) {
  if (!node) return false;
  if (node.type !== "OpaqueType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isQualifiedTypeIdentifier(node, opts) {
  if (!node) return false;
  if (node.type !== "QualifiedTypeIdentifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStringLiteralTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "StringLiteralTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStringTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "StringTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSymbolTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "SymbolTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isThisTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "ThisTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTupleTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "TupleTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeofTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeofTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeAlias(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeAlias") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeCastExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeCastExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeParameter(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeParameter") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeParameterDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeParameterDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeParameterInstantiation(node, opts) {
  if (!node) return false;
  if (node.type !== "TypeParameterInstantiation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isUnionTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "UnionTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isVariance(node, opts) {
  if (!node) return false;
  if (node.type !== "Variance") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isVoidTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "VoidTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumBooleanBody(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumBooleanBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumNumberBody(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumNumberBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumStringBody(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumStringBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumSymbolBody(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumSymbolBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumBooleanMember(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumBooleanMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumNumberMember(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumNumberMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumStringMember(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumStringMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumDefaultedMember(node, opts) {
  if (!node) return false;
  if (node.type !== "EnumDefaultedMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isIndexedAccessType(node, opts) {
  if (!node) return false;
  if (node.type !== "IndexedAccessType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isOptionalIndexedAccessType(node, opts) {
  if (!node) return false;
  if (node.type !== "OptionalIndexedAccessType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXAttribute(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXAttribute") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXClosingElement(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXClosingElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXElement(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXEmptyExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXEmptyExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXExpressionContainer(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXExpressionContainer") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXSpreadChild(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXSpreadChild") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXIdentifier(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXIdentifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXMemberExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXMemberExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXNamespacedName(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXNamespacedName") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXOpeningElement(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXOpeningElement") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXSpreadAttribute(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXSpreadAttribute") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXText(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXText") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXFragment(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXFragment") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXOpeningFragment(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXOpeningFragment") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSXClosingFragment(node, opts) {
  if (!node) return false;
  if (node.type !== "JSXClosingFragment") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNoop(node, opts) {
  if (!node) return false;
  if (node.type !== "Noop") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPlaceholder(node, opts) {
  if (!node) return false;
  if (node.type !== "Placeholder") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isV8IntrinsicIdentifier(node, opts) {
  if (!node) return false;
  if (node.type !== "V8IntrinsicIdentifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isArgumentPlaceholder(node, opts) {
  if (!node) return false;
  if (node.type !== "ArgumentPlaceholder") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBindExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "BindExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportAttribute(node, opts) {
  if (!node) return false;
  if (node.type !== "ImportAttribute") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDecorator(node, opts) {
  if (!node) return false;
  if (node.type !== "Decorator") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDoExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "DoExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportDefaultSpecifier(node, opts) {
  if (!node) return false;
  if (node.type !== "ExportDefaultSpecifier") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isRecordExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "RecordExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTupleExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TupleExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDecimalLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "DecimalLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isModuleExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "ModuleExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTopicReference(node, opts) {
  if (!node) return false;
  if (node.type !== "TopicReference") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPipelineTopicExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "PipelineTopicExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPipelineBareFunction(node, opts) {
  if (!node) return false;
  if (node.type !== "PipelineBareFunction") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPipelinePrimaryTopicReference(node, opts) {
  if (!node) return false;
  if (node.type !== "PipelinePrimaryTopicReference") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSParameterProperty(node, opts) {
  if (!node) return false;
  if (node.type !== "TSParameterProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSDeclareFunction(node, opts) {
  if (!node) return false;
  if (node.type !== "TSDeclareFunction") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSDeclareMethod(node, opts) {
  if (!node) return false;
  if (node.type !== "TSDeclareMethod") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSQualifiedName(node, opts) {
  if (!node) return false;
  if (node.type !== "TSQualifiedName") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSCallSignatureDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSCallSignatureDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSConstructSignatureDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSConstructSignatureDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSPropertySignature(node, opts) {
  if (!node) return false;
  if (node.type !== "TSPropertySignature") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSMethodSignature(node, opts) {
  if (!node) return false;
  if (node.type !== "TSMethodSignature") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSIndexSignature(node, opts) {
  if (!node) return false;
  if (node.type !== "TSIndexSignature") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSAnyKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSAnyKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSBooleanKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSBooleanKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSBigIntKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSBigIntKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSIntrinsicKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSIntrinsicKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNeverKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNeverKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNullKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNullKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNumberKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNumberKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSObjectKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSObjectKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSStringKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSStringKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSSymbolKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSSymbolKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSUndefinedKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSUndefinedKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSUnknownKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSUnknownKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSVoidKeyword(node, opts) {
  if (!node) return false;
  if (node.type !== "TSVoidKeyword") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSThisType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSThisType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSFunctionType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSFunctionType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSConstructorType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSConstructorType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeReference(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeReference") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypePredicate(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypePredicate") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeQuery(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeQuery") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeLiteral(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSArrayType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSArrayType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTupleType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTupleType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSOptionalType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSOptionalType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSRestType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSRestType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNamedTupleMember(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNamedTupleMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSUnionType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSUnionType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSIntersectionType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSIntersectionType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSConditionalType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSConditionalType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSInferType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSInferType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSParenthesizedType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSParenthesizedType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeOperator(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeOperator") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSIndexedAccessType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSIndexedAccessType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSMappedType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSMappedType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSLiteralType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSLiteralType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSExpressionWithTypeArguments(node, opts) {
  if (!node) return false;
  if (node.type !== "TSExpressionWithTypeArguments") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSInterfaceDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSInterfaceDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSInterfaceBody(node, opts) {
  if (!node) return false;
  if (node.type !== "TSInterfaceBody") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeAliasDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeAliasDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSInstantiationExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TSInstantiationExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSAsExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TSAsExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSSatisfiesExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TSSatisfiesExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeAssertion(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeAssertion") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSEnumDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSEnumDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSEnumMember(node, opts) {
  if (!node) return false;
  if (node.type !== "TSEnumMember") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSModuleDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSModuleDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSModuleBlock(node, opts) {
  if (!node) return false;
  if (node.type !== "TSModuleBlock") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSImportType(node, opts) {
  if (!node) return false;
  if (node.type !== "TSImportType") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSImportEqualsDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSImportEqualsDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSExternalModuleReference(node, opts) {
  if (!node) return false;
  if (node.type !== "TSExternalModuleReference") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNonNullExpression(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNonNullExpression") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSExportAssignment(node, opts) {
  if (!node) return false;
  if (node.type !== "TSExportAssignment") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSNamespaceExportDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSNamespaceExportDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeAnnotation(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeAnnotation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeParameterInstantiation(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeParameterInstantiation") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeParameterDeclaration(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeParameterDeclaration") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeParameter(node, opts) {
  if (!node) return false;
  if (node.type !== "TSTypeParameter") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStandardized(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ArrayExpression":
    case "AssignmentExpression":
    case "BinaryExpression":
    case "InterpreterDirective":
    case "Directive":
    case "DirectiveLiteral":
    case "BlockStatement":
    case "BreakStatement":
    case "CallExpression":
    case "CatchClause":
    case "ConditionalExpression":
    case "ContinueStatement":
    case "DebuggerStatement":
    case "DoWhileStatement":
    case "EmptyStatement":
    case "ExpressionStatement":
    case "File":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Identifier":
    case "IfStatement":
    case "LabeledStatement":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "LogicalExpression":
    case "MemberExpression":
    case "NewExpression":
    case "Program":
    case "ObjectExpression":
    case "ObjectMethod":
    case "ObjectProperty":
    case "RestElement":
    case "ReturnStatement":
    case "SequenceExpression":
    case "ParenthesizedExpression":
    case "SwitchCase":
    case "SwitchStatement":
    case "ThisExpression":
    case "ThrowStatement":
    case "TryStatement":
    case "UnaryExpression":
    case "UpdateExpression":
    case "VariableDeclaration":
    case "VariableDeclarator":
    case "WhileStatement":
    case "WithStatement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ArrowFunctionExpression":
    case "ClassBody":
    case "ClassExpression":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ExportSpecifier":
    case "ForOfStatement":
    case "ImportDeclaration":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
    case "MetaProperty":
    case "ClassMethod":
    case "ObjectPattern":
    case "SpreadElement":
    case "Super":
    case "TaggedTemplateExpression":
    case "TemplateElement":
    case "TemplateLiteral":
    case "YieldExpression":
    case "AwaitExpression":
    case "Import":
    case "BigIntLiteral":
    case "ExportNamespaceSpecifier":
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "ClassProperty":
    case "ClassAccessorProperty":
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
    case "PrivateName":
    case "StaticBlock":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
        case "Identifier":
        case "StringLiteral":
        case "BlockStatement":
        case "ClassBody":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExpression(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ArrayExpression":
    case "AssignmentExpression":
    case "BinaryExpression":
    case "CallExpression":
    case "ConditionalExpression":
    case "FunctionExpression":
    case "Identifier":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "LogicalExpression":
    case "MemberExpression":
    case "NewExpression":
    case "ObjectExpression":
    case "SequenceExpression":
    case "ParenthesizedExpression":
    case "ThisExpression":
    case "UnaryExpression":
    case "UpdateExpression":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "MetaProperty":
    case "Super":
    case "TaggedTemplateExpression":
    case "TemplateLiteral":
    case "YieldExpression":
    case "AwaitExpression":
    case "Import":
    case "BigIntLiteral":
    case "OptionalMemberExpression":
    case "OptionalCallExpression":
    case "TypeCastExpression":
    case "JSXElement":
    case "JSXFragment":
    case "BindExpression":
    case "DoExpression":
    case "RecordExpression":
    case "TupleExpression":
    case "DecimalLiteral":
    case "ModuleExpression":
    case "TopicReference":
    case "PipelineTopicExpression":
    case "PipelineBareFunction":
    case "PipelinePrimaryTopicReference":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
        case "Expression":
        case "Identifier":
        case "StringLiteral":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBinary(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BinaryExpression":
    case "LogicalExpression":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isScopable(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BlockStatement":
    case "CatchClause":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Program":
    case "ObjectMethod":
    case "SwitchStatement":
    case "WhileStatement":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "ClassDeclaration":
    case "ForOfStatement":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBlockParent(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BlockStatement":
    case "CatchClause":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "Program":
    case "ObjectMethod":
    case "SwitchStatement":
    case "WhileStatement":
    case "ArrowFunctionExpression":
    case "ForOfStatement":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isBlock(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BlockStatement":
    case "Program":
    case "TSModuleBlock":
      break;
    case "Placeholder":
      if (node.expectedNode === "BlockStatement") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isStatement(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BlockStatement":
    case "BreakStatement":
    case "ContinueStatement":
    case "DebuggerStatement":
    case "DoWhileStatement":
    case "EmptyStatement":
    case "ExpressionStatement":
    case "ForInStatement":
    case "ForStatement":
    case "FunctionDeclaration":
    case "IfStatement":
    case "LabeledStatement":
    case "ReturnStatement":
    case "SwitchStatement":
    case "ThrowStatement":
    case "TryStatement":
    case "VariableDeclaration":
    case "WhileStatement":
    case "WithStatement":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ForOfStatement":
    case "ImportDeclaration":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
    case "EnumDeclaration":
    case "TSDeclareFunction":
    case "TSInterfaceDeclaration":
    case "TSTypeAliasDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
    case "TSImportEqualsDeclaration":
    case "TSExportAssignment":
    case "TSNamespaceExportDeclaration":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
        case "Statement":
        case "Declaration":
        case "BlockStatement":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTerminatorless(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BreakStatement":
    case "ContinueStatement":
    case "ReturnStatement":
    case "ThrowStatement":
    case "YieldExpression":
    case "AwaitExpression":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isCompletionStatement(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "BreakStatement":
    case "ContinueStatement":
    case "ReturnStatement":
    case "ThrowStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isConditional(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ConditionalExpression":
    case "IfStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isLoop(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForStatement":
    case "WhileStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isWhile(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "DoWhileStatement":
    case "WhileStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExpressionWrapper(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ExpressionStatement":
    case "ParenthesizedExpression":
    case "TypeCastExpression":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFor(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ForInStatement":
    case "ForStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isForXStatement(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ForInStatement":
    case "ForOfStatement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunction(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ObjectMethod":
    case "ArrowFunctionExpression":
    case "ClassMethod":
    case "ClassPrivateMethod":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFunctionParent(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ObjectMethod":
    case "ArrowFunctionExpression":
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "StaticBlock":
    case "TSModuleBlock":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPureish(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "ArrowFunctionExpression":
    case "BigIntLiteral":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isDeclaration(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "FunctionDeclaration":
    case "VariableDeclaration":
    case "ClassDeclaration":
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ImportDeclaration":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
    case "EnumDeclaration":
    case "TSDeclareFunction":
    case "TSInterfaceDeclaration":
    case "TSTypeAliasDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
      break;
    case "Placeholder":
      if (node.expectedNode === "Declaration") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPatternLike(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "Identifier":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
        case "Pattern":
        case "Identifier":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isLVal(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "Identifier":
    case "MemberExpression":
    case "RestElement":
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
    case "TSParameterProperty":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSNonNullExpression":
      break;
    case "Placeholder":
      switch (node.expectedNode) {
        case "Pattern":
        case "Identifier":
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSEntityName(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "Identifier":
    case "TSQualifiedName":
      break;
    case "Placeholder":
      if (node.expectedNode === "Identifier") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isLiteral(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
    case "TemplateLiteral":
    case "BigIntLiteral":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImmutable(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "NullLiteral":
    case "BooleanLiteral":
    case "BigIntLiteral":
    case "JSXAttribute":
    case "JSXClosingElement":
    case "JSXElement":
    case "JSXExpressionContainer":
    case "JSXSpreadChild":
    case "JSXOpeningElement":
    case "JSXText":
    case "JSXFragment":
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
    case "DecimalLiteral":
      break;
    case "Placeholder":
      if (node.expectedNode === "StringLiteral") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isUserWhitespacable(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ObjectMethod":
    case "ObjectProperty":
    case "ObjectTypeInternalSlot":
    case "ObjectTypeCallProperty":
    case "ObjectTypeIndexer":
    case "ObjectTypeProperty":
    case "ObjectTypeSpreadProperty":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isMethod(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isObjectMember(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ObjectMethod":
    case "ObjectProperty":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isProperty(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ObjectProperty":
    case "ClassProperty":
    case "ClassAccessorProperty":
    case "ClassPrivateProperty":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isUnaryLike(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "UnaryExpression":
    case "SpreadElement":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPattern(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "AssignmentPattern":
    case "ArrayPattern":
    case "ObjectPattern":
      break;
    case "Placeholder":
      if (node.expectedNode === "Pattern") break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isClass(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ClassExpression":
    case "ClassDeclaration":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isImportOrExportDeclaration(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
    case "ImportDeclaration":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isExportDeclaration(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ExportAllDeclaration":
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isModuleSpecifier(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ExportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isAccessor(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ClassAccessorProperty":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isPrivate(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "ClassPrivateProperty":
    case "ClassPrivateMethod":
    case "PrivateName":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFlow(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "AnyTypeAnnotation":
    case "ArrayTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "BooleanLiteralTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "ClassImplements":
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "DeclaredPredicate":
    case "ExistsTypeAnnotation":
    case "FunctionTypeAnnotation":
    case "FunctionTypeParam":
    case "GenericTypeAnnotation":
    case "InferredPredicate":
    case "InterfaceExtends":
    case "InterfaceDeclaration":
    case "InterfaceTypeAnnotation":
    case "IntersectionTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NullableTypeAnnotation":
    case "NumberLiteralTypeAnnotation":
    case "NumberTypeAnnotation":
    case "ObjectTypeAnnotation":
    case "ObjectTypeInternalSlot":
    case "ObjectTypeCallProperty":
    case "ObjectTypeIndexer":
    case "ObjectTypeProperty":
    case "ObjectTypeSpreadProperty":
    case "OpaqueType":
    case "QualifiedTypeIdentifier":
    case "StringLiteralTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "TupleTypeAnnotation":
    case "TypeofTypeAnnotation":
    case "TypeAlias":
    case "TypeAnnotation":
    case "TypeCastExpression":
    case "TypeParameter":
    case "TypeParameterDeclaration":
    case "TypeParameterInstantiation":
    case "UnionTypeAnnotation":
    case "Variance":
    case "VoidTypeAnnotation":
    case "EnumDeclaration":
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFlowType(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "AnyTypeAnnotation":
    case "ArrayTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "BooleanLiteralTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "ExistsTypeAnnotation":
    case "FunctionTypeAnnotation":
    case "GenericTypeAnnotation":
    case "InterfaceTypeAnnotation":
    case "IntersectionTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NullableTypeAnnotation":
    case "NumberLiteralTypeAnnotation":
    case "NumberTypeAnnotation":
    case "ObjectTypeAnnotation":
    case "StringLiteralTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "TupleTypeAnnotation":
    case "TypeofTypeAnnotation":
    case "UnionTypeAnnotation":
    case "VoidTypeAnnotation":
    case "IndexedAccessType":
    case "OptionalIndexedAccessType":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFlowBaseAnnotation(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "AnyTypeAnnotation":
    case "BooleanTypeAnnotation":
    case "NullLiteralTypeAnnotation":
    case "MixedTypeAnnotation":
    case "EmptyTypeAnnotation":
    case "NumberTypeAnnotation":
    case "StringTypeAnnotation":
    case "SymbolTypeAnnotation":
    case "ThisTypeAnnotation":
    case "VoidTypeAnnotation":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFlowDeclaration(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareInterface":
    case "DeclareModule":
    case "DeclareModuleExports":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "DeclareVariable":
    case "DeclareExportDeclaration":
    case "DeclareExportAllDeclaration":
    case "InterfaceDeclaration":
    case "OpaqueType":
    case "TypeAlias":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isFlowPredicate(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "DeclaredPredicate":
    case "InferredPredicate":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumBody(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "EnumBooleanBody":
    case "EnumNumberBody":
    case "EnumStringBody":
    case "EnumSymbolBody":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isEnumMember(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "EnumBooleanMember":
    case "EnumNumberMember":
    case "EnumStringMember":
    case "EnumDefaultedMember":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isJSX(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "JSXAttribute":
    case "JSXClosingElement":
    case "JSXElement":
    case "JSXEmptyExpression":
    case "JSXExpressionContainer":
    case "JSXSpreadChild":
    case "JSXIdentifier":
    case "JSXMemberExpression":
    case "JSXNamespacedName":
    case "JSXOpeningElement":
    case "JSXSpreadAttribute":
    case "JSXText":
    case "JSXFragment":
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isMiscellaneous(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "Noop":
    case "Placeholder":
    case "V8IntrinsicIdentifier":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTypeScript(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "TSParameterProperty":
    case "TSDeclareFunction":
    case "TSDeclareMethod":
    case "TSQualifiedName":
    case "TSCallSignatureDeclaration":
    case "TSConstructSignatureDeclaration":
    case "TSPropertySignature":
    case "TSMethodSignature":
    case "TSIndexSignature":
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSFunctionType":
    case "TSConstructorType":
    case "TSTypeReference":
    case "TSTypePredicate":
    case "TSTypeQuery":
    case "TSTypeLiteral":
    case "TSArrayType":
    case "TSTupleType":
    case "TSOptionalType":
    case "TSRestType":
    case "TSNamedTupleMember":
    case "TSUnionType":
    case "TSIntersectionType":
    case "TSConditionalType":
    case "TSInferType":
    case "TSParenthesizedType":
    case "TSTypeOperator":
    case "TSIndexedAccessType":
    case "TSMappedType":
    case "TSLiteralType":
    case "TSExpressionWithTypeArguments":
    case "TSInterfaceDeclaration":
    case "TSInterfaceBody":
    case "TSTypeAliasDeclaration":
    case "TSInstantiationExpression":
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSTypeAssertion":
    case "TSEnumDeclaration":
    case "TSEnumMember":
    case "TSModuleDeclaration":
    case "TSModuleBlock":
    case "TSImportType":
    case "TSImportEqualsDeclaration":
    case "TSExternalModuleReference":
    case "TSNonNullExpression":
    case "TSExportAssignment":
    case "TSNamespaceExportDeclaration":
    case "TSTypeAnnotation":
    case "TSTypeParameterInstantiation":
    case "TSTypeParameterDeclaration":
    case "TSTypeParameter":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSTypeElement(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "TSCallSignatureDeclaration":
    case "TSConstructSignatureDeclaration":
    case "TSPropertySignature":
    case "TSMethodSignature":
    case "TSIndexSignature":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSType(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSFunctionType":
    case "TSConstructorType":
    case "TSTypeReference":
    case "TSTypePredicate":
    case "TSTypeQuery":
    case "TSTypeLiteral":
    case "TSArrayType":
    case "TSTupleType":
    case "TSOptionalType":
    case "TSRestType":
    case "TSUnionType":
    case "TSIntersectionType":
    case "TSConditionalType":
    case "TSInferType":
    case "TSParenthesizedType":
    case "TSTypeOperator":
    case "TSIndexedAccessType":
    case "TSMappedType":
    case "TSLiteralType":
    case "TSExpressionWithTypeArguments":
    case "TSImportType":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isTSBaseType(node, opts) {
  if (!node) return false;
  switch (node.type) {
    case "TSAnyKeyword":
    case "TSBooleanKeyword":
    case "TSBigIntKeyword":
    case "TSIntrinsicKeyword":
    case "TSNeverKeyword":
    case "TSNullKeyword":
    case "TSNumberKeyword":
    case "TSObjectKeyword":
    case "TSStringKeyword":
    case "TSSymbolKeyword":
    case "TSUndefinedKeyword":
    case "TSUnknownKeyword":
    case "TSVoidKeyword":
    case "TSThisType":
    case "TSLiteralType":
      break;
    default:
      return false;
  }
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isNumberLiteral(node, opts) {
  (0, _deprecationWarning.default)("isNumberLiteral", "isNumericLiteral");
  if (!node) return false;
  if (node.type !== "NumberLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isRegexLiteral(node, opts) {
  (0, _deprecationWarning.default)("isRegexLiteral", "isRegExpLiteral");
  if (!node) return false;
  if (node.type !== "RegexLiteral") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isRestProperty(node, opts) {
  (0, _deprecationWarning.default)("isRestProperty", "isRestElement");
  if (!node) return false;
  if (node.type !== "RestProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isSpreadProperty(node, opts) {
  (0, _deprecationWarning.default)("isSpreadProperty", "isSpreadElement");
  if (!node) return false;
  if (node.type !== "SpreadProperty") return false;
  return opts == null || (0, _shallowEqual.default)(node, opts);
}
function isModuleDeclaration(node, opts) {
  (0, _deprecationWarning.default)("isModuleDeclaration", "isImportOrExportDeclaration");
  return isImportOrExportDeclaration(node, opts);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/is.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/is.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = is;
var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual.js */ "./node_modules/@babel/types/lib/utils/shallowEqual.js");
var _isType = __webpack_require__(/*! ./isType.js */ "./node_modules/@babel/types/lib/validators/isType.js");
var _isPlaceholderType = __webpack_require__(/*! ./isPlaceholderType.js */ "./node_modules/@babel/types/lib/validators/isPlaceholderType.js");
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function is(type, node, opts) {
  if (!node) return false;
  const matches = (0, _isType.default)(node.type, type);
  if (!matches) {
    if (!opts && node.type === "Placeholder" && type in _index.FLIPPED_ALIAS_KEYS) {
      return (0, _isPlaceholderType.default)(node.expectedNode, type);
    }
    return false;
  }
  if (typeof opts === "undefined") {
    return true;
  } else {
    return (0, _shallowEqual.default)(node, opts);
  }
}

//# sourceMappingURL=is.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isBinding.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isBinding.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBinding;
var _getBindingIdentifiers = __webpack_require__(/*! ../retrievers/getBindingIdentifiers.js */ "./node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js");
function isBinding(node, parent, grandparent) {
  if (grandparent && node.type === "Identifier" && parent.type === "ObjectProperty" && grandparent.type === "ObjectExpression") {
    return false;
  }
  const keys = _getBindingIdentifiers.default.keys[parent.type];
  if (keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return true;
      } else {
        if (val === node) return true;
      }
    }
  }
  return false;
}

//# sourceMappingURL=isBinding.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isBlockScoped.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isBlockScoped.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBlockScoped;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _isLet = __webpack_require__(/*! ./isLet.js */ "./node_modules/@babel/types/lib/validators/isLet.js");
function isBlockScoped(node) {
  return (0, _index.isFunctionDeclaration)(node) || (0, _index.isClassDeclaration)(node) || (0, _isLet.default)(node);
}

//# sourceMappingURL=isBlockScoped.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isImmutable.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isImmutable.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isImmutable;
var _isType = __webpack_require__(/*! ./isType.js */ "./node_modules/@babel/types/lib/validators/isType.js");
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function isImmutable(node) {
  if ((0, _isType.default)(node.type, "Immutable")) return true;
  if ((0, _index.isIdentifier)(node)) {
    if (node.name === "undefined") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

//# sourceMappingURL=isImmutable.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isLet.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isLet.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLet;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
function isLet(node) {
  return (0, _index.isVariableDeclaration)(node) && (node.kind !== "var" || node[_index2.BLOCK_SCOPED_SYMBOL]);
}

//# sourceMappingURL=isLet.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isNode.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isNode.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isNode;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function isNode(node) {
  return !!(node && _index.VISITOR_KEYS[node.type]);
}

//# sourceMappingURL=isNode.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isNodesEquivalent.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isNodesEquivalent.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isNodesEquivalent;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function isNodesEquivalent(a, b) {
  if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
    return a === b;
  }
  if (a.type !== b.type) {
    return false;
  }
  const fields = Object.keys(_index.NODE_FIELDS[a.type] || a.type);
  const visitorKeys = _index.VISITOR_KEYS[a.type];
  for (const field of fields) {
    const val_a = a[field];
    const val_b = b[field];
    if (typeof val_a !== typeof val_b) {
      return false;
    }
    if (val_a == null && val_b == null) {
      continue;
    } else if (val_a == null || val_b == null) {
      return false;
    }
    if (Array.isArray(val_a)) {
      if (!Array.isArray(val_b)) {
        return false;
      }
      if (val_a.length !== val_b.length) {
        return false;
      }
      for (let i = 0; i < val_a.length; i++) {
        if (!isNodesEquivalent(val_a[i], val_b[i])) {
          return false;
        }
      }
      continue;
    }
    if (typeof val_a === "object" && !(visitorKeys != null && visitorKeys.includes(field))) {
      for (const key of Object.keys(val_a)) {
        if (val_a[key] !== val_b[key]) {
          return false;
        }
      }
      continue;
    }
    if (!isNodesEquivalent(val_a, val_b)) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=isNodesEquivalent.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isPlaceholderType.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isPlaceholderType.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPlaceholderType;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function isPlaceholderType(placeholderType, targetType) {
  if (placeholderType === targetType) return true;
  const aliases = _index.PLACEHOLDERS_ALIAS[placeholderType];
  if (aliases) {
    for (const alias of aliases) {
      if (targetType === alias) return true;
    }
  }
  return false;
}

//# sourceMappingURL=isPlaceholderType.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isReferenced.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isReferenced.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isReferenced;
function isReferenced(node, parent, grandparent) {
  switch (parent.type) {
    case "MemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        return !!parent.computed;
      }
      return parent.object === node;
    case "JSXMemberExpression":
      return parent.object === node;
    case "VariableDeclarator":
      return parent.init === node;
    case "ArrowFunctionExpression":
      return parent.body === node;
    case "PrivateName":
      return false;
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return false;
    case "ObjectProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return !grandparent || grandparent.type !== "ObjectPattern";
    case "ClassProperty":
    case "ClassAccessorProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    case "ClassPrivateProperty":
      return parent.key !== node;
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;
    case "AssignmentExpression":
      return parent.right === node;
    case "AssignmentPattern":
      return parent.right === node;
    case "LabeledStatement":
      return false;
    case "CatchClause":
      return false;
    case "RestElement":
      return false;
    case "BreakStatement":
    case "ContinueStatement":
      return false;
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;
    case "ExportSpecifier":
      if (grandparent != null && grandparent.source) {
        return false;
      }
      return parent.local === node;
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;
    case "ImportAttribute":
      return false;
    case "JSXAttribute":
      return false;
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
    case "MetaProperty":
      return false;
    case "ObjectTypeProperty":
      return parent.key !== node;
    case "TSEnumMember":
      return parent.id !== node;
    case "TSPropertySignature":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
  }
  return true;
}

//# sourceMappingURL=isReferenced.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isScope.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isScope.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isScope;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function isScope(node, parent) {
  if ((0, _index.isBlockStatement)(node) && ((0, _index.isFunction)(parent) || (0, _index.isCatchClause)(parent))) {
    return false;
  }
  if ((0, _index.isPattern)(node) && ((0, _index.isFunction)(parent) || (0, _index.isCatchClause)(parent))) {
    return true;
  }
  return (0, _index.isScopable)(node);
}

//# sourceMappingURL=isScope.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isSpecifierDefault.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isSpecifierDefault.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isSpecifierDefault;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function isSpecifierDefault(specifier) {
  return (0, _index.isImportDefaultSpecifier)(specifier) || (0, _index.isIdentifier)(specifier.imported || specifier.exported, {
    name: "default"
  });
}

//# sourceMappingURL=isSpecifierDefault.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isType.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isType.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isType;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function isType(nodeType, targetType) {
  if (nodeType === targetType) return true;
  if (nodeType == null) return false;
  if (_index.ALIAS_KEYS[targetType]) return false;
  const aliases = _index.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;
    for (const alias of aliases) {
      if (nodeType === alias) return true;
    }
  }
  return false;
}

//# sourceMappingURL=isType.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isValidES3Identifier.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isValidES3Identifier.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isValidES3Identifier;
var _isValidIdentifier = __webpack_require__(/*! ./isValidIdentifier.js */ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js");
const RESERVED_WORDS_ES3_ONLY = new Set(["abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile"]);
function isValidES3Identifier(name) {
  return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
}

//# sourceMappingURL=isValidES3Identifier.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isValidIdentifier.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isValidIdentifier.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isValidIdentifier;
var _helperValidatorIdentifier = __webpack_require__(/*! @babel/helper-validator-identifier */ "./node_modules/@babel/helper-validator-identifier/lib/index.js");
function isValidIdentifier(name, reserved = true) {
  if (typeof name !== "string") return false;
  if (reserved) {
    if ((0, _helperValidatorIdentifier.isKeyword)(name) || (0, _helperValidatorIdentifier.isStrictReservedWord)(name, true)) {
      return false;
    }
  }
  return (0, _helperValidatorIdentifier.isIdentifierName)(name);
}

//# sourceMappingURL=isValidIdentifier.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/isVar.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/isVar.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isVar;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
var _index2 = __webpack_require__(/*! ../constants/index.js */ "./node_modules/@babel/types/lib/constants/index.js");
function isVar(node) {
  return (0, _index.isVariableDeclaration)(node, {
    kind: "var"
  }) && !node[_index2.BLOCK_SCOPED_SYMBOL];
}

//# sourceMappingURL=isVar.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/matchesPattern.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/matchesPattern.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = matchesPattern;
var _index = __webpack_require__(/*! ./generated/index.js */ "./node_modules/@babel/types/lib/validators/generated/index.js");
function matchesPattern(member, match, allowPartial) {
  if (!(0, _index.isMemberExpression)(member)) return false;
  const parts = Array.isArray(match) ? match : match.split(".");
  const nodes = [];
  let node;
  for (node = member; (0, _index.isMemberExpression)(node); node = node.object) {
    nodes.push(node.property);
  }
  nodes.push(node);
  if (nodes.length < parts.length) return false;
  if (!allowPartial && nodes.length > parts.length) return false;
  for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
    const node = nodes[j];
    let value;
    if ((0, _index.isIdentifier)(node)) {
      value = node.name;
    } else if ((0, _index.isStringLiteral)(node)) {
      value = node.value;
    } else if ((0, _index.isThisExpression)(node)) {
      value = "this";
    } else {
      return false;
    }
    if (parts[i] !== value) return false;
  }
  return true;
}

//# sourceMappingURL=matchesPattern.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/react/isCompatTag.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/react/isCompatTag.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isCompatTag;
function isCompatTag(tagName) {
  return !!tagName && /^[a-z]/.test(tagName);
}

//# sourceMappingURL=isCompatTag.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/react/isReactComponent.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/react/isReactComponent.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _buildMatchMemberExpression = __webpack_require__(/*! ../buildMatchMemberExpression.js */ "./node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js");
const isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
var _default = isReactComponent;
exports["default"] = _default;

//# sourceMappingURL=isReactComponent.js.map


/***/ }),

/***/ "./node_modules/@babel/types/lib/validators/validate.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/types/lib/validators/validate.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validate;
exports.validateChild = validateChild;
exports.validateField = validateField;
var _index = __webpack_require__(/*! ../definitions/index.js */ "./node_modules/@babel/types/lib/definitions/index.js");
function validate(node, key, val) {
  if (!node) return;
  const fields = _index.NODE_FIELDS[node.type];
  if (!fields) return;
  const field = fields[key];
  validateField(node, key, val, field);
  validateChild(node, key, val);
}
function validateField(node, key, val, field) {
  if (!(field != null && field.validate)) return;
  if (field.optional && val == null) return;
  field.validate(node, key, val);
}
function validateChild(node, key, val) {
  if (val == null) return;
  const validate = _index.NODE_PARENT_VALIDATIONS[val.type];
  if (!validate) return;
  validate(node, key, val);
}

//# sourceMappingURL=validate.js.map


/***/ }),

/***/ "./node_modules/@glidejs/glide/dist/glide.esm.js":
/*!*******************************************************!*\
  !*** ./node_modules/@glidejs/glide/dist/glide.esm.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Glide; }
/* harmony export */ });
/*!
 * Glide.js v3.6.0
 * (c) 2013-2022 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,

  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: '',

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,

  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,

  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    type: {
      slider: 'glide--slider',
      carousel: 'glide--carousel'
    },
    slide: {
      clone: 'glide__slide--clone',
      active: 'glide__slide--active'
    },
    arrow: {
      disabled: 'glide__arrow--disabled'
    },
    nav: {
      active: 'glide__bullet--active'
    }
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}
/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */

function toFloat(value) {
  return parseFloat(value);
}
/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */

function isObject(value) {
  var type = _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}
/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */

function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */

function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */

function mergeOptions(defaults, settings) {
  var options = Object.assign({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.

  if (settings.hasOwnProperty('classes')) {
    options.classes = Object.assign({}, defaults.classes, settings.classes);

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = Object.assign({}, defaults.classes.direction, settings.classes.direction);
    }

    if (settings.classes.hasOwnProperty('type')) {
      options.classes.type = Object.assign({}, defaults.classes.type, settings.classes.type);
    }

    if (settings.classes.hasOwnProperty('slide')) {
      options.classes.slide = Object.assign({}, defaults.classes.slide, settings.classes.slide);
    }

    if (settings.classes.hasOwnProperty('arrow')) {
      options.classes.arrow = Object.assign({}, defaults.classes.arrow, settings.classes.arrow);
    }

    if (settings.classes.hasOwnProperty('nav')) {
      options.classes.nav = Object.assign({}, defaults.classes.nav, settings.classes.nav);
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
  }

  return options;
}

var EventsBus = /*#__PURE__*/function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */


  _createClass(EventsBus, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }

        return;
      } // Create the event's object if not yet created


      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      } // Add the handler to queue


      var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }

        return;
      } // If the event doesn't exist, or there's no handlers in queue, just leave


      if (!this.hop.call(this.events, event)) {
        return;
      } // Cycle through events queue, fire!


      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);

  return EventsBus;
}();

var Glide$1 = /*#__PURE__*/function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Glide);

    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }
  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */


  _createClass(Glide, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit('mount.before');

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }

      this._e.emit('mount.after');

      return this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
      }

      return this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */

  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }

      this._e.emit('update');

      return this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */

  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);

      return this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */

  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();

      this._c.Move.make(distance);

      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit('destroy');

      return this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit('play');

      return this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: "pause",
    value: function pause() {
      this._e.emit('pause');

      return this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */

  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */

  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);

      return this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: "settings",
    get: function get() {
      return this._o;
    }
    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */
    ,
    set: function set(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn('Options must be an `object` instance.');
      }
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: "index",
    get: function get() {
      return this._i;
    }
    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set(i) {
      this._i = toInt(i);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: "type",
    get: function get() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: "disabled",
    get: function get() {
      return this._d;
    }
    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set(status) {
      this._d = !!status;
    }
  }]);

  return Glide;
}();

function Run (Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },

    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;

      if (!Glide.disabled) {
        !Glide.settings.waitForTransition || Glide.disable();
        this.move = move;
        Events.emit('run.before', this.move);
        this.calculate();
        Events.emit('run', this.move);
        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }

          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }

          if (_this.isOffset()) {
            _this._o = false;
            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);
          Glide.enable();
        });
      }
    },

    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction; // By default assume that size of view is equal to one slide

      var viewSize = 1; // While direction is `=` we want jump to
      // a specified index described in steps.

      if (direction === '=') {
        // Check if bound is true, 
        // as we want to avoid whitespaces.
        if (Glide.settings.bound && toInt(steps) > length) {
          Glide.index = length;
          return;
        }

        Glide.index = steps;
        return;
      } // When pattern is equal to `>>` we want
      // fast forward to the last slide.


      if (direction === '>' && steps === '>') {
        Glide.index = length;
        return;
      } // When pattern is equal to `<<` we want
      // fast forward to the first slide.


      if (direction === '<' && steps === '<') {
        Glide.index = 0;
        return;
      } // pagination movement


      if (direction === '|') {
        viewSize = Glide.settings.perView || 1;
      } // we are moving forward


      if (direction === '>' || direction === '|' && steps === '>') {
        var index = calculateForwardIndex(viewSize);

        if (index > length) {
          this._o = true;
        }

        Glide.index = normalizeForwardIndex(index, viewSize);
        return;
      } // we are moving backward


      if (direction === '<' || direction === '|' && steps === '<') {
        var _index = calculateBackwardIndex(viewSize);

        if (_index < 0) {
          this._o = true;
        }

        Glide.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }

      warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
    },

    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index <= 0;
    },

    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index >= this.length;
    },

    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (!direction) {
        return this._o;
      }

      if (!this._o) {
        return false;
      } // did we view to the right?


      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>';
      } // did we view to the left?


      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<';
      }

      return this.move.direction === direction;
    },

    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
    }
  };
  /**
   * Returns index value to move forward/to the right
   *
   * @param viewSize
   * @returns {Number}
   */

  function calculateForwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index + viewSize;
    }

    return index + (viewSize - index % viewSize);
  }
  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {Number}
   */


  function normalizeForwardIndex(index, viewSize) {
    var length = Run.length;

    if (index <= length) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index - (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length;
      }

      return 0;
    }

    if (Run.isBound()) {
      return length;
    }

    return Math.floor(length / viewSize) * viewSize;
  }
  /**
   * Calculates index value to move backward/to the left
   *
   * @param viewSize
   * @returns {Number}
   */


  function calculateBackwardIndex(viewSize) {
    var index = Glide.index;

    if (Glide.isType('carousel')) {
      return index - viewSize;
    } // ensure our back navigation results in the same index as a forward navigation
    // to experience a homogeneous paging


    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {*}
   */


  function normalizeBackwardIndex(index, viewSize) {
    var length = Run.length;

    if (index >= 0) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index + (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length;
      }

      return Math.floor(length / viewSize) * viewSize;
    }

    return 0;
  }

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },

    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length; // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }

      return length - 1;
    }
  });
  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });
  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};
function Gaps (Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },

    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };
  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });
  define(Gaps, 'grow', {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * Components.Sizes.length;
    }
  });
  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;
      return Gaps.value * (perView - 1) / perView;
    }
  });
  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */

  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));
  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });
  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}
/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */

function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}
/**
 * Coerces a NodeList to an Array.
 *
 * @param  {NodeList} nodeList
 * @return {Array}
 */

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html (Glide, Components, Events) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },

    /**
     * Collect slides
     */
    collectSlides: function collectSlides() {
      this.slides = toArray(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.slide.clone);
      });
    }
  };
  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }

      if (exist(r)) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });
  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html._t = t;
      } else {
        warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
      }
    }
  });
  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });
  /**
   * Add/remove/reorder dynamic slides
   */

  Events.on('update', function () {
    Html.collectSlides();
  });
  return Html;
}

function Peek (Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };
  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },

    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }

      Peek._v = value;
    }
  });
  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;

      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }

      return value * 2 / perView;
    }
  });
  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */

  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });
  return Peek;
}

function Move (Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },

    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = offset;
      Events.emit('move', {
        movement: this.value
      });
      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };
  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },

    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });
  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }

      return translate - offset;
    }
  });
  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */

  Events.on(['build.before', 'run'], function () {
    Move.make();
  });
  return Move;
}

function Sizes (Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },

    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },

    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }

      Components.Html.wrapper.style.width = '';
    }
  };
  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes, 'width', {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimensions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */

  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });
  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Sizes.remove();
  });
  return Sizes;
}

function Build (Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');
      this.typeClass();
      this.activeClass();
      Events.emit('build.after');
    },

    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes.type[Glide.settings.type]);
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },

    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide.settings.classes,
          type = _Glide$settings$class.type,
          slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide.settings.type]);
      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */

  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });
  /**
   * Remount component:
   * - on resizing of the window to calculate new dimensions
   * - on updating settings via API
   */

  Events.on(['resize', 'update'], function () {
    Build.mount();
  });
  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */

  Events.on('move.after', function () {
    Build.activeClass();
  });
  return Build;
}

function Clones (Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },

    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes,
          cloningRatio = _Glide$settings.cloningRatio;

      if (slides.length !== 0) {
        var peekIncrementer = +!!Glide.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);

        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }

          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);

            _clone.classList.add(classes.slide.clone);

            items.unshift(_clone);
          }
        }
      }

      return items;
    },

    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");

      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }

      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }

      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },

    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;

      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones, 'grow', {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });
  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */

  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });
  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */

  Events.on('destroy', function () {
    Clones.remove();
  });
  return Clones;
}

var EventsBinder = /*#__PURE__*/function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }
  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */


  _createClass(EventsBinder, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */

  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);

  return EventsBinder;
}();

function Resize (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },

    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };
  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */

  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });
  return Resize;
}

var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};
function Direction (Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },

    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }

      return pattern;
    },

    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },

    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },

    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };
  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },

    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });
  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */

  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });
  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */

  Events.on('update', function () {
    Direction.mount();
  });
  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */

  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });
  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function Peeking (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */

function mutator (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }

      return translate;
    }
  };
}

function Translate (Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d; // needed for supported Firefox 10-15

      Components.Html.wrapper.style.webkitTransform = translate3d; // needed for supported Chrome 10-35, Safari 5.1-8, and Opera 15-22

      Components.Html.wrapper.style.transform = translate3d;
    },

    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    },

    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide.index;
      var perView = Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView);
      } // "modulo length" converts an index that equals length to zero


      return (index + perView) % length;
    },

    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1;
      }

      return travelDistance;
    }
  };
  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */

  Events.on('move', function (context) {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement);
    }

    Components.Transition.after(function () {
      Events.emit('translate.jump');
      Translate.set(Components.Sizes.slideWidth * Glide.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate.set(startWidth - Components.Translate.getTravelDistance());
  });
  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Translate.remove();
  });
  return Translate;
}

function Transition (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;
  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;

      if (!disabled) {
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      }

      return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
    },

    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
      Components.Html.wrapper.style.transition = this.compose(property);
    },

    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },

    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },

    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;
      this.set();
    },

    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }

      return settings.animationDuration;
    }
  });
  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */

  Events.on('move', function () {
    Transition.set();
  });
  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimensions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */

  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });
  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */

  Events.on('run', function () {
    Transition.enable();
  });
  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */

  Events.on('destroy', function () {
    Transition.remove();
  });
  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

var supportsPassive$1 = supportsPassive;

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
function Swipe (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },

    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit('swipe.start');
      }
    },

    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },

    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var _Glide$settings2 = Glide.settings,
            perSwipe = _Glide$settings2.perSwipe,
            touchAngle = _Glide$settings2.touchAngle,
            classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();

        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit('swipe.end');
      }
    },

    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;

      var _Glide$settings3 = Glide.settings,
          swipeThreshold = _Glide$settings3.swipeThreshold,
          dragThreshold = _Glide$settings3.dragThreshold;

      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }

      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },

    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;

      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },

    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },

    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;

      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },

    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },

    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },

    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },

    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },

    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  /**
   * Add component class:
   * - after initial building
   */

  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });
  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe;
}

function Images (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },

    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },

    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },

    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */

  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });
  return Images;
}

function Anchors (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */

  var detached = false;
  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */

  var prevented = false;
  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');
      this.bind();
    },

    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },

    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },

    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },

    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }

        detached = true;
      }

      return this;
    },

    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }

        detached = false;
      }

      return this;
    }
  };
  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });
  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */

  Events.on('swipe.move', function () {
    Anchors.detach();
  });
  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */

  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });
  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */

  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });
  return Anchors;
}

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\"<\"]");
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, " [data-glide-dir*=\">\"]");
function Controls (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */

      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      /**
       * Collection of arrow control HTML elements.
       *
       * @private
       * @type {Object}
       */

      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },

    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },

    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },

    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];

      if (!item) {
        return;
      }

      if (item) {
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      }
    },

    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.nav.active);
      }
    },

    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function setArrowState() {
      if (Glide.settings.rewind) {
        return;
      }

      var next = Controls._arrowControls.next;
      var previous = Controls._arrowControls.previous;
      this.resetArrowState(next, previous);

      if (Glide.index === 0) {
        this.disableArrow(previous);
      }

      if (Glide.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },

    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function resetArrowState() {
      var settings = Glide.settings;

      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }

      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function disableArrow() {
      var settings = Glide.settings;

      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }

      lists.forEach(function (list) {
        toArray(list).forEach(function (element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },

    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },

    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },

    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function click(event) {
      if (!supportsPassive$1 && event.type === 'touchstart') {
        event.preventDefault();
      }

      var direction = event.currentTarget.getAttribute('data-glide-dir');
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });
  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */

  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });
  /**
   * Add or remove disabled class of arrow elements
   */

  Events.on(['mount.after', 'run'], function () {
    Controls.setArrowState();
  });
  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });
  return Controls;
}

function Keyboard (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },

    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },

    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },

    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      var perSwipe = Glide.settings.perSwipe;

      if (event.code === 'ArrowRight') {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
      }

      if (event.code === 'ArrowLeft') {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
      }
    }
  };
  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Keyboard.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Keyboard;
}

function Autoplay (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.enable();
      this.start();

      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },

    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function enable() {
      this._e = true;
    },

    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function disable() {
      this._e = false;
    },

    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (!this._e) {
        return;
      }

      this.enable();

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();

            Events.emit('autoplay');
          }, this.time);
        }
      }
    },

    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },

    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on('mouseout', Components.Html.root, function () {
        if (_this2._e) {
          _this2.start();
        }
      });
    },

    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };
  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });
  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */

  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });
  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */

  Events.on(['run.before', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });
  Events.on(['pause', 'destroy'], function () {
    Autoplay.disable();
    Autoplay.stop();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['run.after', 'swipe.end'], function () {
    Autoplay.start();
  });
  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */

  Events.on(['play'], function () {
    Autoplay.enable();
    Autoplay.start();
  });
  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */

  Events.on('update', function () {
    Autoplay.mount();
  });
  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */

  Events.on('destroy', function () {
    Binder.destroy();
  });
  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */

function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }

  return {};
}

function Breakpoints (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */

  var settings = Glide.settings;
  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */

  var points = sortBreakpoints(settings.breakpoints);
  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */

  var defaults = Object.assign({}, settings);
  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points[point];
            }
          }
        }
      }

      return defaults;
    }
  };
  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */

  Object.assign(settings, Breakpoints.match(points));
  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */

  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));
  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */

  Events.on('update', function () {
    points = sortBreakpoints(points);
    defaults = Object.assign({}, settings);
  });
  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */

  Events.on('destroy', function () {
    Binder.off('resize', window);
  });
  return Breakpoints;
}

var COMPONENTS = {
  // Required
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run,
  // Optional
  Swipe: Swipe,
  Images: Images,
  Anchors: Anchors,
  Controls: Controls,
  Keyboard: Keyboard,
  Autoplay: Autoplay,
  Breakpoints: Breakpoints
};

var Glide = /*#__PURE__*/function (_Core) {
  _inherits(Glide, _Core);

  var _super = _createSuper(Glide);

  function Glide() {
    _classCallCheck(this, Glide);

    return _super.apply(this, arguments);
  }

  _createClass(Glide, [{
    key: "mount",
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);

  return Glide;
}(Glide$1);




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfictional_university_theme"] = self["webpackChunkfictional_university_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map