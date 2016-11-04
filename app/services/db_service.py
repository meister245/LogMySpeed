from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from model.connection_model import Connection
from model.room_model import Room
from model.speedtest_model import SpeedTest
from model.association import Association


class DBService:
    def __init__(self, conn_param):
        self.engine = create_engine(conn_param)
        self.session = sessionmaker(bind=self.engine)
        self.db = self.session()
        if conn_param.startswith("sqlite"):
            self.db.execute('PRAGMA foreign_keys = ON;')

    def get_items(self, conn_type):
        items = self.db.query(Association) \
            .filter(Association.connections.has(Connection.conn_type == conn_type)) \
            .order_by(Association.rooms.has(Room.room_number), Association.tests.any(SpeedTest.test_date).desc()) \
            .all()
        return items

    def obj_to_dict(self, conn_type):
        dict_items = []
        assoc_objects = self.get_items(conn_type)
        for assoc_obj in assoc_objects:
            dict_item = {'tests': []}
            dict_item.update(assoc_obj.connections.to_dict())
            dict_item.update(assoc_obj.rooms.to_dict())
            for test in assoc_obj.tests:
                dict_item['tests'].append(test.to_dict())
            dict_items.append(dict_item)
        return dict_items

    def update_item(self, request_data):
        assoc_obj = Association().from_dict()
        self.db.add(assoc_obj)

        assoc_obj.connections = self.find_or_create_conn(request_data)
        assoc_obj.rooms = self.find_or_create_room(request_data)
        assoc_obj.tests.append(self.create_test(request_data))

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

    def create_test(self, request_data):
        return SpeedTest().from_dict(request_data)
