import os

import click
import psycopg2
from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(
            host="localhost",
            database="test",
            user=os.environ['DB_USERNAME'],
            password=os.environ['DB_PASSWORD']
        )

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()
    cur = db.cursor()

    with current_app.open_resource('schema.sql') as f:
        cur.execute(f.read().decode('utf8'))
    db.commit()
    cur.close()
    db.close()


@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
