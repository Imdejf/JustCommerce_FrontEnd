import {
  useState,
  SyntheticEvent,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import cs from "classnames";

import useDetectOutsideClick from "../../../../hooks/useOutsideDetectClick";
import { SelectProfilesInterface } from "../inputTypes";
import SelectSearchInput from "./SelectSearchInput";
import ErrorMessage from "../ErrorMessage";
import InputOutline from "../InputOutline";

import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg";

//TODO: rebuild this to input with fieldWithErrors
const SelectProfiles = ({
  className = "",
  disabled,
  defaultValue,
  error,
  helperText,
  isSearchable,
  items,
  label,
  name,
  onlyPickValue,
  placeholder,
  showErrors = true,
  style = {},
  optionClassName = "",
  wrapperClassName = "",
  selectedItem,
  setSelectedItem,
  onChange,
  ...props
}: SelectProfilesInterface): JSX.Element => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryHasChanged = useRef(false);
  const itemsListRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () =>
      items
        .filter(
          (item) =>
            !isSearchable ||
            item.label
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase()),
        )
        .sort((a, b) => a.label.localeCompare(b.label)),
    [isSearchable, items, searchQuery],
  );

  const showError = Boolean(error);

  const handleFocus = () => {
    if (disabled) return;
    setIsActive(!isActive);
  };

  //TODO: handle this with custom hook
  const handleBlur = useCallback(
    (e: SyntheticEvent) => {
      if (disabled) return;
      setIsActive(false);
    },
    [disabled],
  );

  const handleChange = (item: { label: string; value: number }) => {
    if (disabled) return;
    setSelectedItem(item);
  };

  const handleSearchChange = (query: string) => {
    if (disabled) return;
    searchQueryHasChanged.current = true;
    setSearchQuery(query);
  };

  const highlightItem = (index: number) => {
    if (index < 0 || index > filteredItems.length) return;
    setActiveItemIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    const index = activeItemIndex || 0;

    switch (e.key) {
      case "ArrowDown":
        highlightItem(index + 1);
        break;
      case "ArrowUp":
        highlightItem(index - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (activeItemIndex !== null) {
          handleChange(filteredItems[activeItemIndex]);
          setIsActive(false);
        }
        setActiveItemIndex(null);
        break;

      default:
        break;
    }
  };

  useDetectOutsideClick(selectRef, handleBlur);

  useEffect(() => {
    const selected = items.find((item) => item.value === defaultValue);
    setSelectedItem(selected || null);
  }, [defaultValue, items]);

  useEffect(() => {
    if (onChange && selectedItem) {
      onChange(selectedItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    if (activeItemIndex === null || !itemsListRef.current) {
      return;
    }
    const activeNode = itemsListRef.current.children[activeItemIndex];
    activeNode.scrollIntoView({
      block: "nearest",
    });
  }, [activeItemIndex]);

  useEffect(() => {
    if (searchQueryHasChanged.current) {
      setActiveItemIndex(0);
    }
  }, [filteredItems]);

  const wrapperClasses = cs("text-sm relative", {
    [wrapperClassName]: wrapperClassName,
  });

  const inputClasses = cs("formControl py-12 px-18 cursor-pointer", {
    "formControl--hasValue": !onlyPickValue && (!!selectedItem || placeholder),
    "formControl--hasError": showError,
    "formControl--disabled": disabled,
    [className]: className,
  });

  return (
    <div
      className={wrapperClasses}
      style={{ ...style }}
      ref={selectRef}
      onKeyDown={handleKeyDown}
    >
      <div
        aria-disabled={disabled}
        onClick={handleFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputClasses}
        data-testid="selectInput"
        style={{
          minHeight: "40.5px",
        }}
      >
        <InputOutline name={name} label={label} />
        <div data-testid="selectValue" className={optionClassName}>
          {!onlyPickValue && (selectedItem?.label || placeholder)}
        </div>
        <div className="absolute top-0 bottom-0 flex items-center right-3">
          <Arrow
            className={`duration-100 transition-transform transform ${
              isActive ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
      </div>
      <div
        data-testid="selectOptions"
        className={`${
          isActive ? "" : "hidden"
        } bg-white border border-gray border-opacity-50 mt-1 rounded-sm flex-col absolute z-40 left-0 right-0 cursor-pointer text-sm`}
      >
        {isSearchable && (
          <SelectSearchInput
            isActive={isActive}
            onQueryChange={handleSearchChange}
          />
        )}
        <div
          className="overflow-y-auto overflow-hidden max-h-52 relative"
          ref={itemsListRef}
        >
          {filteredItems.length ? (
            filteredItems.map((item, idx) => (
              <div
                key={`${item.label}${item.value}`}
                data-index={idx}
                className={cs(
                  "text-xs px-18 py-8 hover:text-white hover:bg-blue-dark",
                  {
                    "bg-blue text-white": activeItemIndex === idx,
                    [optionClassName]: optionClassName,
                  },
                )}
                onClick={(e) => {
                  handleChange(item);
                  handleBlur(e);
                }}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className={`text-xs px-18 py-8`}>No results</div>
          )}
        </div>
      </div>
      {showErrors && (
        <ErrorMessage
          message={error}
          show={showError}
          helperText={helperText}
        />
      )}
    </div>
  );
};

export default SelectProfiles;
