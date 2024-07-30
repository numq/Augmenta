import os

from waitress import serve

from service import service

if __name__ == '__main__':
    service_url_scheme = os.environ.get('AUGMENTATION_SERVICE_URL_SCHEME')
    service_host = os.environ.get('AUGMENTATION_SERVICE_HOST')
    service_port = os.environ.get('AUGMENTATION_SERVICE_PORT')
    serve(service, url_scheme=service_url_scheme, host=service_host, port=service_port)
