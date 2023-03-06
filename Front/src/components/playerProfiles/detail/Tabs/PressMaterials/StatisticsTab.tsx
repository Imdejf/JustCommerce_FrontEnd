// @ts-nocheck
import { useState, useEffect, useRef } from "react";
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
import { PlayerProfileDetailInterface } from "types/userTypes";
import playerProfileServices from "services/playerProfileServices";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showServerErrors } from "utils/errorsUtils";

const TimeInput = styled.input`
  height: 40.5px;
  width: 100px;
  border-radius: 14px;
  line-height: 1rem;
  background: white;
  border: 1px solid lightgray;
  padding: 5px 12px;
  font-size: 14px;
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const LeftArrow = styled.button`
  position: absolute;
  left: -20px;
  top: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  color: blue;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 18px;
  padding-right: 3px;
  pointer-events: all;
  user-select: none;
  padding-bottom: 2px;
`;

const RightArrow = styled(LeftArrow)`
  left: unset;
  right: -20px;
  padding-right: unset;
  padding-left: 3px;
`;

interface Props {
  playerProfile: PlayerProfileDetailInterface;
  ownerId: string;
}

const StatisticsTab: React.FC<Props> = ({ playerProfile, ownerId }) => {
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  );
  // const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));

  const [timeFrom, setTimeFrom] = useState("00:00");
  const [timeTo, setTimeTo] = useState("00:00");

  const [labels, setLabels] = useState<any>();

  const arrowLeftFn = () => {
    setUpdateDays(false);
    if (periodType?.value === "week") {
      setDateFrom(
        new Date(new Date(dateFrom).getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
      setDateTo(
        new Date(new Date(dateTo).getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
    }

    if (periodType?.value === "month") {
      setDateFrom(
        new Date(new Date(dateFrom).getTime() - 28 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
      setDateTo(
        new Date(new Date(dateTo).getTime() - 28 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
    }

    if (periodType?.value === "year") {
      setDateFrom(
        new Date(new Date(dateFrom).getTime() - 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
      setDateTo(
        new Date(new Date(dateTo).getTime() - 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      );
    }

    if (periodType?.value === "custom") {
      setDateFrom(
        new Date(
          new Date(dateFrom).getTime() - daysBetweenDates * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .slice(0, 10),
      );
      setDateTo(
        new Date(
          new Date(dateTo).getTime() - daysBetweenDates * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .slice(0, 10),
      );
    }
  };
  // max={new Date().toISOString().slice(0, 10)}
  const arrowRightFn = () => {
    setUpdateDays(false);

    if (periodType?.value === "week") {
      if (
        new Date(dateTo).getTime() + 7 * 24 * 60 * 60 * 1000 >=
        new Date().getTime()
      ) {
        setDateFrom(
          new Date(new Date(dateFrom).getTime()).toISOString().slice(0, 10),
        );

        setDateTo(new Date().toISOString().slice(0, 10));
      } else {
        setDateFrom(
          new Date(new Date(dateFrom).getTime() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );

        setDateTo(
          new Date(new Date(dateTo).getTime() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
      }
    }

    if (periodType?.value === "month") {
      if (
        new Date(dateTo).getTime() + 28 * 24 * 60 * 60 * 1000 >=
        new Date().getTime()
      ) {
        setDateFrom(
          new Date(new Date(dateFrom).getTime()).toISOString().slice(0, 10),
        );

        setDateTo(new Date().toISOString().slice(0, 10));
      } else {
        setDateFrom(
          new Date(new Date(dateFrom).getTime() + 28 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );

        setDateTo(
          new Date(new Date(dateTo).getTime() + 28 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
      }
    }

    if (periodType?.value === "year") {
      if (
        new Date(dateTo).getTime() + 365 * 24 * 60 * 60 * 1000 >=
        new Date().getTime()
      ) {
        setDateFrom(
          new Date(new Date(dateFrom).getTime()).toISOString().slice(0, 10),
        );

        setDateTo(new Date().toISOString().slice(0, 10));
      } else {
        setDateFrom(
          new Date(new Date(dateFrom).getTime() + 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );

        setDateTo(
          new Date(new Date(dateTo).getTime() + 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
      }
    }

    if (periodType?.value === "custom") {
      if (
        new Date(dateTo).getTime() + daysBetweenDates * 24 * 60 * 60 * 1000 >=
        new Date().getTime()
      ) {
        setDateFrom(
          new Date(new Date(dateFrom).getTime()).toISOString().slice(0, 10),
        );

        setDateTo(new Date().toISOString().slice(0, 10));
      } else {
        setDateFrom(
          new Date(
            new Date(dateFrom).getTime() +
              daysBetweenDates * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .slice(0, 10),
        );

        setDateTo(
          new Date(
            new Date(dateTo).getTime() + daysBetweenDates * 24 * 60 * 60 * 1000,
          )
            .toISOString()
            .slice(0, 10),
        );
      }
    }
  };

  ChartJS.register(...registerables);
  // ChartJS.register(moveChart);
  const [statysticsTypes, setStatysticsTypes] = useState<
    { value: string; label: string }[]
  >([]);

  const [statysticsType, setStatysticsType] =
    useState<{
      value: string;
      label: string;
    } | null>(null);
  const [medicalCard, setMedicalCard] = useState<any>([]);
  const [deltaSpeedData, setDeltaSpeedData] = useState<any>([]);
  const [deltaDistanceData, setDeltaDistanceData] = useState<any>([]);
  const [deltaHeartRateData, setDeltaHeartRateData] = useState<any>([]);
  const [deltaCaloriesData, setDeltaCaloriesData] = useState<any>([]);
  const [deltaHSRData, setDeltaHSRData] = useState<any>([]);
  const { id } = useParams<{ id: string }>();

  const chartLineRef = useRef<ChartJS>(null);
  const chartLine = chartLineRef.current;

  const chartBarRef = useRef<ChartJS>(null);
  const chartBar = chartBarRef.current;

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  const getDateAndTimeInHours = (startDate, endDate) => {
    const array = [];
    const msInHour = 1000 * 60 * 60;
    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();

    for (let i = startTime + msInHour; i <= endTime + msInHour; i += msInHour) {
      array.push(new Date(i).toISOString());
    }
    return array;
  };

  const getDateWithMonth = (startDate, endDate) => {
    const array = [];
    const msInHour = 1000 * 60 * 60;
    const msInMonth = 28 * 24 * 1000 * 60 * 60;
    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();

    for (
      let i = startTime + msInHour;
      i <= endTime + msInHour;
      i += msInMonth
    ) {
      array.push(new Date(i).toISOString());
    }
    return array;
  };

  const getDateAndTimeInMins = (startDate, endDate) => {
    const array = [];
    const msInMin = 1000 * 60;
    const msInHour = 1000 * 60 * 60;
    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();

    for (let i = startTime + msInHour; i <= endTime + msInHour; i += msInMin) {
      array.push(new Date(i).toISOString());
    }
    return array;
  };

  const getLabels = (dateFrom, dateTo, timeFrom, timeTo) => {
    const dates = getDates(new Date(dateFrom), new Date(dateTo));

    const datesWithTimeInHours = getDateAndTimeInHours(
      new Date(`${dateFrom}T${timeFrom}:00`),
      new Date(`${dateTo}T${timeTo}:00`),
    );

    const datesWithTimeInMins = getDateAndTimeInMins(
      new Date(`${dateFrom}T${timeFrom}:00`),
      new Date(`${dateTo}T${timeTo}:00`),
    );

    const datesWithMonth = getDateWithMonth(
      new Date(`${dateFrom}T${timeFrom}:00`),
      new Date(`${dateTo}T${timeTo}:00`),
    );

    const array = [];
    if (statysticsType?.value === "medical") {
      dates.forEach(function (date) {
        array.push(
          new Date(date.getTime())
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-"),
        );
      });
    } else {
      if (
        //minuty

        new Date(`${dateTo}T${timeTo}:00`).getTime() -
          new Date(`${dateFrom}T${timeFrom}:00`).getTime() <=
        180 * 60 * 1000
      ) {
        setInterval(10);
        datesWithTimeInMins.forEach(function (dateWithTime) {
          const date = new Date(dateWithTime)
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-");
          const time = new Date(dateWithTime)
            .toISOString()
            .split("T")[1]
            .slice(0, 5);
          array.push(`${date} ${time}`);
        });
        //godziny
      } else if (
        new Date(`${dateTo}T${timeTo}:00`).getTime() -
          new Date(`${dateFrom}T${timeFrom}:00`).getTime() <=
        3 * 24 * 60 * 60 * 1000
      ) {
        setInterval(20);
        datesWithTimeInHours.forEach(function (dateWithTime) {
          const date = new Date(dateWithTime)
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-");
          const time = new Date(dateWithTime)
            .toISOString()
            .split("T")[1]
            .slice(0, 2);
          array.push(`${date} ${time}:00`);
        });
      }
      //miesiace
      else if (
        new Date(`${dateTo}T${timeTo}:00`).getTime() -
          new Date(`${dateFrom}T${timeFrom}:00`).getTime() >=
        87 * 24 * 60 * 60 * 1000
      ) {
        setInterval(101);
        datesWithMonth.forEach(function (dateWithTime) {
          const date = new Date(dateWithTime)
            .toISOString()
            .slice(0, 7)
            .split("-")
            .reverse()
            .join("-");
          array.push(date);
        });
      } else {
        //dni
        setInterval(99);
        dates.forEach(function (date) {
          array.push(
            new Date(date.getTime())
              .toISOString()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-"),
          );
        });
      }
    }

    return array;
  };

  useEffect(() => {
    setLabels(getLabels(dateFrom, dateTo, timeFrom, timeTo));
  }, [dateFrom, dateTo, timeFrom, timeTo, statysticsType]);

  const defaults = ChartJS.defaults;
  // defaults.plugins.legend.display = false;

  const [weight, setWeight] = useState([]);

  const [weightAvgData, setWeightAvgData] = useState([]);

  const [height, setHeight] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [distance, setDistance] = useState([]);
  const [pulse, setPulse] = useState([]);
  const [calories, setCalories] = useState([]);
  const [HSR, setHSR] = useState([]);

  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [avgWeight, setAvgWeight] = useState(0);

  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [avgHeight, setAvgHeight] = useState(0);

  const [minHSR, setMinHSR] = useState(0);
  const [maxHSR, setMaxHSR] = useState(0);
  const [avgHSR, setAvgHSR] = useState(0);

  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);

  const [minDistance, setMinDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const [avgDistance, setAvgDistance] = useState(0);

  const [minPulse, setMinPulse] = useState(0);
  const [maxPulse, setMaxPulse] = useState(0);
  const [avgPulse, setAvgPulse] = useState(0);

  const [maxPulseData, setMaxPulseData] = useState(0);

  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [avgCalories, setAvgCalories] = useState(0);

  const [interval, setInterval] = useState(99);

  const [daysBetweenDates, setDaysBetweenDates] = useState(0);
  const [updateDays, setUpdateDays] = useState(true);

  const [chartTypes, setChartTypes] = useState<
    { value: string; label: string }[]
  >([]);

  const [chartType, setChartType] = useState<{
    value: string;
    label: string;
  } | null>({ label: "Liniowy", value: "line" });

  const [periodTypes, setPeriodTypes] = useState<
    { value: string; label: string }[]
  >([]);

  const [periodType, setPeriodType] =
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

  const [comparisonChecked, setComparisonChecked] = useState(false);
  const handleComparisonChange = () => {
    setComparisonChecked((prev) => !prev);
  };

  useEffect(() => {
    if (statysticsType?.value === "training") {
      setChartType({ label: "Słupkowy", value: "bar" });
    }
  }, [statysticsType]);

  useEffect(() => {
    if (statysticsType?.value === "medical") {
      setChartType({ label: "Liniowy", value: "line" });
    }
  }, [statysticsType]);

  useEffect(() => {
    setHeight([]);
    setWeight([]);
    playerProfileServices
      .getMedicalCard(
        id,
        `${dateFrom}T${timeFrom}:00.00Z`,
        `${dateTo}T${timeTo}:59.00Z`,
      )
      .then((playerProfileData) => {
        setMedicalCard(playerProfileData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, timeFrom, timeTo]);

  useEffect(() => {
    setSpeed([]);

    const body = {
      UserId: ownerId,
      ProfileId: id,
      ProfileType: 1,
      RangeFrom: `${dateFrom}T${timeFrom}:00.00Z`,
      RangeTo: `${dateTo}T${timeTo}:00.00Z`,
      Partition: 0,
    };

    axios
      .post(
        `https://justwin.pl/statisticsdistributor/Statistics/DeltaSpeedStatistic?timeInterval=${interval}`,
        body,
      )
      .then((response) => {
        setDeltaSpeedData(response.data);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, interval, timeFrom, timeTo]);

  useEffect(() => {
    setCalories([]);

    const body = {
      UserId: ownerId,
      ProfileId: id,
      ProfileType: 1,
      RangeFrom: `${dateFrom}T${timeFrom}:00.00Z`,
      RangeTo: `${dateTo}T${timeTo}:00.00Z`,
      Partition: 0,
    };

    axios
      .post(
        `https://justwin.pl/statisticsdistributor/Statistics/DeltaCaloriesStatistic?timeInterval=${interval}`,
        body,
      )
      .then((response) => {
        setDeltaCaloriesData(response.data);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, interval, timeFrom, timeTo]);

  useEffect(() => {
    setDistance([]);

    const body = {
      UserId: ownerId,
      ProfileId: id,
      ProfileType: 1,
      RangeFrom: `${dateFrom}T${timeFrom}:00.00Z`,
      RangeTo: `${dateTo}T${timeTo}:00.00Z`,
      Partition: 0,
    };

    axios
      .post(
        `https://justwin.pl/statisticsdistributor/Statistics/DeltaDistanceStatistic?timeInterval=${interval}`,
        body,
      )
      .then((response) => {
        setDeltaDistanceData(response.data);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, interval, timeFrom, timeTo]);

  useEffect(() => {
    setHSR([]);

    const body = {
      UserId: ownerId,
      ProfileId: id,
      ProfileType: 1,
      RangeFrom: `${dateFrom}T${timeFrom}:00.00Z`,
      RangeTo: `${dateTo}T${timeTo}:00.00Z`,
      Partition: 0,
    };

    axios
      .post(
        `https://justwin.pl/statisticsdistributor/Statistics/DeltaHsrDistanceStatistic?timeInterval=${interval}`,
        body,
      )
      .then((response) => {
        setDeltaHSRData(response.data);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, interval, timeFrom, timeTo]);

  useEffect(() => {
    setPulse([]);

    const body = {
      UserId: ownerId,
      ProfileId: id,
      ProfileType: 1,
      RangeFrom: `${dateFrom}T${timeFrom}:00.00Z`,
      RangeTo: `${dateTo}T${timeTo}:00.00Z`,
      Partition: 0,
    };

    axios
      .post(
        `https://justwin.pl/statisticsdistributor/Statistics/DeltaHeartRateStatistic?timeInterval=${interval}`,
        body,
      )
      .then((response) => {
        setDeltaHeartRateData(response.data);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [dateFrom, dateTo, interval, timeFrom, timeTo]);

  const getAllChartTypes = async () => {
    try {
      setChartTypes([
        {
          label: "Liniowy",
          value: "line",
        },
        {
          label: "Słupkowy",
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

  useEffect(() => {
    setWeight([]);
    setHeight([]);
    if (statysticsType?.value === "medical" && medicalCard.length > 0) {
      const weightArray: any = [];
      const heightArray: any = [];

      const getDataSet = (param: "Height" | "Weight") => {
        return medicalCard.reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              curr.Updated.slice(0, 10).split("-").reverse().join("-") === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const weightDataSet = getDataSet("Weight");
      const heightDataSet = getDataSet("Height");

      if (Math.min(...weightDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinWeight(0);
      } else {
        setMinWeight(Math.min(...weightDataSet.map(({ y }) => y)) - 10);
      }

      if (Math.min(...heightDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinHeight(0);
      } else {
        setMinHeight(Math.min(...heightDataSet.map(({ y }) => y)) - 10);
      }

      setMaxWeight(Math.max(...weightDataSet.map(({ y }) => y)) + 10);
      setMaxHeight(Math.max(...heightDataSet.map(({ y }) => y)) + 10);

      setAvgWeight(Math.max(...weightDataSet.map(({ y }) => y)) + 10);

      const getAvgWeight = () => {
        let i = 0;

        const reducedDataSet = weightDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      const getAvgHeight = () => {
        let i = 0;

        const reducedDataSet = heightDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgWeight(getAvgWeight);
      setAvgHeight(getAvgHeight);

      setHeight(heightDataSet);
      setWeight(weightDataSet);
    }
  }, [statysticsType, medicalCard, dateFrom, dateTo, timeFrom, timeTo]);

  useEffect(() => {
    setSpeed([]);
    if (
      statysticsType?.value === "training" &&
      trend &&
      trend.value === "speed" &&
      deltaSpeedData.length > 0
    ) {
      const getDataSet = (param) => {
        return deltaSpeedData[0].reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              interval === 101 &&
              curr.recordDate.slice(0, 7).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 99 &&
              curr.recordDate.slice(0, 10).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 20 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 13)}:00` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 10 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 16)}` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const speedDataSet = getDataSet("deltaSpeed");

      if (Math.min(...speedDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinSpeed(0);
      } else {
        setMinSpeed(Math.min(...speedDataSet.map(({ y }) => y)) - 10);
      }

      const getAvgSpeed = () => {
        let i = 0;

        const reducedDataSet = speedDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgSpeed(getAvgSpeed);

      setMaxSpeed(Math.max(...speedDataSet.map(({ y }) => y)) + 10);

      setSpeed(speedDataSet);
    }
  }, [
    statysticsType,
    deltaSpeedData,
    trend,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  ]);

  useEffect(() => {
    setHSR([]);
    if (
      statysticsType?.value === "training" &&
      trend &&
      trend.value === "HSR" &&
      deltaHSRData.length > 0
    ) {
      const getDataSet = (param) => {
        return deltaHSRData[0].reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              interval === 101 &&
              curr.recordDate.slice(0, 7).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 99 &&
              curr.recordDate.slice(0, 10).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 20 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 13)}:00` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 10 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 16)}` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const HSRDataSet = getDataSet("deltaDistanceInMeters");

      if (Math.min(...HSRDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinHSR(0);
      } else {
        setMinHSR(Math.min(...HSRDataSet.map(({ y }) => y)) - 10);
      }

      const getAvgHSR = () => {
        let i = 0;

        const reducedDataSet = HSRDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgHSR(getAvgHSR);

      setMaxHSR(Math.max(...HSRDataSet.map(({ y }) => y)) + 10);

      setHSR(HSRDataSet);
    }
  }, [statysticsType, deltaHSRData, trend, dateFrom, dateTo, timeFrom, timeTo]);

  useEffect(() => {
    setDistance([]);
    if (
      statysticsType?.value === "training" &&
      trend &&
      trend.value === "distance" &&
      deltaDistanceData.length > 0
    ) {
      const getDataSet = (param) => {
        return deltaDistanceData[0].reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              interval === 101 &&
              curr.recordDate.slice(0, 7).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 99 &&
              curr.recordDate.slice(0, 10).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 20 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 13)}:00` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 10 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 16)}` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const distanceDataSet = getDataSet("deltaDistanceInMeters");

      if (Math.min(...distanceDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinDistance(0);
      } else {
        setMinDistance(Math.min(...distanceDataSet.map(({ y }) => y)) - 10);
      }

      const getAvgDistance = () => {
        let i = 0;

        const reducedDataSet = distanceDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgDistance(getAvgDistance);

      setMaxDistance(Math.max(...distanceDataSet.map(({ y }) => y)) + 10);

      setDistance(distanceDataSet);
    }
  }, [
    statysticsType,
    deltaDistanceData,
    trend,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  ]);

  useEffect(() => {
    setCalories([]);
    if (
      statysticsType?.value === "training" &&
      trend &&
      trend.value === "calories" &&
      deltaCaloriesData.length > 0
    ) {
      const getDataSet = (param) => {
        return deltaCaloriesData[0].reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              interval === 101 &&
              curr.recordDate.slice(0, 7).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 99 &&
              curr.recordDate.slice(0, 10).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 20 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 13)}:00` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 10 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 16)}` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const caloriesDataSet = getDataSet("deltaCalories");

      if (Math.min(...caloriesDataSet.map(({ y }) => y)) - 10 < 0) {
        setMinCalories(0);
      } else {
        setMinCalories(Math.min(...caloriesDataSet.map(({ y }) => y)) - 10);
      }

      const getAvgCalories = () => {
        let i = 0;

        const reducedDataSet = caloriesDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgCalories(getAvgCalories);

      setMaxCalories(Math.max(...caloriesDataSet.map(({ y }) => y)) + 10);

      setCalories(caloriesDataSet);
    }
  }, [
    statysticsType,
    deltaCaloriesData,
    trend,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  ]);

  useEffect(() => {
    setPulse([]);
    if (
      statysticsType?.value === "training" &&
      trend &&
      trend.value === "pulse" &&
      deltaHeartRateData.length > 0
    ) {
      const getDataSet = (param) => {
        return deltaHeartRateData[0].reduce((acc, curr) => {
          labels.forEach((label) => {
            if (
              interval === 101 &&
              curr.recordDate.slice(0, 7).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 99 &&
              curr.recordDate.slice(0, 10).split("-").reverse().join("-") ===
                label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 20 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 13)}:00` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            } else if (
              interval === 10 &&
              `${curr.recordDate
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")} ${curr.recordDate.slice(11, 16)}` === label
            ) {
              acc.push({
                x: label,
                y: curr[param],
              });
            }
          });

          return acc;
        }, []);
      };

      const pulseDataSet = getDataSet("deltaHeartRate");

      const getAvgPulse = () => {
        let i = 0;

        const reducedDataSet = pulseDataSet.reduce((acc, curr) => {
          acc += curr.y;
          i++;

          return acc;
        }, 0);
        return reducedDataSet / i;
      };

      setAvgPulse(getAvgPulse);

      setMinPulse(40);
      setMaxPulse(200);
      setMaxPulseData(Math.max(...pulseDataSet.map(({ y }) => y)) + 10);
      setPulse(pulseDataSet);
    }
  }, [
    statysticsType,
    deltaHeartRateData,
    trend,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  ]);

  const getAllStatisticsTypes = async () => {
    try {
      setStatysticsTypes([
        {
          label: "Badania okresowe",
          value: "medical",
        },
        {
          label: "Trening",
          value: "training",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStatisticsTypes();
  }, []);

  const getAllPeriodTypes = async () => {
    try {
      setPeriodTypes([
        {
          label: "Ostatnie 7 dni",
          value: "week",
        },
        {
          label: "Ostatnie 28 dni",
          value: "month",
        },
        {
          label: "Ostatnie 12 miesięcy",
          value: "year",
        },
        {
          label: "Niestandardowe",
          value: "custom",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPeriodTypes();
  }, []);

  const getAllTrends = async () => {
    try {
      if (statysticsType) {
        switch (statysticsType.value) {
          case "medical":
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
            break;
          case "training":
            setTrends([
              {
                label: "Prędkość",
                value: "speed",
              },
              {
                label: "Droga",
                value: "distance",
              },
              {
                label: "Tętno",
                value: "pulse",
              },
              {
                label: "Kalorie",
                value: "calories",
              },
              {
                label: "HSR",
                value: "HSR",
              },
            ]);
            break;
          default:
          // code block
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTrends();
  }, [statysticsType]);

  const options = {
    plugins: {
      tooltip: {
        interaction: {
          mode: "nearest",
        },
      },

      legend: {
        display: false,
        position: "bottom",
      },
    },

    responsive: true,
    aspectRatio: 3.7,
    interaction: {
      mode: "index" as const,
      intersect: true,
    },
    stacked: false,
    // layout: {
    //   padding: {
    //     right: 18,
    //     bottom: 30,
    //   },
    // },
    // plugins: [moveChart],

    scales: {
      x: {
        offset: false,
        title: {
          align: "start",
        },
        ticks: {
          autoSkip: true,

          beginAtZero: true,
          display: true,
          maxTicksLimit: 366,

          color: (context) => {
            if (labels.length <= 7) {
              return "black";
            } else {
              if (
                context.index === 0 ||
                context.index === Math.floor(labels.length * 0.25) ||
                context.index === Math.floor(labels.length * 0.5) ||
                context.index === Math.floor(labels.length * 0.75) ||
                context.index === labels.length - 1
              ) {
                return "black";
              } else {
                return "rgba(255,255,255,0)";
              }
            }
          },

          maxRotation:
            labels?.length >= 15 && labels?.length <= 29
              ? 45
              : labels?.length >= 30
              ? 90
              : 0,
          minRotation:
            labels?.length >= 15 && labels?.length <= 29
              ? 45
              : labels?.length >= 30
              ? 90
              : 0,
        },

        grid: {
          tickColor: "#878a8b",

          color: (context) => {
            if (labels.length <= 10) {
              return "rgb(206, 210 ,212)";
            } else {
              if (
                context.index === 0 ||
                context.index === Math.floor(labels.length * 0.25) ||
                context.index === Math.floor(labels.length * 0.5) ||
                context.index === Math.floor(labels.length * 0.75) ||
                context.index === labels.length - 1
              ) {
                return "rgb(206, 210 ,212)";
              } else {
                return "rgba(255,255,255,0)";
              }
            }
          },

          drawTicks: true,
        },

        // display: false,
        // min: 0,
        // max: 6,
      },
      y: {
        // beginAtZero: true,
        type: "linear" as const,
        display: true,
        position: "left" as const,
        min:
          trend?.value === "weight"
            ? minWeight
            : trend?.value === "height"
            ? minHeight
            : trend?.value === "speed"
            ? minSpeed
            : trend?.value === "distance"
            ? minDistance
            : trend?.value === "pulse"
            ? minPulse
            : trend?.value === "calories"
            ? minCalories
            : trend?.value === "HSR"
            ? minHSR
            : null,
        max:
          trend?.value === "weight"
            ? maxWeight
            : trend?.value === "height"
            ? maxHeight
            : trend?.value === "speed"
            ? maxSpeed
            : trend?.value === "distance"
            ? maxDistance
            : trend?.value === "pulse"
            ? maxPulse
            : trend?.value === "calories"
            ? maxCalories
            : trend?.value === "HSR"
            ? maxHSR
            : null,
      },
    },
  };

  useEffect(() => {
    switch (periodType?.value) {
      case "week":
        setDateFrom(
          new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
        setDateTo(new Date().toISOString().slice(0, 10));
        break;

      case "month":
        setDateFrom(
          new Date(new Date().getTime() - 27 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
        setDateTo(new Date().toISOString().slice(0, 10));
        break;

      case "year":
        setDateFrom(
          new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
        setDateTo(new Date().toISOString().slice(0, 10));
        break;

      case "custom":
        break;

      default:
        setDateFrom(
          new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
        );
        setDateTo(new Date().toISOString().slice(0, 10));
    }
  }, [periodType]);

  useEffect(() => {
    if (
      periodType?.value === "custom" &&
      new Date(dateFrom).getTime() > new Date(dateTo).getTime()
    ) {
      setDateFrom(dateTo);
    }
  }, [dateFrom, dateTo]);

  const dataSwitch = (trend: string) => {
    switch (trend) {
      case "weight":
        return {
          data: weight,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Waga",
          // tension: 0.5,
          minBarLength: 5,
        };
      case "HSR":
        return {
          data: HSR,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Prędkość",
          tension: 0.5,
          minBarLength: 5,
          maxBarThickness: 30,
        };
      case "height":
        return {
          data: height,
          label: "Wzrost",
          // pointRadius: 4,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          tension: 0.5,
          minBarLength: 5,
        };
      case "speed":
        return {
          data: speed,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Prędkość",
          tension: 0.5,
          minBarLength: 5,
          maxBarThickness: 30,
        };
      case "distance":
        return {
          data: distance,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Dystans",
          tension: 0.5,
          minBarLength: 5,
          maxBarThickness: 50,
        };
      case "pulse":
        return {
          data: pulse,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Tętno",
          tension: 0.5,
          minBarLength: 5,
          maxBarThickness: 50,
        };
      case "calories":
        return {
          data: calories,
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Kalorie",
          tension: 0.5,
          minBarLength: 5,
          maxBarThickness: 50,
        };
      default:
        return {
          data: [0],
          borderColor: "rgb(33, 190, 252)",
          backgroundColor: "rgba(33, 190, 252, 0.5)",
          label: "Waga",
          tension: 0.5,
          minBarLength: 5,
        };
    }
  };

  const avgDataSwitch = (trend: string) => {
    let test = [];

    switch (trend) {
      case "weight":
        test = [];
        if (weight.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgWeight);
          }
        }

        return {
          data: test,
          pointHoverRadius: 0,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "height":
        test = [];
        if (height.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgHeight);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "HSR":
        test = [];
        if (HSR.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgHSR);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "speed":
        test = [];
        if (speed.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgSpeed);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "distance":
        test = [];
        if (distance.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgDistance);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "pulse":
        test = [];
        if (pulse.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgPulse);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      case "calories":
        test = [];
        if (calories.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(avgCalories);
          }
        }

        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };

      default:
        return {
          data: test,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          pointHitRadius: 0,
          borderWidth: 1,
          minBarLength: 5,
          borderDash: [5, 5],
          fill: false,
          label: "Średnia",
          type: "line",
        };
    }
  };

  const maxDataSwitch = (trend: string) => {
    let test = [];

    switch (trend) {
      case "weight":
        test = [];
        if (weight.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxWeight - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          pointHoverRadius: 0,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,

          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "height":
        test = [];
        if (height.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxHeight - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "HSR":
        test = [];
        if (HSR.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxHSR - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "speed":
        test = [];
        if (speed.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxSpeed - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "distance":
        test = [];
        if (distance.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxDistance - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "pulse":
        test = [];
        if (pulse.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxPulseData - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      case "calories":
        test = [];
        if (calories.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            test.push(maxCalories - 10);
          }
        }

        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };

      default:
        return {
          data: test,
          borderWidth: 1,
          borderColor: "rgb(252, 142, 33)",
          backgroundColor: "rgba(252, 142, 33, 0.5)",
          // label: "Waga",
          pointRadius: 0,
          // tension: 0.5,
          minBarLength: 5,
          pointHitRadius: 0,
          fill: false,
          label: "Maksymalna",
          type: "line",
        };
    }
  };

  const data = {
    labels,

    datasets: [
      dataSwitch(trend?.value),
      avgDataSwitch(trend?.value),
      maxDataSwitch(trend?.value),
    ],
  };

  const maxSwitch = (trend: string) => {
    switch (trend) {
      case "weight":
        return maxWeight.toFixed(2);
      case "height":
        return maxHeight.toFixed(2);
      case "speed":
        return maxSpeed.toFixed(2);
      case "distance":
        return maxDistance.toFixed(2);
      case "pulse":
        return maxPulseData.toFixed(2);
      case "calories":
        return maxCalories.toFixed(2);
      case "HSR":
        return maxHSR.toFixed(2);
      default:
        return 0;
    }
  };

  const avgSwitch = (trend: string) => {
    switch (trend) {
      case "weight":
        return avgWeight.toFixed(2);
      case "height":
        return avgHeight.toFixed(2);
      case "speed":
        return avgSpeed.toFixed(2);
      case "distance":
        return avgDistance.toFixed(2);
      case "pulse":
        return avgPulse.toFixed(2);
      case "calories":
        return avgCalories.toFixed(2);
      case "HSR":
        return avgHSR.toFixed(2);
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (updateDays) {
      const timeBetweenDates =
        new Date(dateTo).getTime() - new Date(dateFrom).getTime();
      setDaysBetweenDates(timeBetweenDates / (1000 * 60 * 60 * 24));
    }
  }, [dateFrom, dateTo, periodType, timeFrom, timeTo]);

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
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {periodType?.value === "custom" && (
            <>
              <StatisticsTextInput
                name="AvailableFrom"
                label={"Od"}
                type="date"
                value={dateFrom}
                className={"min-w-120"}
                onChange={(e) => setDateFrom(e.target.value)}
                max={dateTo}
              />

              <TimeInput
                type="time"
                value={timeFrom}
                onChange={(e) => {
                  setTimeFrom(e.target.value);
                }}
              />

              <StatisticsTextInput
                name="AvailableTo"
                label={"Do"}
                type="date"
                className={"min-w-120"}
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
              />
              <TimeInput
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
              />
            </>
          )}

          <SelectStatystics
            defaultValue="week"
            items={periodTypes}
            className={"min-w-160"}
            label="Okres"
            selectedItem={periodType}
            setSelectedItem={setPeriodType}
          />
        </div>
      </div>

      <div
        className="px-4 bg-white opacity-80 rounded-t-sm"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap-reverse",
          gap: "10px",
          padding: "5px",
          position: "relative",
        }}
      >
        <p style={{ marginLeft: "13px", fontSize: "12px" }}>
          {statysticsType?.label}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <LeftArrow
            onClick={() => {
              arrowLeftFn();
              setTimeout(() => {
                setUpdateDays(true);
              }, 0);
            }}
          >
            &lt;
          </LeftArrow>
          <RightArrow
            onClick={() => {
              arrowRightFn();
              setTimeout(() => {
                setUpdateDays(true);
              }, 0);
            }}
          >
            &gt;
          </RightArrow>

          <SelectStatystics
            items={statysticsTypes}
            label="Statystyki"
            defaultValue={"medical"}
            className={"min-w-160"}
            selectedItem={statysticsType}
            setSelectedItem={setStatysticsType}
          />
          <SelectStatystics
            defaultValue={
              statysticsType?.value === "medical" ? "weight" : "distance"
            }
            items={trends}
            className={"min-w-120"}
            label="Trend"
            selectedItem={trend}
            setSelectedItem={setTrend}
          />
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
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input type="checkbox" onChange={handleComparisonChange} />
            <p>Porównanie </p>
          </label>
          {comparisonChecked && (
            <>
              <select
                style={{
                  background: "rgba(255,255,255,0.4)",
                  width: "120px",
                }}
                name=""
                id=""
              >
                <option value="">Lista wyboru</option>
              </select>
              <select
                style={{
                  background: "rgba(255,255,255,0.4)",
                  width: "120px",
                }}
                name=""
                id=""
              >
                <option value="">Lista wyboru</option>
              </select>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <p>
            {data?.datasets[0].data ? data?.datasets[0].data.length : "0"}{" "}
            treningów
          </p>
          <p style={{ color: "rgb(252, 142, 33)" }}>
            max.{" "}
            {data?.datasets[0].data.length === 0
              ? 0
              : maxSwitch(trend?.value) - 10 < 0
              ? 0
              : (maxSwitch(trend?.value) - 10).toFixed(2)}
          </p>
          <p>
            średnia{" "}
            {data?.datasets[0].data.length === 0 ? 0 : avgSwitch(trend?.value)}
          </p>
        </div>
      </div>
      <ChartBox>
        <Line
          options={options}
          data={data}
          ref={chartLineRef}
          style={{
            display: chartType?.value === "line" ? "unset" : "none",
          }}
        />

        <Bar
          options={options}
          data={data}
          ref={chartBarRef}
          style={{
            display: chartType?.value !== "line" ? "unset" : "none",
          }}
        />
      </ChartBox>
    </TabContent>
  );
};

export default StatisticsTab;
