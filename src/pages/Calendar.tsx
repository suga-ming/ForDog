import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { useCallback, useEffect, useState } from "react";
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import {
  ITodoList,
  ITodoRegister,
  todoList,
  todoRegister,
} from "../api/calendar";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../store/recoil";

const Calendar = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [addEvent, setAddEvent] = useState(false);
  const [todos, setTodos] = useState<ITodoList[]>([]);
  const accessToken = useRecoilValue(isAccessToken);

  useEffect(() => {
    todoList(accessToken).then((res) => {
      const data = res?.data.items;
      setTodos(data);
    });
  }, [addEvent]);

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    let title = prompt("일정을 추가하시겠습니까?")?.trim();
    if (title && title !== "") {
      const date = selectInfo.startStr;
      await todoRegister(accessToken, title, date).then((res) => {
        const resultCode = res?.data.data.resultCode;
        if (resultCode === 1) {
          alert("일정이 추가되었습니다.");
          setAddEvent(!addEvent);
        }
      });
    }
  };

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm(`${clickInfo.event.title}를 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  }, []);

  return (
    <div className="pt-24 flex shrink-0 justify-center">
      <div className="w-3/5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          locales={allLocales}
          locale="ko"
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={todos.map((t) => {
            return { title: t.content, date: t.date };
          })}
          height={650}
        />
      </div>
    </div>
  );
};

export default Calendar;
