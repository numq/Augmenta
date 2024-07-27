import base64
import io

import numpy as np
from PIL import Image
from augmentation import augmentations
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

service = Flask(__name__, static_folder="../../client/build")
CORS(service)


@service.route('/')
def serve():
    return send_from_directory(service.static_folder, "index.html")


@service.route('/augmentations', methods=['GET'])
def get_augmentations():
    try:
        return jsonify({"augmentations": [augmentation.to_dict() for augmentation in augmentations.values()]}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get augmentations: {str(e)}"}), 500


@service.route('/generate', methods=['POST'])
def post_generate():
    try:
        request_data = request.get_json()
        augmentation_id = request_data.get('augmentation_id')
        image_data = request_data.get('image_data')

        if not augmentation_id or not image_data:
            return jsonify({"error": "Missing augmentation_id or image_data"}), 400

        augmentation = augmentations.get(augmentation_id)
        if not augmentation:
            return jsonify({"error": f"Augmentation '{augmentation_id}' not found"}), 404

        image_data = image_data.split(',')[1]
        image_np = np.array(Image.open(io.BytesIO(base64.b64decode(image_data)))).astype(np.uint8)
        image_output = augmentation.generate(image_np).astype(np.uint8)

        buffered = io.BytesIO()
        Image.fromarray(image_output).save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

        return jsonify({"image_data": f"data:image/png;base64,{img_str}"}), 200
    except Exception as e:
        return jsonify({"error": f"Error generating image: {str(e)}"}), 500
