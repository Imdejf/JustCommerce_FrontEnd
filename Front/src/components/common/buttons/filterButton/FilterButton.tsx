import { useDispatch } from "react-redux";
import { useUrlQuery } from "../../../../hooks/useUrlQuery";
import { showFilterPanel } from "../../../../store/actions/ui";
import Button from "../basicButton/Button";
import { ButtonVariant } from "../buttonTypes";

const FilterButton = () => {
  const dispatch = useDispatch();
  const { query } = useUrlQuery();

  const filtersCount = query.filter((el) => el.name !== "tab").length;

  return (
    <Button
      className="px-18"
      onClick={() => dispatch(showFilterPanel())}
      variant={ButtonVariant.Submit}
    >
      <span>Filtruj</span>
      <span className="grid place-items-center leading-3 transform -translate-y-1 translate-x-1 bg-white text-black rounded-full w-3 h-3 text-xxs">
        {filtersCount}
      </span>
    </Button>
  );
};

export default FilterButton;
