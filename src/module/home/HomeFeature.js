import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/layout/Heading";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const HomeFeatureStyles = styled.div`
  margin-bottom: 25px;
  height: 260px;
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const coRef = collection(db, "posts");
    const queries = query(
      coRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nỗi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};
// Example of error boundary
export default HomeFeature;
