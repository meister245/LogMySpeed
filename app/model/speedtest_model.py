from datetime import datetime

from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey

from base import Base


class SpeedTest(Base):
    __tablename__ = 'speedtest'

    test_id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(30), nullable=False)
    device_type = Column(String(20), nullable=False)
    download_speed = Column(Float, nullable=False)
    remote_addr = Column(String(32), nullable=False)
    test_date = Column(Integer, nullable=False)

    def to_dict(self):
        test_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        test_dict['test_date'] = Base.format_date(test_dict['test_date'])

        return test_dict

    def from_dict(self, request_data):
        return SpeedTest(nickname=self.default_nickname(request_data),
                         device_type=request_data.get('deviceType'),
                         download_speed=request_data.get('downloadSpeed'),
                         remote_addr=request_data.get('remote_addr'),
                         test_date=datetime.now())

    def default_nickname(self, request_data):
        if len(request_data.get('nickname')) == 0:
            return 'N/A'
        else:
            return request_data.get('nickname')