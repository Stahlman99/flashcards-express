const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const num = Math.floor((Math.random() * cards.length))

    res.redirect(`/cards/${num}?side=question`);
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const text = cards[id][side];
    const { hint } = cards[id];
    const name = req.cookies.username;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const templateData = { text, id, name };

    if (side === 'question') {
        templateData.hint = hint;
    }

    res.render('card', templateData);
});

module.exports = router;