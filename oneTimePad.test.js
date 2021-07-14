const { encrypt, decrypt } = require("./oneTimePad");

function makeRandString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

describe("basic encryption", () => {
    it("should work in the basic case", () => {
        expect(encrypt("aaa", "bbb")).toEqual("ccc");
    });
    it("should work when wrapping occurs", () => {
        expect(encrypt("bbb", "yyy")).toEqual("aaa");
    });
    it("should work when wrapping occurs 2", () => {
        expect(encrypt("aaa", "yyy")).toEqual("zzz");
    });
});

describe("basic decryption", () => {
    it("should work in the basic case", () => {
        expect(decrypt("ccc", "bbb")).toEqual("aaa");
    });
    it("should work when wrapping occurs", () => {
        expect(decrypt("aaa", "yyy")).toEqual("bbb");
    });
});

describe("random recovery", () => {
    for (let i of [1, 10, 100]) {
        it(`should recover random message of length ${i}`, () => {
            let message = makeRandString(i);
            let key = makeRandString(i);
            expect(decrypt(encrypt(message, key), key)).toEqual(message);
        });
    }
});

describe("encryption validation", () => {
    it("should error if lengths don't match", () => {
        expect(() => encrypt("ab", "a")).toThrowError();
    });
    it("should error if message isn't lowercase", () => {
        expect(() => encrypt("aB", "ab")).toThrowError();
    });
    it("should error if key isn't lowercase", () => {
        expect(() => encrypt("ab", "aB")).toThrowError();
    });
    it("should error if message contains punctuation", () => {
        expect(() => encrypt("a ", "ab")).toThrowError();
    });
    it("should error if key contains punctuation", () => {
        expect(() => encrypt("ab", "a ")).toThrowError();
    });
    it("should error if message contains digits", () => {
        expect(() => encrypt("a6", "ab")).toThrowError();
    });
    it("should error if key contains digits", () => {
        expect(() => encrypt("ab", "a6")).toThrowError();
    });
});

describe("decryption validation", () => {
    it("should error if lengths don't match", () => {
        expect(() => decrypt("ab", "a")).toThrowError();
    });
    it("should error if message isn't lowercase", () => {
        expect(() => decrypt("aB", "ab")).toThrowError();
    });
    it("should error if key isn't lowercase", () => {
        expect(() => decrypt("ab", "aB")).toThrowError();
    });
    it("should error if message contains punctuation", () => {
        expect(() => decrypt("a ", "ab")).toThrowError();
    });
    it("should error if key contains punctuation", () => {
        expect(() => decrypt("ab", "a ")).toThrowError();
    });
    it("should error if message contains digits", () => {
        expect(() => decrypt("a6", "ab")).toThrowError();
    });
    it("should error if key contains digits", () => {
        expect(() => decrypt("ab", "a6")).toThrowError();
    });
});
