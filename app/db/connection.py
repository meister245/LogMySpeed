from sqlalchemy import Column, Integer, String

from ..db.base import Base


class Connection(Base):
    __tablename__ = 'connection'

    conn_id = Column(Integer, primary_key=True, autoincrement=True)
    conn_type = Column(String(10), nullable=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @staticmethod
    def from_dict(**kwargs):
        return Connection(conn_type=kwargs.get('connType'))
