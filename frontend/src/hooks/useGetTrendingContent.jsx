import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetTrendingContent = () => {
  const contentType = useSelector((state) => state.content.contentType);
  const [trendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);

        setTrendingContent(res.data.content);
      } catch (error) {}
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
