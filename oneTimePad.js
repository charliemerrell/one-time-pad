function encrypt(msg, key) {
    let encrypted = "";
    for (let i = 0; i < msg.length; i++) {
        const sum = charToAlphaIndex(msg[i]) + charToAlphaIndex(key[i]);
        const newAlphaIndex = mod(sum, 26);
        encrypted += alphaIndexToChar(newAlphaIndex);
    }
    return encrypted;
}

function decrypt(encrypted, key) {
    let original = "";
    for (let i = 0; i < encrypted.length; i++) {
        const difference =
            charToAlphaIndex(encrypted[i]) - charToAlphaIndex(key[i]);
        const newAlphaIndex = mod(difference, 26);
        original += alphaIndexToChar(newAlphaIndex);
    }
    return original;
}

function charToAlphaIndex(char) {
    return char.charCodeAt(0) - 97;
}

function alphaIndexToChar(index) {
    return String.fromCharCode(index + 97);
}

function mod(x, y) {
    const remainder = x % y;
    if (remainder < 0) {
        return y + remainder;
    } else {
        return remainder;
    }
}

module.exports = { encrypt, decrypt };
