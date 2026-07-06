---
title: "LeetCode Hot 100 高频面试题 — 分类记忆手册"
date: '2026-07-06T14:12:04+08:00'
draft: false
tags: ["LeetCode", "算法", "C++", "面试"]
description: "LeetCode Hot 100 高频面试题分类汇总，涵盖链表、数组、动态规划、栈、树等 14 个专题，附 C++ 解法与记忆口诀。"
---

### 链表

[2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

> [!note]+ 原题描述
> 给你两个 **非空** 的链表，表示两个非负的整数。数字按 **逆序** 存储，每个节点存一位数字。将两数相加并以相同形式返回一个表示和的链表。
>
> 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
>
> **示例 1：** `l1 = [2,4,3], l2 = [5,6,4]` → `[7,0,8]`（即 342 + 465 = 807）
>
> **示例 2：** `l1 = [0], l2 = [0]` → `[0]`
>
> **示例 3：** `l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]` → `[8,9,9,9,0,0,0,1]`
>
> **约束：** 链表长度 1～100；节点值 0～9。

**口诀**：**有节点或有进位就继续；先算和，再取个位，进位除十；虚拟头接结果。**
<!-- lc-sync: add-two-numbers -->
```cpp
// AC · cpp · 2026-03-24 · 0 ms · 75.4 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *head = nullptr, *tag = nullptr;
        int carry =0;
        while(l1 || l2) {
            int n1 = l1 ? l1->val : 0;
            int n2 = l2 ? l2->val : 0;
            int sum = n1 + n2 + carry;
            if(head == nullptr) {
                head = tag = new ListNode(sum % 10);
            } else {
                tag->next = new ListNode(sum % 10);
                tag = tag->next;
            }
            carry = sum / 10;
            if(l1) l1 = l1->next;
            if(l2) l2 = l2->next;
        }
        if(carry > 0) {
            tag->next = new ListNode(carry);
        }
        return head;
    }
};
```
[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

> [!note]+ 原题描述
> 给你一个链表的头节点 `head`，删除链表的 **倒数第 `n` 个节点**，并返回删除后的链表头节点。
>
> **示例 1：** `head = [1,2,3,4,5], n = 2` → `[1,2,3,5]`
>
> **示例 2：** `head = [1], n = 1` → `[]`
>
> **示例 3：** `head = [1,2], n = 1` → `[1]`
>
> **约束：** 链表节点数 `sz` 满足 `1 <= sz <= 30`；`0 <= Node.val <= 100`；`1 <= n <= sz`。
>
> **进阶：** 能否一趟扫描完成？

**口诀**：**dummy 防删头，快先走 n 步，快慢同走到尽头，slow.next 即删。**

<!-- lc-sync: remove-nth-node-from-end-of-list -->
```cpp
// AC · cpp · 2026-04-05 · 0 ms · 14.8 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy, *slow = dummy;
        for(int i=0;i<=n;i++) {
            fast = fast->next;
        }
        while(fast) {
            fast=fast->next;
            slow=slow->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```
[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

> [!note]+ 原题描述
> 将两个升序链表 `list1` 和 `list2` 合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
>
> **示例 1：** `list1 = [1,2,4], list2 = [1,3,4]` → `[1,1,2,3,4,4]`
>
> **示例 2：** `list1 = [], list2 = []` → `[]`
>
> **示例 3：** `list1 = [], list2 = [0]` → `[0]`
>
> **约束：** 两链表节点数 `[0, 50]`；`-100 <= Node.val <= 100`；两链表均非递减有序。

**口诀**：**dummy 挂链尾，双针取较小，一方耗尽剩段直接接。**

虚拟头节点，双指针同时遍历，每次接较小值，有一个结束，剩余链表直接挂尾部
<!-- lc-sync: merge-two-sorted-lists -->
```cpp
// AC · cpp · 2026-04-05 · 0 ms · 19.1 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while(list1&&list2) {
            if(list1->val < list2->val) {
                cur->next = list1;
                list1 = list1->next;
            }else {
                cur->next = list2;
                list2 = list2->next;
            }
            cur = cur->next;
        }
        cur->next = list1 ? list1 : list2;
        return dummy.next;
    }
};
```

[23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

> [!note]+ 原题描述
> 给你一个链表数组，每个链表都已按 **升序** 排列。请将所有链表合并到一个升序链表中并返回。
>
> **示例 1：** `lists = [[1,4,5],[1,3,4],[2,6]]` → `[1,1,2,3,4,4,5,6]`
>
> **示例 2：** `lists = []` → `[]`
>
> **示例 3：** `lists = [[]]` → `[]`
>
> **约束：** `0 <= k <= 10^4`；每个链表长度 `[0, 500]`；节点值 `[-10^4, 10^4]`；各链表升序；总节点数不超过 `10^4`。

**口诀**：**K 路归并用小顶堆，或 dummy 两两合并慢慢合。**

用ans空列表和K个升序链表依次两两合并
<!-- lc-sync: merge-k-sorted-lists -->
```cpp
// AC · cpp · 2026-04-05 · 115 ms · 18.3 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
private:
    ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while(a&&b) {
            if(a->val < b->val) {
                cur->next = a;
                a = a->next;
            } else {
                cur->next = b;
                b = b->next;
            }
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return dummy.next;
    }
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        ListNode* ans = nullptr;
        for(int i=0;i<lists.size();i++){
            ans = mergeTwoLists(ans, lists[i]);
        }
        return ans;
    }
};
```
[114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

> [!note]+ 原题描述
> 给定二叉树的根节点 `root`，将其 **原地** 展开为单链表：
>
> - 展开后的链表仍使用 `TreeNode`，其中 `right` 指向下一个节点，`left` 始终为 `null`。
> - 展开后的链表顺序应与二叉树 **前序遍历** 相同。
>
> **示例 1：** `root = [1,2,5,3,4,null,6]` → `[1,null,2,null,3,null,4,null,5,null,6]`
>
> **示例 2：** `root = []` → `[]`
>
> **示例 3：** `root = [0]` → `[0]`
>
> **约束：** 节点数 `[0, 2000]`；`-100 <= Node.val <= 100`。
>
> **进阶：** 能否 `O(1)` 额外空间完成？

**口诀**：**前序右链化，左子最右接右子，左子移到右、左指针置空。**

左子树最右节点（前驱），右子树接到它后面，左子树移到右边，左指针置空
<!-- lc-sync: flatten-binary-tree-to-linked-list -->
```cpp
// AC · cpp · 2026-04-06 · 0 ms · 17.3 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* cur = root;
        while (cur != nullptr) {
            if (cur->left != nullptr) {
                TreeNode* next = cur->left;
                TreeNode* pre = next;
                while (pre->right != nullptr) {
                    pre = pre->right;
                }
                pre->right = cur->right;
                cur->left = nullptr;
                cur->right = next;
            }
            cur = cur->right;
        }
    }
};
```
[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

> [!note]+ 原题描述
> 给定链表头节点 `head`，判断链表中是否有环。
>
> 若链表中存在某个节点，可通过连续跟踪 `next` 指针再次到达，则链表中存在环。内部用 `pos` 表示尾节点 `next` 所连节点的下标（**不传入参数**）。
>
> **示例 1：** `head = [3,2,0,-4], pos = 1` → `true`（尾连第 1 个节点）
>
> **示例 2：** `head = [1,2], pos = 0` → `true`
>
> **示例 3：** `head = [1], pos = -1` → `false`（无环）
>
> **约束：** 节点数 `[0, 10^4]`；`-10^5 <= Node.val <= 10^5`；`pos` 为 `-1` 或合法下标。
>
> **进阶：** 能否 `O(1)` 空间完成？

**口诀**：**快慢双指针同出发，有环必遇快达 null 则无环。**

<!-- lc-sync: linked-list-cycle -->
```cpp
// AC · cpp · 2026-04-05 · 10 ms · 11.8 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head, * fast = head;
        while(fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if(fast == slow) return true;
        }
        return false;
    }
};
```
[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

> [!note]+ 原题描述
> 给定链表头节点 `head`，返回 **环的入口节点**；若无环则返回 `null`。
>
> 若某节点可通过连续跟踪 `next` 再次到达，则存在环。`pos` 表示尾 `next` 所连节点下标（**0-indexed**），无环时为 `-1`（**不传入参数**）。**不得修改**链表。
>
> **示例 1：** `head = [3,2,0,-4], pos = 1` → 入口为下标 1 的节点
>
> **示例 2：** `head = [1,2], pos = 0` → 入口为下标 0 的节点
>
> **示例 3：** `head = [1], pos = -1` → 无环，返回 `null`
>
> **约束：** 节点数 `[0, 10^4]`；`-10^5 <= Node.val <= 10^5`；`pos` 为 `-1` 或合法下标。
>
> **进阶：** 能否 `O(1)` 空间完成？

**口诀**：**快慢先找相遇点，慢回 head 同速走，再遇即环入口。**

当slow和fast相遇时，fast比slow多走了整整k圈，同时比slow多走了一倍（fast一次走两步）
so:  2(a+b) = a + b + k(b + c) -> a = (k-1)(b+c) + c
快慢指针找相遇点，slow回到head，slow和fast同速走，再次相遇就是入口
<!-- lc-sync: linked-list-cycle-ii -->
```cpp
// AC · cpp · 2026-04-06 · 7 ms · 11.2 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head , *fast = head;
        while(fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
            if(fast == slow) {
                //找入口
                slow = head;
                while(slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;
            }
        }
        return nullptr;
    }
};
```
[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

> [!note]+ 原题描述
> 给定两个单链表头节点 `headA`、`headB`，返回两链表 **相交的起始节点**；若不相交则返回 `null`。
>
> 题目保证整个链表结构中 **无环**，且函数返回后链表 **保持原结构**。
>
> **示例 1：** `listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]`，相交于值为 `8` 的节点
>
> **示例 2：** `listA = [1,9,1,2,4], listB = [3,2,4]`，相交于值为 `2` 的节点
>
> **示例 3：** `listA = [2,6,4], listB = [1,5]` → 不相交，返回 `null`
>
> **约束：** `1 <= m, n <= 3 * 10^4`；`1 <= Node.val <= 10^5`。
>
> **进阶：** 能否 `O(m + n)` 时间、`O(1)` 空间？

**口诀**：**A 走完走 B，B 走完走 A，同距同路必交点。**

<!-- lc-sync: intersection-of-two-linked-lists -->
```cpp
// AC · cpp · 2026-03-16 · 63 ms · 28.3 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // ListNode * t1 = headA, *t2 = headB;
        // while( t1 != t2) {
        //     if(t1 == NULL){
        //         t1 = headB;
        //     } else {
        //         t1 = t1->next;
        //     }
        //     if(t2 == NULL) {
        //         t2 = headA;
        //     } else {
        //         t2 = t2->next;
        //     }
        // }
        // return t1;
        unordered_set<ListNode *> visited;
        ListNode *tmp = headA;
        while(tmp != NULL) {
            visited.insert(tmp);
            tmp = tmp->next;
        }
        tmp = headB;
        while(tmp != NULL) {
            if(visited.count(tmp)) {
                return tmp;
            }
            tmp = tmp->next;
        }
        return NULL;
    }
};
```
[148. 排序链表](https://leetcode.cn/problems/sort-list/)

> [!note]+ 原题描述
> 给定链表头节点 `head`，将其按 **升序** 排序后返回。
>
> **示例 1：** `head = [4,2,1,3]` → `[1,2,3,4]`
>
> **示例 2：** `head = [-1,5,3,4,0]` → `[-1,0,3,4,5]`
>
> **示例 3：** `head = []` → `[]`
>
> **约束：** 节点数 `[0, 5 * 10^4]`；`-10^5 <= Node.val <= 10^5`。
>
> **进阶：** 能否 `O(n log n)` 时间、`O(1)` 空间完成？

**口诀**：**归并排序链表版，快慢找中点切半，递归合并两有序段。**

递归：从上往下，大问题变成小问题再合并，每一层递归占用栈空间，空间复杂度: O(log n)
<!-- lc-sync: sort-list -->
```cpp
// AC · cpp · 2026-04-06 · 20 ms · 55.9 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if(head == nullptr || head->next == nullptr) return head; //链表为空或者一个节点时，直接返回头结点
        //遍历计算链表长度，用于后续分割
        int n = 0;
        ListNode* tag = head;
        while(tag) {
            ++n;
            tag = tag->next;
        }
        //根据步长step为{1,2,4,8，...}分割字符串
        ListNode dummy(0);
        dummy.next = head;
        for(int step=1;step<n; step= step*2) {
            ListNode* pre = &dummy;
            ListNode* cur = dummy.next;
            while(cur) {
                ListNode* left = cur;
                ListNode* right = split(left,step);
                cur = split(right,step);
                ListNode* merged = merge(left, right);
                pre->next = merged;
                while(pre->next) pre = pre->next;
            }
        }
        return dummy.next;
    }
private:
    ListNode* split(ListNode* head, int n) {
        while(--n && head) {
            head= head->next;
        }
        if(head == nullptr) return nullptr;
        ListNode* second = head->next;
        head->next = nullptr;
        return second;
    }
    ListNode* merge(ListNode* a , ListNode* b) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while(a && b) {
            if(a->val < b->val) {
                cur->next = a;
                a = a->next;
            }else {
                cur->next = b;
                b = b->next;
            }
            cur = cur->next;
        }
        cur->next = a ? a : b;
        return dummy.next;
    }
};
```
迭代：从下往上合，先分段(step)，然后切割(split)，然后合并(merge)；空间复杂度o(1)
[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

> [!note]+ 原题描述
> 给你单链表的头节点 `head`，反转链表并返回反转后的头节点。
>
> **示例 1：** `head = [1,2,3,4,5]` → `[5,4,3,2,1]`
>
> **示例 2：** `head = [1,2]` → `[2,1]`
>
> **示例 3：** `head = []` → `[]`
>
> **约束：** 节点数 `[0, 5000]`；`-5000 <= Node.val <= 5000`。
>
> **进阶：** 能否分别用迭代和递归实现？

**口诀**：**三针迭代：存 next，cur.next 指 prev，prev 与 cur 同步进。**

递归版本：1 先保存指针 2反转指针 3 prev前进 4 cur前进
<!-- lc-sync: reverse-linked-list -->
```cpp
// AC · cpp · 2026-04-08 · 0 ms · 13.3 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while(cur) {
            ListNode* next = cur->next; //先保存
            cur->next = prev;           //反转指针
            prev = cur;                 //prev前进
            cur = next;                 //cur前进
        }
        return prev;
    }
};
```
[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)

> [!note]+ 原题描述
> 给定单链表头 `head` 和两个整数 `left`、`right`（`left <= right`），反转从第 `left` 到第 `right` 个节点（**1-indexed**），返回反转后的链表。
>
> **示例 1：** `head = [1,2,3,4,5], left = 2, right = 4` → `[1,4,3,2,5]`
> **示例 2：** `head = [5], left = 1, right = 1` → `[5]`
>
> **约束：** 节点数 `[1, 500]`；`-500 <= Node.val <= 500`；`1 <= left <= right <= 节点数`。

**口诀**：**dummy 定界，走到 left 前，头插法逐段反转区间。**
先遍历到left前一个位置，然后用头插发翻转
<!-- lc-sync: reverse-linked-list-ii -->
```cpp
// AC · cpp · 2026-04-08 · 0 ms · 10.9 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* pre = &dummy;
        // 走到left前一个位置
        for(int i=1;i<left;i++) {
            pre = pre->next;
        }
        // 2 当前翻转起点
        ListNode* cur = pre->next;
        // 3开始头插法翻转
        for(int i=0;i<right-left;i++) {
            ListNode* temp = cur->next;
            cur->next = temp->next;
            temp->next = pre->next;
            pre->next = temp;
        }
        return dummy.next;
    }
};
```
[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

> [!note]+ 原题描述
> 给定单链表头 `head`，判断是否为 **回文链表**。
>
> **示例 1：** `head = [1,2,2,1]` → `true`
> **示例 2：** `head = [1,2]` → `false`
>
> **约束：** 节点数 `[1, 10^5]`；`0 <= Node.val <= 9`。
>
> **进阶：** `O(n)` 时间、`O(1)` 空间？

**口诀**：**快慢找中点，反转后半段，逐位比对再还原。**
<!-- lc-sync: palindrome-linked-list -->
```cpp
// AC · cpp · 2026-03-18 · 15 ms · 128.9 MB
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        vector<int> v;
        ListNode* cur = head;
        while(cur) {
            v.push_back(cur->val);
            cur= cur->next;
        }

        int r = v.size() - 1;
        int l =0;
        while(l<r){
            if(v[l] != v[r]) {
                return false;
            }
            l++;r--;
        }
        return true;
    }
};
```
## 数组
[1. 两数之和](https://leetcode.cn/problems/two-sum/)

> [!note]+ 原题描述
> 给定整数数组 `nums` 和目标值 `target`，在数组中找出 **和为目标值** 的两个整数并返回下标。假设每组输入 **恰好一个解**，且 **同一元素不可重复使用**。
>
> **示例 1：** `nums = [2,7,11,15], target = 9` → `[0,1]`
> **示例 2：** `nums = [3,2,4], target = 6` → `[1,2]`
> **示例 3：** `nums = [3,3], target = 6` → `[0,1]`
>
> **约束：** `2 <= nums.length <= 10^4`；`-10^9 <= nums[i], target <= 10^9`。

**口诀**：**一遍哈希：先查 target-当前值，再插入当前值。**
先查找，再插入，一遍哈希表
<!-- lc-sync: two-sum -->
```cpp
// AC · cpp · 2026-04-20 · 3 ms · 14.6 MB
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int>mp;
        for(int i=0;i<nums.size();i++) {
            int need = target - nums[i];
            if(mp.count(need)) {
                return {mp[need], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```
[4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

> [!note]+ 原题描述
> 给定两个 **大小分别为 m 和 n** 的正序数组，找出并返回两数组 **中位数**。整体时间复杂度应为 `O(log(m+n))`。
>
> **示例 1：** `nums1 = [1,3], nums2 = [2]` → `2.0`
> **示例 2：** `nums1 = [1,2], nums2 = [3,4]` → `2.5`
>
> **约束：** `nums1.length == m`，`nums2.length == n`；`1 <= m+n <= 1000`。

**口诀**：**转找第 k 小：比第 k/2 小的半边全扔，k 同步减，直到 k=1。**
我要找第K小，每次比较两个数组第k/2个位置， 谁小，谁前面的元素一定不可能是第k小，全部扔掉， k同步减少，直到k=1

<!-- lc-sync: median-of-two-sorted-arrays -->
```cpp
// AC · cpp · 2026-06-25 · 3 ms · 93 MB
class Solution {
public:
    int getKth(vector<int>& nums1, vector<int>& nums2, int k) {
        int i= 0, j = 0;
        while(true){
            if(i == nums1.size()) return nums2[j+k-1];
            if(j == nums2.size()) return nums1[i+k-1];

            if(k==1) return min(nums1[i], nums2[j]);

            int half = k / 2;
            int ni = min(i + half, (int)nums1.size()) - 1;
            int nj = min(j + half, (int)nums2.size()) - 1;

            if(nums1[ni] <= nums2[nj]) {
                k -= (ni - i + 1);
                i = ni + 1;
            } else {
                k -= (nj - j + 1);
                j =nj + 1;
            }
        }
    }
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size() + nums2.size();
        if(n % 2 == 1) {
            return getKth(nums1, nums2, n / 2 + 1);
        }
        int left = getKth(nums1, nums2, n / 2);
        int right = getKth(nums1, nums2, n / 2 + 1);
        return (left + right) / 2.0;
    }
};
```
[31. 下一个排列](https://leetcode.cn/problems/next-permutation/)

> [!note]+ 原题描述
> 整数数组 `nums` 按 **字典序** 排列，找出 **下一个更大排列**。若不存在则变为最小排列（升序），**原地** 修改。
>
> **示例 1：** `[1,2,3]` → `[1,3,2]`
> **示例 2：** `[3,2,1]` → `[1,2,3]`
> **示例 3：** `[1,1,5]` → `[1,5,1]`
>
> **约束：** `1 <= nums.length <= 100`；`0 <= nums[i] <= 100`。

**口诀**：**右找降序拐点，换稍大数，拐点后升序翻转。**
从右往左找降序，找到转折点，再找比转折点稍大点的数，交换。翻转转折点后的数组

需要将左边的较小数与右边的较大数交换，能够让当前排列变大，同时要让这个较小数尽量靠右，而较大数尽可能小。交换完成后较大数右边的数需要按照升序重新排序。这样可以保证在新排列大于原来排列的情况下，使得变大的幅度尽可能小。
<!-- lc-sync: next-permutation -->
```cpp
// AC · cpp · 2026-06-25 · 0 ms · 15.4 MB
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = nums.size() - 2;
        while(i >= 0 && nums[i] >= nums[i+1]) {
            i--;
        }
        if(i >= 0) {
            int j = nums.size() - 1;
            while(j >= 0 && nums[i] >= nums[j]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```
[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

> [!note]+ 原题描述
> 整数数组 `nums` 按升序排列并 **在某个下标旋转**，给定 `target`，若存在返回下标，否则 `-1`。
>
> **示例 1：** `nums = [4,5,6,7,0,1,2], target = 0` → `4`
> **示例 2：** `nums = [4,5,6,7,0,1,2], target = 3` → `-1`
>
> **约束：** `1 <= nums.length <= 5000`；`-10^4 <= nums[i], target <= 10^4`；元素互异。

**口诀**：**二分：半段有序则在其中查，否则切另一半继续。**
将数组一分为二，其中一定一个有序，另一个可能有序也可能部分有序。
此时，在有序的部分中用二分法查找。无需的部分再次一分为二。循环处理。
<!-- lc-sync: search-in-rotated-sorted-array -->
```cpp
// AC · cpp · 2026-06-25 · 0 ms · 15.1 MB
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while(left <= right) {
            int mid = (left + right) / 2;
            if(nums[mid] == target) return mid;
            if(nums[left] <= nums[mid]) {
                if(nums[left] <= target && target < nums[mid])
                    right = mid - 1;
                else
                    left = mid + 1;
            } else {
                if(nums[mid] < target && target <= nums[right])
                    left = mid + 1;
                else
                    right = mid - 1;
            }
        }
        return -1;
    }
};
```
[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

> [!note]+ 原题描述
> 非递减数组 `nums` 和目标 `target`，找出 `target` **开始和结束位置**；不存在则 `[-1,-1]`。要求 `O(log n)`。
>
> **示例 1：** `nums = [5,7,7,8,8,10], target = 8` → `[3,4]`
> **示例 2：** `nums = [5,7,7,8,8,10], target = 6` → `[-1,-1]`
>
> **约束：** `0 <= nums.length <= 10^5`；`-10^9 <= nums[i], target <= 10^9`；非递减。

**口诀**：**两次二分：找左边界不停向左，找右边界不停向右。**
找到目标不要停，继续往左压，最后留下的就是最左边那个，找到目标不要停，继续往右压，最后留下最右边那个
<!-- lc-sync: find-first-and-last-position-of-element-in-sorted-array -->
```cpp
// AC · cpp · 2026-06-25 · 0 ms · 17.3 MB
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int l =0, r = nums.size() -1;
        int first = -1, second = -1;
        while(l <= r) {
            int mid = (l + r) / 2;
            if(nums[mid] == target) {
                first = mid;
                r = mid - 1; //这里很关键,即使找到了，也要往左边继续搜索，那么一定搜到就是左边界
            }else if(nums[mid] < target) {
                l = mid + 1;
            }else {
                r = mid - 1;
            }
        }
        l = 0, r = nums.size() - 1;
        while(l <= r) {
            int mid = (l + r) / 2;
            if(nums[mid] == target) {
                second = mid;
                l = mid + 1;// 即使找到了,也要往右边继续搜索，那么一定搜到的就是右边界
            }else if (nums[mid] < target) {
                l = mid + 1;
            }else {
                r = mid - 1;
            }
        }
        return {first, second};
    }
};
```
[48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

> [!note]+ 原题描述
> 给定 `n × n` 二维矩阵表示图像，将图像 **顺时针旋转 90 度**，**原地** 修改。
>
> **示例：** `[[1,2,3],[4,5,6],[7,8,9]]` → `[[7,4,1],[8,5,2],[9,6,3]]`
>
> **约束：** `n == matrix.length == matrix[i].length`；`1 <= n <= 20`；`-1000 <= matrix[i][j] <= 1000`。

**口诀**：**先主对角翻转，再每行左右翻转。**
先对角翻转，再左右翻转 注意对角翻转j从i开始，用swap.
<!-- lc-sync: rotate-image -->
```cpp
// AC · cpp · 2026-06-27 · 0 ms · 9.9 MB
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for(int i=0;i<n;i++) {
            for(int j=i;j<n;j++) {
                swap(matrix[i][j] ,matrix[j][i]);
            }
        }
        for(int i=0;i<n;i++) {
            for(int j=0;j < n/2;j++){
                swap(matrix[i][j] ,matrix[i][n-j-1]);
            }
        }
    }
};
```
[56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

> [!note]+ 原题描述
> 以 `[start, end]` 表示区间，合并所有 **重叠区间** 并返回不重叠区间数组。
>
> **示例 1：** `[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`
> **示例 2：** `[[1,4],[4,5]]` → `[[1,5]]`
>
> **约束：** `1 <= intervals.length <= 10^4`；`intervals[i].length == 2`。

**口诀**：**按左端点排序，能合并则扩右端点，否则新开区间。**
先排序，然后依次和res最后一个结果比较，如果左端点大于res最后结果的右端点则直接存入数据，否则这个区间和res最后一个结果重合，对比后存入最大的右端点。
<!-- lc-sync: merge-intervals -->
```cpp
// AC · cpp · 2026-07-03 · 11 ms · 23.4 MB
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if(intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for(auto& interval : intervals) {
            if(res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```
[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

> [!note]+ 原题描述
> 给定字符串 `s`，返回 `s` 中 **最长回文子串**。
>
> **示例 1：** `s = "babad"` → `"bab"` 或 `"aba"`
> **示例 2：** `s = "cbbd"` → `"bb"`
>
> **约束：** `1 <= s.length <= 1000`；仅数字和英文字母。

**口诀**：**每个中心向两边扩，奇偶两种中心都试。**
对字符串中每个元素进行中心扩展法找出以其为中心的最长回文子串。
注意expand函数中while循环中多做了一次++和--,所以返回的时候要各退一步。
<!-- lc-sync: longest-palindromic-substring -->
```cpp
// AC · cpp · 2026-07-02 · 11 ms · 9 MB
class Solution {
public:
    pair<int,int> expend(int l, int r, string& s) {
        while(l >=0 && r < s.length() && s[l] == s[r]){
            l--; r++;
        }
        return {l+1, r-1};
    }
    string longestPalindrome(string s) {
        int left = 0, right = 0;
        for(int i=0;i< s.length() - 1;++i) {
            auto [left1, right1] = expend(i,i,s);
            auto [left2, right2] = expend(i,i+1,s);
            if(right1 - left1 > right - left) {
                left = left1; right = right1;
            }
            if(right2 - left2 > right - left) {
                left = left2; right = right2;
            }
        }
        return s.substr(left, right - left + 1);
    }
};
```
[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

> [!note]+ 原题描述
> 整数数组 `nums`，返回数组 `answer`，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 外其余各元素乘积。不能用除法，`O(n)` 时间且 **除输出外 O(1) 额外空间**。
>
> **示例 1：** `[1,2,3,4]` → `[24,12,8,6]`
> **示例 2：** `[-1,1,0,-3,3]` → `[0,0,9,0,0]`
>
> **约束：** `2 <= nums.length <= 10^5`；`-30 <= nums[i] <= 30`。

**口诀**：**前缀积从左扫，后缀积从右扫，相乘即答案。**
前后缀乘积
<!-- lc-sync: product-of-array-except-self -->
```cpp
// AC · cpp · 2026-04-03 · 0 ms · 41.4 MB
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> prefix(n);
        vector<int> backfix(n);
        vector<int> res(n);
        prefix[0] = nums[0];
        backfix[n-1] = nums[n-1];
        for(int i=1;i<n;i++) {
            prefix[i] = prefix[i-1]*nums[i];
        }
        for(int i=n-1;i>0;i--) {
            backfix[i-1] = backfix[i]*nums[i-1];
        }
        
        res[0] = backfix[1];
        res[n-1] = prefix[n-2];
        for(int i=1;i<n-1;i++) {
            res[i] = prefix[i-1] * backfix[i+1];
        }
        return res;
    }
};
```
[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

> [!note]+ 原题描述
> 每行每列均升序的 `n × m` 矩阵 `matrix` 和目标 `target`，判断 `target` 是否存在。
>
> **示例 1：** `matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5` → `true`
> **示例 2：** 同上，`target = 3` → `false`
>
> **约束：** `m == matrix.length`，`n == matrix[i].length`；`1 <= n,m <= 300`。

**口诀**：**右上角起步：大了向左，小了向下。**
从图的右上角看，同列所有左边的数都小于它，同列所有下面的数都大于它。
右上角，向左：变小向下：变大。
if (当前值 == target) → 找到  
if (当前值 > target) → 向左（减小）  
if (当前值 < target) → 向下（增大）
<!-- lc-sync: search-a-2d-matrix-ii -->
```cpp
// AC · cpp · 2026-06-30 · 62 ms · 18.4 MB
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int x = 0, y = n - 1;
        while(x < m && y >= 0) {
            if(matrix[x][y] == target) return true;
            if(matrix[x][y] > target) {
                y--;
            }else{
                x++;
            }
        }
        return false; 
    }
};
```
[283. 移动零](https://leetcode.cn/problems/move-zeroes/)

> [!note]+ 原题描述
> 整数数组 `nums`，将所有 **0 移到末尾**，保持非零元素 **相对顺序**，**原地** 操作。
>
> **示例 1：** `[0,1,0,3,12]` → `[1,3,12,0,0]`
> **示例 2：** `[0]` → `[0]`
>
> **约束：** `1 <= nums.length <= 10^4`；`-2^31 <= nums[i] <= 2^31-1`。

**口诀**：**k 指向下一个非零位，遇非零就填入 k 并 k++，末尾补零。**
用一个指针k表示：当前“下一个非零元素应该放的位置”，然后从左往右扫描数组。最后填充0。
在遍历过程中 0到k始终是“已经处理好的非零序列”

<!-- lc-sync: move-zeroes -->
```cpp
// AC · cpp · 2026-06-23 · 0 ms · 23.6 MB
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int k =0;
        for(int i=0;i<nums.size();i++) {
            if(nums[i] != 0) {
                nums[k] = nums[i];
                k++;
            }
        }
        for(int i=k;i<nums.size();i++){
            nums[i] = 0;
        }
    }
};
```
[560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

> [!note]+ 原题描述
> 整数数组 `nums` 和整数 `k`，返回 **和为 k 的连续子数组个数**。
>
> **示例 1：** `nums = [1,1,1], k = 2` → `2`
> **示例 2：** `nums = [1,2,3], k = 3` → `2`
>
> **约束：** `1 <= nums.length <= 2×10^4`；`-1000 <= nums[i] <= 1000`；`-10^7 <= k <= 10^7`。

**口诀**：**前缀和 + 哈希：查 cur-k 出现几次，mp[0]=1 表空前缀。**
当前前缀是cur，想找区间和K，等价于找：以前有没有cur-k, 哈希记录前缀和， 出现一次加一次
mp[0]为什么是1呢？ nums=[3],k=3,cur=3,cur-k=0所以0必须提前存在，表示空前缀
<!-- lc-sync: subarray-sum-equals-k -->
```cpp
// AC · cpp · 2026-06-24 · 51 ms · 44.5 MB
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
       int n = nums.size();
       int res = 0, sum = 0;
       unordered_map<int,int> prefix;
       prefix[0]=1;
       for(int i=0;i<n;i++) {
        sum += nums[i];
        if(prefix.count(sum - k))
            res += prefix[sum-k];
        prefix[sum]++;
       }
       return res; 
    }
};
```
## 滑动窗口
[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

> [!note]+ 原题描述
> 给定字符串 `s`，找出 **不含重复字符** 的最长子串长度。
>
> **示例 1：** `s = "abcabcbb"` → `3`（"abc"）
> **示例 2：** `s = "bbbbb"` → `1`
> **示例 3：** `s = "pwwkew"` → `3`（"wke"）
>
> **约束：** `0 <= s.length <= 5×10^4`；由英文字母、数字、符号和空格组成。

**口诀**：**滑窗 + 集合：右扩遇重复则左缩至无重复。**
滑动窗口，用unordered_set去重，遇到已有的元素，持续删除直至无相同元素
<!-- lc-sync: longest-substring-without-repeating-characters -->
```cpp
// AC · cpp · 2026-04-10 · 15 ms · 14.1 MB
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.size();
        int l =0, res =0;
        unordered_set<char> st;
        for(int r=0;r<n;r++) {
            while(st.count(s[r])) {
                st.erase(s[l]);
                l++;
            }
            st.insert(s[r]);
            res = max(res, r-l+1);
        }
        return res;
    }
};
```
[76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)

> [!note]+ 原题描述
> 字符串 `s` 和 `t`，返回 `s` 中涵盖 `t` 所有字符的 **最小子串**；不存在返回 `""`。
>
> **示例 1：** `s = "ADOBECODEBANC", t = "ABC"` → `"BANC"`
> **示例 2：** `s = "a", t = "a"` → `"a"`
>
> **约束：** `m == s.length`，`n == t.length`；`1 <= m,n <= 10^5`。

**口诀**：**右扩凑齐 need，够则左缩取最短，missing 归零即达标。**
右手扩张，左手收缩，每次够用时记录最短子串位置
need + window + missing
right扩张，missing为0时left收缩，收缩过程中更新答案，不满足再继续right
<!-- lc-sync: minimum-window-substring -->
```cpp
// AC · cpp · 2026-06-09 · 0 ms · 11.5 MB
class Solution {
public:
    string minWindow(string s, string t) {
        //need记录需要的字符，window记录当前窗口的字符
        vector<int> need(128,0), window(128,0);
        for(char c : t) need[c]++;
        //初始时缺少的数量等于t的大小
        int missing = t.size(); 
        //bestStart用于后续记录最短子串的起始位置
        int left =0 , bestlen=INT_MAX, bestStart =0;
        //在s中向右扩张
        for(int r =0;r<s.size();r++){
            char c = s[r];
            //需要这个字符，并且窗口中已有的数量不满足需要
            if(need[c] > window[c]) missing--;
            window[c]++;

            //missing为0，说明满足需要，left开始收缩
            while(missing == 0) {
                //收缩过程汇总更新答案
                if(r - left + 1 < bestlen) {
                    bestlen = r - left + 1;
                    bestStart = left;
                }

                char lc = s[left];
                window[lc]--;
                if(window[lc] < need[lc]) missing++;
                left++;
            }
        }
        return bestlen == INT_MAX ? "" : s.substr(bestStart, bestlen);
    }
};
```
[239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

> [!note]+ 原题描述
> 整数数组 `nums` 和整数 `k`，返回每个 **大小为 k 的滑动窗口** 中的最大值。
>
> **示例 1：** `nums = [1,3,-1,-3,5,3,6,7], k = 3` → `[3,3,5,5,6,7]`
> **示例 2：** `nums = [1], k = 1` → `[1]`
>
> **约束：** `1 <= nums.length <= 10^5`；`-10^4 <= nums[i] <= 10^4`；`1 <= k <= nums.length`。

**口诀**：**单调递减双端队列存下标，队首即窗口最大值。**
用堆来保证实时找到窗口中最大值，用pair<int,int>中的位置信息保障窗口大小不变。
C++自编堆的比较法
struct Node {
int score;
}
<!-- lc-sync: sliding-window-maximum -->
```cpp
// AC · cpp · 2026-06-03 · 76 ms · 149.7 MB
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        priority_queue<pair<int,int>> topK;
        for(int i =0;i<k;i++) {
            topK.push({nums[i], i});
        }
        vector<int> res;
        res.push_back(topK.top().first);
        for(int i=k;i<n;i++) {
            topK.push({nums[i], i});
            while(topK.top().second < i-k+1) { //利用pair里面存储的位置信息实现窗口的移动，使得堆中仅包含k个
                topK.pop();
            }
            res.push_back(topK.top().first);
        }
        return res;
    }
};
```
[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

> [!note]+ 原题描述
> 字符串 `s` 和 `p`，返回 `s` 中所有 **p 的异位词** 的起始下标。异位词指字母相同排列不同。
>
> **示例 1：** `s = "cbaebabacd", p = "abc"` → `[0,6]`
> **示例 2：** `s = "abab", p = "ab"` → `[0,1,2]`
>
> **约束：** `1 <= s.length, p.length <= 3×10^4`；仅小写字母。

**口诀**：**定长滑窗比字符频次，相同则记录起点 i+1。**
记录划窗中每种字符的数量，如果字符数量一样就是异位词。 注意for循环中i表示被移除字符的位置，i+1是当前窗口的起始下标，所以是res.push_back(i+1);
<!-- lc-sync: find-all-anagrams-in-a-string -->
```cpp
// AC · cpp · 2026-06-01 · 8 ms · 11.4 MB
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int m = p.length();
        int n = s.length();
        vector<int> res;
        if(m > n) return res;
        vector<int> sCount(26);
        vector<int> pCount(26);
        for(int i=0;i<m;i++) {
            ++sCount[s[i]- 'a'];
            ++pCount[p[i] - 'a'];
        }
        if(sCount == pCount) res.push_back(0);

        for(int i=0;i<n-m;i++){ // i表示被移除字符的位置，i+1是当前窗口的起始下标
            --sCount[s[i] - 'a'];
            ++sCount[s[i + m] - 'a'];
            if(sCount == pCount) res.push_back(i+1);
        }
        return res;
    }
};
```
## 栈

[150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

> [!note]+ 原题描述
> 字符串数组 `tokens` 表示 **逆波兰表达式**，求表达式的值。
>
> **示例 1：** `["2","1","+","3","*"]` → `9`（(2+1)*3）
> **示例 2：** `["4","13","5","/","+"]` → `6`
>
> **约束：** `1 <= tokens.length <= 10^4`；有效逆波兰表达式。

**口诀**：**遇数入栈，遇运算符弹两数算完再入栈。**
遇到数字入栈，遇到操作符，取出栈顶两个数字运算后放回栈
<!-- lc-sync: evaluate-reverse-polish-notation -->
```cpp
// AC · cpp · 2026-04-08 · 0 ms · 16.7 MB
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        int n = tokens.size();
        for (int i = 0; i < n; i++) {
            if (isNum(tokens[i])) {
                st.push(atoi(tokens[i].c_str()));
            } else {
                int num2 = st.top();
                st.pop();
                int num1 = st.top();
                st.pop();
                switch (tokens[i][0]) {
                case '+':
                    st.push(num1 + num2);
                    break;
                case '-':
                    st.push(num1 - num2);
                    break;
                case '*':
                    st.push(num1 * num2);
                    break;
                case '/':
                    st.push(num1 / num2) ;
                    break;
                }
            }
        }
        return st.top();
    }
    bool isNum(string token) {
        return !(token == "+" || token == "-" || token == "*" || token == "/");
    }
};
```
[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

> [!note]+ 原题描述
> 字符串 `s` 只含 `'('`、`')'`、`'{'`、`'}'`、`'['`、`']'`，判断是否为 **有效括号字符串**。
>
> **示例 1：** `s = "()"` → `true`
> **示例 2：** `s = "()[]{}"` → `true`
> **示例 3：** `s = "(]"` → `false`
>
> **约束：** `1 <= s.length <= 10^4`。

**口诀**：**左括号入栈，右括号查栈顶是否配对。**
栈的简单用法。用map<char,char> mp来找对应括号另一半
<!-- lc-sync: valid-parentheses -->
```cpp
// AC · cpp · 2026-06-08 · 0 ms · 8.7 MB
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        st.push(s[0]);
        for(int i =1;i<s.length();i++){
            if(s[i] == '(' || s[i] == '[' || s[i] == '{') {
                st.push(s[i]);
            }else if(!st.empty() && ((s[i] == ')' && st.top() == '(') 
                    || (s[i] == ']' && st.top() == '[') 
                    || (s[i] == '}' && st.top() == '{') )) {
                st.pop();
            }else {
                return false;
            }
        }
        return st.empty();
    }
};
```
[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

> [!note]+ 原题描述
> 只含 `'('` 和 `')'` 的字符串 `s`，返回 **最长有效括号子串** 长度。
>
> **示例 1：** `s = "(()"` → `2`
> **示例 2：** `s = ")()())"` → `4`
>
> **约束：** `0 <= s.length <= 3×10^4`；仅 `'('` 和 `')'`。

**口诀**：**栈存下标，-1 垫底；`(` 入栈，`)` 出栈算长度。**
存下标，-1做左边界，遇到‘('入栈，遇到')'出栈。
空栈： 当前位置变边界
非空：长度=i-st.top()
栈里存最近未匹配位置，成功匹配时用当前位置减去边界得到当前合法长度。
<!-- lc-sync: longest-valid-parentheses -->
```cpp
// AC · cpp · 2026-06-08 · 0 ms · 11.4 MB
class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int res = 0;
        for(int i=0;i<s.size();i++){
            if(s[i]=='('){
                st.push(i);
            }else{
                st.pop();
                if(!st.empty()){
                    res = max(res, i-st.top());
                }else{
                    st.push(i);
                }
            }
        }
        return res;
    }
};
```
[84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/) **


> [!note]+ 原题描述
> 整数数组 `heights`，`heights[i]` 表示第 i 根柱子高度，求 **柱状图中最大矩形面积**。
>
> **示例 1：** `heights = [2,1,5,6,2,3]` → `10`
> **示例 2：** `heights = [2,4]` → `4`
>
> **约束：** `1 <= heights.length <= 10^5`；`0 <= heights[i] <= 10^4`。

**口诀**：**单调递增栈存下标，遇矮柱弹栈算以弹出柱为高的宽度。**
<!-- lc-sync: largest-rectangle-in-histogram -->
```cpp
// AC · cpp · 2026-03-31 · 24 ms · 79.4 MB
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        heights.insert(heights.begin(), 0);//左哨兵
        heights.push_back(0); //右哨兵
        int res = 0;
        for(int i=0;i<heights.size();i++) {
            while(!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int right = i;
                int left = st.top();
                int width = right - left -1;
                res = max(res, h*width);
            }
            st.push(i);
        }
        return res;
    }
};
```
[85. 最大矩形](https://leetcode.cn/problems/maximal-rectangle/)

> [!note]+ 原题描述
> 字符矩阵 `matrix`，`'0'` 和 `'1'`，找出只含 `'1'` 的 **最大矩形面积**。
>
> **示例：** `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]` → `6`
>
> **约束：** `rows == matrix.length`；`cols == matrix[i].length`；`1 <= rows,cols <= 200`。

**口诀**：**逐行当 84 题柱状图，维护高度数组求最大。**
对于每一行都看做是84题中的柱状图即可，然后记录最大矩阵。
<!-- lc-sync: maximal-rectangle -->
```cpp
// AC · cpp · 2026-06-09 · 8 ms · 21.6 MB
class Solution {
public:
    int largestRetangleArea(vector<int> heights) {
        stack<int> st;
        heights.insert(heights.begin(), 0);
        heights.push_back(0);
        int res = 0;
        for(int i=0;i<heights.size(); i++) {
            while(!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int left = st.top();
                int right = i;
                res = max(res, h*(right - left - 1));
            }
            st.push(i);
        }
        return res;
    }

    int maximalRectangle(vector<vector<char>>& matrix) {
        if(matrix.empty()) return 0;
        int n = matrix[0].size();
        vector<int> height(n,0);
        int res = 0;
        for(auto& row : matrix) {
            for(int j=0;j<n;j++) {
                if(row[j] == '1')
                    height[j] += 1;
                else
                    height[j] =0;
            }
            res = max(res, largestRetangleArea(height));
        }
        return res;
    }
};
```
[155. 最小栈](https://leetcode.cn/problems/min-stack/)

> [!note]+ 原题描述
> 设计栈，支持 `push`、`pop`、`top`，并在 **常数时间** 内返回 **最小元素**。
>
> **约束：** `-2^31 <= val <= 2^31-1`；`pop`、`top`、`getMin` 在 **非空栈** 上调用；最多 `3×10^4` 次调用。

**口诀**：**数据栈 + 辅助最小栈，同步压入同步弹出。**
用一个“辅助栈”专门记录最小值的历史。
<!-- lc-sync: min-stack -->
```cpp
// AC · cpp · 2026-04-03 · 19 ms · 24.1 MB
class MinStack {
    stack<int> st;
    stack<int> min_st;
public:
    MinStack() {
        min_st.push(INT_MAX);
    }
    
    void push(int val) {
        st.push(val);
        min_st.push(min(min_st.top(), val));
    }
    
    void pop() {
        st.pop();
        min_st.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return min_st.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```
[394. 字符串解码](https://leetcode.cn/problems/decode-string/)

> [!note]+ 原题描述
> 编码规则：`k[encoded_string]` 表示 `encoded_string` 重复 `k` 次。给定编码字符串，返回解码结果。
>
> **示例 1：** `s = "3[a]2[bc]"` → `"aaabcbc"`
> **示例 2：** `s = "3[a2[c]]"` → `"accaccacc"`
>
> **约束：** `1 <= s.length <= 30`；`s` 由数字、小写字母和 `[]` 组成；`1 <= k <= 300`。

**口诀**：**遇 `[` 压栈存 res 和 k，遇 `]` 弹栈重复拼接。**
数字：更新k；字母：加入res;
[：压栈（res,k）清空（res, k）
] : 弹栈  保存当前res  清空res  重复k次  拼接上一层
<!-- lc-sync: decode-string -->
```cpp
// AC · cpp · 2026-06-13 · 0 ms · 9.2 MB
class Solution {
public:
    string decodeString(string s) {
        stack<pair<string, int>> st;
        int k = 0;
        string res = "";
        for(char c : s) {
            if(isdigit(c)) {
                k = k*10 + (c-'0');
            }else if(isalpha(c)){
                res += c;
            }else if( c == '[') {
                st.push({res,k});
                res = "";
                k = 0; 
            }else {
                auto top = st.top();
                st.pop();
                int curk = top.second;
                string repeat = "";
                for(int i=0;i<curk;i++) {
                    repeat += res;
                }
                res = top.first + repeat;
            }
        }
        return res;
    }
};
```
[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

> [!note]+ 原题描述
> 整数数组 `temperatures`，`answer[i]` 为第 i 天后 **要等多少天** 才能遇到更高温度；没有则 `0`。
>
> **示例 1：** `[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`
> **示例 2：** `[30,40,50,60]` → `[1,1,1,0]`
>
> **约束：** `1 <= temperatures.length <= 10^5`；`30 <= temperatures[i] <= 100`。

**口诀**：**单调递减栈存下标，来更高温则弹栈填等待天数。**
每来一个温度都在“结算之前所有比它小的等待时间”
1 栈存下标 2 栈保持递减 3 res需要提前初始化。
<!-- lc-sync: daily-temperatures -->
```cpp
// AC · cpp · 2026-06-13 · 27 ms · 104.9 MB
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        stack<int> st;
        vector<int> res(n,0);
        for(int i=0;i<n;i++) {
            while(!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int j = st.top();
                st.pop();
                res[j] = i -j;
            }
            st.push(i);
        }
        return res;
    }
};
```
## 动态规划

[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

> [!note]+ 原题描述
> 整数数组 `coins`（不同硬币面额）和总金额 `amount`，计算凑成总金额所需的 **最少硬币数**；无法凑成返回 `-1`。每种面额硬币无限个。
>
> **示例 1：** `coins = [1,2,5], amount = 11` → `3`（11=5+5+1）
> **示例 2：** `coins = [2], amount = 3` → `-1`
>
> **约束：** `1 <= coins.length <= 12`；`1 <= coins[i] <= 2^31-1`；`0 <= amount <= 10^4`。

**口诀**：**完全背包最值：dp[i]=min(dp[i], dp[i-coin]+1)。**
最值问题
对于每个金额 i，都去尝试最后放的硬币是谁，从所有硬币里面找(但是硬币金额肯定要小于i)，假设当前在求dp[i],如果用coin，则必须先凑出来i-coin，所以dp[i]=min(dp[i], dp[i-coin] + 1)

<!-- lc-sync: coin-change -->
```cpp
// AC · cpp · 2026-04-22 · 23 ms · 17.7 MB
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // dp[i]表示凑成金额 i 所需的最少硬币数
        // 如果使用coin,必须先凑出i-coin, dp[i] = min(dp[i],dp[i-coin]+1)
        // i < coin时表示，你想要凑i元，但是却用coin元来凑，显然无法凑出
        vector<int> dp(amount+1, amount+1);
        dp[0] = 0;
        for(int i=1;i<= amount;i++) {
            for(auto coin : coins) {
                if(i >= coin) {
                    dp[i] = min(dp[i], dp[i-coin] + 1);
                }
            }
        }
        return dp[amount] == amount+1 ? -1 : dp[amount];
    }
};
```
[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)

> [!note]+ 原题描述
> 给定正整数 `n`，返回和为 `n` 的 **完全平方数的最少数量**。
>
> **示例 1：** `n = 12` → `3`（4+4+4）
> **示例 2：** `n = 13` → `2`（4+9）
>
> **约束：** `1 <= n <= 10^4`。

**口诀**：**同 322：枚举平方数 coin，dp[i] 取最小。**
和322很像
<!-- lc-sync: perfect-squares -->
```cpp
// AC · cpp · 2026-04-22 · 51 ms · 13 MB
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n+1, 10001);
        dp[0]=0;
        for(int i=1;i <= n;i++) {
            for(int j = 1; j * j <= i; j++) {
                dp[i] = min(dp[i], dp[i - j*j] + 1);
            }
        }
        return dp[n] == 10001 ?  0 : dp[n];
    }
};
```
[139. 单词拆分](https://leetcode.cn/problems/word-break/)

> [!note]+ 原题描述
> 字符串 `s` 和字典 `wordDict`，判断 `s` 能否拆分为字典中单词的连接（单词可重复使用）。
>
> **示例 1：** `s = "leetcode", wordDict = ["leet","code"]` → `true`
> **示例 2：** `s = "applepenapple", wordDict = ["apple","pen"]` → `true`
>
> **约束：** `1 <= s.length <= 300`；`1 <= wordDict.length <= 1000`。

**口诀**：**dp[i]：前 i 字符能否拆分；枚举 j 看 dp[j] 且 s[j:i] 在字典。**
dp[i]:前i个字符能否拆分；枚举j: 看dp[j] && s[j:i]是否存在字典
<!-- lc-sync: word-break -->
```cpp
// AC · cpp · 2026-04-10 · 11 ms · 15.7 MB
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        //状态定义 dp[i] = 前i个字符s[0...i-1]是否拆分
        //状态转移：dp[j]==true&& s[j:i]在字典中 那么dp[i] = true
        //dp[i] = dp[j] && (s[j:i]在字典中)
        //dp[0]=true;
        unordered_set<string> dict(wordDict.begin(),wordDict.end());
        vector<bool> dp(s.size()+1,false);
        dp[0]= true;
        for(int i=1;i<=s.size();i++) {
            for(int j=0;j<i;j++){
                if(dp[j] && dict.count(s.substr(j,i-j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.size()];
    }
};
```
[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/)

> [!note]+ 原题描述
> 实现正则匹配：`.` 匹配任意单字符，`*` 匹配零个或多个 **前一个元素**。给定 `s` 和 `p`，判断能否完全匹配。
>
> **示例 1：** `s = "aa", p = "a"` → `false`
> **示例 2：** `s = "aa", p = "a*"` → `true`
>
> **约束：** `1 <= s.length <= 20`；`1 <= p.length <= 20`；`s` 仅小写字母，`p` 含 `.` 和 `*`。

**口诀**：**dp[i][j]：s 前 i 与 p 前 j 能否匹配；`*` 分零次或多次。**
<!-- lc-sync: regular-expression-matching -->
```cpp
// AC · cpp · 2026-04-06 · 3 ms · 9 MB
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        
        //dp[i][j]：s前i个字符和p前j个字符是否匹配
        vector<vector<bool>> dp(m+1,vector<bool>(n+1, false));

        // 空串匹配空模式
        dp[0][0] = true;

        //初始化：处理p能匹配空串的情况，比如a*,a*b*,a*b*c*
        for(int j=2;j<=n;j++) {
            if(p[j-1] == '*') {
                dp[0][j] = dp[0][j-2];
            }
        }

        //开始dp
        for(int i=1;i<=m;i++) {
            for(int j=1;j<=n;j++){
                if(p[j-1] == s[i-1] || p[j-1] == '.') {
                    dp[i][j] = dp[i-1][j-1];
                }
                //情况2，遇到‘*’
                else if(p[j-1] == '*') {
                    //先考虑匹配0次（忽略x*）
                    dp[i][j] = dp[i][j-2];

                    //再考虑匹配 >=1次
                    //前提：s[i-1]能匹配p[j-2]
                    if(p[j-2] == s[i-1] || p[j-2] == '.') {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                }
            }
        }
        return dp[m][n];
    }
};
```
[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

> [!note]+ 原题描述
> 整数数组 `nums`，找 **和最大** 的连续子数组，返回其和。
>
> **示例 1：** `nums = [-2,1,-3,4,-1,2,1,-5,4]` → `6`（[4,-1,2,1]）
> **示例 2：** `nums = [1]` → `1`
>
> **约束：** `1 <= nums.length <= 10^5`；`-10^4 <= nums[i] <= 10^4`。

**口诀**：**当前前缀和减历史最小前缀和，或 cur=max(n,cur+n)。**
当前前缀和 - 历史最小前缀和
<!-- lc-sync: maximum-subarray -->
```cpp
// AC · cpp · 2026-06-25 · 0 ms · 70.2 MB
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int n = nums.size();
        int ans = INT_MIN;
        int min_pre_sum = 0;
        int pre_sum = 0;
        for(auto x: nums) {
            pre_sum += x;
            ans = max(ans, pre_sum - min_pre_sum);
            min_pre_sum = min(min_pre_sum, pre_sum);
        }
        return ans;
    }
};
```
[62. 不同路径](https://leetcode.cn/problems/unique-paths/)

> [!note]+ 原题描述
> 机器人位于 `m×n` 网格左上角，每次只能 **向右或向下** 移动，到达右下角有多少 **不同路径**？
>
> **示例 1：** `m = 3, n = 7` → `28`
> **示例 2：** `m = 3, n = 2` → `3`
>
> **约束：** `1 <= m,n <= 100`。

**口诀**：**dp[i][j]=dp[i-1][j]+dp[i][j-1]，首行首列均为 1。**
dp ij 表示从起点0，0走到i,j的不同路径数量
<!-- lc-sync: unique-paths -->
```cpp
// AC · cpp · 2026-07-03 · 3 ms · 9.4 MB
class Solution {
public:
    int uniquePaths(int m, int n) {
        // 到达当前路径等于前面和上面的路径总和+1
        vector<vector<int>> dp(m, vector<int>(n,0));
        dp[0][0] = 1;
        for(int i=0;i<m;i++) dp[i][0] = 1;
        for(int j=0;j<n;j++) dp[0][j] = 1;
        for(int i=1;i<m;i++) {
            for(int j=1;j<n;j++){
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
};
```
[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

> [!note]+ 原题描述
> `m×n` 网格 `grid` 填非负整数，从左上到右下每次只能 **向下或向右**，求 **最小路径和**。
>
> **示例 1：** `grid = [[1,3,1],[1,5,1],[4,2,1]]` → `7`
> **示例 2：** `grid = [[1,2,3],[4,5,6]]` → `12`
>
> **约束：** `m == grid.length`，`n == grid[i].length`；`1 <= m,n <= 200`。

**口诀**：**dp[i][j]=grid[i][j]+min(上,左)，首行首列累加初始化。**
每一步只能由上面或者前面一步过度，则状态转移就是前面位置较小值+grid ij;
dp ij 表示从出发点走到当前位置需要的最少的代价。
<!-- lc-sync: minimum-path-sum -->
```cpp
// AC · cpp · 2026-07-03 · 0 ms · 16 MB
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n,0));
        dp[0][0] = grid[0][0];
        for(int i=1;i<n;i++) dp[0][i] = grid[0][i] + dp[0][i-1];
        for(int j = 1; j<m;j++) dp[j][0] = grid[j][0] + dp[j-1][0];
        for(int i=1;i<m;i++) {
            for(int j=1;j<n;j++){
                dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }
        return dp[m-1][n-1];
    }
};
```
[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

> [!note]+ 原题描述
> 爬 `n` 阶楼梯，每次可爬 1 或 2 阶，有多少 **不同方法**？
>
> **示例 1：** `n = 2` → `2`（1+1 或 2）
> **示例 2：** `n = 3` → `3`
>
> **约束：** `1 <= n <= 45`。

**口诀**：**dp[i]=dp[i-1]+dp[i-2]，可压成 O(1) 两变量。**
dp[i] = dp[i-1] + dp[i-2];  因为当前状态只和前面两位有关系，可以优化为o(1)空间
<!-- lc-sync: climbing-stairs -->
```cpp
// AC · cpp · 2026-04-20 · 0 ms · 7.9 MB
class Solution {
public:
    // int climbStairs(int n) {
    //     if(n <= 2) return n;
    //     vector<int> dp(n+1);
    //     dp[1] =1;
    //     dp[2]=2;
    //     for(int i=3;i<=n;i++){
    //         dp[i] = dp[i-1] + dp[i-2];
    //     }
    //     return dp[n];
    // }

    int climbStairs(int n) {
        if(n <=2) return n;
        int cur2 = 1;
        int cur1 = 2;
        int cur;
        for(int i=3;i<=n;i++){
            cur =  cur1 + cur2;
            cur2 = cur1;
            cur1 = cur;
        }
        return cur;
    }
};
```
[72. 编辑距离](https://leetcode.cn/problems/edit-distance/)

> [!note]+ 原题描述
> 单词 `word1` 和 `word2`，返回将 `word1` 转换成 `word2` 的 **最少单步操作数**（插入、删除、替换）。
>
> **示例 1：** `word1 = "horse", word2 = "ros"` → `3`
> **示例 2：** `word1 = "intention", word2 = "execution"` → `5`
>
> **约束：** `0 <= word1.length, word2.length <= 500`；小写英文字母。

**口诀**：**dp[i][j]：两前缀最小编辑距；不等则增删改取 min+1。**
本质可以理解为：两个序列的最小修改成本，比较两个字符串所有前缀
dp ij 表示word1前i个字符->word2前j个字符的最少操作数。
如果word1 i-1 != word2j-1那么可以推得 要么word1插入，要么删除，要么替换操作可以使得word1前i个字符->word2前j个字符的操作数最少。
<!-- lc-sync: edit-distance -->
```cpp
// AC · cpp · 2026-07-02 · 15 ms · 12.8 MB
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n =word2.size();
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        for(int i=0;i<=m;i++) dp[i][0] =i;
        for(int j=0;j<=n;j++) dp[0][j] = j;
        for(int i=1;i<=m;i++){
            for(int j=1;j<=n;j++){
                if(word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                }else{
                    dp[i][j] = 1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
                }
            }
        }
        return dp[m][n];
    }
};
```
[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

> [!note]+ 原题描述
> 数组 `prices`，`prices[i]` 为第 i 天股价，最多 **一笔交易**（买一次卖一次），求 **最大利润**；无法盈利返回 0。
>
> **示例 1：** `[7,1,5,3,6,4]` → `5`（1 买 6 卖）
> **示例 2：** `[7,6,4,3,1]` → `0`
>
> **约束：** `1 <= prices.length <= 10^5`；`0 <= prices[i] <= 10^4`。

**口诀**：**维护历史最低价，当天卖价减最低即当日最大利润。**
记录之前最小值，然后依次和当下值取差值
<!-- lc-sync: best-time-to-buy-and-sell-stock -->
```cpp
// AC · cpp · 2026-06-28 · 0 ms · 95.1 MB
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minp = prices[0];
        int res = 0;
        for(auto x : prices) {
            if(x < minp) minp = x;
            else res = max(res, x - minp);
        }
        return res;
    }
};
```
[152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)

> [!note]+ 原题描述
> 整数数组 `nums`，找 **乘积最大** 的非空连续子数组，返回乘积。
>
> **示例 1：** `nums = [2,3,-2,4]` → `6`
> **示例 2：** `nums = [-2,0,-1]` → `0`
>
> **约束：** `1 <= nums.length <= 2×10^4`；`-10 <= nums[i] <= 10`。

**口诀**：**同时维护最大积和最小积，负负得正要留最小。**
注意负数*负数为正数，应该记录前面最小的连续非空子数组
<!-- lc-sync: maximum-product-subarray -->
```cpp
// AC · cpp · 2026-04-04 · 4 ms · 17.5 MB
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        //考虑到负数，应该同时记录当前位置最大连续非空子数组和最小连续非空子数组
        int maxf = nums[0], minf = nums[0],res = nums[0];
        for(int i=1;i<nums.size();i++){
            int tempmax = maxf;
            int tempmin = minf;
            maxf = max({nums[i], nums[i]*tempmax, nums[i]*tempmin});
            minf = min({nums[i], nums[i]*tempmax, nums[i]*tempmin});
            res = max(res, maxf);
        }
        return res;
    }
};
```
[198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

> [!note]+ 原题描述
> 非负整数数组表示每屋金额，**相邻房屋不能同时偷**，求 **最高金额**。
>
> **示例 1：** `nums = [1,2,3,1]` → `4`（1+3）
> **示例 2：** `nums = [2,7,9,3,1]` → `12`（2+9+1）
>
> **约束：** `1 <= nums.length <= 100`；`0 <= nums[i] <= 400`。

**口诀**：**dp[i]=max(dp[i-1], dp[i-2]+nums[i])，可压成两变量。**
<!-- lc-sync: house-robber -->
```cpp
// AC · cpp · 2026-04-02 · 0 ms · 10.6 MB
class Solution {
public:
    int rob(vector<int>& nums) {
        //当前max金额 = max{偷当前pos金额 + 不偷当前pos -1 ， 不偷当前pos + 偷当前pos-1}
        //dp[i] = max(dp[i-2] + nums[i], dp[i-1])
        //边界条件： 1 dp[0] == nums[0] 2 dp[1]=max(nums[0],nums[1])
        int n = nums.size();
        if(n == 0) return 0;
        if(n==1) return nums[0];
        vector<int> dp(n,0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        for(int i=2;i<n;i++) {
            dp[i] = max(nums[i] + dp[i-2], dp[i-1]);
        }
        return dp[n-1];
    }
};
```
[221. 最大正方形](https://leetcode.cn/problems/maximal-square/)

> [!note]+ 原题描述
> 由 `'0'` 和 `'1'` 组成的 `m×n` 矩阵，找到只含 `'1'` 的 **最大正方形** 面积。
>
> **示例 1：** `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]` → `4`
>
> **约束：** `m == matrix.length`，`n == matrix[i].length`；`1 <= m,n <= 300`。

**口诀**：**dp[i][j]=1+min(左上,上,左) 当为 1，更新最大边长平方。**
<!-- lc-sync: maximal-square -->
```cpp
// AC · cpp · 2026-03-30 · 3 ms · 30.3 MB
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int row = matrix.size(), col = matrix[0].size(), res = 0;
        vector<vector<int>> dp(row,vector<int>(col));

        for(int i=0;i<row;i++) {
            for(int j=0;j<col;j++) {
                if(matrix[i][j] == '0') {
                    dp[i][j] = 0;
                }
                if(matrix[i][j] == '1') {
                    if(i == 0 || j == 0) {
                        dp[i][j] = 1;
                    }else {
                        dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                        
                    }
                }
                res = max(res, dp[i][j]);
            }
        }
        return res*res;
    }
};
```
[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)

> [!note]+ 原题描述
> 整数数组 `nums`，返回 **最长严格递增子序列** 的长度。
>
> **示例 1：** `nums = [10,9,2,5,3,7,101,18]` → `4`（[2,3,7,101]）
> **示例 2：** `nums = [0,1,0,3,2,3]` → `4`
>
> **约束：** `1 <= nums.length <= 2500`；`-10^4 <= nums[i] <= 10^4`。

**口诀**：**dp[i]=max(dp[j]+1) 且 nums[j]<nums[i]；或 patience 二分 O(nlogn)。**
dp[i]表示以nums[i]结尾的最长递增子序列长度
dp[i] = max(dp[j] + 1) (j < i && nums[j] < nums[i])
 <!-- lc-sync: longest-increasing-subsequence -->
```cpp
// AC · cpp · 2026-06-30 · 83 ms · 14 MB
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if(n == 0) return 0;
        vector<int> dp(n,0);
        for(int i=0;i<n;i++) {
            dp[i] = 1;
            for(int j=0;j<i;j++){
                if(nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
        }
        return *max_element(dp.begin(), dp.end());
    }
};
```
[309. 买卖股票的最佳时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

> [!note]+ 原题描述
> 数组 `prices`，无限次交易，但卖出后 **第二天冷冻期不能买入**，求最大利润。
>
> **示例：** `prices = [1,2,3,0,2]` → `3`
>
> **约束：** `1 <= prices.length <= 5000`；`0 <= prices[i] <= 1000`。

**口诀**：**三态 DP：持有/冷冻/空闲；或 dp0 无股 dp1 有股含冷冻约束。**
每次都有3种操作，持股，卖掉，冷冻。 每次的状态都只和前一天的状态相关，因此可以优化空间
<!-- lc-sync: best-time-to-buy-and-sell-stock-with-cooldown -->
```cpp
// AC · cpp · 2026-06-30 · 0 ms · 15.6 MB
class Solution {
public:
    // int maxProfit(vector<int>& prices) {
    //     int hold = -prices[0];
    //     int sold = INT_MIN;
    //     int rest = 0;
    //     for(int i=1;i<prices.size();i++){
    //         int preHold = hold;
    //         int preSold = sold;
    //         int preRest = rest;
    //         hold = max(preHold, preRest - prices[i]);
    //         sold = preHold + prices[i];
    //         rest = max(preRest, preSold);
    //     }
    //     return max(sold, rest);
    // }
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if(n == 1) return 0;
        vector<vector<int>> dp(n,vector<int>(2,0));
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        dp[1][0] = max(dp[0][0],dp[0][1]+prices[1]);
        dp[1][1] = max(dp[0][1],  -prices[1]);
        for(int i=2;i<n;i++){
            dp[i][0] = max(dp[i-1][0], dp[i-1][1]+prices[i]);
            dp[i][1] = max(dp[i-1][1], dp[i-2][0]-prices[i]);
        }
        return dp[n-1][0];
    }
};
```
要么只定义两个状态，dpi0  和dpi1 分别表示第i天结束时手里有没有股票。注意的是如果第i天手里有股票，则必须是要么前一天就已经持有股票，要么前2天卖掉，今天买入（因为有冷静期）
[312. 戳气球](https://leetcode.cn/problems/burst-balloons/)

> [!note]+ 原题描述
> 数组 `nums` 表示气球，戳破 `nums[i]` 得 `nums[i-1]*nums[i]*nums[i+1]` 硬币（边界视为 1），求 **最多硬币数**。
>
> **示例 1：** `nums = [3,1,5,8]` → `167`
> **示例 2：** `nums = [1,5]` → `10`
>
> **约束：** `n == nums.length`；`1 <= n <= 300`；`0 <= nums[i] <= 100`。

**口诀**：**区间 DP：枚举最后戳的气球 k，左右乘积加子区间。**
区间dp,遇到直接开喷面试官
<!-- lc-sync: burst-balloons -->
```cpp
// AC · cpp · 2026-06-30 · 103 ms · 13.7 MB
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> val(n+2,1);
        for(int i=0;i<n;i++){
            val[i+1]= nums[i];
        }
        //dp[i][j]:戳完开区间(i,j)内所有气球的最大收益
        vector<vector<int>> dp(n+2,vector<int>(n+2,0));
        
        //区间长度
        for(int len = 2; len <= n+1; len++) {
            //左端点
            for(int l=0;l+len <= n+1;l++) {
                int r = l + len;
                //枚举最后戳哪个
                for(int k=l+1;k<r;k++) {
                    dp[l][r] = max(dp[l][r],dp[l][k] + dp[k][r] + val[l]*val[k]*val[r]);
                }
            }
        }
        return dp[0][n+1];
    }
};
```
[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

> [!note]+ 原题描述
> 非负整数数组 `nums`，能否将数组 **分割** 成两个子集，使两子集 **元素和相等**？
>
> **示例 1：** `nums = [1,5,11,5]` → `true`（[1,5,5] 与 [11]）
> **示例 2：** `nums = [1,2,3,5]` → `false`
>
> **约束：** `1 <= nums.length <= 200`；`1 <= nums[i] <= 100`。

**口诀**：**和为 sum/2 的 01 背包，dp[j] 倒序枚举能否凑 j。**
转换成01背包问题，然后dp[j]表示是否能够组成和j。因为数字不允许重复使用，所以要从大到小遍历

<!-- lc-sync: partition-equal-subset-sum -->
```cpp
// AC · cpp · 2026-06-29 · 99 ms · 13.2 MB
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();
        int sum = 0;
        if(n==1) return false;
        for(auto x: nums) sum += x;
        if(sum % 2 == 1) return false;
        int target = sum/2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for(int i=0;i<n;i++) {
            for(int j = target; j >= nums[i]; j--) {
                dp[j] = dp[j] || dp[j-nums[i]];
            }
        }
    return dp[target];
    }
};
```
[494. 目标和](https://leetcode.cn/problems/target-sum/)

> [!note]+ 原题描述
> 非负整数数组 `nums` 和目标 `target`，每个数前加 `+` 或 `-`，返回 **不同表达式** 等于 target 的方案数。
>
> **示例 1：** `nums = [1,1,1,1,1], target = 3` → `5`
> **示例 2：** `nums = [1], target = 1` → `1`
>
> **约束：** `1 <= nums.length <= 20`；`0 <= nums[i] <= 1000`；`0 <= sum(nums[i]) <= 1000`；`-1000 <= target <= 1000`。

**口诀**：**化 P-N=target → 找子集和 (sum+target)/2，dp 计数。**
加好集合P，减号集合N，
P+N=sum; P-N=target
-> 2P=sum+target
dp[j] = dp[j-num] 凑出j的方法数=原来凑出j的方法+所有先凑出J-num，再放当前数字的方法
<!-- lc-sync: target-sum -->
```cpp
// AC · cpp · 2026-06-18 · 0 ms · 12.2 MB
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = 0;
        for(int x : nums) sum += x;
        // 无解情况
        if(abs(target) > sum) return 0;
        // 如果是奇数不符合2P = (target + sum)  
        if((sum + target) % 2) return 0;

        int bag = (target + sum) / 2;
        vector<int> dp(bag + 1, 0);
        dp[0] = 1;
        for(int num : nums) {
            for(int j= bag; j>= num; j--) {
                dp[j] = dp[j] + dp[j - num];
            }
        }
        return dp[bag];
    }
};
```
## 双指针
[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

> [!note]+ 原题描述
> 非负整数数组 `height`，`n` 条垂线，找出两条线与 x 轴构成 **容器**，使 **盛水最多**，返回最大面积。
>
> **示例 1：** `height = [1,8,6,2,5,4,8,3,7]` → `49`
> **示例 2：** `height = [1,1]` → `1`
>
> **约束：** `n == height.length`；`2 <= n <= 10^5`；`0 <= height[i] <= 10^4`。

**口诀**：**左右夹逼，每次移动 **较矮** 的那侧才可能更优。**
当前面积受短板限制，移动长板只会让宽度变小而短板不变，因此不可能得到更优解；只有移动短板，才有机会提高容器高度，所以每次移动较矮的一侧。
<!-- lc-sync: container-with-most-water -->
```cpp
// AC · cpp · 2026-06-01 · 0 ms · 61.4 MB
class Solution {
public:
    int maxArea(vector<int>& height) {
        int n = height.size();
        int l = 0 , r = n-1;
        int res = 0;
        while(l<r) {
            int cur = min(height[l],height[r]) * (r - l);
            res = max(res, cur);
            if(height[l] >= height[r]) {
                r--;
            }else {
                l++;
            }
        }
        return res;
    }
};
```
[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

> [!note]+ 原题描述
> 非负整数数组表示柱子高度，按 **柱状图** 下雨，求能接多少 **雨水**。
>
> **示例 1：** `height = [0,1,0,2,1,0,1,3,2,1,2,1]` → `6`
> **示例 2：** `height = [4,2,0,3,2,5]` → `9`
>
> **约束：** `n == height.length`；`1 <= n <= 2×10^4`；`0 <= height[i] <= 10^5`。

**口诀**：**双指针维护左右最高，矮侧结算积水并移动。**
某个位置接多少水 = 左右最高中的较小值 - 自己高度
先从左右分别遍历找到某位置所在的最大值，然后res = min(l[i], r[i]) - height[i];

但是左右分别遍历空间复杂度为o(n)，用双指针，每次移动指针时记录左右的最大值，
然后res = max = height[]
<!-- lc-sync: trapping-rain-water -->
```cpp
// AC · cpp · 2026-06-03 · 3 ms · 25.5 MB
class Solution {
public:
    // int trap(vector<int>& height) {
    //     int n = height.size();
    //     int res = 0;
    //     vector<int> left(n);
    //     vector<int> right(n);

    //     left[0]=height[0];
    //     for(int i =1; i<n;i++){
    //         left[i] = max(left[i-1], height[i]);
    //     }
    //     right[n-1] = height[n-1];
    //     for(int i=n-2; i>=0;i--) {
    //         right[i] = max(right[i+1], height[i]);
    //     }

    //     for(int i=0;i<n;i++) {
    //         res += min(left[i], right[i]) - height[i];
    //     }
    //     return res;
    // }
    int trap(vector<int>& height) {
        int n = height.size();
        int l = 0 , r = n - 1;
        int lMax = 0 , rMax = 0;
        int res =0;
        while(l < r) {
            lMax = max(lMax, height[l]);
            rMax = max(rMax, height[r]);
            if(lMax < rMax) {
                res += lMax - height[l];
                l++; 
            }else{
                res += rMax - height[r];
                r--;
            }
        }
        return res;
    }
};
```
[75. 颜色分类](https://leetcode.cn/problems/sort-colors/)

> [!note]+ 原题描述
> 含 `0`、`1`、`2` 的数组 `nums`，**原地** 排序使相同数字相邻（升序）。
>
> **示例 1：** `nums = [2,0,2,1,1,0]` → `[0,0,1,1,2,2]`
> **示例 2：** `nums = [2,0,1]` → `[0,1,2]`
>
> **约束：** `n == nums.length`；`1 <= n <= 300`；`nums[i]` 为 0、1 或 2。

**口诀**：**荷兰国旗：l/mid/r 三指针，0 换左 2 换右 mid 扫描。**
荷兰国旗问题，l,mid,r分别切成三段。l：负责 0 区域扩展，r：负责 2 区域扩展，mid：负责扫描未知区域
<!-- lc-sync: sort-colors -->
```cpp
// AC · cpp · 2026-07-02 · 0 ms · 11.5 MB
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int l = 0, r = nums.size()-1, mid = l;
        while(mid <= r){
            if(nums[mid] == 0) {
                swap(nums[l], nums[mid]);
                l++;
                mid++;
            }else if(nums[mid] == 1) {
                mid++;
            }else{
                swap(nums[mid], nums[r]);
                r--;
            }
        } 
    }
};
```
[287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

> [!note]+ 原题描述
> 数组 `nums` 含 `n+1` 个整数，均在 `[1,n]` 内，**恰有一个重复**，找出它。不能改数组，`O(1)` 额外空间。
>
> **示例 1：** `nums = [1,3,4,2,2]` → `2`
> **示例 2：** `nums = [3,1,3,4,2]` → `3`
>
> **约束：** `1 <= n <= 10^5`；`nums.length == n+1`；`1 <= nums[i] <= n`。

**口诀**：**i→nums[i] 建链，快慢找环入口即重复数。**
对数组nums建图，每个位置 i 连一条 i→nums[i] 的边，由于存在的重复的数字 target，因此 target 这个位置一定有起码两条指向它的边，因此整张图一定存在环。
然后用快慢指针： 先一起走，一快一慢；再让slow从头出发，快慢一起小步走，最后相等的时候就是环入口
<!-- lc-sync: find-the-duplicate-number -->
```cpp
// AC · cpp · 2026-06-30 · 0 ms · 63.4 MB
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while(slow != fast);
        slow = nums[0];
        while(slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```
[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)

> [!note]+ 原题描述
> 字符串 `s`，返回 `s` 中 **回文子串** 的个数。
>
> **示例 1：** `s = "abc"` → `3`（"a","b","c"）
> **示例 2：** `s = "aaa"` → `6`
>
> **约束：** `1 <= s.length <= 1000`；`s` 由小写英文字母组成。

**口诀**：**中心扩展：每个位置奇偶中心各扩一次计数。**
<!-- lc-sync: palindromic-substrings -->
```cpp
// AC · cpp · 2026-04-12 · 3 ms · 8.5 MB
class Solution {
public:
    int countSubstrings(string s) {
        int n = s.size();
        int res = 0;
        
        for(int center=0;center<n;center++) {
            int l = center, r = center;
            while(r <n && l >=0 && s[l] == s[r]) {
                res++;
                l--;
                r++;
            }
        }
        for(int center = 0;center <n-1;center++) {
            int l = center;
            int r = center+1;
            while(l>=0 && r <n && s[l] == s[r]) {
                res++;
                l--;
                r++;
            }
        }
        return res;
        //合并写法
        // for(int center=0;center<2*n-1;center++){
        //     int l = center/2;
        //     int r = l + center%2;
        //     while(l>=0 && r<n&&s[l]==s[r]){
        //         res++;
        //         l--;
        //         r++;
        //     } 
        // }
    }
};
```
[15. 三数之和](https://leetcode.cn/problems/3sum/)

> [!note]+ 原题描述
> 整数数组 `nums`，返回所有 **和为 0** 且不重复的三元组。
>
> **示例 1：** `nums = [-1,0,1,2,-1,-4]` → `[[-1,-1,2],[-1,0,1]]`
> **示例 2：** `nums = [0,1,1]` → `[]`
>
> **约束：** `3 <= nums.length <= 3000`；`-10^5 <= nums[i] <= 10^5`。

**口诀**：**排序固定 i，双指针找两数；找到后三指针去重。**
排序,固定一个数,双指针找另外两个：和小了 left++,和大了 right--  
找到答案后：  left去重,right去重,最后 i 去重
<!-- lc-sync: 3sum -->
```cpp
// AC · cpp · 2026-06-01 · 47 ms · 28.5 MB
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for(int i = 0; i < n; i++) {
            if( i > 0 && nums[i] == nums[i-1] || nums[i] > 0) { // 如果nums[i] > 0,那么排序后后面的两位都大于0，合不可能为0
                continue;
            }
            int l = i+1, r = n-1;
            while(l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if(sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while(l < r && nums[l] == nums[l+1]) l++;
                    while(l < r && nums[r] == nums[r-1]) r--;
                    l++;
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return res;
    }
};
```
## 哈希
[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

> [!note]+ 原题描述
> 未排序整数数组 `nums`，返回 **最长连续序列** 长度。要求 `O(n)`。
>
> **示例 1：** `nums = [100,4,200,1,3,2]` → `4`（[1,2,3,4]）
> **示例 2：** `nums = [0,3,7,2,5,8,4,6,0,1]` → `9`
>
> **约束：** `0 <= nums.length <= 10^5`；`-10^9 <= nums[i] <= 10^9`。

**口诀**：**哈希集合：只从序列起点 num-1 不存在处向后数。**
为什么是o(n)复杂度？因为 if(!st.count(num - 1)) { //这里保证每个序列只会被遍历一次。因为只会从序列最小的元素开始进入循环.
<!-- lc-sync: longest-consecutive-sequence -->
```cpp
// AC · cpp · 2026-04-12 · 102 ms · 87.1 MB
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int longest = 0;
        for(int num : st) {
            if(!st.count(num - 1)) { //这里保证每个序列只会被遍历一次。因为只会从序列最小的元素开始进入循环
                int cur = num;
                int len = 1;
                while(st.count(cur+1)) {
                    cur++;
                    len++;
                }
                longest = max(longest, len);
            }
        }
        return longest;
    }
};
```
[49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

> [!note]+ 原题描述
> 字符串数组 `strs`，将 **字母异位词** 组合在一起，返回分组列表（顺序不限）。
>
> **示例 1：** `strs = ["eat","tea","tan","ate","nat","bat"]` → `[["bat"],["nat","tan"],["ate","eat","tea"]]`
>
> **约束：** `1 <= strs.length <= 10^4`；`0 <= strs[i].length <= 100`；小写英文字母。

**口诀**：**排序串或字符计数作 key，哈希分桶归组。**
异位词经过sort后都一样，把每个元素sort，sort后相同的key存一起，然后遍历map，每个key里面的都是异位词

<!-- lc-sync: group-anagrams -->
```cpp
// AC · cpp · 2026-07-02 · 8 ms · 24.4 MB
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string,vector<string>> mp;
        for(auto s : strs) {
            string key = s;
            sort(key.begin(),key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for(const auto &[key, value] : mp) {
            res.push_back(value);
        }
        return res;
    }
};
```
[169. 多数元素](https://leetcode.cn/problems/majority-element/)

> [!note]+ 原题描述
> 大小为 `n` 的数组 `nums`，返回 **出现次数超过 ⌊n/2⌋** 的元素（假设必存在）。
>
> **示例 1：** `nums = [3,2,3]` → `3`
> **示例 2：** `nums = [2,2,1,1,1,2,2]` → `2`
>
> **约束：** `n == nums.length`；`1 <= n <= 5×10^4`；`-10^9 <= nums[i] <= 10^9`。

**口诀**：**Boyer-Moore 投票：同号加异号减，剩者为众数。**
一方数量占优，则互不相同的数字互相抵消，最后剩下的一定是数量占优的数字。类似两军混战、
<!-- lc-sync: majority-element -->
```cpp
// AC · cpp · 2026-07-03 · 0 ms · 27.5 MB
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0;
        int count = 0;
        for(int num : nums) {
            if(count == 0) candidate = num;
            if(num == candidate){
                ++count;
            }else{
                --count;
            }
        }
        return candidate;
    }
};
```
[448. 找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)

> [!note]+ 原题描述
> 含 `n` 个整数的数组 `nums`，`nums[i]` 在 `[1,n]` 内，找出 `[1,n]` 中 **未出现** 的所有数字。`O(n)` 时间、`O(1)` 额外空间。
>
> **示例 1：** `nums = [4,3,2,7,8,2,3,1]` → `[5,6]`
> **示例 2：** `nums = [1,1]` → `[2]`
>
> **约束：** `n == nums.length`；`1 <= n <= 10^5`；`1 <= nums[i] <= n`。

**口诀**：**值当下标：出现过则对应位置取负，正数下标+1 即缺失。**
用出现过的数字所在的位置取负数，表示该位置所带表的数字已经出现过。二次遍历时为正数的位置+1表示这个数字没有出现过，放入res即可
<!-- lc-sync: find-all-numbers-disappeared-in-an-array -->
```cpp
// AC · cpp · 2026-06-14 · 0 ms · 51.9 MB
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        // [4,3,2,7,8,2,3,1]
        // [-4,-3,-2,-7,8,2,-3,-1]
        vector<int> res;
        for(int i=0;i<nums.size();i++) {
            if(nums[abs(nums[i]) - 1] > 0) {
                nums[abs(nums[i]) - 1] = -nums[abs(nums[i]) -1];
            }
        }
        for(int i=0;i< nums.size(); i++) {
            if(nums[i] > 0) 
                res.push_back(i+1);
        }
        return res;
    }
};
```
## 树/二叉树
[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，返回 **中序遍历** 节点值。
>
> **示例 1：** `root = [1,null,2,3]` → `[1,3,2]`
> **示例 2：** `root = []` → `[]`
>
> **约束：** 节点数 `[0, 100]`；`-100 <= Node.val <= 100`。
>
> **进阶：** 递归和迭代？

**口诀**：**左-根-右；迭代用栈，一路向左压栈再弹栈访问。**
if( !root ) return 这个很关键
<!-- lc-sync: binary-tree-inorder-traversal -->
```cpp
// AC · cpp · 2026-06-18 · 0 ms · 10.6 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
       vector<int> res;
       inorder(root, res);
       return res;
    }
    void inorder(TreeNode* root, vector<int>& res) {
        if(!root) return;
        inorder(root->left, res);
        res.push_back(root->val);
        inorder(root->right, res);
    }
};
```
[96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)


> [!note]+ 原题描述
> 整数 `n`，求 `[1,n]` 能组成多少种 **结构不同** 的 **BST**？
>
> **示例 1：** `n = 3` → `5`
> **示例 2：** `n = 1` → `1`
>
> **约束：** `1 <= n <= 19`。

**口诀**：**卡特兰数：枚举根 i，左 i-1 右 n-i 方案相乘再求和。**
枚举根节点 + 左右子树方案相乘。
<!-- lc-sync: unique-binary-search-trees -->
```cpp
// AC · cpp · 2026-06-18 · 0 ms · 8 MB
class Solution {
public:
    int numTrees(int n) {
        vector<int> dp(n+1);
        dp[0] = 1;
        dp[1] = 1;
        for(int i=2;i <= n;i++) {
            for(int j=1;j<=i;j++) {
                dp[i] += dp[j-1] * dp[i-j];
            }
        }
        return dp[n];
    }
};
```
[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，判断是否为 **有效 BST**（左<根<右，递归定义）。
>
> **示例 1：** `root = [2,1,3]` → `true`
> **示例 2：** `root = [5,1,4,null,null,3,6]` → `false`
>
> **约束：** 节点数 `[1, 10^4]`；`-2^31 <= Node.val <= 2^31-1`。

**口诀**：**中序必升序，或 DFS 传 (min,max) 区间约束。**
BFS左子树所有值 < 当前节点 < 右子树所有值
BST中序遍历的列表一定升序

<!-- lc-sync: validate-binary-search-tree -->
```cpp
// AC · cpp · 2026-06-22 · 0 ms · 21.3 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* pre = nullptr;
    bool isValidBST(TreeNode* root) {
       if(root == nullptr) return true;
       if( !isValidBST(root->left)) return false;
        if(pre && root->val <= pre->val) return false;
        pre = root;
        return isValidBST(root->right);

    }
};
```
[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，检查是否 **轴对称**。
>
> **示例 1：** `root = [1,2,2,3,4,4,3]` → `true`
> **示例 2：** `root = [1,2,2,null,3,null,3]` → `false`
>
> **约束：** 节点数 `[1, 1000]`；`-100 <= Node.val <= 100`。

**口诀**：**比对外侧 left.left↔right.right，内侧 left.right↔right.left。**
对称树是树的左右两个子树对称，不是所有的子树都镜像。要搞明白是对称不是镜像，所以比较的时候要left->left和right->right对比，right->left和left->right对比。
<!-- lc-sync: symmetric-tree -->
```cpp
// AC · cpp · 2026-06-22 · 0 ms · 18 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool compare(TreeNode* left, TreeNode* right) {
        if(left == nullptr && right == nullptr) return true;
        if(left == nullptr || right == nullptr) return false;
        if(left->val != right->val) return false;
        return compare(left->left, right->right) && compare(left->right, right->left);
    }
    bool isSymmetric(TreeNode* root) {
        if(root == nullptr) return true;
        return compare(root->left, root->right);
    }
};
```
[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，返回 **层序遍历** 结果（逐层从左到右）。
>
> **示例 1：** `root = [3,9,20,null,null,15,7]` → `[[3],[9,20],[15,7]]`
> **示例 2：** `root = [1]` → `[[1]]`
>
> **约束：** 节点数 `[0, 2000]`；`-1000 <= Node.val <= 1000`。

**口诀**：**BFS 队列：每层先记 size，循环 size 次处理一层。**
层序遍历的时候用queue存放，如果才能记录一层的数量呢？先确定queue队列的长度，然后一个循环每次都处理队列长度的次数，这样一次处理就是一层。
队列负责存节点，size负责切层。

<!-- lc-sync: binary-tree-level-order-traversal -->
```cpp
// AC · cpp · 2026-06-22 · 3 ms · 16.7 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void bfs(TreeNode* root, vector<vector<int>>& res) {
        
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int n = q.size();
            vector<int> layer;
            for(int i=0;i<n;i++){
                TreeNode* node = q.front();
                if(node->left != nullptr) q.push(node->left);
                if(node->right != nullptr) q.push(node->right);
                q.pop();
                layer.push_back(node->val);
            }
            res.push_back(layer);
        }
    }
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if(root == nullptr) return res;
        bfs(root, res);
        return res;
    }
};
```
[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，返回 **最大深度**（根到最远叶节点的最多节点数）。
>
> **示例 1：** `root = [3,9,20,null,null,15,7]` → `3`
> **示例 2：** `root = [1,null,2]` → `2`
>
> **约束：** 节点数 `[0, 10^4]`；`-100 <= Node.val <= 100`。

**口诀**：**max(左深,右深)+1，空节点深 0。**
最大深度=max(左子树，右字数） + 1

<!-- lc-sync: maximum-depth-of-binary-tree -->
```cpp
// AC · cpp · 2026-06-22 · 0 ms · 18.7 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(root == nullptr) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```
[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

> [!note]+ 原题描述
> 两个整数数组 `preorder` 和 `inorder`，其中 `inorder` 为同一棵树的 **中序**，`preorder` 为 **前序**，构造并返回二叉树。
>
> **示例：** `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]` → `[3,9,20,null,null,15,7]`
>
> **约束：** `1 <= preorder.length <= 3000`；节点值互异；`-3000 <= Node.val <= 3000`。

**口诀**：**前序首为根，中序划左右区间，递归建树。**
当前节点自己处理，左右子树递归解决，拼起来返回
<!-- lc-sync: construct-binary-tree-from-preorder-and-inorder-traversal -->
```cpp
// AC · cpp · 2026-06-22 · 11 ms · 26.6 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* build(vector<int>& preorder, int prel, int prer, vector<int>& inorder, int inl, int inr) {
        //当前子树前序pre[prel,prer],当前子树中序inorder[inl,inr],返回根节点
        if(prel > prer) return nullptr;
        TreeNode* root =new TreeNode(preorder[prel]);
        //根在中序列表中的位置
        int k = inl;
        while(inorder[k] != root->val) k++;
        //当前root在中序中位置为k
        int leftSubTreeSize = k - inl;
        //递归建立左子树
        root->left = build(preorder, prel+1, prel+ leftSubTreeSize, inorder, inl, k - 1);

        //建立右字数
        root->right = build(preorder, prel + leftSubTreeSize + 1, prer,inorder, k + 1, inr);
        return root;

    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return build(preorder,0,preorder.size() - 1, inorder, 0, inorder.size() - 1);
    }
};
```
[124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

> [!note]+ 原题描述
> 二叉树 `root`，路径 **至少一个节点**，返回 **最大路径和**（路径可从任意节点到任意节点，不必经过根）。
>
> **示例 1：** `root = [1,2,3]` → `6`（2+1+3）
> **示例 2：** `root = [-10,9,20,null,null,15,7]` → `42`（15+20+7）
>
> **约束：** 节点数 `[1, 3×10^4]`；`-1000 <= Node.val <= 1000`。

**口诀**：**后序 DFS：更新答案用左右+根，返回父只用单边+根。**
更新答案走双边，返回父节点走单边
<!-- lc-sync: binary-tree-maximum-path-sum -->
```cpp
// AC · cpp · 2026-06-22 · 0 ms · 27.4 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int res = INT_MIN;
    int dfs(TreeNode* root) {
        if(!root) return 0;
        int left = max(0, dfs(root->left));  //
        int right = max(0, dfs(root->right));
        res = max(res, left+right+root->val); // 更新答案走双边,左右两边都要加上
        return root->val + max(left, right); //当前root能提供的有效值，返回给父节点只能选一边
    }
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```
[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，**翻转** 二叉树（左右子树互换），返回根。
>
> **示例：** `root = [4,2,7,1,3,6,9]` → `[4,7,2,9,6,3,1]`
>
> **约束：** 节点数 `[0, 100]`；`-100 <= Node.val <= 100`。

**口诀**：**当前节点 swap 左右，递归翻转两个孩子。**
对于当前节点，交换左右，递归孩子。
<!-- lc-sync: invert-binary-tree -->
```cpp
// AC · cpp · 2026-06-22 · 0 ms · 12.5 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if(!root)  return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```
[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

> [!note]+ 原题描述
> 二叉树根 `root` 和树中节点 `p`、`q`，返回 **最近公共祖先**（LCA）。
>
> **示例：** `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1` → `3`
>
> **约束：** 节点数 `[2, 10^5]`；`-10^9 <= Node.val <= 10^9`；`p != q`；`p`、`q` 均存在于树中。

**口诀**：**根即 p/q 则返回；左右各找，分居两侧则根为 LCA。**
如果root本身就是q||p返回root， 左右找子树中是否包含p||q，如果分别在左右子树，则root就是lcr; 否则p||q在同一个子树中，返回left || right 再继续在子树中寻找

<!-- lc-sync: lowest-common-ancestor-of-a-binary-tree -->
```cpp
// AC · cpp · 2026-06-24 · 75 ms · 42.9 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root == nullptr) return nullptr;
        if(root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        if(left && right) return root;

        return left ? left : right;
    }
};
```
[297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)

> [!note]+ 原题描述
> 设计算法完成二叉树的 **序列化与反序列化**（不限格式，LeetCode 用层序）。
>
> **示例：** `root = [1,2,3,null,null,4,5]` → 序列化再反序列化得相同树
>
> **约束：** 节点数 `[0, 10^4]`；`-1000 <= Node.val <= 1000`。

**口诀**：**DFS 前序逗号分隔，# 表 null；反序列化递归建树。**
序列化：dfs,如果为null, s+= "#"
反序列化：1 stringstream ss(data) 把 string 当成“输入流”
		2 getline(ss, cur, ',')
		 3 build 如果为“#”返回null，否则 new treenode()，然后依次构建左右子树
<!-- lc-sync: serialize-and-deserialize-binary-tree -->
```cpp
// AC · cpp · 2026-06-24 · 37 ms · 37.3 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:
    void dfs(TreeNode*root, string& s) {
        if(root == nullptr) {
            s += "#,";
            return;
        }
        s += to_string(root->val) + ",";
        dfs(root->left, s);
        dfs(root->right, s);
    }
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string s;
        dfs(root,s);
        return s;
    }
    TreeNode* build(queue<string>& q) {
        string cur = q.front();
        q.pop();
        if(cur == "#") return nullptr;

        TreeNode* root = new TreeNode(stoi(cur));
        root->left = build(q);
        root->right = build(q);
        return root;

    }
    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        queue<string> q;
        string cur;
        stringstream ss(data);
        while(getline(ss, cur, ',')) {
            if(!cur.empty())
            q.push(cur);
        }
        return build(q);
    }
};

// Your Codec object will be instantiated and called as such:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));
```
[337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)

> [!note]+ 原题描述
> 二叉树每个节点存放金额，**相邻节点不能同时偷**，返回 **最高金额**。
>
> **示例 1：** `root = [3,2,3,null,3,null,1]` → `7`（3+3+1）
> **示例 2：** `root = [3,4,5,1,3,null,1]` → `9`（4+5）
>
> **约束：** 节点数 `[1, 10^4]`；`0 <= Node.val <= 10^4`。

**口诀**：**后序返回 (偷,不偷)：偷=val+左不偷+右不偷。**
结构化绑定 auto[rob，notRob] = dfs(root);
因为当前节点的值依赖左右子树的结果，所以一定要是后序遍历
偷当前节点，则不能偷孩子节点； 不偷当前节点，则从左右孩子中分别选择其偷或者不偷的最大值

<!-- lc-sync: house-robber-iii -->
```cpp
// AC · cpp · 2026-06-24 · 0 ms · 22 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    pair<int,int> dfs(TreeNode* root) {
        if(!root) return {0,0};
        auto [lrob, lnot] = dfs(root->left);
        auto [rrob, rnot] = dfs(root->right);

        int rob = root->val + lnot + rnot;
        int notRob = max(lrob, lnot) + max(rrob, rnot);
        return {rob, notRob};
    }
    int rob(TreeNode* root) {
       auto [rob, notRob] = dfs(root);
       return max(rob, notRob);
    }
};
```
[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

> [!note]+ 原题描述
> 二叉树 `root` 和整数 `targetSum`，返回 **路径和等于 targetSum** 的路径数目（路径从父到子，不回溯）。
>
> **示例 1：** `root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8` → `3`
> **示例 2：** `root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22` → `3`
>
> **约束：** 节点数 `[0, 1000]`；`-10^9 <= Node.val, targetSum <= 10^9`。

**口诀**：**前缀和哈希 + DFS：查 cur-targetSum 出现次数，回溯删前缀。**
路径必须满足从父节点走到子节点不能回头，可以从任何节点开始
利用前缀和，从root到当前节点维护sum；查sum-target是否出现过，用hash记录路径前缀和，DFS+ 回溯
<!-- lc-sync: path-sum-iii -->
```cpp
// AC · cpp · 2026-06-24 · 0 ms · 20.2 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    unordered_map<long long, int> prefix;
    int res =0;
    void dfs(TreeNode* root, long long sum, int tagret) {
        if(root == nullptr) return;
        sum += root->val;
        if(prefix.count(sum - tagret))
            res += prefix[sum - tagret];
        prefix[sum]++;
        dfs(root->left, sum, tagret);
        dfs(root->right, sum, tagret);
        prefix[sum]--; //保证走另一条路径时数据不会被影响
    }
    int pathSum(TreeNode* root, int targetSum) {
        prefix[0] = 1; // 非常关键允许从根开始匹配
        dfs(root,0,targetSum);
        return res;
    }
};
```
[538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)

> [!note]+ 原题描述
> BST 根 `root`，把每个节点值改为 **原值加上所有更大节点值之和**。
>
> **示例 1：** `root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]` → 累加树
> **示例 2：** `root = [0,null,1]` → `[1,null,1]`
>
> **约束：** 节点数 `[0, 10^4]`；`-10^4 <= Node.val <= 10^4`；BST 且值互异。

**口诀**：**反中序：右-根-左，累加 sum 再赋 root->val。**
二叉搜索树的中序遍历是从小到大，如果返回来中序遍历就是从大到小（先右再中再右）
所有反过来遍历二叉搜索树，并且root->val = root-val + sum; sum = root-val;
<!-- lc-sync: convert-bst-to-greater-tree -->
```cpp
// AC · cpp · 2026-06-24 · 0 ms · 34.3 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
    int sum = 0;
public:
    TreeNode* convertBST(TreeNode* root) {
        if(root == nullptr) return nullptr;
        convertBST(root->right);
        root->val = root->val + sum;
        sum = root->val;
        convertBST(root->left);
        return root;
    }
};
```
[543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)

> [!note]+ 原题描述
> 给定二叉树根 `root`，返回 **直径**（任意两节点间最长路径的 **边数**）。
>
> **示例 1：** `root = [1,2,3,4,5]` → `3`（路径 [4,2,1,3] 或 [5,2,1,3]）
> **示例 2：** `root = [1,2]` → `1`
>
> **约束：** 节点数 `[1, 10^4]`；`-100 <= Node.val <= 100`。

**口诀**：**后序：直径=max(左高+右高)，返回高=max(左,右)+1。**
dfs(node)=以node为起点向下的最大深度
先找左右子树深度，再更新直径left + right, 返回高度 max(left,right) + 1

<!-- lc-sync: diameter-of-binary-tree -->
```cpp
// AC · cpp · 2026-06-24 · 0 ms · 23.4 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int ans = 0;
    int dfs(TreeNode* root) {
        if(root == nullptr) return 0;
        int left = dfs(root->left);
        int right = dfs(root->right);
        ans = max(ans, left + right);
        return max(left, right) + 1;
    }
    int diameterOfBinaryTree(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
```
[617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)

> [!note]+ 原题描述
> 两二叉树根 `root1`、`root2`，合并成新树：两节点均非空则值相加，否则取非空节点。
>
> **示例 1：** `root1 = [1,3,null,7], root2 = [2,1,null,9,null,4]` → `[3,4,null,7,null,4]`
> **示例 2：** `root1 = [1], root2 = [2,null,3]` → `[3,null,3]`
>
> **约束：** 节点数 `[0, 2000]`；`-10^4 <= Node.val <= 10^4`。

**口诀**：**同步递归：都空返 null，一空返另一，否则新建合并节点。**
同时便利两棵树，对应节点做合并操作
1 若两个都空返回nullptr；若一个为空，返回非空那个； 若都部位空，新建一个合并值后的节点
<!-- lc-sync: merge-two-binary-trees -->
```cpp
// AC · cpp · 2026-06-24 · 4 ms · 33.1 MB
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if(!root1) return root2;
        if(!root2) return root1;

        TreeNode* root = new TreeNode(root1->val + root2->val);

        root->left = mergeTrees(root1->left, root2->left);
        root->right = mergeTrees(root1->right, root2->right);

        return root;
    }
};
```
## 回溯
[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

> [!note]+ 原题描述
> 字符串 `digits` 表示 2-9 的电话数字，返回所有它能表示的 **字母组合**（如 2→abc）。`digits` 为空返回 `[]`。
>
> **示例 1：** `digits = "23"` → `["ad","ae","af","bd","be","bf","cd","ce","cf"]`
> **示例 2：** `digits = ""` → `[]`
>
> **约束：** `0 <= digits.length <= 4`；`digits[i]` 为 2-9 的数字。

**口诀**：**映射表 + 回溯：每层选一个字母，index 进下一层。**
vector string 存放号码对应的字符串，用index记录当前便利到哪一层了
digits index -> 对应一组字母，从中选择一个，进入下一层
<!-- lc-sync: letter-combinations-of-a-phone-number -->
```cpp
// AC · cpp · 2026-07-02 · 0 ms · 9.3 MB
class Solution {
public:
    vector<string> res;
    string path;
    vector<string> mp = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    void dfs(string digits, int index) {
        if(index == digits.size()) {
            res.push_back(path);
            return;
        }
        int digit = digits[index] - '0';
        for(char c : mp[digit]) {
            path.push_back(c);
            dfs(digits, index + 1);
            path.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        dfs(digits, 0);
        return res;
    }
};
```
[22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

> [!note]+ 原题描述
> 整数 `n`，生成所有 **有效的** 括号组合（`n` 对括号）。
>
> **示例 1：** `n = 3` → `["((()))","(()())","(())()","()(())","()()()"]`
> **示例 2：** `n = 1` → `["()"]`
>
> **约束：** `1 <= n <= 8`。

**口诀**：**回溯：左可放则放左，仅当 right<left 可放右。**
只有right < left 才能放右括号！！有括号数量永远不能超过左括号数量。
dfs遍历，如果满足条件，判断是否收集答案；如果可以放左括号，先放左括号，再dfs,再撤销；如果可以放右括号，先放右括号，再dfs,再撤销。

<!-- lc-sync: generate-parentheses -->
```cpp
// AC · cpp · 2026-07-01 · 0 ms · 12.9 MB
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string subres;
        bt(res, subres, 0, 0, n);
        return res;
    }

    void bt(vector<string>& res, string& subres, int open, int close, int n) {
        if(subres.size() == 2*n) {
            res.push_back(subres);
            return;
        }
        if(open < n) {
            subres.push_back('(');
            bt(res,subres,open+1,close,n);
            subres.pop_back();
        }
        if(close < open) {
            subres.push_back(')');
            bt(res,subres,open, close + 1, n);
            subres.pop_back();
        }
    }
};
```
[39. 组合总和](https://leetcode.cn/problems/combination-sum/)

> [!note]+ 原题描述
> 无重复正整数数组 `candidates` 和目标 `target`，找出所有和为 `target` 的 **组合**（同一数字可无限重复，组合不重复）。
>
> **示例 1：** `candidates = [2,3,6,7], target = 7` → `[[2,2,3],[7]]`
> **示例 2：** `candidates = [2,3,5], target = 8` → `[[2,2,2,2],[2,3,3],[3,5]]`
>
> **约束：** `1 <= candidates.length <= 30`；`2 <= candidates[i] <= 40`；元素互异；`1 <= target <= 40`。

**口诀**：**回溯从 start 起选，可重复故 i 不前进，和够则收集。**
回溯，用start避免重复组合，如2+3和3+2重复，从i起步，是因为可以重复使用同一个数字
<!-- lc-sync: combination-sum -->
```cpp
// AC · cpp · 2026-07-02 · 7 ms · 14 MB
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;

    void dfs(vector<int>& candidates,int start, int target, int curSum) {
        if(curSum == target) {
            res.push_back(path);
            return;
        }
        if(curSum > target) return;
        for(int i=start;i<candidates.size();i++) {
            path.push_back(candidates[i]);
            //这里可以重复选所以是i不是i+1;
            dfs(candidates, i, target, curSum+ candidates[i]);
            path.pop_back();
        }
    }
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        dfs(candidates,0,target, 0);
        return res;
    }
};
```
[46. 全排列](https://leetcode.cn/problems/permutations/)

> [!note]+ 原题描述
> 不含重复数字的数组 `nums`，返回 **全排列**。
>
> **示例 1：** `nums = [1,2,3]` → `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
> **示例 2：** `nums = [0,1]` → `[[0,1],[1,0]]`
>
> **约束：** `1 <= nums.length <= 6`；`-10 <= nums[i] <= 10`；元素互异。

**口诀**：**回溯 + used 数组：每层选未用元素，满则收集。**
回溯算法。
<!-- lc-sync: permutations -->
```cpp
// AC · cpp · 2026-07-02 · 2 ms · 10.8 MB
class Solution {
public:
    vector<bool> used;
    vector<vector<int>> res;
    vector<int> path;
    void dfs(vector<int>& nums) {
        if(path.size() == nums.size()) {
            res.push_back(path);
        }
        for(int i=0;i<nums.size();i++) {
            if(used[i]) continue;
            path.push_back(nums[i]);
            used[i] = true;
            dfs(nums);
            used[i] = false;
            path.pop_back();
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        used.resize(nums.size(),false);
        dfs(nums);
        return res;
    }
};
```
[78. 子集](https://leetcode.cn/problems/subsets/)

> [!note]+ 原题描述
> 整数数组 `nums`（**互异**），返回所有 **子集**（幂集），顺序不限。
>
> **示例 1：** `nums = [1,2,3]` → `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`
> **示例 2：** `nums = [0]` → `[[],[0]]`
>
> **约束：** `1 <= nums.length <= 10`；`-10 <= nums[i] <= 10`；元素互异。

**口诀**：**回溯从 start 扩展：每层先收当前 path，再选后续元素。**
在每一层：

1. 当前 path 是一个合法子集 → 记录
2. 从 start 往后尝试选一个数
3. 进入下一层

<!-- lc-sync: subsets -->
```cpp
// AC · cpp · 2026-07-02 · 0 ms · 9.9 MB
class Solution {
public:
    vector<vector<int>> res;
    vector<int> path;
    void dfs(vector<int>& nums, int cur) {
        if(cur == nums.size()) {
            res.push_back(path);
            return;
        }
        path.push_back(nums[cur]);
        dfs(nums,cur+1);
        path.pop_back();
        dfs(nums,cur+1);
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        dfs(nums, 0);
        return res;
    }
};
```
[79. 单词搜索](https://leetcode.cn/problems/word-search/)

> [!note]+ 原题描述
> `m×n` 字符板 `board` 和字符串 `word`，判断 `word` 是否存在网格中（相邻单元格 **不重访**）。
>
> **示例 1：** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"` → `true`
> **示例 2：** 同上，`word = "SEE"` → `true`
>
> **约束：** `m == board.length`，`n == board[i].length`；`1 <= m,n <= 6`；`1 <= word.length <= 15`。

**口诀**：**逐格 DFS 四向搜，匹配则标记访问，失败回溯恢复。**
 在二维网格中做“带回溯的DFS路径匹配”，从每个点出发做四个方向的搜索。
先判断index是否和word长度一样，再判断是否越界，最后判断字符是否一样。 切记在访问wordij前要判断是否越界。
<!-- lc-sync: word-search -->
```cpp
// AC · cpp · 2026-07-02 · 203 ms · 10.2 MB
class Solution {
public:
    int m, n;
    bool dfs(vector<vector<char>>& board, int i, int j, string& word, int index) {
        if(index == word.size()) return true;
        if(i<0 || i>=m || j<0 || j>= n) return false;
        if(board[i][j] != word[index]) return false;
        char c = board[i][j];
        board[i][j] = '*';
        bool found = dfs(board,i+1,j,word,index+1) ||
                    dfs(board,i,j+1,word,index+1) ||
                    dfs(board,i-1,j,word,index+1) ||
                    dfs(board,i,j-1,word,index+1);
        board[i][j] = c;
        return found;
    }
    bool exist(vector<vector<char>>& board, string word) {
        m = board.size(); 
        n = board[0].size();
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++) {
                if(dfs(board,i,j,word,0))
                    return true;
            }
        }
        return false;
    }
};
```
[301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)

> [!note]+ 原题描述
> 只含 `'('`、`')'` 的字符串 `s`，移除 **最少** 括号使串合法，返回 **所有可能结果**。
>
> **示例 1：** `s = "()())()"` → `["(())()","()()()"]`
> **示例 2：** `s = "(a)())()"` → `["(a())()","(a)()()"]`
>
> **约束：** `1 <= s.length <= 25`；`s` 由小写字母和 `'('`、`')'` 组成。

**口诀**：**先算必删左右括号数，DFS 枚举删法并剪枝去重。**
先算出来到底必须删除多少左括号和右括号，然后dfs，注意可以剪枝
<!-- lc-sync: remove-invalid-parentheses -->
```cpp
// AC · cpp · 2026-06-30 · 7 ms · 11.5 MB
class Solution {
public:
    vector<string> res;
    vector<string> removeInvalidParentheses(string s) {
        int lremove = 0, rremove = 0;
        for(char c : s) {
            if(c == '(') {
                lremove++;
            } else if(c == ')') {
                lremove == 0 ? rremove++ : lremove--;
            }
        }
        helper(s,0,lremove,rremove);
        return res;
    }

    void helper(string str, int start, int lremove, int rremove) {
        if(lremove == 0 && rremove == 0) {
            if(isValid(str)) {
                res.push_back(str);
            }
            return;
        }
        for(int i=start;i<str.size();i++) {
            if(i!=start && str[i] == str[i-1]) continue;
            //如果剩余的字符无法满足去掉的数量要求直接返回
            if(lremove + rremove > str.size() - i) {
                return;
            }
            //尝试去掉一个左括号
            if(lremove > 0 && str[i] == '(') {
                helper(str.substr(0,i)+str.substr(i+1),i,lremove-1,rremove);
            }
            //尝试去掉一个右括号
            if(rremove >0 && str[i] ==')'){
                helper(str.substr(0,i)+str.substr(i+1),i,lremove, rremove-1);
            }
        }
    }
    inline bool isValid(const string & str) {
        int cnt = 0;
        for(int i=0;i<str.size();i++) {
            if(str[i] == '('){
                cnt++;
            }else if(str[i] ==')') {
                cnt--;
                if(cnt <0) {
                    return false;
                }
            }
        }
        return cnt == 0;
    }
};
```
## 贪心
[55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

> [!note]+ 原题描述
> 非负整数数组 `nums`，`nums[i]` 表示 **最大跳跃长度**，判断能否从下标 0 到达 **最后一个下标**。
>
> **示例 1：** `nums = [2,3,1,1,4]` → `true`
> **示例 2：** `nums = [3,2,1,0,4]` → `false`
>
> **约束：** `1 <= nums.length <= 10^4`；`0 <= nums[i] <= 10^5`。

**口诀**：**维护最远可达：i 可到达且刷新 maxReach。**
把每个位置当成新的发射台，不断刷新最远覆盖范围
<!-- lc-sync: jump-game -->
```cpp
// AC · cpp · 2026-06-07 · 0 ms · 51.2 MB
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        for(int i=0;i<nums.size();i++) {
            if(i > maxReach) return false;
            maxReach= max(maxReach, i + nums[i]);
        }
        return true;
    }
};
```
[406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)

> [!note]+ 原题描述
> 人员 `[h, k]`（h 身高，k 前面不低于 h 的人数），重建 **原始队列**。
>
> **示例 1：** `people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]` → `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`
>
> **约束：** `1 <= people.length <= 2000`；`0 <= h <= 10^6`；`0 <= k < people.length`。

**口诀**：**按身高降序、k 升序排，高个先插到结果第 k 位。**
先按身高降序排序，高个先安排，然后按k值把当前插入结果数组第k个位置，因为此时前面的人都比他高，插入位置天然满足“前面有k个更高的人”的约束
<!-- lc-sync: queue-reconstruction-by-height -->
```cpp
// AC · cpp · 2026-06-07 · 23 ms · 15.6 MB
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        vector<vector<int>> queue;
        sort(people.begin(), people.end(), [](auto &a, auto &b){
            return a[0] > b[0] || (a[0] == b[0] && a[1] < b[1]);
        });
        for(auto &p : people) {
            queue.insert(queue.begin() + p[1], p);
        }
        return queue;
    }
};
```
[581. 最短无序连续子数组](https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/)

> [!note]+ 原题描述
> 整数数组 `nums`，找出 **最短连续子数组**，若只排序该子数组则整个数组升序，返回其长度。
>
> **示例 1：** `nums = [2,6,4,8,10,9,15]` → `5`（排序 [6,4,8,10,9]）
> **示例 2：** `nums = [1,2,3,4]` → `0`
>
> **约束：** `1 <= nums.length <= 10^4`；`-10^5 <= nums[i] <= 10^5`。

**口诀**：**一次遍历：维护左最大/右最小，乱序处更新边界。**
1 和排序后的数组对比，左右两边第一个不一样的地方就是乱序子数组
2 一次遍历，记录左边最大值，右边最小值。 如果比左边最大值要小，说明这是乱序的数字，记录边界，继续遍历，记录最右边的乱序的数字，这就是乱序子数组的右边界。 同理如果比右边最小值要大，说明这是乱序的数字，记录边界，继续遍历，记录最左边的乱序的数字，这就是乱序子数组的左边界。
<!-- lc-sync: shortest-unsorted-continuous-subarray -->
```cpp
// AC · cpp · 2026-06-07 · 4 ms · 29.8 MB
class Solution {
public:
    // 排序后对比，从不同的位置开始计算
    // int findUnsortedSubarray(vector<int>& nums) {
    //     vector<int> sorted(nums);
    //     sort(sorted.begin(), sorted.end());
    //     int l = 0, r = nums.size() - 1;
    //     while(l < nums.size() && nums[l] == sorted[l]) l++;
    //     while(r >= 0 && nums[r] == sorted[r]) r--;

    //     return r <= 1 ? 0 : r- l + 1; 
    // }
    
    int findUnsortedSubarray(vector<int>& nums) {
        int n = nums.size();
        int maxv = INT_MIN;
        int minv = INT_MAX;
        int l = -1 , r = -1;
        for(int i=0;i<n;i++) {
            if(nums[i] < maxv) {
                r = i;
            }else {
                maxv = nums[i];
            }
        }
        for(int i=n-1; i>=0;i--) {
            if(nums[i] > minv) {
                l = i;
            }else{
                minv = nums[i];
            }
        }
        // 如果没有任何“从左往右的违规点”，数组一定整体有序
        return r == -1 ? 0 : r-l+1;
    }
};
```
[621. 任务调度器](https://leetcode.cn/problems/task-scheduler/)

> [!note]+ 原题描述
> 字符数组 `tasks`（A-Z）和冷却 `n`，两 **相同** 任务间至少间隔 `n` 个单位，求 **最短完成时间**。
>
> **示例 1：** `tasks = ["A","A","A","B","B","B"], n = 2` → `8`（A→B→idle→A→B→idle→A→B）
> **示例 2：** `tasks = ["A","A","A","B","B","B"], n = 0` → `6`
>
> **约束：** `1 <= tasks.length <= 10^4`；`0 <= n <= 100`。

**口诀**：**最高频任务立框架：(maxCount-1)*(n+1)+同频数，与总长取 max。**
先立最高柱，再往缝里塞；塞满看总数，塞不满补空格。
<!-- lc-sync: task-scheduler -->
```cpp
// AC · cpp · 2026-06-07 · 0 ms · 37.4 MB
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> cnt(26);
        for(auto c : tasks) {
            cnt[c-'A']++;
        }
        int max_freq = *max_element(cnt.begin(), cnt.end());
        int maxCount = 0;
        for(int x : cnt) {
            if(x == max_freq) {
                maxCount++;
            }
        }
        //先找出最高频率的任务,以及最高频率任务的个数
        //为了满足冷却，至少需要预留多少空间：max_freq + (max_freq-1)*n + maxCount - 1
        //但是当任务很多时，空位都会被填满，所以应算至少需预留空间和任务数的最大值
        return max((int)tasks.size(), max_freq + (max_freq-1)*n + maxCount - 1);
    }
};
```
## 图/并查集
[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)

> [!note]+ 原题描述
> `m×n` 二维字符网格 `grid`，`'1'` 为陆地 `'0'` 为水，返回 **岛屿数量**（四方向相连为同一岛）。
>
> **示例 1：** `grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]` → `1`
> **示例 2：** 含两个 `'1'` 不相连 → `2`
>
> **约束：** `m == grid.length`，`n == grid[i].length`；`1 <= m,n <= 300`。

**口诀**：**遇 1 则 DFS/BFS 沉岛（改 0）并计数 +1。**
广搜加记录
<!-- lc-sync: number-of-islands -->
```cpp
// AC · cpp · 2026-04-02 · 31 ms · 17.8 MB
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        queue<pair<int,int>> q;
        int res = 0;

        for(int i=0;i<m;i++) {
            for(int j=0;j<n;j++) {
                if(grid[i][j] == '1') {
                    q.push({i,j});
                    res++;
                    while(!q.empty()) {
                        pair<int,int> head = q.front();
                        q.pop();
                        int x = head.first;
                        int y = head.second;
                        grid[x][y] = '0';
                        if(x-1 >= 0 && grid[x-1][y] == '1') {q.push({x-1,y});grid[x-1][y] = '0';}
                        // 这里入队必先标记,防止重复入队
                        if(x+1 < m && grid[x+1][y] == '1') {q.push({x+1,y});grid[x+1][y] = '0';}
                        if(y-1 >= 0 && grid[x][y-1] == '1') {q.push({x,y-1});grid[x][y-1] = '0';}
                        if(y+1 < n && grid[x][y+1] == '1') {q.push({x,y+1});grid[x][y+1] = '0';}
                    }
                }
            }
        }
        return res;
    }
};
```
[207. 课程表](https://leetcode.cn/problems/course-schedule/)

> [!note]+ 原题描述
> 共 `numCourses` 门课，`prerequisites[i]=[a,b]` 表示选 `a` 前必须先选 `b`，判断能否 **完成所有课程**。
>
> **示例 1：** `numCourses = 2, prerequisites = [[1,0]]` → `true`
> **示例 2：** `numCourses = 2, prerequisites = [[1,0],[0,1]]` → `false`
>
> **约束：** `1 <= numCourses <= 2000`；`0 <= prerequisites.length <= 5000`。

**口诀**：**建图算入度，BFS 拓扑：入度 0 入队，剥完无剩则有环。**
经典的 **BFS 拓扑排序**，利用“入度为 0 的节点一定不在环上”这个性质，逐步剥离图中的无环部分。如果最后还有节点剩下来，说明剩下的部分就是环，课程安排不可行。
<!-- lc-sync: course-schedule -->
```cpp
// AC · cpp · 2026-04-01 · 3 ms · 19.7 MB
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses,vector<int>());
        vector<int> indeg(numCourses,0);
        for(auto edge : prerequisites) {
            int a = edge[0];
            int b = edge[1];
            graph[b].push_back(a);
            indeg[a]++;
        }
        queue<int>q;
        for(int i=0;i<numCourses;i++){
            if(indeg[i] == 0) q.push(i);
        }
        int visited = 0;
        while(!q.empty()){
            visited++;
            int node = q.front();
            q.pop();
            for(int neighbor : graph[node]) {
                indeg[neighbor]--;
                if(indeg[neighbor] == 0) q.push(neighbor);
            }
        }
        return visited == numCourses;
    }
};
```
[399. 除法求值](https://leetcode.cn/problems/evaluate-division/)

> [!note]+ 原题描述
> 方程 `equations[i]=[Ai,Bi]` 和 `values[i]` 表示 `Ai/Bi=values[i]`，给定 `queries`，返回每个查询结果（不存在则 `-1.0`）。
>
> **示例：** `equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]` → `[6.0,0.5,-1.0,1.0,-1.0]`
>
> **约束：** `1 <= equations.length <= 20`；`values[i]` 为 30.0 或 2.0；变量名小写。

**口诀**：**建带权图，DFS/BFS 求路径权积；自环为 1，不可达 -1。**
转换成邻接表组成的图，然后dfs搜索，点到点的权重乘积
<!-- lc-sync: evaluate-division -->
```cpp
// AC · cpp · 2026-06-29 · 0 ms · 11.8 MB
class Solution {
public:
    unordered_map<string,vector<pair<string,double>>> graph;

    double dfs(string cur, string target, unordered_set<string>& visited) {
        if(!graph.count(cur) || !graph.count(target)) return -1.0;
        if(cur == target) return 1.0;
        visited.insert(cur);

        //遍历所有领居
        for(auto& [next,value] : graph[cur]) {
            if(visited.count(next)) continue;
            double res = dfs(next,target,visited);
            if(res != -1.0) return value*res;
        }
        return -1.0;
    }

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for(int i=0;i<equations.size();i++) {
            string A = equations[i][0];
            string B = equations[i][1];
            double val = values[i];
            graph[A].push_back({B,val});
            graph[B].push_back({A,1.0 / val});
        }
        vector<double> ans;
        for(auto& q : queries) {
            unordered_set<string> visited;
            double res = dfs(q[0],q[1],visited);
            ans.push_back(res);
        }
    return ans;
    }

};
```
## 堆/优先队列
[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

> [!note]+ 原题描述
> 整数数组 `nums` 和整数 `k`，返回数组中第 **`k` 个最大元素**（非第 k 大 distinct）。
>
> **示例 1：** `nums = [3,2,1,5,6,4], k = 2` → `5`
> **示例 2：** `nums = [3,2,3,1,2,4,5,5,6,7,8,9], k = 4` → `4`
>
> **约束：** `1 <= k <= nums.length <= 10^5`；`-10^4 <= nums[i] <= 10^4`。

**口诀**：**小顶堆维护 k 个最大，堆顶即第 k 大；或快排 partition。**
快排正常情况复杂度为o(N), 最坏情况下为n(N*N)。
小顶堆做法：第k大，则保留最大K个，删除最小。 最后top就是要找的第K大元素。
<!-- lc-sync: kth-largest-element-in-an-array -->
```cpp
// AC · cpp · 2026-06-04 · 47 ms · 60.2 MB
class Solution {
public:
    // int part(vector<int>& nums,int left, int right) {
    //     int k = nums[left];//选最左边的元素作为pivot基准值保存到变量k中，此时nums[left]位置相当于“挖了一个坑”
    //     while(left < right) {
    //         //左右指针没有相遇时，循环继续
    //         while(left < right && nums[right] <= k) right--;
    //         //从右往左找第一个 >pivt的元素
    //         //因为我们要做的是左边放“大”，右边放“小”，所以右边要找一个大于pivot的数

    //         nums[left] = nums[right];//把这个大数，填到左边坑里，此时right位置变成新的“坑”

    //         while(left <right && nums[left] >= k) left++;//从左往右找第一个<pivot的元素，因为左边应该是“大数区”
    //         //所以跳过 >= pivot的数，找到第一个“小于pivot”的数
    //         nums[right] = nums[left];
    //         //把这个“小数”填到右边的坑里。此时left位置有变成新的坑
    //     }
    //     nums[left] =k;
    //     //当left == right时，说明坑的位置确定了，把最开始保存的pivo填回去
    //     return left;
    //     //返回pivot的最终位置
    // }
    // int findKthLargest(vector<int>& nums, int k) {
    //     int n = nums.size();
    //     int left =0, right = n-1;
    //     while(true) {
    //         int mid = part(nums,left,right);
    //         //做一次分割，得到pivot最终位置
    //         if(mid == k-1) return nums[mid];
    //         else {
    //             if(mid < k-1) left = mid+1;
    //             else right = mid -1;
    //         }
    //     }
    // }
    
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for(auto x :  nums) {
            pq.push(x);
            if(pq.size() > k) {
                pq.pop();
            }
        }
        return pq.top();
    }
};
```
[907. 子数组的最小值之和](https://leetcode.cn/problems/sum-of-subarray-minimums/)

> [!note]+ 原题描述
> 整数数组 `arr`，返回所有 **非空子数组** 的 **最小值之和**（对 `10^9+7` 取模）。
>
> **示例 1：** `arr = [3,1,2,4]` → `17`
> **示例 2：** `arr = [11,81,94,43,3]` → `445`
>
> **约束：** `1 <= arr.length <= 3×10^4`；`1 <= arr[i] <= 3×10^4`。

**口诀**：**单调栈求左右第一个更小/相等边界，贡献 arr[i]*L*R。**
这道题不要算子数组，算每个元素当最小值时覆盖了多少子数组。
要让arr[i]成为最小值：左边不能出现更小的数，右边不能出现<=它的数，否则它就不再是“最小值“
left[i] = 左边第一个比它小的位置, right[i] = 右边第一个比它小/等于的位置
arr[i] * L * R -> 它作为最小值的贡献

<!-- lc-sync: sum-of-subarray-minimums -->
```cpp
// AC · cpp · 2026-06-04 · 19 ms · 46.2 MB
class Solution {
public:
    // 用小根堆会超时
    // int sumSubarrayMins(vector<int>& arr) {
        
    //     int n = arr.size();
    //     int sum = 0;
    //     for(int i=0;i< n;i++) {
    //         priority_queue<int,vector<int>, greater<int>> pq;
    //         pq.push(arr[i]);
    //         sum += pq.top();
    //         for(int j = i + 1; j < n; j++) {
    //             pq.push(arr[j]);
    //             sum += pq.top();
    //         }
    //         sum = sum % 1000000007;
    //     }
    //     return sum;
    // }
    int sumSubarrayMins(vector<int>& arr) {
        const int Mod = 1e9 + 7;
        int n = arr.size();
        stack<int> st;
        //left[i]表示i左边第一个“严格小于arr[i]”的位置
        //right[i]表示i右边第一个“小于等于arr[i]”的位置
        vector<int> left(n), right(n);

        //left : previous less
        for(int i=0;i<n;i++) {
            while(!st.empty() && arr[st.top()] > arr[i]) {
                st.pop();
            }
            left[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }
        while(!st.empty()) st.pop();

        //right: next less or equal
        for(int i=n-1;i>=0;i--) {
            while(!st.empty() && arr[st.top()] >= arr[i]) {
                st.pop();
            }
            right[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        long long res = 0;
        for(int i=0;i<n;i++) {
            long long L = i-left[i];
            long long R = right[i] - i;
            res = (res + L * R % Mod * arr[i]) % Mod;
        }
        return res;
    }
};
```
[253. 会议室 II](https://leetcode.cn/problems/meeting-rooms-ii/)

> [!note]+ 原题描述
> 区间 `intervals`，`intervals[i]=[start,end]`，求 **最少会议室数** 使所有会议不冲突。
>
> **示例 1：** `intervals = [[0,30],[5,10],[15,20]]` → `2`
> **示例 2：** `intervals = [[7,10],[2,4]]` → `1`
>
> **约束：** `1 <= intervals.length <= 10^4`；`0 <= start_i < end_i <= 10^6`。

**口诀**：**按开始时间排序，小顶堆存结束时间，能复用则弹出。**
用最小堆维护正在进行会议的结束时间，能复用就弹出，不能就新增，堆最大规模就是答案
![[images/Pasted image 20260703104917.png]]

[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

> [!note]+ 原题描述
> 整数数组 `nums` 和整数 `k`，返回出现频率 **前 k 高** 的元素（顺序不限）。
>
> **示例 1：** `nums = [1,1,1,2,2,3], k = 2` → `[1,2]`
> **示例 2：** `nums = [1], k = 1` → `[1]`
>
> **约束：** `1 <= nums.length <= 10^5`；`-10^4 <= nums[i] <= 10^4`；`k` 在 `[1, 不同元素个数]`。

**口诀**：**哈希计频 + 小顶堆维护 k 个高频。**
用小顶堆，按照数字出现频率从小到大，保持priority_queue中只有k个数字，确保前k多频率。

<!-- lc-sync: top-k-frequent-elements -->
```cpp
// AC · cpp · 2026-06-29 · 3 ms · 17.6 MB
class Solution {
public:
        struct cmp {
            bool operator()(const auto& a, const auto& b){
                return a.first > b.first;
            } 
        };
    vector<int> topKFrequent(vector<int>& nums, int k) {
        vector<int>res;
        unordered_map<int,int> mp;
        for(auto x: nums) {
            mp[x]++;
        }

        priority_queue<pair<int,int>,vector<pair<int,int>>, cmp> pq;
        for(auto& x : mp) {
            pq.push({x.second, x.first});
            if(pq.size() > k) pq.pop();
        }
        while(!pq.empty()){
            res.push_back(pq.top().second);
            pq.pop();
        }
        return res;
    }
};
```
## 位运算
c++相关位运算知识点
[136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

> [!note]+ 原题描述
> 非空整数数组 `nums`，**每个元素出现两次**，恰有一个 **只出现一次**，找出它。要求线性时间、`O(1)` 额外空间。
>
> **示例 1：** `nums = [2,2,1]` → `1`
> **示例 2：** `nums = [4,1,2,1,2]` → `4`
>
> **约束：** `1 <= nums.length <= 3×10^4`；`-3×10^4 <= nums[i] <= 3×10^4`；除一个外均成对。

**口诀**：**全体异或：a^a=0，剩即为单次出现者。**
<!-- lc-sync: single-number -->
```cpp
// AC · cpp · 2026-06-05 · 0 ms · 20.2 MB
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // 异或运算：a⊕0=a。 a⊕a=0。 a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b。
        int res = 0;
        for(auto num : nums) {
            res = res ^ num;
        }
        return res;
    }
};
```
[338. 比特位计数](https://leetcode.cn/problems/counting-bits/)

> [!note]+ 原题描述
> 整数 `n`，返回长度为 `n+1` 的数组 `ans`，`ans[i]` 为 `i` 的 **二进制中 1 的个数**（汉明重量）。
>
> **示例 1：** `n = 2` → `[0,1,1]`
> **示例 2：** `n = 5` → `[0,1,1,2,1,2]`
>
> **约束：** `0 <= n <= 10^5`。

**口诀**：**dp[i]=dp[i>>1]+(i&1)，或 i&(i-1) 消最低 1 计数。**
对于任意数字 `i`。i & (i - 1)会把 **最低位的 1 消掉**；
(i&1) 表示int i最后一位是否为1。 i>>1 等于删掉最后一位

<!-- lc-sync: counting-bits -->
```cpp
// AC · cpp · 2026-06-05 · 2 ms · 10.5 MB
class Solution {
public:
    // vector<int> countBits(int n) {
    //     // 1 对于任意数字i, i & (i-1)会把最低位的1消掉
    //     vector<int> dp(n+1);
    //     for(int i =1 ;i<= n;i++) {
    //         dp[i] = dp[i & (i - 1)] + 1;
    //     }
    //     return dp;
    // }

    vector<int> countBits(int n) {
        // 2 i>>1相当于删掉最后一位; int i & 1 表示i最后一位是否为1 。so:dp[i] = dp[i>>1] + (i&1)
        vector<int> dp(n+1);
        for(int i=1;i<=n;i++) {
            dp[i] = dp[i>>1] + (i&1);
        }
        return dp;
    }
};
```
[461. 汉明距离](https://leetcode.cn/problems/hamming-distance/)

> [!note]+ 原题描述
> 两个整数 `x` 和 `y`，返回对应 **二进制位不同** 的位数（汉明距离）。
>
> **示例 1：** `x = 1, y = 4` → `2`（1→001，4→100）
> **示例 2：** `x = 3, y = 1` → `1`
>
> **约束：** `0 <= x, y <= 2^31 - 1`。

**口诀**：**x^y 后统计 1 的个数，或 Brian Kernighan 消 1。**
1 先异或求出不同位组成的数字，然后计算该数字中的1的个数
<!-- lc-sync: hamming-distance -->
```cpp
// AC · cpp · 2026-06-05 · 0 ms · 7.7 MB
class Solution {
public:
    int hammingDistance(int x, int y) {
        int ornot = x ^ y;
        int res = 0;
        while(ornot) {
            res += ornot & 1;
            ornot = ornot >> 1;
        }
        return res;
    }
};
```
## 设计
[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

> [!note]+ 原题描述
> 设计 **LRU 缓存**：`get(key)` 存在返回值否则 -1；`put(key,value)` 更新或插入；容量满时 **淘汰最久未使用**。
>
> **约束：** `1 <= capacity <= 3000`；`0 <= key,value <= 10^4`；最多 `2×10^5` 次调用。

**口诀**：**哈希定位 + 双向链表排队：get/put 都移到尾部，满则删头。**
用链表维护时间顺序，用哈希表实现随机访问。通过删除尾节点，添加头结点实现缓存更新。put时刻注意是否超过容量。 插入链表时，先接入要插入的节点，再修改旧的链表，防止断链。

hashmap负责找，双向链表负责排队，尾部=最近使用，头部等于最久未使用。
get: 找到->删除->插尾
put:已存在：更新->删除->插尾； 不存在：新建->插尾，插入后是否超容量？超->删除头节点。
<!-- lc-sync: lru-cache -->
```cpp
// AC · cpp · 2026-06-13 · 75 ms · 168.9 MB
class LRUCache {
    struct Node {
        int key , value;
        Node *pre;
        Node *next;
        // 这里的构造函数要记清楚
        Node(int k=0, int v=0) : key(k), value(v), pre(nullptr), next(nullptr){}
    };

    unordered_map<int, Node*> cache;
    Node* dumHead = new Node();
    Node* dumTail = new Node();
    void remove(Node* node) {
        node->pre->next = node->next;
        node->next->pre =node->pre;
        //删除后的节点前后要置空避免后续错乱
        node->pre = nullptr;
        node->next = nullptr;
    };
    void add2tail(Node* node){ // 标准插入方法
        node->pre = dumTail->pre;
        node->next = dumTail;
        dumTail->pre->next = node;
        dumTail->pre = node;
    };
    int cacheSize =0;
public:
    LRUCache(int capacity) {
        cacheSize = capacity;
        dumHead->next = dumTail;
        dumTail->pre = dumHead;
    }
    
    int get(int key) {
        if(cache.count(key)) {
            Node* curNode = cache[key];
            remove(curNode);
            add2tail(curNode);
            return curNode->value;
        }else {
            return -1;
        }
    }
    
    void put(int key, int value) {
        if(cache.count(key)) {//已存在于缓存
            Node* curNode = cache[key];
            curNode->value = value;
            remove(curNode);
            add2tail(curNode);
        } else{
            cache[key] = new Node(key, value);
            add2tail(cache[key]);
            if(cache.size() > cacheSize) {
                //这里必须要用新节点记录，以免删掉后找不到链表头节点
                cache.erase(dumHead->next->key);
                remove(dumHead->next);
  
            }
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```
[460. LFU 缓存](https://leetcode.cn/problems/lfu-cache/)(了解即可)：

> [!note]+ 原题描述
> 设计 **LFU 缓存**：满时淘汰 **使用频率最低** 的；同频淘汰 **最久未使用** 的。
>
> **约束：** `0 < capacity <= 10^4`；`0 <= key,value <= 10^5`；最多 `10^5` 次调用。

**口诀**：**key→node + freq→LRU 链 + minFreq，访问升频移链。**

keymap: key->node, freMap: freq -> LRU链表， minFreq:当前最小频率。RFU通过[key->node]和[freq->LRU链表]双哈希结构实现o(1)的访问和更新，通过维护minFreq来快速定位淘汰节点。

<!-- lc-sync: lfu-cache -->
```cpp
// AC · cpp · 2026-04-08 · 117 ms · 180 MB
struct Node {
    int key, val, freq;
    Node* prev, *next;
    Node(int k, int v):key(k), val(v),freq(1),prev(nullptr),next(nullptr) {}
};
struct Dlist {
    Node* head, *tail;
    int size;
    Dlist() {
        head = new Node(0,0);
        tail = new Node(0,0);
        head->next = tail;
        tail->prev = head;
        size = 0;
    }

    void add2head(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
        size++;
    }
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
        size--;
    }
    Node* removeTail() {
        Node* node = tail->prev;
        removeNode(node);
        return node;
    }
};

class LFUCache {
    unordered_map<int,Node*> keyMap;
    unordered_map<int,Dlist*> freqMap;
    int capacity;
    int minFreq;
public:
    LFUCache(int capacity) {
        this->capacity = capacity;
        minFreq = 0;
    }
    
    int get(int key) {
        if(!keyMap.count(key)) return -1;
        Node* node = keyMap[key];
        update(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if(capacity == 0) return;
        if(keyMap.count(key)) {
            Node* node = keyMap[key];
            node->val = value;
            update(node);
        } else {
            if(keyMap.size() == capacity) {
                Dlist* list = freqMap[minFreq];
                Node* node = list->removeTail();
                keyMap.erase(node->key);
            }
            Node* node = new Node(key, value);
            keyMap[key] = node;
            minFreq = 1;
            if(!freqMap.count(1)) freqMap[1] = new Dlist();
            freqMap[1]->add2head(node);
        }
    }
    void update(Node* node) {
        int freq = node->freq;
        Dlist* list = freqMap[freq];
        list->removeNode(node);
    if(freq == minFreq && list->size == 0) {
        minFreq++;
    }
    node->freq++;
    if(!freqMap.count(node->freq)) {
        freqMap[node->freq] = new Dlist();
    }
    freqMap[node->freq]->add2head(node);
}
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache* obj = new LFUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```
[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)

> [!note]+ 原题描述
> 实现 **Trie（前缀树）**，支持 `insert`、`search`（完整单词）、`startsWith`（前缀）。
>
> **示例：** 插入 "apple" 后，search "apple"→true，startsWith "app"→true
>
> **约束：** `1 <= word.length, prefix.length <= 2000`；仅小写英文字母；最多 `3×10^4` 次调用。

**口诀**：**26 叉数组树，节点标记是否单词结尾，沿字符走边。**
<!-- lc-sync: implement-trie-prefix-tree -->
```cpp
// AC · cpp · 2026-04-01 · 43 ms · 49.6 MB
class Trie {
private:
    struct TrieNode {
        TrieNode* children[26];
        bool isEnd;
        TrieNode(){
            isEnd = false;
            for(int i=0;i<26;i++){
                children[i]=nullptr;
            }
        }
    };
    TrieNode* root;
    TrieNode* find(string word) {
        TrieNode* tag = root;
        for(auto c : word) {
            if(tag->children[c-'a'] == nullptr) {
                return nullptr;
            }
            tag = tag->children[c-'a'];
        }
        return tag;
    }
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* tag = root;
        for(auto c : word) {
            int index = c -'a';
            if(tag->children[index] == nullptr) {
                tag->children[index] = new TrieNode();
            }
            tag = tag->children[index];
        }
        tag->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* node = find(word);
        return node!= nullptr && node->isEnd;
    }
    
    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```
