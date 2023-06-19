import characterData from './characterData';

export const useCharacterData = (shiftCharacters?: boolean, byAlphabet?: boolean) => {
    let selectedData;

    if (byAlphabet) {
        selectedData = characterData.characterGroupsAlphabetical;
    } else {
        selectedData = characterData.characterGroupsQWERTY;
    }

    return {
        characterGroups: selectedData.map((groups) => {
            return {
                key: groups.key,
                characters: groups.characters.map((char) => {
                    return {
                        character: shiftCharacters ? char.valueShift : char.value,
                        position: char.key,
                    }
                })
            }
        }),
    }
}