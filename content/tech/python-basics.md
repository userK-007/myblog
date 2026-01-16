---
title: "Python基础教程"
date: 2026-01-26
draft: false
categories: ["技术"]
tags: ["python", "编程", "基础"]
description: "Python编程语言的基础知识和常用功能"
---

# Python基础教程

Python是一种简单易学、功能强大的编程语言，广泛应用于Web开发、数据分析、人工智能等领域。

## Python的特点

- **简单易学**：语法清晰，代码可读性高
- **功能强大**：拥有丰富的标准库和第三方库
- **跨平台**：可以在Windows、macOS、Linux等操作系统上运行
- **解释执行**：无需编译，直接运行
- **面向对象**：支持面向对象编程范式

## 基本语法

### 变量和数据类型

```python
# 变量赋值
name = "Python"
age = 30
pi = 3.14159
is_great = True

# 数据类型
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>
print(type(pi))    # <class 'float'>
print(type(is_great))  # <class 'bool'>
```

### 列表和字典

```python
# 列表
fruits = ["apple", "banana", "orange"]
print(fruits[0])  # 访问第一个元素
fruits.append("grape")  # 添加元素

# 字典
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print(person["name"])  # 访问字典值
person["job"] = "Engineer"  # 添加键值对
```

### 控制流

```python
# 条件语句
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 循环语句
for fruit in fruits:
    print(fruit)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 函数定义

```python
def greet(name):
    """打招呼函数"""
    return f"Hello, {name}!"

print(greet("World"))

# 带默认参数的函数
def calculate_area(length, width=1):
    """计算面积"""
    return length * width

print(calculate_area(5))  # 使用默认宽度
print(calculate_area(5, 3))  # 自定义宽度
```

## 文件操作

```python
# 写入文件
with open("example.txt", "w") as f:
    f.write("Hello, Python!\n")
    f.write("Welcome to programming.")

# 读取文件
with open("example.txt", "r") as f:
    content = f.read()
    print(content)
```

## 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
except Exception as e:
    print(f"发生错误: {e}")
finally:
    print("操作完成")
```

## 模块和包

```python
# 导入模块
import math
print(math.sqrt(16))  # 计算平方根

# 导入特定函数
from random import randint
print(randint(1, 100))  # 生成随机数

# 导入自定义模块
# 假设存在一个名为utils.py的文件
import utils
utils.some_function()
```

## 面向对象编程

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name}."
    
    def celebrate_birthday(self):
        self.age += 1
        return f"Happy birthday! Now I'm {self.age} years old."

# 创建对象
alice = Person("Alice", 25)
print(alice.greet())
print(alice.celebrate_birthday())
```

## 常用库介绍

### 数据处理
- **NumPy**：用于数值计算和数组操作
- **Pandas**：用于数据处理和分析
- **Matplotlib**：用于数据可视化

### Web开发
- **Flask**：轻量级Web框架
- **Django**：全功能Web框架

### 人工智能
- **TensorFlow**：深度学习框架
- **PyTorch**：深度学习框架
- **Scikit-learn**：机器学习库

## 总结

Python是一种功能强大且易于学习的编程语言，适合各种编程任务。通过掌握这些基础知识，你可以开始编写实用的Python程序，并逐步深入学习更高级的主题。
