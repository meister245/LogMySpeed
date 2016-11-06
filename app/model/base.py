from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime


class Base(object):
    @classmethod
    def get_tables(cls):
        return cls.metadata.sorted_tables

    @classmethod
    def create_tables(cls, db, tables=None, checkfirst=True):
        return cls.metadata.create_all(db, tables, checkfirst)

    @classmethod
    def drop_tables(cls, db, tables=None, checkfirst=True):
        return cls.metadata.drop_all(db, tables, checkfirst)

    @staticmethod
    def format_date(date_data):
        return str(date_data)[:-4]


Base = declarative_base(cls=Base)
