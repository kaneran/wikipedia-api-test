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
  return availableRevisions;
}

function getLatestDocument() {
  const availableRevisions = getAvailableRevisions("Title 1");
  const sortedAvailableRevisions = availableRevisions.sort(
    (a, b) => b.version - a.version
  );
  return sortedAvailableRevisions[0];
}

module.exports = { getAvailableTitles, getAvailableRevisions, getLatestDocument };
