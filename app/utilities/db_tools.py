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
