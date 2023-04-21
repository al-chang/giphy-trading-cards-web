import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils";
import { useCallback, useEffect, useState } from "react";

const useFilter = <T extends Record<string, any>>(filters: T) => {
  const [filterValue, setFilterValue] = useState<T>(filters);
  const [searchParams, setSearchParams] = useSearchParams();

  const debounceSetSearchParams = useCallback(
    debounce(setSearchParams, 500),
    []
  );

  const handleFilterChange = (field: keyof T & string, value: any) => {
    setFilterValue((prev) => ({ ...prev, [field]: value }));
    searchParams.set(field, value);
    debounceSetSearchParams(searchParams);
  };

  useEffect(() => {
    return () => {
      debounceSetSearchParams.cancel();
    };
  }, []);

  return {
    filterValue,
    handleFilterChange,
  };
};

export default useFilter;
