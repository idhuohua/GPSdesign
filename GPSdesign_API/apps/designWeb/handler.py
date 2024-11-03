from apps.designWeb.logic import Problem_Problem_Text_stimulus
from apps.designWeb.logic import Solution_Problem_Text_stimulus
from apps.designWeb.logic import Problem_Solution_Text_stimulus
from apps.designWeb.logic import Solution_Solution_Text_stimulus
from apps.designWeb.logic import Problem_Problem_Image_stimulus
from apps.designWeb.logic import Solution_Problem_Image_stimulus
from apps.designWeb.logic import Problem_Solution_Image_stimulus
from apps.designWeb.logic import Solution_Solution_Image_stimulus
from apps.designWeb.logic import NodePairs_Evaluate
from apps.utils import BusinessException, BUSINESS_FAIL


def handle_request(type_, prompts):
    try:
        if type_ == 0:
            result = Problem_Problem_Text_stimulus(prompts)
        elif type_ == 1:
            result = Solution_Problem_Text_stimulus(prompts)
        elif type_ == 2:
            result = Problem_Solution_Text_stimulus(prompts)
        elif type_ == 3:
            result = Solution_Solution_Text_stimulus(prompts)
        elif type_ == 4:
            result = Problem_Problem_Image_stimulus(prompts)
        elif type_ == 5:
            result = Solution_Problem_Image_stimulus(prompts)
        elif type_ == 6:
            result = Problem_Solution_Image_stimulus(prompts)
        elif type_ == 7:
            result = Solution_Solution_Image_stimulus(prompts)
        elif type_ == 8:
            result = NodePairs_Evaluate(prompts)
        else:
            raise BusinessException(BUSINESS_FAIL, '无效的任务类型')
        return result

    except BusinessException as be:
        raise be
    except Exception as e:
        raise BusinessException(BUSINESS_FAIL, str(e))
