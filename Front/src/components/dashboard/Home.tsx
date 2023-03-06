import { useState, useEffect } from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import playerProfileServices from "services/playerProfileServices";
import styled from "styled-components";
import { PlayerProfileInterface } from "types/userTypes";
import HomeTable from "./HomeTable";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";
import HomeDropDown from "./HomeDropDown";
import HomeForm from "./HomeForm";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  gap: 10px;
`;

const TableBox = styled.div`
  width: 100%;
`;

const TemplateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  height: 50px;
`;

const FilterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  height: 50px;
`;

const Home: React.FC = () => {
  const [queryString, setQueryString] = useState("");

  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

  const [template, setTemplate] =
    useState<{ value: number; label: string } | null>(null);
  const [templates, setTemplates] = useState<
    { value: number; label: string }[]
  >([]);

  const {
    items: playerProfiles,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<PlayerProfileInterface>(
    playerProfileServices.getAllPlayerProfiles,
    queryString,
  );

  const getAllSorts = async () => {
    try {
      setSorts([
        {
          label: "Najnowsze",
          value: 0,
        },
        {
          label: "Najstarsze",
          value: 1,
        },
        {
          label: "Nazwa (A-Z)",
          value: 2,
        },
        {
          label: "Nazwa (Z-A)",
          value: 3,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSorts();
  }, []);

  const getAllTemplates = async () => {
    try {
      setTemplates([
        {
          label: "Szablon1",
          value: 0,
        },
        {
          label: "Szablon2",
          value: 1,
        },
        {
          label: "Szablon3",
          value: 2,
        },
        {
          label: "Szablon4",
          value: 3,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <Container>
      {/* <TemplateBox>
        <SelectStatystics
          name="Template"
          items={templates}
          label="Załaduj z szablonu"
          selectedItem={template}
          setSelectedItem={setTemplate}
        />
        <Button className="px-24 xl:order-2" variant={ButtonVariant.Submit}>
          Zapisz
        </Button>
      </TemplateBox> */}

      {/* <HomeDropDown label="Filtrowanie zawodników">
        <HomeForm />
      </HomeDropDown> */}

      {/* <FilterBox>
        <Button className="px-24" variant={ButtonVariant.Submit}>
          Zastostuj
        </Button>

        <SelectStatystics
          name="Sort"
          items={sorts}
          label="Sortowanie"
          selectedItem={sortBy}
          setSelectedItem={setSortBy}
        />
      </FilterBox>

      <TableBox>
        <HomeTable
          playerProfiles={playerProfiles}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
      </TableBox> */}
    </Container>
  );
};

export default Home;
