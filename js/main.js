//B U R G E R

const TABLET_WIDTH = 1280;
const MOBILE_WIDTH = 580;

// здесь мы определяем функцию, которая отвечает за работу меню, в ней не нужно ничего менять
(() => {
  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = document.querySelectorAll(`.${params.linkClass}`);
    console.log(links)

    function onBtnClick () {
      if (getWindowWidth() <= TABLET_WIDTH) {
      btn.classList.toggle(params.activeClass);

        if (
          !menu.classList.contains(params.activeClass) &&
          !menu.classList.contains(params.hiddenClass)
        ) {
          menu.classList.add(params.activeClass);
          document.body.style.overflow = 'hidden';
          btn.setAttribute('aria-label', 'закрыть главное меню');
        } else {
          menu.classList.add(params.hiddenClass);
          document.body.removeAttribute('style');
          btn.classList.toggle(params.hiddenClass);
          btn.setAttribute('aria-label', 'открыть главное меню');
        }
      }
    }

    menu.addEventListener("animationend", function () {
      if (menu.classList.contains(params.hiddenClass)) {
        menu.classList.remove(params.activeClass);
        menu.classList.remove(params.hiddenClass);
        btn.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", onBtnClick);
      // this.classList.toggle(params.activeClass);

    links.forEach((link) => {
      link.addEventListener("click", onBtnClick);
    });
  }

  // здесь мы вызываем функцию и передаем в нее классы наших элементов
  setBurger({
    btnClass: "burger", // класс бургера
    menuClass: "header__nav-wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
    linkClass: "js-menu-link"
  });
})();


function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// SCROLL B U R G E R

(() => {
  function scrollToContent (link, isMobile) {
    if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
		return;
	}

    const href = link.getAttribute('href').substring(1);
    if (Boolean(href)) {
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
    }
  }

  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        scrollToContent(this, false);
    });
  });
})();



// B O T T O M   MENU   D R O P D O W N

const params = {
  btnClassName: "header__bottom-btn",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function getWindowWidth () {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}
setMenuListener();


//S W I P E R HERO

(() => {
  const swiper = new Swiper('.js-back-slider', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

})();


//S W I P E R  GALLERY

const swiper = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    pagination: {
      el: ".gallery .gallery__swiper-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__swiper-next",
      prevEl: ".gallery__swiper-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        grid: {
          rows: 2
        },
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2
        },
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      },
      slideChange: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
    }
  }
});


// M O D A L  GALLERY

const btns = document.querySelectorAll('.gallery__swiper-btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const body = document.body;
const fixBlocks = document.querySelectorAll('.fix-block');

let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let pagePosition = window.scrollY;
  fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});
	body.style.paddingRight = paddingOffset;
	body.classList.add('disable-scroll');
	body.dataset.position = pagePosition;
	body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	body.style.top = 'auto';
	body.classList.remove('disable-scroll');
  fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.style.paddingRight = '0px';
	window.scroll({top: pagePosition, left: 0});
	body.removeAttribute('data-position');
}

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    disableScroll();

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
  });
});

modalOverlay.addEventListener('click', (e) => {

  enableScroll();

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});

// закрытие окна
let modalBtnClose = document.querySelector('.modal__btn-close');
let fixBlock = document.querySelector('.fix-block');

modalBtnClose.addEventListener('click', function(){
	modalBtnClose.classList.toggle('closed');
	fixBlock.classList.toggle('closed');
})

// закрытия при клике на esc
function modalClose ( e ) {
  if ( !e.keyCode |s| e.keyCode === 27 ) {
  }
}

document.addEventListener('keyup', modalClose);


// C H O I C E S  GALLERY

const defaultSelect = () => {
  const element = document.querySelector('.gallery__choices');
  const choices = new Choices(element, {
    shouldSort: false,
    searchEnabled: false,
    itemSelectText: '',
    position: 'bottom',
    classNames: {
      containerOuter: 'choices gallery__choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices'
    },
  });
};
defaultSelect();


// A C C O R D I O N   ARTISTS

document.addEventListener('DOMContentLoaded', function () {
  $( ".js-accordion" ).accordion({
      collapsible: true,
      active: 0,
      icons: false,
      heightStyle: 'content'
    });
});

// T A B S  ARTISTS

$( function() {
  $( ".ac-list" ).accordion({
     icons: false,
     heightStyle: "content",
   });
    document.querySelectorAll(".tabs__btn").forEach(item => {
      item.addEventListener("click", function(e) {
        $( ".ac-list" ).accordion({
     icons: false,
     heightStyle: "content",
     collapsible: true,
     active: false
   });
        let path = e.currentTarget.dataset.path;
        document.querySelectorAll(".tab-content").forEach(el => {
          el.classList.remove("tab-active");
        });
        document.querySelectorAll(".tabs__btn").forEach(el => {
          el.classList.remove("btn-active");
        });
        document.querySelector(`[data-target='${path}']`).classList.add("tab-active")
        this.classList.add("btn-active");
      })
    })

    document.querySelectorAll(".tab-content").forEach(item => {
      // let btns = item.find(".ac-list__item-tab");
      let btns = item.querySelectorAll(".ac-list__item-tab");
      let articles = item.querySelectorAll(".artists-content");
      btns.forEach(el => {
        el.addEventListener("click",function(e) {
          let path = e.currentTarget.dataset.path;
          let tabCont = item.querySelector(`[data-target='${path}']`);
          console.log(tabCont)
          articles.forEach(el => {
            el.classList.remove("article-tabActive")
          })
          btns.forEach(el => {
            el.classList.remove("article-btn-active")
          })
          tabCont.classList.add("article-tabActive")
          this.classList.add("article-btn-active");
        })
      })

    })
 });


// T O O L T I P PROJECTS

tippy('.js-tooltip', {
  // content: 'purple',
  theme: 'purple',
});

//остальное в css


//E V E N T S SLIDES
(() => {
  const swiper = new Swiper(".js-events-slider", {
    slidesPerView: 1,
    pagination: {
      el: '.events__swiper-pagination',
      clickable: true,
      clickableClass: 'dote'
    },
    paginationClickable: true,
    keyboard: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".js-events-next",
      prevEl: ".js-events-prev"
    },

    breakpoints: {
      660: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      1020: {
        slidesPerView: 3,
        spaceBetween: 27
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  })
})();


// S W I P E R   PARTNERS

(() => {
  const swiper = new Swiper('.js-partners-slider', {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    navigation: {
      nextEl: ".js-partners-next",
      prevEl: ".js-partners-prev"
    },

    breakpoints: {
      550: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      1020: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      1290: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  })
})();


// V A L I D A T E  &  M A S K

var phoneElement = document.querySelector(".input-tel");

    var im = new Inputmask("+7(999) 999-99-99");
    im.mask(phoneElement);

    const validation = new window.JustValidate('.forms__form', {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid #FF5C00',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#D11616',
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
  .addField('.input-name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно содержать хотя бы 3 буквы'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Имя не может содержать более 30 символов'
    },
    {
      rule: 'required',
      errorMessage: 'Как вас зовут?'
    }
  ])

  .addField('.input-tel', [
    {
      validator: () => {
        const phone = phoneElement.inputmask.unmaskedvalue();
        const result = Number(phone) && phone.length === 10;
        return result === 0 ? false : result;
      },
      errorMessage: 'Укажите ваш телефон',
    }
  ]);



  // M A P

  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 14,
        controls: []
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "../img/geo.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);

    setTimeout(() => {
      myMap.container.fitToViewport();
    }, 5000);
  }
