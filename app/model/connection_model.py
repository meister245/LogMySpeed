from sqlalchemy import Column, Integer, String

from base import Base


class Connection(Base):
    __tablename__ = 'connection'

    conn_id = Column(Integer, primary_key=True, autoincrement=True)
    conn_type = Column(String(10), nullable=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def from_dict(self, request_data):
        return Connection(conn_type=request_data.get('connType'))
