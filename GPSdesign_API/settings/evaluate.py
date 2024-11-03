# prompt_pre_evaluate = (
#     '接下来我会给你若干设计问题（problems）和设计方案（solutions）。'
#     '例如，一个设计问题的格式可能如下：'
#     '{{"ProblemID":"My-Problem-1","ProblemName":"problem","ProblemType":"MyDesign_Problem","ProblemData":"咖啡杯的保温性和便携性如何设计？（设计一款咖啡杯）","ProblemLeftID":"null","ProblemRightID":"AI-Problem-3"}}，'
#     '同样的，一个设计方案格式可能如下：'
#     '{{"SolutionID":"AI-Solution-2","SolutionName":"solution","SolutionType":"AIDesign_Solution","SolutionData":"随行保温杯（城市自行车道品尝拿铁）","SolutionLeftID":"AI-Problem-5","SolutionRightID":"null"}}，'
#     '你需要对这些设计问题和设计方案进行处理。'
#     '对设计问题的处理要求如下：'
#     '（1）只保留每个设计问题的"ProblemID"和"ProblemData"；'
#     '（2）去除"ProblemData"中（）包含的内容，没有（）包含的内容则不作处理；'
#     '对设计方案的处理要求如下：'
#     '（1）只保留每个设计方案的"SolutionID"和"SolutionData"；'
#     '（2）去除"ProblemData"中（）包含的内容，没有（）包含的内容则不作处理；'
#     '例如，对于上文给出的设计问题示例，应该输出的结果是{{"ProblemID":"My-Problem-1","ProblemData":"咖啡杯的保温性和便携性如何设计？"}}，'
#     '对于上文给出的设计方案示例，应该输出的结果是{{"SolutionID":"AI-Solution-2","SolutionData":"随行保温杯（城市自行车道品尝拿铁）"}}，'
#     '回答不要有序号或任何其他的文字！'
#     '设计问题：problems={problem_input}'
#     '设计方案：solutions={solution_input}'
# )

prompt_evaluate = (
    '接下来我会给你若干经过处理的设计问题（problems）和设计方案（solutions）。'
    '例如，一个设计问题的格式可能如下：'
    '{{"ProblemID":"My-Problem-1","ProblemData":"咖啡杯的保温性和便携性如何设计？"}}'
    '同样的，一个设计方案格式可能如下：'
    '{{"SolutionID":"AI-Solution-2","SolutionData":"随行保温杯"}}，'
    '你需要在这些设计问题和设计方案当中寻找匹配设计问题和设计方案，这需要根据设计问题的ProblemData和设计方案的SolutionData进行判断。'
    '评估具体标准如下：'
    '（1）设计方案是否解决了设计问题？'
    '（2）设计问题是否与设计方案关联？'
    '满足以上任一标准即可认为设计问题和设计方案是匹配的。请尽可能地找出所有匹配的设计方案和设计问题。'
    '例如，上文给出的设计问题示例和设计方案是匹配的，因为"随行保温杯"这个设计方案解决了"咖啡杯的保温性和便携性如何设计"这个设计问题。'
    '对于每对匹配的设计问题和设计方案，输出格式应该为{{}}包围起来的片段,每个片段包含"ProblemID","SolutionID","IsMatch"，"Reason"四个属性，所有片段之间用英文半角逗号隔开，'
    '例如，假如示例中的问题和方案是匹配的，应该记录为：{{"ProblemID":"My-Problem-1","SolutionID":"AI-Solution-2","IsMatch":"match","Reason":"都涉及保温与便携"}}，不要有序号或任何其他的文字！'
    '其它要求如下：'
    '（1）如果方案和问题是不匹配的，则不做处理。'
    '（2）回答不要有除了输出结果以外的任何说明文字！'
    '（3）如果没有任何匹配的问题和方案，则输出结果为：{{}}。'
    '（4）Reason用于记录判断的依据，尽量描述原因，而不是陈述判断的结果，字数不超过15字。'
    '设计问题：problems={problem_input}'
    '设计方案：solutions={solution_input}'
)
# 不可以用“关联”进行评估，因为图像节点文字有大量复制的部分
# 现在的评估中图像的节点信息干预太多
# 或许可以试试不要在图像节点中包含上个节点的信息，但是这可能会导致生成阶段效果变差
# 增加前一个步骤：去除括号里的信息