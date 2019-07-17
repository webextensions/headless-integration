const removeUnwantedIndentation = function (str) {
    let lines = str.split('\n');
    lines = lines.filter(function (line, index) {
        if (index === 0 || index === lines.length - 1) {
            if (line.search(/\S/) === -1) {
                return false;
            }
        }
        return true;
    });

    let minFirstNonWhitespaceCharacterAt = null;
    lines.forEach(function (line, index) {
        // https://stackoverflow.com/questions/25823914/javascript-count-spaces-before-first-character-of-a-string/25823987#25823987
        const firstNonWhitespaceCharacterAt = line.search(/\S|$/);
        if (index === 0) {
            minFirstNonWhitespaceCharacterAt = firstNonWhitespaceCharacterAt;
        } else {
            if (firstNonWhitespaceCharacterAt < minFirstNonWhitespaceCharacterAt) {
                minFirstNonWhitespaceCharacterAt = firstNonWhitespaceCharacterAt;
            }
        }
    });

    lines = lines.map(function (line) {
        return line.substring(minFirstNonWhitespaceCharacterAt);
    });

    str = lines.join('\n');

    return str;
};

export default removeUnwantedIndentation;
