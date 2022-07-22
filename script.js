'use strict';

///////////////////////////////////////
// Modal window

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

  const nav = document.querySelector(`nav`);
  const linksUl = nav.querySelector(`.nav__links`);
  const link = linksUl.querySelector(`.nav__item`);
  const aLink = document.querySelectorAll(`.nav__link`);

  // aLink.forEach(el => {
  //   el.addEventListener('click', e => {
  //     e.preventDefault();
  //     const id = e.currentTarget.getAttribute('href');
  //     console.log(id);
  //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  //   });
  // });

  const tabContainer = document.querySelector('.operations__tab-container');
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContent = document.querySelectorAll('.operations__content');

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
});
