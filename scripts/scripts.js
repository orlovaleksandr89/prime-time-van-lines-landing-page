$('wrapper').addClass('loaded')

$('.icon-menu').click(function (event) {
  $(this).toggleClass('active')
  $('.menu__body').toggleClass('active')
  $('body').toggleClass('lock')
})

function ibg() {
  $.each($('.ibg'), function (index, val) {
    if ($(this).find('img').length > 0) {
      $(this).css(
        'background-image',
        'url("' + $(this).find('img').attr('src') + '")'
      )
    }
  })
}
ibg()
const menuBody = document.querySelector('.menu__body')
const links = document.querySelectorAll('.menu__link')
links.forEach((link) =>
  link.addEventListener('click', () => {
    if (menuBody.classList.contains('active')) {
      console.log('click active')
      menuBody.classList.remove('active')
    }
  })
)
// const callMe = document.querySelector('.callme')
// setTimeout(() => {
//   callMe.classList.add('active')
//   console.log('ticktack')
// }, 2000)
