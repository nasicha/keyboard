import characterData from './data/characterData';
import phrases from './data/phrases';
import characterGroupsQWERTY from './data/default/dataQwertyLike';
import characterGroupsSymbol from './data/symbol/dataSymbol';
import characterGroupsEmoji from './data/emoji/dataEmoji';

export const useCharacterData = (shiftCharacters?: boolean, layoutState?: number) => {
    let selectedData = characterGroupsQWERTY.groups;

    if(layoutState === 1) {
        selectedData = characterGroupsSymbol.groups;
    } else if (layoutState === 2) {
        selectedData = characterGroupsEmoji.groups;
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

export const usePhrases = () => {
    return phrases.phrases;
}