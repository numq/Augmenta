import os

from waitress import serve

from service import service

if __name__ == '__main__':
    serve(service, url_scheme='http', host='127.0.0.1', port=os.environ.get('AUGMENTATION_SERVICE_PORT'))
