
# array_to_dict 静态方法：将 DesignCreative 实例的列表转换成字典的列表。

# to_dict 方法：将 DesignCreative 实例的属性转换成字典格式。

# DesignCreativeItem 类
# 类变量：定义了不同类型的设计创意项的常量，如抽象文本、具体文本、抽象图像、具体图像等。

# __init__ 方法：构造函数，初始化一个 DesignCreativeItem 实例，设置其类型、文本、图像和组合项。

# to_dict 方法：将 DesignCreativeItem 实例的属性转换成字典格式。
class DesignCreative:
    Problem_Problem_Text = 0
    Solution_Problem_Text = 1
    Problem_Solution_Text = 2
    Solution_Solution_Text = 3
    Problem_Problem_Image = 4
    Solution_Problem_Image = 5
    Problem_Solution_Image = 6
    Solution_Solution_Image = 7

    Sequence = "sequence"
    Direct = "direct"

    def __init__(self, creative_type, display_type):
        self.creative_type = creative_type
        self.display_type = display_type
        self.items = []

    @classmethod
    def from_problem_problem_text(cls, p_p_texts: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Problem_Problem_Text, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.P_P_Text, text=p_p_texts[i]))
            creatives.append(creative)
        return creatives
    @classmethod
    def from_solution_problem_text(cls, s_p_texts: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Solution_Problem_Text, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.S_P_Text, text=s_p_texts[i]))
            creatives.append(creative)
        return creatives

    @classmethod
    def from_problem_solution_text(cls, p_s_texts: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Problem_Solution_Text, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.P_S_Text, text=p_s_texts[i]))
            creatives.append(creative)
        return creatives
    @classmethod
    def from_solution_solution_text(cls, s_s_texts: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Solution_Solution_Text, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.S_S_Text, text=s_s_texts[i]))
            creatives.append(creative)
        return creatives

    @classmethod
    def from_problem_problem_image(cls, scenes:[],p_p_images: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Problem_Problem_Image, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.P_P_Image,text=scenes[i],image=p_p_images[i]))
            creatives.append(creative)
        return creatives

    @classmethod
    def from_solution_problem_image(cls,scenes:[],s_p_images: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Solution_Problem_Image, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.S_P_Image,text=scenes[i],image=s_p_images[i]))
            creatives.append(creative)
        return creatives
    @classmethod
    def from_problem_solution_image(cls, products:[],p_s_images: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Problem_Solution_Image, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.P_S_Image,text=products[i],image=p_s_images[i]))
            creatives.append(creative)
        return creatives

    @classmethod
    def from_solution_solution_image(cls,products:[],s_s_images: []):
        creatives = []
        for i in range(3):
            creative = cls(cls.Solution_Problem_Image, cls.Sequence)
            creative.items.append(DesignCreativeItem(item_type=DesignCreativeItem.S_S_Image,text=products[i],image=s_s_images[i]))
            creatives.append(creative)
        return creatives

    @staticmethod
    def array_to_dict(creatives):
        return [creative.to_dict() for creative in creatives]

    def to_dict(self):
        return {
            'type': self.creative_type,
            'displayType': self.display_type,
            'items': [item.to_dict() for item in self.items],
        }


class DesignCreativeItem:
    P_P_Text = "p_p_Text"
    S_P_Text = "s_p_Text"
    P_S_Text = "p_s_Text"
    S_S_Text = "s_s_Text"
    P_P_Image = "p_p_Image"
    S_P_Image = "s_p_Image"
    P_S_Image = "p_s_Image"
    S_S_Image = "s_s_Image"

    def __init__(self, item_type=None, text=None, image=None, combinations=None):
        self.item_type = item_type
        self.text = text
        self.image = image
        self.combinations = combinations

    def to_dict(self):
        return {
            'type': self.item_type,
            'text': self.text,
            'image': self.image,
            'combinations': [combo.to_dict() for combo in self.combinations] if self.combinations else None,
        }
