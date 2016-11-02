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

    def data_to_json(self, conn_type):
        item_dicts = [item.to_dict() for item in self.get_items(conn_type)]
        return json.dumps(item_dicts)

    def update_item(self, request_data):
        conn_obj = self.find_or_create_conn(request_data)
        room_obj = self.find_or_create_room(request_data)
        test_obj = self.create_test(request_data)

        conn_obj.rooms.append(room_obj)
        conn_obj.tests.append(test_obj)

        self.db.add(conn_obj)
        self.db.commit()
        return

    def find_or_create_conn(self, request_data):
        conn_id = self.db.query(Connection.conn_id) \
            .filter(Connection.conn_type == request_data.get('connType')) \
            .first()

        if not conn_id:
            return Connection().from_dict(request_data)

        return self.db.query(Connection).get(conn_id)

    def find_or_create_room(self, request_data):
        room_id = self.db.query(Room.room_id) \
            .filter(Room.room_number == request_data.get('roomNumber')) \
            .first()

        if not room_id:
            return Room().from_dict(request_data)

        return self.db.query(Room).get(room_id)

    @staticmethod
    def create_test(request_data):
        return SpeedTest().from_dict(request_data)
