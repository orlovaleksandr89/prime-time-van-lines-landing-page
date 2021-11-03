'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form')
  form.addEventListener('submit', formSend)
  const inputs = form.querySelectorAll('input')
  const select = form.querySelector('select')
  let formData = {
    movingFrom: '',
    movingTo: '',
    name: '',
    email: '',
    phone: '',
    homeSize: '',
    movingDate: ''
  }
  select.addEventListener('change', (event) => {
    const key = event.target.name
    const value = event.target.value
    formData = { ...formData, [key]: value }
  })

  inputs.forEach((input) =>
    input.addEventListener('change', (event) => {
      const key = event.target.name
      const value = event.target.value
      formData = { ...formData, [key]: value }
    })
  )
  function formSend(e) {
    e.preventDefault()
    let error = formValidated(form)

    if (error === 0) {
      form.classList.add('_sending')
      console.log(formData)
      // let responce = await fetch('sendmail.php', {
      //   method: 'POST',
      //   body: formData
      // })
      // if (responce.ok) {
      //   let result = await responce.json()
      //   alert(result.message)
      //   formData = {
      //     movingFrom: '',
      //     movingTo: '',
      //     name: '',
      //     email: '',
      //     phone: '',
      //     homeSize: '',
      //     movingDate: ''
      //   }
      // }
      form.reset()
    } else {
      alert('Please fill out all fields')
    }

    function formValidated(form) {
      let error = 0
      let formReq = document.querySelectorAll('._req')
      for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index]
        formRemoveError(input)

        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input)
            error++
          }
        } else {
          if (input.value === '') {
            formAddError(input)
            error++
          }
        }
      }
      return error
    }
    function formAddError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
    }
    function formRemoveError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
    }
    //Test email
    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
  }
})
