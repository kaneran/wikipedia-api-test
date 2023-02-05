const { getAvailableTitles, getAvailableRevisions } = require("../services/documentService");

test('Get list of available titles', () => {
    const availableTitles = getAvailableTitles();
    const firstAvailableTitle = availableTitles[0];
    expect(availableTitles.length).toBeGreaterThan(0);
    expect(firstAvailableTitle).toBe("Title 1");
});

test('Get list of available revisions for a document' , () => {
    const availableRevisions = getAvailableRevisions("Title 1");
    const {version, content} = availableRevisions[0];
    expect(availableRevisions.length).toBeGreaterThan(0);
    expect(version).toBe("1");
    expect(content).toBe("Hello");
});

test('Return empty array if there are no revisions for a document', () => {
    expect(getAvailableRevisions("Invalid title").length).toBe(0);
});