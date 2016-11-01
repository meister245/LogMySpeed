import random
import json
from datetime import datetime

from model.base import Base
from model.room_model import Room
from model.connection_model import Connection
from model.speedtest_model import SpeedTest
from services.db_service import DBService


def create_tables(engine):
    return Base.create_tables(engine, Base.get_tables())


def drop_tables(engine):
    return Base.drop_tables(engine, Base.get_tables())


def generate_items(db, count):
    for i in xrange(count):
        newconn = Connection(conn_type=random.choice(['Wifi', 'Ethernet']),
                             rooms=[],
                             tests=[])

        newroom = Room(room_number=i + 1,
                       floor_number=random.randint(0, 7))

        newconn.rooms.append(newroom)

        for i in xrange(random.randint(1, 3)):
            newspeedtest = SpeedTest(nickname=random.choice(['John', 'Barbara', 'Stephen', 'Sarah']),
                                     device_type=random.choice(['Desktop', 'Mobile']),
                                     download_speed=round(random.uniform(0.5, 8.5), 2),
                                     test_date=datetime.now())

            newconn.tests.append(newspeedtest)

        db.add(newconn)
    db.commit()
    return
