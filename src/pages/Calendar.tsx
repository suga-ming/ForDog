import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { useCallback, useEffect, useState } from "react";
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { ITodoRegister, todoList, todoRegister } from "../api/calendar";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../store/recoil";
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

const Calendar = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const accessToken = useRecoilValue(isAccessToken);

  useEffect(() => {
    todoList(accessToken).then((res) => {
      console.log(res);
    });
  }, []);

  const handleEvents = useCallback(
    (events: EventApi[]) => setCurrentEvents(events),
    []
  );
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    let title = prompt("일정을 추가하시겠습니까?")?.trim();
    if (title && title !== "") {
      const date = selectInfo.startStr;
      await todoRegister(accessToken, title, date).then((res) => {
        const resultCode = res?.data.data.resultCode;
        if (resultCode === 1) {
          alert("일정이 추가되었습니다.");
        }
      });
    }
  };

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm(`${clickInfo.event.title}를 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  }, []);
  console.log("currentEvents", currentEvents);

  return (
    <div className="pt-24 flex shrink-0 justify-center">
      <div className="w-3/5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          // initialEvents={INITIAL_EVENTS}
          locales={allLocales}
          locale="ko"
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          // events={[
          //   { title: "단이 미용", date: "2023-02-05" },
          //   { title: "단이 병원", date: "2023-02-13" },
          // ]}
          height={650}
        />
      </div>
    </div>
  );
};

export default Calendar;
