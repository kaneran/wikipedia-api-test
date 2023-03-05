let documents = [];
let documentRevisions = [];

function getAllDocuments() {
  return documents;
}

function addDocumentTitle(title){
  documents.push(title)
}

function addDocumentVersion(documentTitle, content, version){
  documentRevisions.push( {
    title: documentTitle,
    content: content,
    version: version + 1,
    timestamp: Date(Date.now()).toString(),
  })
}

function getAllDocumentVersions(title) {
  return documentRevisions.filter((revision) => revision.title === title);
}

module.exports = {getAllDocuments, getAllDocumentVersions, addDocumentTitle, addDocumentVersion};
