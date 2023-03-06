import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import qs from "qs";

import {
  IListPageMeta,
  IListPageRequest,
  IListPageResponse,
} from "../types/globalTypes";
import { string } from "yup";

const useInfiniteScroll = <T>(
  action: (pageInfo: IListPageRequest) => Promise<IListPageResponse<T>>,
  query: string,
  payloadName?: string,
  payload?: string,
  storeId?: string,
  pageSize = 50,
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Array<T>>([]);
  const [metaInfo, setMetaInfo] = useState<IListPageMeta>({
    pageNumber: 1,
    hasNextPage: true,
    hasPreviousPage: false,
  });

  const containerRef = useRef<any | null>(null);
  const { search } = useLocation();

  const handleRequest = useCallback(
    (SearchQuery = "") => {
      setLoading(true);

      const filters = qs.parse(search.replace("?", ""));
      action({
        pageNumber: metaInfo.pageNumber,
        pageSize,
        storeId,

        [payloadName as string]: payload,
        ...(SearchQuery && { SearchQuery }),
        ...filters,
      })
      .then((res) => {
        const { items, ...meta } = res;
        const { hasNextPage, hasPreviousPage } = meta;

        setItems((prev) => [...prev, ...items]);
        setMetaInfo((prev) => ({ ...prev, hasPreviousPage, hasNextPage }));
      })
        .catch((e) => {
          // if (axios.isCancel(e)) return;
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [action, metaInfo.pageNumber, pageSize, storeId, search],
  );

  useEffect(() => {
    setItems([]);
    setMetaInfo((prev) => ({ ...prev, pageNumber: 1 }));
  }, [query, search]);

  useEffect(() => {
    handleRequest(query);
  }, [handleRequest, query, search]);

  const lastItemRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (containerRef?.current?.disconnect) {
        containerRef.current.disconnect();
      }

      containerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && metaInfo.hasNextPage) {
          setMetaInfo((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
        }
      });
      if (node) containerRef.current.observe(node);
    },
    [containerRef, loading, metaInfo.hasNextPage],
  );

  return { loading, error, items, metaInfo, containerRef, lastItemRef };
};

export default useInfiniteScroll;
