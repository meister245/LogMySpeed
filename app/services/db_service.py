import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from model.connection_model import Connection
from model.room_model import Room
from model.speedtest_model import SpeedTest


class DBService:
    def __init__(self, conn_param):
        self.engine = create_engine(conn_param)
        self.session = sessionmaker(bind=self.engine)
        self.db = self.session()
        if conn_param.startswith("sqlite"):
            self.db.execute('PRAGMA foreign_keys = ON;')

    def get_items(self, conn_type):
        items = self.db.query(Connection) \
            .join(Connection.rooms) \
            .join(Connection.tests) \
            .filter(Connection.conn_type == conn_type) \
            .order_by(Room.room_number, SpeedTest.test_date.desc()) \
            .all()
        return items

    def create_item(self, request_data):
        try:
            obj = Connection().from_dict(request_data)

            self.db.add(obj)
            self.db.commit()

        except Exception as e:
            raise e

        return

    def data_to_json(self, conn_type):
        item_dicts = [item.to_dict() for item in self.get_items(conn_type)]
        return json.dumps(item_dicts)
