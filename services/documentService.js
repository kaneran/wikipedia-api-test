const {
  getAllDocuments,
  getAllDocumentVersions,
} = require("../repositories/documentRepository");
const { validateDocumentTitle } = require("./validationService");

function getAvailableTitles() {
  return getAllDocuments();
}

function getAvailableRevisions(documentTitle) {
  validateDocumentTitle(documentTitle);
  const allRevisions = getAllDocumentVersions();
  const availableRevisions = allRevisions
    .filter((revision) => revision.title === documentTitle)
    .map((revision) => ({
      version: revision.version,
      content: revision.content,
      timestamp: revision.timestamp,
    }));
  if (availableRevisions.length > 0) {
    return availableRevisions;
  } else {
    throw "Document does not exist or no revisions.";
  }
}

function getLatestDocument(documentTitle) {
  const availableRevisions = getAvailableRevisions(documentTitle);
  const sortedAvailableRevisions = availableRevisions.sort(
    (a, b) => b.version - a.version
  );
  return sortedAvailableRevisions[0];
}

function addNewDocumentRevision(documentTitle, content) {
  const allRevisions = getAllDocumentVersions();
  const { version } = getLatestDocument(documentTitle);
  //In reality, I would insert this into the database
  const newRevisions = [
    ...allRevisions,
    {
      title: documentTitle,
      version: version + 1,
      content,
      timestamp: Date(Date.now()).toString(),
    },
  ];
  return newRevisions;
}

module.exports = {
  getAvailableTitles,
  getAvailableRevisions,
  getLatestDocument,
  addNewDocumentRevision,
};
