const { getAllDocumentVersions, addDocumentTitle, addDocumentVersion, clearDocumentData } = require("../repositories/documentRepository");
const { getAvailableTitles, getAvailableRevisions, getLatestDocument } = require("../services/documentService");

test("Get list of available titles", () => {
    const titles = ["Title 1", "Title 2", "Title 3", "Title 4"];
    titles.forEach(title => addDocumentTitle(title));
    const availableTitles = getAvailableTitles();
    const firstAvailableTitle = availableTitles[0];

    expect(availableTitles.length).toBeGreaterThan(0);
    expect(firstAvailableTitle).toBe("Title 1");
});

test("Get list of available revisions for a document" , () => {
    clearDocumentData();
    addDocumentVersion("Title 1", "Hello", 0, "1pm");
    const availableRevisions = getAvailableRevisions("Title 1");
    const {version, content, timestamp} = availableRevisions[0];

    expect(availableRevisions.length).toBeGreaterThan(0);
    expect(version).toBe(1);
    expect(content).toBe("Hello");
    expect(timestamp).toBe("1pm");
});

test("Throw error if there are no revisions for a document", () => {
    expect(() => getAvailableRevisions("Invalid title")).toThrow(/^Document does not exist or no revisions.$/);
});


test("Get the current latest version of the document", () => {
    clearDocumentData();
    addDocumentVersion("Title 1", "Hello", 0, "1pm");
    addDocumentVersion("Title 1", "Hello", 3);
    const {version} = getLatestDocument("Title 1");
    expect(version).toBe(4);
});

test("Save new revision of a document",() => {
    clearDocumentData();
    const [title, documentContent] = ["Title 1", "This is soo cool!"];
    const allDocumentVersions = getAllDocumentVersions();
    addDocumentVersion(title, documentContent);
    const updatedDocumentVersions = getAllDocumentVersions(title);
    const {version} = getLatestDocument(title);
    const latestDocumentRevision = updatedDocumentVersions[updatedDocumentVersions.length - 1];

    expect(updatedDocumentVersions.length).toBe(allDocumentVersions.length + 1);
    expect(latestDocumentRevision.content).toBe(documentContent);
    expect(latestDocumentRevision.version).toBe(version + 1);
});
