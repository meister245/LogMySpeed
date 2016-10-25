import random
import json


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from radar import random_datetime

from model.base import Base
from model.room_model import Room
from model.speedtest_model import SpeedTest

from services.db_service import DBService


class DBTools:
    def __init__(self, conn_param):
        self.engine = create_engine(conn_param)
        self.session = sessionmaker(bind=self.engine)
        self.db = self.session()

    def create_tables(self):
        return Base.create_tables(self.engine, Base.get_tables())

    def drop_tables(self):
        return Base.drop_tables(self.engine, Base.get_tables())

    def generate_items(self, count):
        for i in xrange(count):
            newroom = Room(room_number=i + 1,
                           floor_number=random.randint(0, 7),
                           conn_type=random.choice(['Wi-fi', 'Ethernet']),
                           tests=[])

            for i in xrange(random.randint(1, 3)):
                newspeedtest = SpeedTest(room_id=random.randint(1, 100),
                                         nickname=random.choice(['John', 'Barbara', 'Stephen', 'Sarah']),
                                         device_type=random.choice(['Desktop', 'Mobile']),
                                         download_speed=round(random.uniform(0.5, 8.5), 2),
                                         upload_speed=round(random.uniform(1.0, 6.5), 2),
                                         test_date=random_datetime(start='2016-05-22', stop='2016-11-05'))

                newroom.tests.append(newspeedtest)

            self.db.add(newroom)
        self.db.commit()
        return

    def send_json(self, conn_type):
        item_dicts = [item.to_dict() for item in DBService(self.db).get_items(conn_type)]
        return json.dumps(item_dicts)