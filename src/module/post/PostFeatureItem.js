import styled from "styled-components";
import React from "react";
import PostCategory from "./Postcategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-category {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      background-color: #f3f3f3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostFeatureItem = ({ data }) => {
//   const [category, setCategory] = useState("");
//   const [user, setUser] = useState("");
//   useEffect(() => {
//     async function fetch() {
//       const docRef = doc(db, "categories", data.categoryID);
//       const docSnap = await getDoc(docRef);
//       setCategory(docSnap.data());
//     }
//     fetch();
//   }, [data.categoryID]);
  // useEffect(() => {
  //   async function fetchUser() {
  //     if (data.userId) {
  //       const docRef = doc(db, "users", data.userId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.data) {
  //         setUser(docSnap.data());
  //       }
  //     }
  //   }
  //   fetchUser();
  // }, [data.userId]);

  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const {category, user} = data;
  return (
    <PostFeatureItemStyles>
      <PostImage alt="unsplash" url={data.image}></PostImage>
      <div className="post-overplay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            to={slugify(user?.fullname || "", { lower: true })}
            authorName={user?.fullname}
            date={formatDate}
            // date={data.createdAt || ""}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug} size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};
// Example of error boundary
export default PostFeatureItem;
