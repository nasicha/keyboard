export default {
    // character: [
    //     { key: 'q', value: 'q', group: 6, position: 0 },
    //     { key: 'w', value: 'w', group: 6, position: 1 },
    //     { key: 'e', value: 'e', group: 1, position: 3 },
    //     { key: 'r', value: 'r', group: 1, position: 2 },
    //     { key: 't', value: 't', group: 0, position: 0 },
    //     { key: 'y', value: 'y', group: 1, position: 0 },
    //     { key: 'u', value: 'u', group: 2, position: 3 },
    //     { key: 'i', value: 'i', group: 2, position: 0 },
    //     { key: 'o', value: 'o', group: 2, position: 2 },
    //     { key: 'p', value: 'p', group: 2, position: 1 },
    //     { key: 'a', value: 'a', group: 6, position: 3 },
    //     { key: 's', value: 's', group: 6, position: 2 },
    //     { key: 'd', value: 'd', group: 5, position: 0 },
    //     { key: 'f', value: 'f', group: 5, position: 1 },
    //     { key: 'g', value: 'g', group: 1, position: 1 },
    //     { key: 'h', value: 'h', group: 0, position: 1 },
    //     { key: 'j', value: 'j', group: 3, position: 2 },
    //     { key: 'k', value: 'k', group: 3, position: 0 },
    //     { key: 'l', value: 'l', group: 3, position: 1 },
    //     { key: 'z', value: 'z', group: 5, position: 3 },
    //     { key: 'x', value: 'x', group: 5, position: 2 },
    //     { key: 'c', value: 'c', group: 4, position: 3 },
    //     { key: 'v', value: 'v', group: 4, position: 2 },
    //     { key: 'b', value: 'b', group: 4, position: 0 },
    //     { key: 'n', value: 'n', group: 4, position: 1 },
    //     { key: 'm', value: 'm', group: 3, position: 3 },
    //     { key: 'space', value: ' ', group: 0, position: 2 },
    //     { key: '.', value: '.', group: 0, position: 3 },
    // ],
    characters: [
        { key: 't', value: 't', group: 0, position: 0 },
        { key: 'h', value: 'h', group: 0, position: 1 },
        { key: 'space', value: ' ', group: 0, position: 2 },
        { key: '.', value: '.', group: 0, position: 3 },
        { key: 'y', value: 'y', group: 1, position: 0 },
        { key: 'g', value: 'g', group: 1, position: 1 },
        { key: 'r', value: 'r', group: 1, position: 2 },
        { key: 'e', value: 'e', group: 1, position: 3 },
        { key: 'i', value: 'i', group: 2, position: 0 },
        { key: 'p', value: 'p', group: 2, position: 1 },
        { key: 'o', value: 'o', group: 2, position: 2 },
        { key: 'u', value: 'u', group: 2, position: 3 },
        { key: 'k', value: 'k', group: 3, position: 0 },
        { key: 'l', value: 'l', group: 3, position: 1 },
        { key: 'j', value: 'j', group: 3, position: 2 },
        { key: 'm', value: 'm', group: 3, position: 3 },
        { key: 'b', value: 'b', group: 4, position: 0 },
        { key: 'n', value: 'n', group: 4, position: 1 },
        { key: 'v', value: 'v', group: 4, position: 2 },
        { key: 'c', value: 'c', group: 4, position: 3 },
        { key: 'd', value: 'd', group: 5, position: 0 },
        { key: 'f', value: 'f', group: 5, position: 1 },
        { key: 'x', value: 'x', group: 5, position: 2 },
        { key: 'z', value: 'z', group: 5, position: 3 },
        { key: 'q', value: 'q', group: 6, position: 0 },
        { key: 'w', value: 'w', group: 6, position: 1 },
        { key: 's', value: 's', group: 6, position: 2 },
        { key: 'a', value: 'a', group: 6, position: 3 },
    ],

    characterGroups: [
        {
            key: '0',
            characters: [
                { key: 0, value: 't' },
                { key: 1, value: 'h' },
                { key: 2, value: '\xa0' },
                { key: 3, value: '.' },
            ]
        },
        {
            key: '1',
            characters: [
                { key: 0, value: 'y' },
                { key: 1, value: 'g' },
                { key: 2, value: 'r' },
                { key: 3, value: 'e' },
            ]
        },
        {
        key: '2',
        characters: [
            { key: 0, value: 'i' },
            { key: 1, value: 'p' },
            { key: 2, value: 'o' },
            { key: 3, value: 'u' },
        ]
        },
        {
            key: '3',
            characters: [
                { key: 0, value: 'k' },
                { key: 1, value: 'l' },
                { key: 2, value: 'j' },
                { key: 3, value: 'm' },
            ]
        },
        {
            key: '4',
            characters: [
                { key: 0, value: 'b' },
                { key: 1, value: 'n' },
                { key: 2, value: 'v' },
                { key: 3, value: 'c' },
            ]
        },
        {
            key: '5',
            characters: [
                { key: 0, value: 'd' },
                { key: 1, value: 'f' },
                { key: 2, value: 'x' },
                { key: 3, value: 'z' },
            ]
        },
        {
            key: '6',
            characters: [
                { key: 0, value: 'q' },
                { key: 1, value: 'w' },
                { key: 2, value: 's' },
                { key: 3, value: 'a' },
            ]
        },
    ]
}