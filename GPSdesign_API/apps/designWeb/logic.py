from apps.utils import BusinessException, BUSINESS_FAIL
from apps.designWeb.creatives import DesignCreative
# from agent.sd import sd_pool
from agent.gpt import gpt_pool

from settings import problem
from settings import solution
from settings import evaluate

from concurrent.futures import ThreadPoolExecutor

from pymongo import MongoClient
import config
import json
import re
import os
import requests
from urllib.parse import unquote

mongo_client = MongoClient(config.MONGO_HOST)
mongo_db = mongo_client[config.MONGO_DB]
mongo_users_collection = mongo_db['users']

# parse_generated 函数: 用于解析以 '#' 分隔的文本，返回一个文本数组。
def parse_generated(generated_text):
    return generated_text.strip().split('#')

def generate_prompts(template: str, **input): 
    return template.format(**input)

def Problem_Problem_Text_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计问题缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')

        # Type: p文本-p文本
        gpt_task = {"messages": generate_prompts(problem.prompt_problem_problem, input=task, num=num)}
        problems = gpt_pool.chat(gpt_task)['text']
        print(problems)

        problem_texts = parse_generated(problems)

        result = DesignCreative.array_to_dict(DesignCreative.from_problem_problem_text(p_p_texts=problem_texts))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Solution_Problem_Text_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计方案缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')

        # Type: s文本-p文本
        gpt_task = {"messages": generate_prompts(problem.prompt_solution_problem, input=task, num=num)}
        problems = gpt_pool.chat(gpt_task)['text']
        print(problems)

        problem_texts = parse_generated(problems)

        result = DesignCreative.array_to_dict(DesignCreative.from_solution_problem_text(s_p_texts=problem_texts))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Problem_Solution_Text_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计问题缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')

        # Type: p文本-s文本
        gpt_task = {"messages": generate_prompts(solution.prompt_problem_solution, input=task, num=num)}
        solutions = gpt_pool.chat(gpt_task)['text']
        print(solutions)

        solution_texts = parse_generated(solutions)

        result = DesignCreative.array_to_dict(DesignCreative.from_problem_solution_text(p_s_texts=solution_texts))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Solution_Solution_Text_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计方案缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')

        # Type: s文本-s文本
        gpt_task = {"messages": generate_prompts(solution.prompt_solution_solution, input=task, num=num)}
        solutions = gpt_pool.chat(gpt_task)['text']
        print(solutions)

        solution_texts = parse_generated(solutions)

        result = DesignCreative.array_to_dict(DesignCreative.from_solution_solution_text(s_s_texts=solution_texts))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Problem_Problem_Image_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计问题缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')
        # 生成p_p场景prompt
        # gpt_task = {"messages": generate_prompts(problem.prompt_scene_problem_problem, input=products, num=generate_num)}
        gpt_task = {"messages": generate_prompts(problem.prompt_scene_problem_problem, input=task, num=num)}
        scenes = gpt_pool.chat(gpt_task)['text']
        print(scenes)
        scenes_texts = parse_generated(scenes)
        # 生成文生图提示
        gpt_task = {"messages": generate_prompts(problem.prompt_image_problem_problem, input=scenes, num=num)}
        image_prompts = gpt_pool.chat(gpt_task)['text']
        # Type: p文本-p图像
        image_tasks = []
        for idx, prompt in enumerate(parse_generated(image_prompts)):
            if prompt == '':
                continue

            # dall-e-3的调用
            task = {'index': idx, 'prompt': prompt,
                    'task_type': "p_p_image"}
            image_tasks.append(task)

        with ThreadPoolExecutor() as executor:
            # dall-e-3的调用
            futures = [executor.submit(gpt_pool.text2Image, task) for task in image_tasks]
            images = [future.result() for future in futures]      
            # print(images)
        if len(images) != len(scenes_texts):
            raise BusinessException(BUSINESS_FAIL, '生成内容缺失')

        result = DesignCreative.array_to_dict(DesignCreative.from_problem_problem_image(scenes=scenes_texts,p_p_images=[images[i]['image'] for i in range(len(images))]))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Solution_Problem_Image_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计方案缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')
        # 生成s_p场景prompt
        gpt_task = {"messages": generate_prompts(problem.prompt_scene_solution_problem, input=task, num=num)}
        scenes = gpt_pool.chat(gpt_task)['text']
        print(scenes)
        scenes_texts = parse_generated(scenes)
        # 生成文生图提示
        gpt_task = {"messages": generate_prompts(problem.prompt_image_solution_problem, input=scenes, num=num)}
        image_prompts = gpt_pool.chat(gpt_task)['text']
        # Type: s文本-p图像
        image_tasks = []
        for idx, prompt in enumerate(parse_generated(image_prompts)):
            if prompt == '':
                continue

            # dall-e-3的调用
            task = {'index': idx, 'prompt': prompt,
                    'task_type': "s_p_image"}
            image_tasks.append(task)

        with ThreadPoolExecutor() as executor:
            # dall-e-3的调用
            futures = [executor.submit(gpt_pool.text2Image, task) for task in image_tasks]
            images = [future.result() for future in futures]      
            # print(images)
        if len(images) != len(scenes_texts):
            raise BusinessException(BUSINESS_FAIL, '生成内容缺失')
        result = DesignCreative.array_to_dict(DesignCreative.from_solution_problem_image(scenes=scenes_texts,s_p_images=[images[i]['image'] for i in range(len(images))]))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Problem_Solution_Image_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计问题缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')
        # 生成p_s产品prompt
        # gpt_task = {"messages": generate_prompts(problem.prompt_scene_problem_problem, input=products, num=generate_num)}
        gpt_task = {"messages": generate_prompts(solution.prompt_product_problem_solution, input=task, num=num)}
        products = gpt_pool.chat(gpt_task)['text']
        print(products)
        products_texts = parse_generated(products)
        # 生成文生图提示
        gpt_task = {"messages": generate_prompts(solution.prompt_image_problem_solution, input=products, num=num)}
        image_prompts = gpt_pool.chat(gpt_task)['text']
        # Type: p文本-s图像
        image_tasks = []
        for idx, prompt in enumerate(parse_generated(image_prompts)):
            if prompt == '':
                continue

            # dall-e-3的调用
            task = {'index': idx, 'prompt': prompt,
                    'task_type': "p_s_image"}
            image_tasks.append(task)

        with ThreadPoolExecutor() as executor:
            # dall-e-3的调用
            futures = [executor.submit(gpt_pool.text2Image, task) for task in image_tasks]
            images = [future.result() for future in futures]      
            # print(images)
        if len(images) != len(products_texts):
            raise BusinessException(BUSINESS_FAIL, '生成内容缺失')

        result = DesignCreative.array_to_dict(DesignCreative.from_problem_solution_image(products=products_texts,p_s_images=[images[i]['image'] for i in range(len(images))]))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def Solution_Solution_Image_stimulus(prompts):
    try:
        task = prompts.get('task')
        if not task:
            raise BusinessException(BUSINESS_FAIL, '设计方案缺失')
        num = prompts.get('num')
        if not num:
            raise BusinessException(BUSINESS_FAIL, '设计数量缺失')
        # 生成s_s场景prompt
        gpt_task = {"messages": generate_prompts(solution.prompt_product_solution_solution, input=task, num=num)}
        products = gpt_pool.chat(gpt_task)['text']
        print(products)
        products_texts = parse_generated(products)
        # 生成文生图提示
        gpt_task = {"messages": generate_prompts(solution.prompt_image_solution_solution, input=products, num=num)}
        image_prompts = gpt_pool.chat(gpt_task)['text']
        # Type: s文本-s图像
        image_tasks = []
        for idx, prompt in enumerate(parse_generated(image_prompts)):
            if prompt == '':
                continue

            # dall-e-3的调用
            task = {'index': idx, 'prompt': prompt,
                    'task_type': "s_s_image"}
            image_tasks.append(task)

        with ThreadPoolExecutor() as executor:
            # dall-e-3的调用
            futures = [executor.submit(gpt_pool.text2Image, task) for task in image_tasks]
            images = [future.result() for future in futures]      
            # print(images)
        if len(images) != len(products_texts):
            raise BusinessException(BUSINESS_FAIL, '生成内容缺失')
        result = DesignCreative.array_to_dict(DesignCreative.from_solution_solution_image(products=products_texts,s_s_images=[images[i]['image'] for i in range(len(images))]))

        return {
            "count": len(result),
            "result": result
        }
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

# 定义处理函数
def process_design_data(problems, solutions):
    # 用于去除括号内容的正则表达式，同时匹配中文和英文括号
    bracket_pattern = re.compile(r'[\(\（].*?[\)\）]')

    # 处理设计问题
    processed_problems = []
    for problem in problems:
        processed_problem = {
            "ProblemID": problem.get("ProblemID"),
            "ProblemData": bracket_pattern.sub("", problem.get("ProblemData", ""))
        }
        processed_problems.append(processed_problem)

    # 处理设计方案
    processed_solutions = []
    for solution in solutions:
        processed_solution = {
            "SolutionID": solution.get("SolutionID"),
            "SolutionData": bracket_pattern.sub("", solution.get("SolutionData", ""))
        }
        processed_solutions.append(processed_solution)

    return processed_problems, processed_solutions

def evaluate_prompts(template: str, problem_input: str, solution_input: str):
    return template.format(problem_input=problem_input, solution_input=solution_input)

def NodePairs_Evaluate(prompts):
    try:
        problem_input = prompts.get('problems')
        if not problem_input:
            raise BusinessException(BUSINESS_FAIL, '设计问题缺失')
        solution_input = prompts.get('solutions')
        if not solution_input:
            raise BusinessException(BUSINESS_FAIL, '设计方案缺失')

        # 处理输入数据
        processed_problems, processed_solutions = process_design_data(problem_input, solution_input)
        # 将列表转换为 JSON 格式的字符串
        # 使用 ensure_ascii=False 来保持中文字符
        problem_input_json = json.dumps(processed_problems, ensure_ascii=False)
        solution_input_json = json.dumps(processed_solutions, ensure_ascii=False)
        # 生成反馈
        gpt_task = {
            "messages": evaluate_prompts(evaluate.prompt_evaluate, problem_input=problem_input_json, solution_input=solution_input_json)
        }
        # print(gpt_task)
        response = gpt_pool.json(gpt_task)
        print('response:')
        print(response)
        # 解析响应为Python对象
        if response:
            evaluated_data = json.loads(f"[{response}]")  # 把字符串转换为列表

            # 构建最终的JSON结构
            result = {
                "evaluate": evaluated_data
            }
            return result
        else:
            raise BusinessException(BUSINESS_FAIL, 'GPT 响应为空,没有匹配的问题或者方案')
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def start(username: str):
    try:
        if username == '':
            raise BusinessException(BUSINESS_FAIL, '用户名字为空')
        user = mongo_users_collection.find_one({"username": username})
        if user is None:
            # 用户不存在，创建新文档
            user_data = {
                "username": username,
                "solutionSchemes": [],
                "problemSchemes": [],
                "nodePairs":[],
            }
            mongo_users_collection.insert_one(user_data)
            return {**user_data, "_id": str(user_data["_id"])}
        else:
            return {**user, "_id": str(user["_id"])}
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e


def save(username: str, data):
    try:
        if username is None or data is None:
            raise BusinessException(BUSINESS_FAIL, '用户名字或数据为空')
        
        to_update = {
            "problemSchemes": data['problemSchemes'],
            "solutionSchemes": data['solutionSchemes'],
            "nodePairs": data['nodePairs'],
            "finalProblem": data['finalProblem'],
            "finalSolution": data['finalSolution']
        }
        
        update_result = mongo_users_collection.update_one(
            {"username": username},
            {"$set": to_update}
        )
        
        print(update_result.matched_count)

        if update_result.matched_count == 0:
            raise BusinessException(BUSINESS_FAIL, '用户不存在')
    except BusinessException as be:
        raise be
    except Exception as e:
        raise e

def sanitize_filename(filename):
    return re.sub(r'[\/:*?"<>|]', '', filename)
def saveImage(image_url: str,image_name: str):
    # 如果image_url为空，则直接返回
    if not image_url:
        print("No image URL provided.")
        return
    try:
        # # 解码URL
        # decoded_url = unquote(image_url)
        response = requests.get(image_url)
        response.raise_for_status()
        # 确保目录存在
        os.makedirs('../images', exist_ok=True)
        # 将图片内容写入文件
        # 在保存图像之前清理文件名
        image_name = sanitize_filename(image_name)
        with open(f"../images/{image_name}.png", 'wb') as file:
            file.write(response.content)

        print(f"saved Image_name {image_name}")
    except Exception as e:
        print(f"Error saving image: {e}")
        print(f"Image URL: {image_url}")
        print(f"Image Name: {image_name}")
        raise e