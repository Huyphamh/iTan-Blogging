// import Heading from "components/layout/Heading";
// import Layout from "components/layout/Layout";

import { collection, onSnapshot, query, where } from "firebase/firestore";
// import PostItem from "module/post/PostItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import PostItem from "../module/post/PostItem";
import { db } from "../firebase-app/firebase-config";
import Header from "../components/layout/Header";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);
  if (posts.length <= 0) return null;
  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="pt-10"></div>
        <Heading>Danh mục {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
      </div>
  );
};

export default CategoryPage;
