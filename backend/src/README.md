## 目录结构

### 1. **`/models` 目录**
- **职责**：包含与数据操作和数据库交互相关的逻辑。

### 2. **`/services` 目录**
- **职责**：包含应用的业务逻辑，如处理数据验证、业务规则等。

### 3. **`/controllers` 目录**
- **职责**：负责处理来自客户端的请求，调用服务层的逻辑，并返回适当的响应。

### 4. **`/api` 目录**
- **职责**：定义应用的路由（URL路径和HTTP方法），并将请求映射到相应的控制器函数。
