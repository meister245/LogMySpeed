from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from ..db.base import Base
from ..db.connection import Connection
from ..db.room import Room
from ..db.speedtest import SpeedTest
from ..db.association import Association


class DBController(object):
    def __init__(self, conn_param):
        self.engine = create_engine(conn_param + '?check_same_thread=False')
        self.session = scoped_session(sessionmaker(bind=self.engine))

        self.db = self.session()
        self.set_sqlite_pragma()

    @staticmethod
    def create_tables(engine):
        return Base.create_tables(engine, Base.get_tables())

    def set_sqlite_pragma(self):
        self.db.execute('PRAGMA foreign_keys = ON;')

    @staticmethod
    def drop_tables(engine):
        return Base.drop_tables(engine, Base.get_tables())

    def get_items(self, conn_type):
        items = self.db.query(Association) \
            .filter(Association.connection.has(Connection.conn_type == conn_type)) \
            .all()

        return items

    def obj_to_dict(self, conn_type, limit):
        dict_items = []

        for assoc_obj in self.get_items(conn_type):
            dict_item = {'tests': []}
            dict_item.update(assoc_obj.room.to_dict())
            dict_item.update(assoc_obj.connection.to_dict())
            dict_item['tests'].append(assoc_obj.test.to_dict())

            dict_items.append(dict_item)

        dict_items = self.sort_items(dict_items, key='room_number')
        return self.aggregate_tests(dict_items, limit)

    @staticmethod
    def sort_items(dict_items, key='room_number'):
        return sorted(dict_items, key=lambda d: d.get(key))

    @staticmethod
    def aggregate_tests(dict_items, limit):
        aggregated_dict, count = [], 0

        for dict in dict_items:
            if len(aggregated_dict) == 0:
                aggregated_dict.append(dict)
            elif dict['room_number'] == aggregated_dict[count]['room_number'] \
                    and dict['conn_type'] == aggregated_dict[count]['conn_type']:
                for test_item in dict['tests']:
                    if len(aggregated_dict[count]['tests']) == limit:  # limit number of results / room
                        del aggregated_dict[count]['tests'][-1]
                    aggregated_dict[count]['tests'].insert(0, test_item)  # descending order
            else:
                aggregated_dict.append(dict)
                count += 1

        return aggregated_dict

    def update_item(self, request_data):
        assoc_obj = Association()
        assoc_obj.connection = self.find_or_create_conn(request_data)
        assoc_obj.room = self.find_or_create_room(request_data)
        assoc_obj.test = self.create_speed_test(request_data)

        self.db.add(assoc_obj)
        self.db.commit()
        return

    def find_or_create_conn(self, request_data):
        conn_id = self.db.query(Connection.conn_id) \
            .filter(Connection.conn_type == request_data.get('connType')) \
            .first()

        if not conn_id:
            return Connection().from_dict(**request_data)

        return self.db.query(Connection).get(conn_id)

    def find_or_create_room(self, request_data):
        room_id = self.db.query(Room.room_id) \
            .filter(Room.room_number == request_data.get('roomNumber')) \
            .first()

        if not room_id:
            return Room().from_dict(**request_data)

        return self.db.query(Room).get(room_id)

    @staticmethod
    def create_speed_test(request_data):
        return SpeedTest().from_dict(**request_data)
