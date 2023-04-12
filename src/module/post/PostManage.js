// import { Pagination } from "components/pagination";
// import { Table } from "components/table";

import React from "react";
import Table from "../../table/Table";
import Pagination from "../../pagination/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import Button from "../../components/button/Button";
import { LabelStatus } from "../../components/label";
import { postStatus, userRole } from "../../utils/constants";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/auth-context";
import { debounce } from "lodash";
const POST_PER_PAGE = 10;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  async function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed ) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Bạn đã xóa bài viết thành công.", "success");
      } else {
        Swal.fire(
          "Failed!",
          "Chỉ Admin mới được phép xóa bài viết này",
          "warning"
        );
      }
    });
  }
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 250);
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const {userInfo} = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return null;

  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => {
              const date = post?.createdAt?.seconds
                ? new Date(post?.createdAt?.seconds * 1000)
                : new Date();
              const formatDate = new Date(date).toLocaleDateString("vi-VI");
              return (
                <tr key={post.id}>
                  <td>{post.id?.slice(0, 5) + "..."}</td>
                  <td className="!pr-[100px]">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{post.title}</h3>
                        <time className="text-sm text-gray-500">
                          Date: {formatDate}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.category?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.user?.username}</span>
                  </td>
                  <td>{renderPostStatus(post.status)}</td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {total > postList.length && (
        <div className="mt-10 text-center">
          <Button className="mx-auto w-[200px]" onClick={handleLoadMorePost}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
