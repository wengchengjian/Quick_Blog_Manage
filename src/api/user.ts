import request from "@/utils/request";


export const getToken = async (username: string, password: string) => await request.post("/api/login", {
  username, password
})

export const login = async (username: string, password: string) => {
  const  data  = await getToken(username, password);
  const token = data;
  //设置请求头
  request.setAuth(token);
  // token放到localStorage存储
  localStorage.setItem("self_blog_token", token);
}

export const logout = async () => {

  await request.get("/api/logout");
  //删除请求头，后端可以优化，不必删除请求头
  request.setAuth("");
  //删除本地缓存
  localStorage.removeItem("self_blog_token");
}


export const getCurrentUserInfo = async () => await request.get("/api/admin/sys/user/info");



export const queryUsersByPage = (pageNum?: number, pageSize?: number, userName?: string) => request.get("/api/admin/sys/user/list", {
  pageNum, pageSize, userName
})

export const updatePassword = (oldPassword: string, newPassword: string) => request.put("/api/admin/sys/user/password", {
  oldPassword, newPassword
})
