import os

from waitress import serve

from service import service

if __name__ == '__main__':
    service_url_scheme = os.environ.get('AUGMENTATION_SERVICE_URL_SCHEME', 'http')
    service_host = os.environ.get('AUGMENTATION_SERVICE_HOST', '127.0.0.1')
    service_port = os.environ.get('AUGMENTATION_SERVICE_PORT', 5000)
    thread_count = os.environ.get('THREAD_COUNT', 2)
    serve(service, url_scheme=service_url_scheme, host=service_host, port=service_port, threads=thread_count, _quiet=True)
