import $ from "jquery";

class Search {
  //describe our object or initiate
  constructor() {
    this.addSearchHTML();
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.resultsDiv = $("#search-overlay__results");
    this.isSpinnerVisible = false;
    this.previousValue;
  }

  // events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
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
    $.when(
      $.getJSON(
        `${
          universityData.root_url
        }/wp-json/university/v1/search?term=${this.searchField.val()}`
      )
    ).then(
      (result) => {
        this.resultsDiv.html(`
          <div class="row">
            <div class="one-third">
              <h2 class="search-overlay__section-title">General Information</h2>
        
        
        ${
          result.generalInfo.length
            ? '<ul class="link-list min-list">'
            : "<p> No Search Results</p>"
        }
            ${result.generalInfo
              .map(
                (item) =>
                  `<li><a href="${item.permalink}">${item.title}</a> ${
                    item.type === "post" ? "by " + item.authorName : ""
                  }</li>`
              )
              .join("")}
        ${result.generalInfo.length ? "</u>" : ""}
        </ul>
            </div>


            <div class="one-third">
              <h2 class="search-overlay__section-title">Programs</h2>
              ${
                result.programs.length
                  ? '<ul class="link-list min-list">'
                  : `<p> No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
              }
            ${result.programs
              .map(
                (item) =>
                  `<li><a href="${item.permalink}">${item.title}</a></li>`
              )
              .join("")}
        ${result.generalInfo.length ? "</u>" : ""}

              <h2 class="search-overlay__section-title">Professors</h2>
              ${
                result.professors.length
                  ? '<ul class="professor-cards">'
                  : "<p> No professor match the search result</p>"
              }
            ${result.professors
              .map(
                (item) =>
                  `<li class="professor-card__list-item">
                    <a class="professor-card" href="${item.permalink}">
                        <img src="${item.image}" class="professor-card__image">
                        <span class="professor-card__name">${item.title}</span>
                    </a>
                </li>
                  `
              )
              .join("")}
        ${result.generalInfo.length ? "</u>" : ""}
            </div>

            <div class="one-third">
              <h2 class="search-overlay__section-title">Events</h2>
              ${
                result.events.length
                  ? '<ul class="link-list min-list">'
                  : `<p> No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`
              }
            ${result.events
              .map(
                (item) =>
                  `
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
                  `
              )
              .join("")}
        ${result.generalInfo.length ? "</u>" : ""}
            </div>
          </div>
      `);
        this.isSpinnerVisible = false;
      },
      () => {
        this.resultsDiv.html("<p>Unexpected error! please try again!</p>");
      }
    );
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => {
      this.searchField.focus();
    }, 301);
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode === 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
    } else if (e.keyCode === 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  addSearchHTML() {
    $("body").append(`
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

export default Search;
