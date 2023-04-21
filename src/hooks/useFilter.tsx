import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils";
import { useCallback, useEffect, useState } from "react";

const useFilter = <T extends Record<string, string>>(filters: T) => {
  const [filterValues, setFilterValue] = useState<T>(filters);
  const [debouncedFilterValues, setDebouncedFilterValues] =
    useState<T>(filters);
  const [searchParams, setSearchParams] = useSearchParams();

  const debounceSetSearchParams = useCallback(
    debounce(
      (
        _searchParams: typeof searchParams,
        _value: Record<keyof T & string, string>
      ) => {
        setSearchParams(searchParams);
        setDebouncedFilterValues((prev) => ({ ...prev, ..._value }));
      },
      500
    ),
    [setFilterValue, setDebouncedFilterValues]
  );

  const handleFilterChange = (field: keyof T & string, value: string) => {
    setFilterValue((prev) => ({ ...prev, [field]: value }));
    if (!value) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, value);
    }
    debounceSetSearchParams(searchParams, { [field]: value });
  };

  useEffect(() => {
    return () => {
      debounceSetSearchParams.cancel();
    };
  }, []);

  return {
    filterValues,
    handleFilterChange,
    debouncedFilterValues,
  };
};

export default useFilter;
