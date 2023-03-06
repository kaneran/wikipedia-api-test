const { validateDocumentTitle } = require("../services/validationService")

test("Throw error if title has more than 50 characters", () => {
    const longTitle = "HithereHithereHithereHithereHithereHithereHithere!!"
    expect(() => validateDocumentTitle(longTitle)).toThrow(/^Title must have maximum length of 50 characters$/)
})
