import json
from flask import jsonify, Blueprint, request
from server.models import Deck, Card
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


@bp.route('/decks', methods=['POST'])
def create_deck():
    data = request.get_json()
    new_deck = _deck_decoder(data)

    if new_deck is None:
        return jsonify({'message': 'Some err occurred'})

    db.session.add(new_deck)
    db.session.commit()

    return jsonify({'message': f'Success, created deck with id:{new_deck.id}'})
