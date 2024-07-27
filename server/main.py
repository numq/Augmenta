import os

import waitress

from service import service

if __name__ == '__main__':
    waitress.serve(service, port=os.environ.get('AUGMENTATION_SERVICE_PORT') or "5000")
