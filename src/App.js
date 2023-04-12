import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import DashboardPage from "./module/dashboard/DashboardPage";
import PostUpdate from "./module/post/PostUpdate";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import UserManage from "./module/user/UserManage";
import UserAddNew from "./module/user/UserAddNew";
import UserUpdate from "./module/user/UserUpdate";
import PageNotFound from "./pages/PageNotFound";
import PostDetailsPage from "./pages/PostDetailsPage";
import CategoryPage from "./pages/CategoryPage";



function App() {
  return (
    <div>
      
      <AuthProvider></AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>} />
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route
          path="/category/:slug"
          element = {<CategoryPage></CategoryPage>}
        ></Route>
        <Route
          path="/:slug"
          element = {<PostDetailsPage></PostDetailsPage>}
        ></Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/posts"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            path="/manage/update-posts"
            element={<PostUpdate></PostUpdate>}
          ></Route>
          <Route
            path="/manage/add-posts"
            element={<PostAddNew></PostAddNew>}
          ></Route>
          <Route
            path="/manage/update-post"
            element={<PostUpdate></PostUpdate>}
          ></Route>
          <Route
            path="/manage/add-category"
            element={<CategoryAddNew></CategoryAddNew>}
          ></Route>
          <Route
            path="/manage/category"
            element={<CategoryManage></CategoryManage>}
          ></Route>
          <Route
            path="/manage/update-category"
            element={<CategoryUpdate></CategoryUpdate>}
          ></Route>
          <Route
            path="/manage/user"
            element={<UserManage></UserManage>}
          ></Route>
          <Route
            path="/manage/add-user"
            element={<UserAddNew></UserAddNew>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<UserUpdate></UserUpdate>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
