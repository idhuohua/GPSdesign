# import logging
from flask import Flask

from apps.routes import apps

from flask_cors import CORS

app = Flask(__name__)

# logging.basicConfig(level=logging.DEBUG)

app.register_blueprint(apps)

# 如果 nginx 中配置了 Access-Origin，则这里不需要开启CORS
CORS(app)

if __name__ == '__main__':
    # app.config['DEBUG'] = True
    
    app.run(host='0.0.0.0', port=5000)
# from flask import Flask, Blueprint

# # 创建一个蓝图
# test_blueprint = Blueprint('test_blueprint', __name__)

# @test_blueprint.route('/test')
# def test_route():
#     return 'Test route is working!'

# # 创建 Flask 应用
# app = Flask(__name__)

# # 注册蓝图
# app.register_blueprint(test_blueprint)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
