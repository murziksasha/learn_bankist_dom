'use strict';

///////////////////////////////////////
// Modal window

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
  const tabContainer = document.querySelector('.operations__tab-container');
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContent = document.querySelectorAll('.operations__content');
  const nav = document.querySelector('.nav');

  //modal

  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  //old version of implementation smooth scroll

  const btnScrollTo = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');

  btnScrollTo.addEventListener('click', e => {
    e.preventDefault();
    const s1coords = section1.getBoundingClientRect();

    section1.scrollIntoView({ behavior: 'smooth' });
  });

  //Tabs hide on click btn

  tabContainer.addEventListener('click', e => {
    e.preventDefault();
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) {
      return;
    }
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(cont =>
      cont.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');

    console.log(clicked.dataset.tab); //выведет дата атрибут номер

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });

  //Menu fade animation -  Navigation fadeOut fadeIn

  const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };

  nav.addEventListener('mouseover', handleHover.bind(0.5));

  nav.addEventListener('mouseout', handleHover.bind(1));

  //Sticky navigations

  // window.addEventListener('scroll', e => {
  //   const initalCoords = section1.getBoundingClientRect();

  //   //info https://developer.mozilla.org/ru/docs/Web/API/Element/getBoundingClientRect
  //   //about getBoundingClientRect(); menthod;

  //   if (window.scrollY > initalCoords.top) {
  //     nav.classList.add('sticky');
  //   } else {
  //     nav.classList.remove('sticky');
  //   }
  // });

  //Second Good Variatn fo Sticky Menu implementation
  const header = document.querySelector('.header');
  const navHieght = nav.getBoundingClientRect().height;

  const stickNav = entries => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  };
  const headerObserver = new IntersectionObserver(stickNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHieght}px`,
  });
  headerObserver.observe(header);

  //Проявляющиеся сеции

  const allSections = document.querySelectorAll('.section');

  const revealSection = (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.remove('section--hidden'); //четко на текущем таргете удаляется скрывающий класс
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });

  //Lazy loading of image

  const imgTargets = document.querySelectorAll('img[data-src]');

  const loadImg = (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      return;
    }
    console.log(entry);

    //replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: `-200px`,
  });

  imgTargets.forEach(img => {
    imgObserver.observe(img);
  });
});
