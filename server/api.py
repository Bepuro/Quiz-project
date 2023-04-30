import json
from flask import jsonify, Blueprint, request, session
from werkzeug.security import check_password_hash

from server.models import Deck, Card, User
from server import db

bp = Blueprint('api', __name__, url_prefix='/api')


def _deck_decoder(obj):
    demanded_params = {'name', 'user_id'}

    new_deck = Deck()

    for param in demanded_params:
        if param not in obj:
            return None

    for attr, value in obj.items():
        if attr in demanded_params:
            setattr(new_deck, attr, value)

    return new_deck


@bp.route('/login', methods=('GET', 'POST'))
def login_user():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({'message': 'Incorrect username'})
    elif not check_password_hash(user.password, password):
        return jsonify({'message': 'Incorrect password.'})

    session.clear()
    session['user_id'] = user.id

    return jsonify({'message': 'Logged In'})


@bp.route('/logout', methods=('GET', 'POST'))
def logout():
    session.clear()
    return jsonify({'message': 'Logged Out'})


@bp.route('/decks', methods=['POST'])
def create_deck():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    data = request.get_json()
    new_deck = _deck_decoder(data)

    if new_deck is None:
        return jsonify({'message': 'Some err occurred'})

    db.session.add(new_deck)
    db.session.commit()

    return (
        jsonify({
            "id": new_deck.id,
            "name": new_deck.name,
            "user_id": new_deck.user_id
        }),
        201
    )


@bp.route('/decks/<int:deck_id>', methods=['DELETE'])
def delete_deck(deck_id: int):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    deck = Deck.query.get(deck_id)

    if not deck:
        return jsonify({'message': 'No Content'}), 204

    db.session.delete(deck)
    db.session.commit()

    return jsonify({'message': 'Success'}), 200


@bp.route('/decks/<int:deck_id>/cards', methods=['POST'])
def add_card(deck_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    question = request.json.get('question')
    answer = request.json.get('answer')

    if not question:
        return jsonify({'message': 'No question'}), 204
    if not answer:
        return jsonify({'message': 'No answer'}), 204

    new_card = Card()
    new_card.answer = answer
    new_card.question = question
    new_card.deck_id = deck_id

    db.session.add(new_card)
    db.session.commit()

    return jsonify({'message': 'Card added'}), 201


@bp.route('/cards/<int:card_id>', methods=['DELETE'])
def delete_card(card_id: int):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    card = Card.query.get(card_id)

    if not card:
        return jsonify({'message': 'No Content'}), 204

    db.session.delete(card)
    db.session.commit()

    return jsonify({'message': 'Success'}), 200
