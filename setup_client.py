import os
import re
import sys


def replace_in_file(file_path, replacements):
    with open(file_path, 'r') as file:
        content = file.read()

    for key, value in replacements.items():
        pattern = rf'{key}\s*=\s*"([^"]*)"'
        replacement = f'{key}="{value}"'
        content = re.sub(pattern, replacement, content)

    with open(file_path, 'w') as file:
        file.write(content)


if __name__ == '__main__':
    service_url_scheme = os.environ.get('AUGMENTATION_SERVICE_URL_SCHEME')
    service_host = os.environ.get('AUGMENTATION_SERVICE_HOST')
    service_port = os.environ.get('AUGMENTATION_SERVICE_PORT')

    replace_in_file(
        sys.argv[1],
        {
            'AUGMENTATION_SERVICE_URL_SCHEME': service_url_scheme,
            'AUGMENTATION_SERVICE_HOST': service_host,
            'AUGMENTATION_SERVICE_PORT': service_port
        }
    )
