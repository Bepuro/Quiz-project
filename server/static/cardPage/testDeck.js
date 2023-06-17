const deck_1 = {
    deckName: 'Семья',
    info: [
        { front: 'мама', back: 'папа', grade: -1, isFavourite: false },
        { front: 'тетя', back: 'дядя', grade: -1, isFavourite: false },
        { front: 'сестра', back: 'брат', grade: -1, isFavourite: false },
        {
            front: 'Очень длинный текст',
            back: function () {
                let arr = [];
                for (let i = 0; i < 1000; i++) {
                    arr.push('очень длинный текст ');
                }
                return arr.join('');
            }(),
            grade: -1,
            isFavourite: false
        },
    ]
}
