prompt_solution_solution = (
    '我将告诉你1个用户提出的方案描述文本（用<>括起来的），请你为我生成{num}个相关的方案。'
    '每个方案需要满足以下要求：'
    '（1）字数不超过80个字。'
    '（2）不同方案之间尽量有较大的差异性'
    '例如，当设计方案是"一个跑步机"时，可能的设计方案是：智能互联跑步机,折叠式便携跑步机,环保健身跑步机'
    '输出要求：方案之间用#隔开，不要有序号或任何其他的文字,尤其不要出现"1.""方案一"等序号！' 
    # '回答请用英文'
    '设计方案：<{input}>'
)

prompt_problem_solution = (
    '我将告诉你1个设计问题（用<>括起来的），请你为我生成{num}个相关的方案。'
    '每个方案需要满足以下要求：'
    '（1）字数不超过80个字。'
    '（2）不同方案之间尽量有较大的差异性'
    '例如，当设计任务是"设计一个运动辅助产品"时，可能的方案是：跑步机，登山鞋，呼啦圈等。'
    '输出要求：方案之间用#隔开，不要有序号或任何其他的文字,尤其不要出现"1.""方案一"等序号！' 
    # '回答请用英文'
    '设计问题：<{input}>'
)
prompt_product_problem_solution = (
    '我将告诉你1个设计问题（用<>括起来的），请你为我生成{num}个相关的产品。'
    '每个产品需要满足以下要求：'
    '（1）字数不超过10个字。'
    '（2）不同产品之间尽量有较大的差异性'
    '例如，当设计问题是"设计一个运动辅助产品"时，可能的输出是：跑步机(设计一个运动辅助产品)。'
    '输出要求：需要输出产品和设计问题，设计问题用（）包围起来，每组产品和设计问题之间用#隔开，不要有序号或任何其他的文字！'
    # '回答请用英文'
    '设计问题：<{input}>'
)
prompt_image_problem_solution = (
    '我将告诉你{num}个包含产品的文本描述（用<>括起来的,文本之间用#隔开），请你为我生成{num}个相应的用于dall-e-3的prompt。'
    '下面我将说明prompt的生成要求：'
    '（1）这里的prompt主要用于描述一个产品，首先需要识别文本描述中的产品是什么，将产品翻译成英文，作为prompt的一部分。'
    '（2）prompt需要包括对物品外观、材质、形状、结构、光线的描述，细节越多越好。'
    '（3）用英语短句来描述。'
    '（4）使用英文半角,做分隔符分隔提示词，每个提示词不要带引号。'
    '（5）prompt中不能带有-和，单词不能重复。'
    '例如，当文本描述是"跑步机(设计一个运动辅助产品)"时，产品是跑步机，关于跑步机可能的提示词是：treadmill, technical sense, metal material, dark color, touch screen, soft light '
    '输出要求：只需要输出提示词的内容，一组提示词之间用#隔开，不要有其他任何的文本，包括对于提示词的解释内容'
    # '回答请用英文'
    '包含产品的文本描述：<{input}>'
)

prompt_product_solution_solution = (
    '我将告诉你1个方案描述文本（用<>括起来的），请你为我生成{num}个相关的产品。'
    '每个产品需要满足以下要求：'
    '（1）字数不超过10个字。'
    '（2）不同产品之间尽量有较大的差异性'
    '例如，当方案描述文本是"设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质"时，可能的输出是：带有保温功能的咖啡杯(设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质)。'
    '输出要求：需要输出产品和方案描述文本，方案描述文本用（）包围起来，每组产品和方案描述文本之间用#隔开，不要有序号或任何其他的文字！'
    # '回答请用英文'
    '方案描述文本：<{input}>'
)
prompt_image_solution_solution = (
    '我将告诉你1个产品描述文本（用<>括起来的，文本之间用#隔开），请你为我生成{num}个相应的用于dall-e-3的prompt。'
    '下面我将说明prompt的生成要求：'
    '（1）这里的prompt主要用于描述一个产品，首先需要将产品的内容翻译成英文，作为prompt的一部分。'
    '（2）prompt需要包括对物品外观、材质、形状、结构、光线的描述，细节越多越好。'
    '（3）用英语短句来描述。'
    '（4）使用英文半角,做分隔符分隔提示词，每个提示词不要带引号。'
    '（5）prompt中不能带有-和，单词不能重复。'
    '例如，当产品描述文本是"带有保温功能的咖啡杯（设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质）"时，可能的提示词是：Insulated coffee cupStainless,steel interiorSilicone exterior,Thermal feature,Durable design,Modern aesthetic,Functional beverage container,Heat retaining,Sleek style,Kitchenware innovation'
    '输出要求：只需要输出提示词的内容，一组提示词之间用#隔开，不要有其他任何的文本，包括对于提示词的解释内容'
    '提示词应该尽量描述清楚具体的机械设计结构'
    # '回答请用英文'
    '产品描述文本：<{input}>'
)


image_positive_0 = (
    '((({input}))),'
    'realistic,finely detailed,purism,minimalism'
)

image_negative_0 = (
    '(worst quality:1.4),people,man,woman,flame,Cloud,(low quality:1.4),(normal quality:1.5),lowres,((monochrome)),((grayscale)),cropped,text,jpeg,artifacts,signature,watermark,username,sketch,cartoon,drawing,anime,duplicate,blurry,semi-realistic,out of frame,ugly,deformed,weird colors,EasyNegative,flame'
)

image_options_0 = {
    
}
