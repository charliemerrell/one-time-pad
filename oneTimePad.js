function encrypt(msg, key) {
    validateOneTimeInputs(msg, key);
    let encrypted = "";
    for (let i = 0; i < msg.length; i++) {
        const sum = charToAlphaIndex(msg[i]) + charToAlphaIndex(key[i]);
        const newAlphaIndex = mod(sum, 26);
        encrypted += alphaIndexToChar(newAlphaIndex);
    }
    return encrypted;
}

function decrypt(encrypted, key) {
    validateOneTimeInputs(encrypted, key);
    let original = "";
    for (let i = 0; i < encrypted.length; i++) {
        const difference =
            charToAlphaIndex(encrypted[i]) - charToAlphaIndex(key[i]);
        const newAlphaIndex = mod(difference, 26);
        original += alphaIndexToChar(newAlphaIndex);
    }
    return original;
}

function validateOneTimeInputs(msg, key) {
    if (msg.length != key.length) {
        throw new Error("message and key must be the same length");
    }
    if (!stringOnlyLowerCase(msg)) {
        throw new Error("message can consist only of lowercase a-z");
    }
    if (!stringOnlyLowerCase(key)) {
        throw new Error("key can consist only of lowercase a-z");
    }
}

function charToAlphaIndex(char) {
    return char.charCodeAt(0) - 96;
}

function alphaIndexToChar(index) {
    return String.fromCharCode(index + 96);
}

function mod(x, y) {
    const remainder = x % y;
    if (remainder < 1) {
        return y + remainder;
    } else {
        return remainder;
    }
}

function stringOnlyLowerCase(str) {
    return /^[a-z]+$/.test(str);
}

module.exports = { encrypt, decrypt };
