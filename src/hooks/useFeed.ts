import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Story } from '../utils/types';

interface FeedResponse {
  hits: Story[];
  nbPages: number;
  page: number;
}

const fetchStories = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const { data } = await axios.get<FeedResponse>(
    `https://hn.algolia.com/api/v1/search?tags=story&page=${pageParam}&hitsPerPage=20`
  );
  return data;
};

export const useFeed = () => {
  return useInfiniteQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 < lastPage.nbPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};