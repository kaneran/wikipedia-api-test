const { getAllDocumentVersions } = require("../repositories/documentRepository");
const { getAvailableTitles, getAvailableRevisions, getLatestDocument, addNewDocumentRevision} = require("../services/documentService");

test('Get list of available titles', () => {
    const availableTitles = getAvailableTitles();
    const firstAvailableTitle = availableTitles[0];

    expect(availableTitles.length).toBeGreaterThan(0);
    expect(firstAvailableTitle).toBe("Title 1");
});

test('Get list of available revisions for a document' , () => {
    const availableRevisions = getAvailableRevisions("Title 1");
    const {version, content, timestamp} = availableRevisions[0];

    expect(availableRevisions.length).toBeGreaterThan(0);
    expect(version).toBe(1);
    expect(content).toBe("Hello");
    expect(timestamp).toBe("1pm")
});

test('Throw error if there are no revisions for a document', () => {
    expect(() => getAvailableRevisions("Invalid title")).toThrow(/^Document does not exist or no revisions.$/);
});


test('Get the current latest version of the document', () => {
    const {version} = getLatestDocument("Title 1");
    expect(version).toBe(4);
});

test('Save new revision of a document',() => {
    const [title, documentContent] = ["Title 1", "This is soo cool!"];
    const allDocumentVersions = getAllDocumentVersions();
    const result = addNewDocumentRevision(title, documentContent);
    const {version} = getLatestDocument(title);
    const latestDocumentRevision = result[result.length - 1];

    expect(result.length).toBe(allDocumentVersions.length + 1);
    expect(latestDocumentRevision.content).toBe(documentContent);
    expect(latestDocumentRevision.version).toBe(version + 1);
});
