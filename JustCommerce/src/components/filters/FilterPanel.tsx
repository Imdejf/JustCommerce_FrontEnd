import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActiveFilter from "./ActiveFilter";
import Button from "../common/buttons/basicButton/Button";
import DropdownPanel from "../common/panels/DropdownPanel";

import { closeFilterPanel } from "../../store/actions/ui";
import { RootState } from "../../store/store";
import { useUrlQuery } from "../../hooks/useUrlQuery";
import styled from "styled-components";

type Filter = {
  name: string;
  values?: any;
  pl?: any;
  id?: any;
  type?: string;
};

interface IFilterPanelProps {
  filters?: Array<Filter>;
}

const FilterPanel: React.FC<IFilterPanelProps> = ({ filters }) => {
  const [activeFilters, setActiveFilters] = useState<
    Array<{ name: string; value: any; pl: any; id: any }>
  >([]);

  const [isOpen, setIsOpen] = useState(false);
  const filter = useSelector((state: RootState) => state.ui.filter);
  const dispatch = useDispatch();
  const { query, changeQuery } = useUrlQuery();

  const handleFilterChange = (filter: typeof query[0], checked: any) => {
    setActiveFilters((prev: any) => {
      if (checked) {
        let obj = [...prev, filter];
        const fil = filterFun(obj);
        return [...fil];
      }
      return prev.filter(
        (f: any) =>
          !(
            f.name === filter.name &&
            f.value === filter.value &&
            f.pl === filter.pl
          ),
      );
    });
  };

  const filterFun = (arr: any) => {
    return arr
      .filter(
        //@ts-ignore
        (value, index, self) =>
          index === self.findLastIndex((t: any) => t.name === value.name),
      )
      .filter((t: any) => t.value !== "");
  };

  const removeFilter = (filter: typeof query[0]) => {
    setActiveFilters((prev) =>
      prev.filter(
        (f) =>
          !(
            f.name === filter.name &&
            f.value === filter.value &&
            f.pl === filter.pl
          ),
      ),
    );
  };

  const handleSubmit = () => {
    changeQuery(activeFilters);

    dispatch(closeFilterPanel());
  };

  useEffect(() => {
    setActiveFilters((prev: any) => {
      return [...prev];
    });
  }, [query]);

  return filter.showPanel ? (
    <div className="fixed right-0 top-0 z-40 h-screen w-96 bg-white-dirty shadow-lg py-12 px-18">
      <button onClick={() => dispatch(closeFilterPanel())}>X</button>
      <div className="flex flex-wrap gap-4 mt-4 mb-6">
        {activeFilters
          .sort(function (a, b) {
            return a.id - b.id;
          })
          .map((filter) => (
            <>
              <ActiveFilter
                removeFilter={() => removeFilter(filter)}
                filter={filter}
              />
            </>
          ))}
      </div>
      <div className="shadow">
        {filters?.map((filter, id) =>
          filter.type === "checkbox" ? (
            <DropdownPanel label={filter.pl} key={filter.id}>
              <>
                {filter?.values?.map((val: any) => (
                  <>
                    <input
                      key={filter.id}
                      type="checkbox"
                      name={filter.name}
                      id={filter.name}
                      checked={activeFilters.some(
                        (f) =>
                          f.name === filter.name && f.value === val.backend,
                      )}
                      onChange={(e) => {
                        const { checked } = e.target;
                        handleFilterChange(
                          {
                            name: filter.name,
                            value: val.backend,
                            pl: val.pl,
                            //@ts-ignore
                            id: filter.id,
                          },
                          checked,
                        );
                      }}
                    />
                    <label htmlFor={filter.name}>{val.pl}</label>
                  </>
                ))}
              </>
            </DropdownPanel>
          ) : filter.type === "select" ? (
            <DropdownPanel label={filter.pl} key={filter.id}>
              <Container
                tabIndex={0}
                onClick={() => setIsOpen((prev) => !prev)}
                onBlur={() => setIsOpen(false)}
              >
                {activeFilters.map((item) => {
                  if (item.name === filter.name) {
                    return <LabTitle>{item.pl}</LabTitle>;
                  }
                })}

                <ClearBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilters((prev) =>
                      prev.filter((f) => !(f.name === filter.name)),
                    );
                  }}
                >
                  X
                </ClearBtn>
                <Divider></Divider>
                <Caret></Caret>

                <Options className={isOpen ? "show" : ""}>
                  {filter?.values?.map((val: any) => (
                    <Option
                      onClick={(e) => {
                        e.stopPropagation();
                        const checked = true;
                        handleFilterChange(
                          {
                            name: filter.name,
                            value: val.backend,
                            pl: val.pl,
                            //@ts-ignore
                            id: filter.id,
                          },
                          checked,
                        );
                        setIsOpen(false);
                      }}
                    >
                      {val.pl}
                    </Option>
                  ))}
                </Options>
              </Container>
            </DropdownPanel>
          ) : filter.type === "date" ? (
            <>
              <DropdownPanel label={filter.pl} key={filter.id}>
                <DateContainer>
                  <DataInput
                    key={id}
                    type="date"
                    name={filter.name}
                    id={filter.name}
                    value={
                      filter.name === "From"
                        ? activeFilters.find((obj) => obj.name === "From")
                          ? activeFilters.find((obj) => obj.name === "From")
                              ?.value
                          : ""
                        : filter.name === "To"
                        ? activeFilters.find((obj) => obj.name === "To")
                          ? activeFilters.find((obj) => obj.name === "To")
                              ?.value
                          : ""
                        : ""
                    }
                    onChange={(e) => {
                      const checked = true;
                      handleFilterChange(
                        {
                          name: filter.name,
                          //@ts-ignore
                          value: e.target.value,
                          pl: filter.pl,
                          //@ts-ignore
                          id: filter.id,
                        },
                        checked,
                      );
                    }}
                  />
                  <DataLabel htmlFor={filter.name}>{filter.pl}</DataLabel>
                </DateContainer>
              </DropdownPanel>
            </>
          ) : filter.type === "rangeOfAmount" ? (
            <DropdownPanel label={filter.pl} key={filter.id}>
              <AmountContainer>
                <AmountInput
                  key={id}
                  type="text"
                  name={filter.name}
                  id={filter.name}
                  value={
                    activeFilters.find((obj) => obj.name === filter.name)?.value
                  }
                  onChange={(e) => {
                    const checked = true;
                    //@ts-ignore
                    if (e.target.value < 0) {
                      return;
                    }
                    handleFilterChange(
                      {
                        name: filter.name,
                        //@ts-ignore
                        value: e.target.value,
                        pl: filter.pl,
                        //@ts-ignore
                        id: filter.id,
                      },
                      checked,
                    );
                  }}
                />
                <AmountLabel htmlFor={filter.name}>{filter.pl}</AmountLabel>
              </AmountContainer>
            </DropdownPanel>
          ) : (
            <></>
          ),
        )}
      </div>
      <div>
        <Button style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Zastosuj
        </Button>
      </div>
    </div>
  ) : null;
};

export default FilterPanel;

const AmountContainer = styled.div`
  min-height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(90, 90, 100, 0.3);
  border-radius: 14px;
  width: 150px;
  margin: 20px 0;
`;
const AmountInput = styled.input`
  background-color: transparent;
  /* &::-webkit-calendar-picker-indicator {
    margin-right: 15px;
  } */
  padding: 0 10px;
`;
const AmountLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 20px;
  background-color: rgba(255, 255, 255);
  color: rgba(50, 50, 55, 0.7);
  font-size: 0.75rem;
`;

const DateContainer = styled.div`
  min-height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(90, 90, 100, 0.3);
  border-radius: 14px;
  min-width: 200px;
  margin: 20px 0;
`;
const DataLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 20px;
  background-color: rgba(255, 255, 255);
  color: rgba(50, 50, 55, 0.7);
  font-size: 0.75rem;
`;

const DataInput = styled.input`
  background-color: transparent;
  /* &::-webkit-calendar-picker-indicator {
    margin-right: 15px;
  } */
  padding: 0 10px;
`;

const Container = styled.div`
  position: relative;
  width: 20em;
  height: 3em;
  border: 1px solid rgba(90, 90, 100, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border-radius: 14px;
  outline: none;
  margin-bottom: 20px;
  &:focus {
    //if needed
  }
`;
const LabTitle = styled.span`
  flex-grow: 1;
`;

const ClearBtn = styled.button`
  background: none;
  color: rgb(118, 118, 118);
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.25em;
  &:focus,
  &:hover {
    color: #333;
  }
`;

const Divider = styled.div`
  background-color: rgb(118, 118, 118);
  align-self: stretch;
  width: 0.05em;
`;
const Caret = styled.div`
  translate: 0 25%;
  border: 0.25em solid transparent;
  border-top-color: rgb(118, 118, 118);
`;

const Options = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  border: 0.05em solid rgb(118, 118, 118);
  border-radius: 0.25em;
  width: 100%;
  height: 300px;
  left: 0;
  top: calc(100% + 0.25em);
  background-color: #fff;
  z-index: 100;
  display: none;
  &.show {
    display: block;
  }
`;
const Option = styled.li`
  padding: 0.25em 0.5em;
  cursor: pointer;
  &.choosed {
    //meybe
  }
  &.selected {
    //cos tam
  }
`;
