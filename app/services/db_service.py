from datetime import datetime, timedelta

from model.connection_model import Connection
from model.room_model import Room
from model.speedtest_model import SpeedTest


class DBService:
    def __init__(self, session):
        self.db = session

    def get_items(self, conn_type):
        items = self.db.query(Connection) \
            .join(Connection.rooms) \
            .join(Connection.tests) \
            .filter(Connection.conn_type == conn_type) \
            .order_by(Room.room_number, SpeedTest.test_date.desc()) \
            .all()
        return items

    def create_item(self, request_data):
        obj = Connection().from_dict(request_data)

        try:
            self.db.add(obj)
            self.db.commit()

        except Exception as e:
            self.db.rollback()
            raise e

        return True
