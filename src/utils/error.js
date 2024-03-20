import PrettyError from 'pretty-error'

function errorLogger(error) {
  const pe = new PrettyError()
  console.log(pe.render(error))
}

export { errorLogger }
