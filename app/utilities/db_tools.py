import random
from datetime import datetime

from model.base import Base
from model.room_model import Room
from model.connection_model import Connection
from model.speedtest_model import SpeedTest
from model.association import Association


def create_tables(engine):
    return Base.create_tables(engine, Base.get_tables())


def drop_tables(engine):
    return Base.drop_tables(engine, Base.get_tables())


def generate_items(db, count):
    for i in xrange(count):
        assoc = Association()

        while i < 1:
            assoc.connection = Connection(conn_type=random.choice(['Wifi', 'Ethernet']))

        assoc.room = Room(room_number=i + 1,
                          floor_number=random.randint(0, 7))

        assoc.test = SpeedTest(nickname=random.choice(['John', 'Barbara', 'Stephen', 'Sarah']),
                               device_type=random.choice(['Desktop', 'Mobile', 'Tablet', 'Smartphone']),
                               download_speed=round(random.uniform(0.5, 8.5), 2),
                               test_date=datetime.now())

        db.add(assoc)
    db.commit()
    return
