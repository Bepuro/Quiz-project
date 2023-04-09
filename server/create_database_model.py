import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
from sqlalchemy import create_engine
from models import Base

DATABASE_URL = os.getenv('DATABASE_URL')


def main():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    main()
