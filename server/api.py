import json
from .models import Deck, Card


def _deck_decoder(obj: dict) -> (Deck, str):
    demanded_params = {'name', 'user_id'}

    new_deck = Deck()

    for param in demanded_params:
        if param not in obj.keys():
            return obj

    for attr, value in obj.items():
        if attr in demanded_params:
            setattr(new_deck, attr, value)

    return new_deck


def create_deck(new_deck_data):
    new_decks = json.load(new_deck_data, object_hook=_deck_decoder)
