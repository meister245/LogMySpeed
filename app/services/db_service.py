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
        self.find_or_create_room(conn_obj, request_data)
        self.add_new_test(conn_obj, request_data)
        self.db.commit()
        return

    def find_or_create_conn(self, request_data):
        conn_id = self.db.query(Connection.conn_id) \
            .filter(Connection.conn_type == request_data.get('connType')) \
            .first()

        if not (conn_id):
            conn_obj = Connection().from_dict(request_data)
            self.db.add(conn_obj)
            self.db.commit()
            return conn_obj

        conn_obj = self.db.query(Connection).get(conn_id)
        return conn_obj

    def find_or_create_room(self, conn_obj, request_data):
        room_id = self.db.query(Room.room_id) \
            .filter(Room.room_number == request_data.get('roomNumber')) \
            .first()

        if not (room_id):
            room_obj = Room().from_dict(request_data)
            conn_obj.rooms.append(room_obj)
            return conn_obj

        room_obj = self.db.query(Room).get(room_id)
        conn_obj.rooms.append(room_obj)
        return conn_obj

    def add_new_test(self, obj, request_data):
        obj.tests.append(SpeedTest().from_dict(request_data))
        return obj
