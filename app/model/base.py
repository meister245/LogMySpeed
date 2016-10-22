from sqlalchemy.ext.declarative import declarative_base


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

Base = declarative_base(cls=Base)