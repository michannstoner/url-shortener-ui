export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(checkForError)
}

const checkForError = response => {
  if (!response.ok) {
    return 'There was an error, try again later!'
  } else {
    return response.json()
  }
}
