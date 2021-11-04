// $('wrapper').addClass('loaded')

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

//burger meny toggle
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
const links = document.querySelectorAll('.menu__link')

iconMenu.addEventListener('click', () => {
  iconMenu.classList.toggle('active')
  menuBody.classList.toggle('active')
  document.body.classList.toggle('lock')
})

links.forEach((link) =>
  link.addEventListener('click', () => {
    if (menuBody.classList.contains('active')) {
      menuBody.classList.remove('active')
      iconMenu.classList.remove('active')
      document.body.classList.remove('lock')
    }
  })
)

// smooth scroll
const linksAnchors = document.querySelectorAll('[href^="#"]')
linksAnchors.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault()

    let href = this.getAttribute('href').substring(1)

    const scrollTarget = document.getElementById(href)
    // const topOffset = document.querySelector('.scrollto').offsetHight
    const topOffset = 0
    const elementPosition = scrollTarget.getBoundingClientRect().top
    const offsetPosition = elementPosition - topOffset

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    })
  })
})

// scroll to top button

const backToTopbtn = document.querySelector('#goToHome')

window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  if (
    document.body.scrollTop > 650 ||
    document.documentElement.scrollTop > 650
  ) {
    backToTopbtn.style.display = 'block'
  } else {
    backToTopbtn.style.display = 'none'
  }
}
