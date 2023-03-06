const {
  getAllDocuments,
  getAllDocumentVersions,
  addDocumentTitle,
  addDocumentVersion,
} = require("../repositories/documentRepository")
const { validateDocumentTitle } = require("./validationService")

function getAvailableTitles() {
  return getAllDocuments()
}

function getAvailableRevisions(documentTitle) {
  validateDocumentTitle(documentTitle)
  const allRevisions = getAllDocumentVersions(documentTitle)
  const availableRevisions = allRevisions
    .map((revision) => ({
      version: revision.version,
      content: revision.content,
      timestamp: revision.timestamp,
    }))
  if (availableRevisions.length > 0) {
    return availableRevisions
  } else {
    throw "Document does not exist or no revisions."
  }
}

function getLatestDocument(documentTitle) {
  const availableRevisions = getAvailableRevisions(documentTitle)
  const sortedAvailableRevisions = availableRevisions.sort(
    (a, b) => b.version - a.version
  )
  return sortedAvailableRevisions[0]
}

function addNewDocumentRevision(documentTitle, content) {
  const allRevisions = getAllDocumentVersions(documentTitle)
  if(allRevisions.length === 0){
    addDocumentTitle(documentTitle)
  }
  // const { version } = getLatestDocument(documentTitle);
  //In reality, I would insert this into the database
  addDocumentVersion(documentTitle, content, allRevisions.length)
}

module.exports = {
  getAvailableTitles,
  getAvailableRevisions,
  getLatestDocument,
  addNewDocumentRevision,
}
