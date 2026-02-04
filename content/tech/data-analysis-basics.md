---
title: "数据分析基础知识"
date: 2026-01-26
draft: false
tags: ["数据分析", "数据科学", "统计"]
description: "数据分析的基础知识和常用工具"
---

数据分析是从数据中提取有价值信息的过程，广泛应用于商业决策、科学研究、社会分析等领域。

## 数据分析的步骤

1. **数据收集**：获取原始数据
2. **数据清洗**：处理缺失值、异常值等
3. **数据探索**：了解数据的基本特征
4. **数据建模**：建立分析模型
5. **结果可视化**：展示分析结果
6. **结论总结**：得出有价值的结论

## Python数据分析工具

### NumPy

NumPy是Python中用于科学计算的基础库，提供了强大的多维数组操作功能。

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)

# 数组运算
arr2 = arr * 2
print(arr2)

# 多维数组
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix)

# 数组统计
print(np.mean(arr))  # 平均值
print(np.median(arr))  # 中位数
print(np.std(arr))  # 标准差
```

### Pandas

Pandas是Python中用于数据分析的核心库，提供了DataFrame等数据结构，方便数据处理和分析。

```python
import pandas as pd

# 创建DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 40],
    'city': ['New York', 'London', 'Paris', 'Tokyo'],
    'salary': [50000, 60000, 70000, 80000]
}
df = pd.DataFrame(data)
print(df)

# 查看数据基本信息
print(df.info())
print(df.describe())

# 数据选择
print(df['name'])  # 选择列
print(df.loc[0])  # 选择行
print(df.loc[df['age'] > 30])  # 条件选择

# 数据处理
df['salary'] = df['salary'] * 1.1  # 增加工资
print(df)

# 分组分析
print(df.groupby('city')['salary'].mean())

# 数据导出
df.to_csv('employees.csv', index=False)
```

### Matplotlib

Matplotlib是Python中用于数据可视化的库，可以创建各种类型的图表。

```python
import matplotlib.pyplot as plt

# 简单折线图
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
plt.plot(x, y)
plt.title('简单折线图')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.show()

# 柱状图
categories = ['A', 'B', 'C', 'D']
values = [10, 20, 15, 25]
plt.bar(categories, values)
plt.title('柱状图')
plt.show()

# 散点图
x = np.random.rand(50)
y = np.random.rand(50)
plt.scatter(x, y)
plt.title('散点图')
plt.show()

# 饼图
sizes = [30, 20, 25, 25]
labels = ['A', 'B', 'C', 'D']
plt.pie(sizes, labels=labels, autopct='%1.1f%%')
plt.title('饼图')
plt.show()
```

### Seaborn

Seaborn是基于Matplotlib的高级数据可视化库，提供了更美观的图表样式。

```python
import seaborn as sns

# 设置样式
sns.set(style="whitegrid")

# 加载示例数据
tips = sns.load_dataset("tips")
print(tips.head())

# 箱线图
sns.boxplot(x="day", y="total_bill", data=tips)
plt.title('箱线图')
plt.show()

# 热力图
corr = tips.corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title('热力图')
plt.show()

# 配对图
sns.pairplot(tips, hue="sex")
plt.title('配对图')
plt.show()
```

## 数据清洗

### 处理缺失值

```python
# 检查缺失值
print(df.isnull().sum())

# 删除缺失值
df_clean = df.dropna()

# 填充缺失值
df_filled = df.fillna({'age': 0, 'salary': 0})

# 插值填充
df_interpolated = df.interpolate()
```

### 处理异常值

```python
# 识别异常值（使用IQR方法）
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 过滤异常值
df_no_outliers = df[(df['salary'] >= lower_bound) & (df['salary'] <= upper_bound)]
```

## 数据分析案例

### 销售数据分析

```python
# 假设我们有销售数据
sales_data = pd.DataFrame({
    'date': pd.date_range('2026-01-01', periods=30),
    'sales': np.random.randint(100, 1000, 30),
    'region': np.random.choice(['North', 'South', 'East', 'West'], 30)
})

# 分析每日销售额
plt.figure(figsize=(10, 6))
plt.plot(sales_data['date'], sales_data['sales'])
plt.title('每日销售额')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 分析各地区销售额
region_sales = sales_data.groupby('region')['sales'].sum()
plt.figure(figsize=(8, 6))
region_sales.plot(kind='bar')
plt.title('各地区销售额')
plt.xlabel('地区')
plt.ylabel('销售额')
plt.tight_layout()
plt.show()

# 计算销售额统计信息
print('平均销售额:', sales_data['sales'].mean())
print('最高销售额:', sales_data['sales'].max())
print('最低销售额:', sales_data['sales'].min())
print('销售额标准差:', sales_data['sales'].std())
```

## 高级数据分析

### 时间序列分析

```python
# 时间序列数据
date_rng = pd.date_range('2026-01-01', periods=100, freq='D')
time_series = pd.DataFrame(date_rng, columns=['date'])
time_series['value'] = np.random.randn(100).cumsum() + 100

# 绘制时间序列
plt.figure(figsize=(12, 6))
plt.plot(time_series['date'], time_series['value'])
plt.title('时间序列数据')
plt.xlabel('日期')
plt.ylabel('值')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 移动平均
time_series['MA7'] = time_series['value'].rolling(window=7).mean()
plt.figure(figsize=(12, 6))
plt.plot(time_series['date'], time_series['value'], label='原始数据')
plt.plot(time_series['date'], time_series['MA7'], label='7天移动平均', color='red')
plt.title('时间序列与移动平均')
plt.xlabel('日期')
plt.ylabel('值')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

## 总结

数据分析是一项重要的技能，通过Python的数据分析库，我们可以高效地处理和分析数据，提取有价值的信息。无论是商业决策还是科学研究，数据分析都能帮助我们做出更明智的选择。
