import socket
HOSTNAME = socket.gethostname()

PRODUCTION_HOSTS = ['li309-144']

if HOSTNAME in PRODUCTION_HOSTS:
    from .prod_settings import *
else:
    from .dev_settings import *

