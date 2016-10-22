from sqlalchemy import create_engine

from model.base import Base
from model.room_model import Room
from model.speedtest_model import SpeedTest


class DBTools:
    def __init__(self, conn_param):
        self.conn = conn_param

    def connect_db(self):
        engine = create_engine(self.conn)
        return engine.connect()

    def create_tables(self):
        db = self.connect_db()
        return Base.create_tables(db, Base.get_tables())
