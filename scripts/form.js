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
  async function formSend(e) {
    let error = formValidated(form)

    function addMessageResult(message, status = 'success') {
      const resultMessageDiv = document.createElement('div')
      resultMessageDiv.className = 'form__item__message'
      const resultMessage = document.createElement('span')
      status === 'success'
        ? (resultMessage.className = 'form__message')
        : (resultMessage.className = 'form__message__error')

      resultMessage.textContent = message
      resultMessageDiv.append(resultMessage)
      return form.appendChild(resultMessageDiv)
    }

    try {
      e.preventDefault()
      if (error === 0) {
        form.classList.add('_sending')
        let responce = await fetch(
          'https://formsubmit.co/ajax/orlovaleksandr89@gmail.com',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(formData)
          }
        )

        if (responce.ok) {
          let result = await responce.json()
          addMessageResult(result.message)

          setTimeout(() => {
            const divToRemove = form.querySelector('.form__item__message')
            form.removeChild(divToRemove)
          }, 7000)

          formData = {
            movingFrom: '',
            movingTo: '',
            name: '',
            email: '',
            phone: '',
            homeSize: '',
            movingDate: ''
          }
          form.reset()
          form.classList.remove('_sending')
        } else {
          form.classList.remove('_sending')
        }
        return
      } else {
        addMessageResult('Please fill out required fields', 'error')
        setTimeout(() => {
          const divToRemove = form.querySelector('.form__item__message')
          form.removeChild(divToRemove)
        }, 7000)
      }
    } catch (error) {
      console.log(error)
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
