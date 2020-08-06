
url：`http://localhost:3000/api`

### 获取商品列表

GET `/product/list`
请求参数：
    `_page`：页数，
    `_limit`：每页多少数据



### 改变商品状态

POST `/product/changeStatus`
请求参数：
    `product_num`：产品编号
    `status`：状态



### 修改产品信息

POST `/product/modifiedProduct`
请求参数：
    `product_num`：产品编号
    `product_name`：产品名称
    `original_price`：原价格
    `present_price`：现价



### 删除商品

POST `/product/deleteProduct`
请求参数：
    `product_num`：产品编号
    
    
### 登录

POST `/login`
请求参数：
    `user`：用户名    
    `pwd`：密码    
    
### 获取当前用户信息

POST `/existLogin`
请求参数：
    header：携带Token
    
    
### 获取所有用户信息
POST `/getUserData`
请求参数：
    header：携带Token
    `_page`：页数，
    `_limit`：每页多少数据
    
    
### 改变用户数据
POST `/changeUserData`
请求参数：
    header：携带Token
    `user`：用户名
    `sex`：性别
    `age`：年龄
    `tel`：手机号
    `email`：邮箱
    `qq`：QQ
    `power`：权限
    
### 删除用户
POST `/deleteUserData`
请求参数：
    header：携带Token
    `user`：用户名(删除,多个传入数组)