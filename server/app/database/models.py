from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class UserCardProgress(db.Model):
    __tablename__ = 'user_card_progress'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    card_id = Column(Integer, ForeignKey('cards.id'))
    progress = Column(Integer, default=6)
    is_favourite = Column(Boolean, default=False)
    user = relationship('User')
    card = relationship('Card')


class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(20), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    userData = Column(JSON, nullable=True)
    decks = relationship('Deck', cascade='all, delete, delete-orphan')


class Deck(db.Model):
    __tablename__ = 'decks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', overlaps='decks')
    cards = relationship('Card', cascade='all, delete, delete-orphan')


class Card(db.Model):
    __tablename__ = 'cards'
    id = Column(Integer, primary_key=True)
    question = Column(String(1000), nullable=False)
    answer = Column(String(1000), nullable=False)
    deck_id = Column(Integer, ForeignKey('decks.id'))
    deck = relationship('Deck', overlaps='cards')


class FavoriteUserDeck(db.Model):
    tablename = 'favorite_user_decks'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    deck_id = Column(Integer, ForeignKey('decks.id'))
    is_favourite = Column(Boolean, default=False)
    user = relationship('User')
    deck = relationship('Deck')
