import { useState, useEffect } from "react";
import styled from "styled-components";
import TabContent from "components/common/tabs/TabContent";
import {
  Line,
  Bar,
  Bubble,
  Chart,
  PolarArea,
  Radar,
  Scatter,
  ChartProps,
  Doughnut,
  Pie,
} from "react-chartjs-2";
import { Chart as ChartJS, defaults, registerables } from "chart.js";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";
import TextInput from "components/common/inputs/textInput/TextInput";
import StatisticsTextInput from "components/common/inputs/textInput/StatisticsTextInput";

const TimeButton = styled.button<{ isActive: boolean }>`
  height: 45px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isActive ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.05)"};
  font-size: 12px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const StatisticsTab = () => {
  ChartJS.register(...registerables);

  const daily = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const weekly = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];
  const monthly = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const yearly = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Pazdziernik",
    "Listopad",
    "Grudzień",
  ];

  const defaults = ChartJS.defaults;
  defaults.plugins.legend.display = false;

  const [labels, setLabels] = useState(monthly);
  const [chartTypes, setChartTypes] = useState<
    { value: string; label: string }[]
  >([]);
  const [chartType, setChartType] = useState<{
    value: string;
    label: string;
  } | null>({ label: "Liniowy", value: "line" });

  const [statysticsTypes, setStatysticsTypes] = useState<
    { value: string; label: string }[]
  >([]);
  const [statysticsType, setStatysticsType] =
    useState<{
      value: string;
      label: string;
    } | null>(null);

  const [trends, setTrends] = useState<{ value: string; label: string }[]>([]);
  const [trend, setTrend] =
    useState<{
      value: string;
      label: string;
    } | null>(null);

  const [availableFrom, setAvailableFrom] = useState("2022-08-02");
  const [availableTo, setAvailableTo] = useState("2022-09-02");
  const [isActive, setIsActive] = useState(2);

  const getAllChartTypes = async () => {
    try {
      setChartTypes([
        {
          label: "Liniowy",
          value: "line",
        },
        {
          label: "Blokowy",
          value: "bar",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChartTypes();
  }, []);

  const getAllStatisticsTypes = async () => {
    try {
      setStatysticsTypes([
        {
          label: "Badania okresowe",
          value: "medical",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStatisticsTypes();
  }, []);

  const getAllTrends = async () => {
    try {
      setTrends([
        {
          label: "Waga",
          value: "weight",
        },
        {
          label: "Wzrost",
          value: "height",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTrends();
  }, []);

  const options = {
    legend: {
      display: false,
      position: "bottom",
    },
    // responsive: true,
    aspectRatio: 3.6,
    interaction: {
      mode: "index" as const,
      intersect: true,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: "Badania okresowe",
      },
    },
    scales: {
      weight: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      height: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      trend?.value === "weight"
        ? {
            data: [
              65, 56, 54, 58, 60, 62, 60, 59, 64, 65, 68, 70, 65, 56, 54, 58,
              60, 62, 60, 59, 64, 65, 68, 70, 72, 74, 76, 80, 82, 78, 72,
            ],
            borderColor: "rgb(252, 142, 33)",
            backgroundColor: "rgba(252, 142, 33, 0.5)",
            label: "Waga",
            tension: 0.5,
          }
        : {
            data: [
              155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 163,
              163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 178, 178, 178,
              178, 178, 178, 178, 178,
            ],
            label: "Wzrost",
            borderColor: "rgb(41, 112, 243)",
            backgroundColor: "rgba(41, 112, 243, 0.7)",
            // tension: 0.1,
          },
    ],
  };

  return (
    <TabContent id="statistics">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 0px 20px 0px",
        }}
      >
        <p style={{ maxWidth: "60%", color: "red", fontSize: "8px" }}>
          {" "}
          UWAGA! Dane nie zostały zaktualizowane od roku. Za miesiąc zostaną
          usunięte z naszej bazy danych. Skontaktuj się z administratorem
          systemu lub sprawdź połączenie z urządzeniem użytkownika aby wskazać,
          czy nadal korzysta i wyeliminować również czynnik błędu na linii
          transmisji danych pomiędzy właścicielem, a aplikacją.
        </p>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <SelectStatystics
            items={statysticsTypes}
            label="Statystyki"
            defaultValue={"medical"}
            className={"min-w-160"}
            // @ts-ignore
            selectedItem={statysticsType}
            // @ts-ignore
            setSelectedItem={setStatysticsType}
          />

          <Button
            variant={ButtonVariant.Submit}
            className="flex-1 md:flex-grow-0 py-8 px-18"
          >
            Zaczytaj
          </Button>
        </div>
      </div>

      <div
        className="px-4 bg-white opacity-80 rounded-t-sm"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ marginLeft: "13px", fontSize: "14px" }}>Badania okresowe</p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            // padding: "0 18px",
          }}
        >
          <StatisticsTextInput
            name="AvailableFrom"
            label={"Od"}
            type="date"
            value={availableFrom}
            className={"min-w-120"}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
          <StatisticsTextInput
            name="AvailableTo"
            label={"Do"}
            type="date"
            className={"min-w-120"}
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
          />

          <SelectStatystics
            defaultValue={"weight"}
            items={trends}
            className={"min-w-120 h-30"}
            label="Trend"
            // @ts-ignore
            selectedItem={trend}
            // @ts-ignore
            setSelectedItem={setTrend}
          />

          {/* <SelectStatystics
            defaultValue={"line"}
            items={chartTypes}
            className={"min-w-120"}
            label="Typ wykresu"
            // @ts-ignore
            selectedItem={chartType}
            // @ts-ignore
            setSelectedItem={setChartType}
          /> */}

          <TimeButton
            isActive={isActive === 0}
            onClick={() => {
              setLabels(daily);
              setIsActive(0);
            }}
          >
            Dzień
          </TimeButton>

          <TimeButton
            isActive={isActive === 1}
            onClick={() => {
              // @ts-ignore
              setLabels(weekly);
              setIsActive(1);
            }}
          >
            Tydzień
          </TimeButton>
          <TimeButton
            isActive={isActive === 2}
            onClick={() => {
              setLabels(monthly);
              setIsActive(2);
            }}
          >
            Miesiąc
          </TimeButton>

          <TimeButton
            isActive={isActive === 3}
            onClick={() => {
              // @ts-ignore
              setLabels(yearly);
              setIsActive(3);
            }}
          >
            Rok
          </TimeButton>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 9px",
          background: "rgba(255,255,255,0.2)",
          fontSize: "12px",
        }}
      >
        <p>25 treningów</p>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <p style={{ color: "rgb(252, 142, 33)" }}>max. 0km/h</p>
          <p>średnia 7km/h</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {chartType?.value === "line" ? (
          <Line options={options} data={data} />
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </TabContent>
  );
};

export default StatisticsTab;
