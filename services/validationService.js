function validateDocumentTitle(documentTitle) {
  if (documentTitle.length > 50) {
    throw "Title must have maximum length of 50 characters!!!"
  }
}

module.exports = { validateDocumentTitle }
