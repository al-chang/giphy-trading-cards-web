import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils";
import { useCallback, useEffect, useState } from "react";

const useFilter = <T extends Record<string, string>>(filters: T) => {
  const [filterValues, setFilterValue] = useState<T>(filters);
  const [searchParams, setSearchParams] = useSearchParams();

  const debounceSetSearchParams = useCallback(
    debounce((_searchParams: typeof searchParams) => {
      setSearchParams(_searchParams);
    }, 500),
    [setSearchParams]
  );

  type FilterChangeInput = {
    field: keyof T & string;
    value: string;
    debounce?: boolean;
  };

  const handleFilterChange = ({
    field,
    value,
    debounce,
  }: FilterChangeInput) => {
    setFilterValue((prev) => ({ ...prev, [field]: value }));
    if (!value) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, value);
    }
    debounce
      ? debounceSetSearchParams(searchParams)
      : setSearchParams(searchParams);
  };

  // Set initial filter values from search params
  useEffect(() => {
    Object.keys(filters).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        setFilterValue((prev) => ({ ...prev, [key]: value }));
      }
    });

    // Cancel debounce on unmount
    return () => {
      debounceSetSearchParams.cancel();
    };
  }, []);

  return {
    filterValues,
    handleFilterChange,
    paramValues: searchParams as { get: (key: keyof T) => string | null },
  };
};

export default useFilter;
