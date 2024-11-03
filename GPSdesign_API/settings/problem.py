prompt_solution_problem = (
    '我将告诉你1个用户提出的方案描述文本（用<>括起来的），请你为我生成{num}个相关的问题。'
    '每个问题需要满足以下要求：'
    '（1）字数不超过50个字。'
    '（2）不同问题之间尽量有较大的差异性'
    '例如，当设计方案是一个跑步机时，可能的问题是：用户安全性和舒适度，可调性和多功能性，耐用性和维护等。'
    '输出要求：问题之间用#隔开，不要有序号或任何其他的文字！' 
    '设计方案：<{input}>'
)
# 原来是输入num个设计问题，其它处理数据的地方可能要改
prompt_problem_problem = (
    '我将告诉你1个设计问题（用<>括起来的），请你为我生成{num}个相关的问题。'
    '每个问题需要满足以下要求：'
    '（1）字数不超过50个字。'
    '（2）不同问题之间尽量有较大的差异性'
    '例如，当设计问题是设计一个跑步机时，可能的问题是：用户安全性和舒适度，可调性和多功能性，耐用性和维护等。'
    '输出要求：问题之间用#隔开，不要有序号或任何其他的文字！' 
    # '回答请用英文'
    '设计问题：<{input}>'
)
#难点：需要包含上个节点的内容，这一步在prompt中完成
prompt_scene_problem_problem = (
    '我将告诉你1个设计问题（用<>括起来的），请你为我生成{num}个相关的场景描述。'
    '场景需要满足以下要求：'
    '（1）不超过10个字。'
    '（2）需要是一个具体的地点，场景间有较大的差异性。'
    '例如，当设计问题是<设计一款跑步机>时，可能的输出是：可以在健身房使用跑步机(设计一款跑步机)。'
    '输出要求：需要输出场景内容和设计问题，设计问题用（）包围起来，每组场景内容和设计问题之间用#隔开，不要有序号或任何其他的文字！'
    # '回答请用英文'
    '设计问题：<{input}>'
)
prompt_image_problem_problem = (
    '我将告诉你{num}个包含场景的文本描述（用<>括起来的,文本之间用#隔开），请你为我生成{num}个相应的用于dall-e-3的prompt。'
    '下面我将说明prompt的生成要求：'
    '（1）这里的prompt主要用于描述一个场景，首先需要识别文本描述中的场景是什么，将场景的内容翻译成英文，作为prompt的一部分。'
    '（2）prompt还需要包括对场景中的细节、场景光线、视角的描述，细节越多越好。'
    '（3）用英语短句来描述。'
    '（4）使用英文半角,做分隔符分隔提示词，每个提示词不要带引号。'
    '（5）prompt中不能带有-和，单词不能重复。'
    '例如，当文本描述是"可以在森林中使用自行车(设计一款自行车)"时，场景是森林，关于森林可能的提示词是：forest, grass, trees, moss, sunlight, distant, morning, quietness '
    '输出要求：只需要输出提示词的内容，一组提示词之间用#隔开，不要有其他任何的文本，包括对于提示词的解释内容'
    # '回答请用英文'
    '包含场景的文本描述：<{input}>'
)

prompt_scene_solution_problem = (
    '我将告诉你1个方案描述文本（用<>括起来的），请你为我生成{num}个相关的场景描述。'
    '场景需要满足以下要求：'
    '（1）不超过10个字。'
    '（2）需要是一个具体的地点，场景间有较大的差异性。'
    '例如，当方案描述文本是<设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质>时，可能的输出是：可以在教室使用保温杯(设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质)。'
    '输出要求：需要输出场景内容和方案描述文本，方案描述文本用（）包围起来，每组场景内容和方案描述文本之间用#隔开，不要有序号或任何其他的文字！'
    # '回答请用英文'
    '方案描述文本：<{input}>'
)
prompt_image_solution_problem = (
    '我将告诉你1个包含场景的文本描述（用<>括起来的，文本之间用#隔开），请你为我生成{num}个相应的用于dall-e-3的prompt。'
    '下面我将说明prompt的生成要求：'
    '（1）这里的prompt主要用于描述一个场景，首先需要将场景的内容翻译成英文，作为prompt的一部分。'
    '（2）prompt还需要包括对场景中的细节、场景光线、视角的描述，细节越多越好。'
    '（3）用英语短句来描述。'
    '（4）使用英文半角,做分隔符分隔提示词，每个提示词不要带引号。'
    '（5）prompt中不能带有-和，单词不能重复。'
    '例如，当用户的方案是"可以在教室使用保温杯(设计一款带有保温功能的咖啡杯，内壁采用不锈钢材质，外壁采用硅胶材质)"时，场景是教室，关于教室可能的提示词是：Classroom, desks, chairs, blackboard, chalk, educational posters, globe, window, soft shadows, diverse students, reading, quietness. '
    '输出要求：只需要输出提示词的内容，一组提示词之间用#隔开，不要有其他任何的文本，包括对于提示词的解释内容'
    # '回答请用英文'
    '包含场景的文本描述：<{input}>'
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