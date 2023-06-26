import json
from sqlite3 import IntegrityError
from sqlalchemy import text

from flask import jsonify, Blueprint, request, session, make_response
from werkzeug.security import check_password_hash, generate_password_hash

from .database import get_db
from .database.models import Deck, Card, User, UserCardProgress
from .database import db

bp = Blueprint('api', __name__, url_prefix='/api')


def jsonify(obj, status_code=200):
    return make_response(json.dumps(obj, ensure_ascii=False, indent=4), status_code,
                         {'Content-Type': 'application/json; charset=utf-8'})


def _deck_decoder(obj):
    demanded_params = {'name'}

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


@bp.route('/register', methods=['POST'])
def register_user():
    username = request.json.get('username')
    password = request.json.get('password')
    db = get_db()
    err = None

    if not username:
        err = 'Username is required'
    elif not password:
        err = 'Password is required'

    if err is None:
        try:
            user = User(username=username, password=generate_password_hash(password))
            db.session.add(user)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            err = f'User {username} is already registered.'
    if err:
        return jsonify({'err': err}), 400
    else:
        return jsonify({'message': 'Success', 'username': username}), 200


@bp.route('/decks', methods=['POST'])
def create_deck():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    data = request.get_json()
    new_deck = _deck_decoder(data)

    if new_deck is None:
        return jsonify({'message': 'Some err occurred'})

    new_deck.user_id = session['user_id']
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

    if not deck or deck.user_id != session['user_id']:
        return jsonify({'message': 'No Content'}), 204

    db.session.delete(deck)
    db.session.commit()

    return jsonify({'message': 'Success'}), 200


@bp.route('/decks/<int:deck_id>/card', methods=['POST'])
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


@bp.route('/decks/<int:deck_id>/cards', methods=['POST'])
def add_cards(deck_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    cards = request.json.get('cards')
    print(cards)
    if not cards:
        return jsonify({'message': 'No cards'}), 204

    for card in cards:
        question = card.get('question')
        answer = card.get('answer')

        if not question or not answer:
            continue

        new_card = Card()
        new_card.answer = answer
        new_card.question = question
        new_card.deck_id = deck_id

        db.session.add(new_card)

    db.session.commit()

    return jsonify({'message': 'Cards added'}), 201


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


@bp.route('/decks/<int:deck_id>', methods=['PUT'])
def update_deck(deck_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    data = request.get_json()
    if 'name' not in data:
        return jsonify({'message': 'Missing required parameter "name"'})

    deck = Deck.query.filter_by(id=deck_id, user_id=session['user_id']).first()
    if deck is None:
        return jsonify({'message': 'Deck not found'})

    deck.name = data['name']
    db.session.commit()

    return jsonify({
        "id": deck.id,
        "name": deck.name,
        "user_id": deck.user_id
    }), 200


@bp.route('/cards/<int:card_id>', methods=['PUT'])
def update_card(card_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    data = request.get_json()
    if 'question' not in data or 'answer' not in data:
        return jsonify({'message': 'Missing required parameters "question" and/or "answer"'})

    card = Card.query.filter_by(id=card_id).join(Deck).filter_by(user_id=session['user_id']).first()
    if card is None:
        return jsonify({'message': 'Card not found'})

    card.question = data['question']
    card.answer = data['answer']
    db.session.commit()

    return jsonify({
        "id": card.id,
        "question": card.question,
        "answer": card.answer,
        "deck_id": card.deck_id,
    }), 200

@bp.route('/cards/update_card_progress/<int:card_id_prog>', methods=['PUT'])
def update_card_progress(card_id_prog):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    data = request.get_json()
    if 'grade' not in data or 'is_favourite' not in data:
        return jsonify({'message': 'Missing required parameters: "grade" or "is_favourite"'})


    card_progress = UserCardProgress.query.filter_by(card_id=card_id_prog, user_id=session['user_id']).first()
    if card_progress is None:
        new_prog = UserCardProgress()
        new_prog.user_id = session['user_id']
        new_prog.card_id = card_id_prog
        new_prog.progress = data['grade']
        new_prog.is_favourite = data['is_favourite']
        db.session.add(new_prog)
        db.session.commit()
        return jsonify({'message': 'New user progress added'})

    card_progress.progress = data['grade']
    card_progress.is_favourite = data['is_favourite']

    db.session.commit()

    return jsonify({
        "id": card_progress.id,
        "grade": card_progress.progress,
        "is_favourite": card_progress.is_favourite
    }), 200


@bp.route('/user/decks', methods=['GET'])
def get_user_decks():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    decks = Deck.query.filter_by(user_id=session['user_id']).all()

    return jsonify({ "decks": [{
            "id": deck.id,
            "name": deck.name,
            "user_id": deck.user_id
        } for deck in decks]
    }), 200


@bp.route('/decks/<int:deck_id>/cards', methods=['GET'])
def get_deck_cards(deck_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})

    deck = Deck.query.filter_by(id=deck_id, user_id=session['user_id']).first()
    if deck is None:
        return jsonify({'message': 'Deck not found'})

    query_text = text(f'''
        select * from cards join decks on cards.deck_id = decks.id left join
        	user_card_progress on cards.id = user_card_progress.card_id
        where decks.user_id = {session['user_id']} and deck_id = {deck_id}
    ''')


    cards = db.session.execute(query_text).fetchall()
    print(cards)
    deck_name = Deck.query.filter_by(id=deck_id).first().name

    return jsonify({'deck':
        {
            'deckName': deck_name,
            'cards': [{
                    "id": card.id,
                    "question": card.question,
                    "answer": card.answer,
                    "deck_id": card.deck_id,
                    "progress": 6 if card.progress is None else card.progress,
                    "is_favourite": card.is_favourite if hasattr(card, 'is_favourite') else False
                } for card in cards
            ]
        }
    }), 200


@bp.route('/update_user_data', methods=['POST'])
def update_user_data():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'})
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    phone_num = request.form['phone']
    data_json = json.dumps({'email': email, 'phone_num': phone_num})
    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.username = username
    user.password = generate_password_hash(password)
    user.userData = data_json
    db.session.commit()
    return jsonify({'message': 'User data updated successfully'}), 200


@bp.route('/get_user_data', methods=['GET'])
def get_user_data():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'username': user.username, 'user_data': user.userData}), 200
