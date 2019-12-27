logmyspeed
----------

Visualize and troubleshoot internet connectivity and bandwidth issues for users sharing the same LAN.
Designed for small communities on local networks to report connection issues.

![](https://i.imgur.com/eaOVISN.png "Log My Speed")

#### Story

I was living in a dormitory for college students and people kept having internet connectivity and speed issues.
There was a wireless powerline adapter in each of the rooms, so everyone was on the same LAN, spread out across multiple floors.

All the access points were configured to use the same SSID, which was practical, but ultimately it led to
some of the APs getting overloaded, where as others didn't see any traffic at all.

I made this project to stop people from complaining on Facebook walls and give them a portal so they
can provide actually meaningful troubleshooting information for our network administrator.

#### Description & Usage

By default service will use the host IP address and port 9000

    ./bin/service

* Frontend - Bootstrap 3, jQuery
* Backend - Python 3.x, Flask, SQLAlchemy
