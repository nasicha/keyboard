import characterData from './characterData';

export const useCharacterData = (shiftCharacters?: boolean, byAlphabet?: boolean, layoutState?: number) => {
    let selectedData;

    if (byAlphabet) {
        selectedData = characterData.characterGroupsAlphabetical;
    } else {
        selectedData = characterData.characterGroupsQWERTY;
    }

    if(layoutState === 1) {
        selectedData = characterData.characterGroupsSymbols;
    } else if (layoutState === 2) {
        selectedData = characterData.characterGroupsEmoji;
    }

    return {
        characterGroups: selectedData.map((groups) => {
            return {
                key: groups.key,
                characters: groups.characters.map((char) => {
                    return {
                        position: char.key,
                        character: shiftCharacters ? char.valueShift : char.value,
                        shiftedCharacter: char.valueShift,
                        diacritics: char.diacritics,
                    }
                })
            }
        }),
    }
}

export const useCharacterDataLayout = () => {
    return {
        ...characterData.layouts,
    }
}