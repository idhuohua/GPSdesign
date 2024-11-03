from flask import request, jsonify, Blueprint
from apps.designWeb import handler as designWebHandler
from apps.designWeb import logic as designWebLogic

from apps.utils import ResponseWrapper, BusinessException, BUSINESS_FAIL

# 创建一个蓝图（Blueprint），这是一种 Flask 用于组织和分组功能的方式
apps = Blueprint("apps", __name__)

# 定义一个路由 '/ping'，既支持 GET 请求也支持 POST 请求
@apps.route('/ping', methods=['GET', 'POST'])
def index():
    # 当访问该路由时，返回字符串 "pong"
    return "pong"

@apps.route('/generate', methods=['POST'])
def generate():
    try:
        # 从请求中解析出 app_id 和 type，并将其转换为整数
        app_id = int(request.json.get('appid'))
        type_ = int(request.json.get('type'))
        # 获取前端传递的数据，这里假定数据包括图片等，都从 prompts 字段获取
        prompts = request.json.get('prompts')

        # 根据 app_id 的值来调用不同的处理逻辑
        if app_id == 0:
            response_data = designWebHandler.handle_request(type_, prompts)
        else:
            # 如果应用不存在，则抛出 BusinessException 异常
            raise BusinessException(message="应用不存在")
        
        # 使用 ResponseWrapper 封装成功响应，并返回 JSON 数据
        return jsonify(ResponseWrapper.success(data=response_data))
    except BusinessException as be:

        return jsonify(ResponseWrapper.fail(code=be.code, message=be.message))
    except Exception as e:

        return jsonify(ResponseWrapper.fail(code=BUSINESS_FAIL, message=str(e)))

@apps.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        # 从请求中解析出 app_id 和 type，并将其转换为整数
        app_id = int(request.json.get('appid'))
        type_ = int(request.json.get('type'))
        # 获取前端传递的数据，这里假定数据包括图片等，都从 prompts 字段获取
        prompts = request.json.get('prompts')

        # 根据 app_id 的值来调用不同的处理逻辑
        if app_id == 0:
            response_data = designWebHandler.handle_request(type_, prompts)
        else:
            # 如果应用不存在，则抛出 BusinessException 异常
            raise BusinessException(message="应用不存在")
        
        # 使用 ResponseWrapper 封装成功响应，并返回 JSON 数据
        return jsonify(ResponseWrapper.success(data=response_data))
    except BusinessException as be:

        return jsonify(ResponseWrapper.fail(code=be.code, message=be.message))
    except Exception as e:

        return jsonify(ResponseWrapper.fail(code=BUSINESS_FAIL, message=str(e)))

# 定义一个处理 POST 请求的 '/designWeb/save' 路由
@apps.route('/designWeb/save', methods=['POST'])
def designWebSave():
    try:
        # 从请求中解析出 username 和 data
        username = request.json.get('username')
        data = request.json.get('data')
        # 调用 designWebLogic 的 save 方法保存数据
        designWebLogic.save(username, data)
        # 返回成功响应
        return jsonify(ResponseWrapper.success())
    except BusinessException as be:

        return jsonify(ResponseWrapper.fail(code=be.code, message=be.message))
    except Exception as e:

        return jsonify(ResponseWrapper.fail(code=BUSINESS_FAIL, message=str(e)))
    
# 定义一个处理 POST 请求的 '/designWeb/start' 路由
@apps.route('/designWeb/start', methods=['POST'])
def designWebStart():
    try:
        # 从请求中解析出 username
        username = request.json.get('username')
        # 调用 designWebLogic 的 start 方法并获取响应数据
        response_data = designWebLogic.start(username)
        # 返回成功响应，携带数据
        return jsonify(ResponseWrapper.success(data=response_data))
    except BusinessException as be:

        return jsonify(ResponseWrapper.fail(code=be.code, message=be.message))
    except Exception as e:

        return jsonify(ResponseWrapper.fail(code=BUSINESS_FAIL, message=str(e)))

# 定义一个处理 POST 请求的 '/designWeb/saveImage' 路由
@apps.route('/designWeb/saveImage', methods=['POST'])
def designWebSaveImage():
    try:
        image_name = request.json.get('ImageName')
        image_url= request.json.get('Image')
        # 调用saveImage方法保存图像
        designWebLogic.saveImage(image_url,image_name)
        # 返回成功响应
        return jsonify(ResponseWrapper.success())
    except BusinessException as be:
        return jsonify(ResponseWrapper.fail(code=be.code, message=be.message))
    except Exception as e:
        return jsonify(ResponseWrapper.fail(code=BUSINESS_FAIL, message=str(e)))
