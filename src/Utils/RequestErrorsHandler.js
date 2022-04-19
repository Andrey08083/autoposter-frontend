export default function requestErrorsHandler(error) {
  if (error.response) {
    if (error.response.data.errors) {
      throw error.response.data.errors;
    }
  }
  throw error;
}
