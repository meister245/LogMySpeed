from datetime import datetime

from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey

from base import Base


class SpeedTest(Base):
    __tablename__ = 'speedtest'

    test_id = Column(Integer, primary_key=True, autoincrement=True)
    conn_id = Column(Integer, ForeignKey('connection.conn_id'))
    nickname = Column(String(15), nullable=False)
    device_type = Column(String(10), nullable=False)
    download_speed = Column(Float, nullable=False)
    test_date = Column(Date, nullable=False)

    def to_dict(self):
        test_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        test_dict['test_date'] = Base.format_date(test_dict['test_date'])

        return test_dict

    def from_dict(self, request_data):
        test_obj = SpeedTest(nickname=request_data.get('nickname', 'N/A'),
                             device_type=request_data.get('deviceType'),
                             download_speed=request_data.get('downloadSpeed'),
                             test_date=datetime.now())

        return test_obj
