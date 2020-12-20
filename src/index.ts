
type DatabaseCredential = {
    host: string
    user: string
    password: string
} 


const form = document.querySelector('#accessForm') as HTMLFormElement
const inputHost = document.querySelector('#host') as HTMLInputElement
const inputUser = document.querySelector('#user') as HTMLInputElement
const inputPassword = document.querySelector('#password') as HTMLInputElement


form.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    const databaseCredential: DatabaseCredential = {
        host: inputHost.value,
        user: inputUser.value,
        password: inputPassword.value
    }
    console.log(databaseCredential)
})