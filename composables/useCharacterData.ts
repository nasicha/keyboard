import characterData from './characterData';
import { characterGroup } from './../types/characterGroup';

export const useCharacterData = () => {
    return {
        characterGroups: characterData.characterGroups.map((groups) => {
            return {
                key: groups.key,
                characters: groups.characters.map((char) => {
                    return {
                        character: char.value,
                        position: char.key,
                    }
                })
            }
        }),
    }
}