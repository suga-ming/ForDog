import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { useCallback, useEffect, useState } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import {
  dateTodo,
  getTodoList,
  IEditTodo,
  ITodoList,
  todoRegister,
} from "../api/calendar";
import { useRecoilValue } from "recoil";
import { isAccessToken } from "../store/recoil";
import CalendarModal from "../components/CalendarModal";
import styled from "styled-components";

const ModalArea = styled.form`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const BottomSolid = styled.div`
  border-bottom: 1px solid rgb(209 213 219);
`;

const Calendar = () => {
  const [addEvent, setAddEvent] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState<ITodoList[]>([]);
  const [todoList, setTodoList] = useState<IEditTodo[]>([]);
  const accessToken = useRecoilValue(isAccessToken);

  useEffect(() => {
    getTodoList(accessToken).then((res) => {
      const data = res?.data.items;
      setTodos(data);
    });
  }, [addEvent, edit]);

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

  // const handleEventClick = useCallback((clickInfo: EventClickArg) => {
  //   if (window.confirm(`${clickInfo.event.title}를 삭제하시겠습니까?`)) {
  //     clickInfo.event.remove();
  //   }
  // }, []);

  const handleEventClick = async (clickInfo: EventClickArg) => {
    setModal(!modal);
    const date = clickInfo.event.startStr;
    const res = await dateTodo(accessToken, date);
    console.log(res);
    const resultCode = res?.resultCode;
    if (resultCode === 1) {
      setTodoList(res?.data?.items);
      console.log("todoList", todoList);
    }
  };

  const closeModal = () => {
    setModal(!modal);
    setEdit(false);
  };

  return (
    <div>
      {modal ? (
        // <CalendarModal modal={modal} setModal={setModal} todoList={todoList} />
        <ModalArea className="absolute w-full h-screen">
          <Modal className="bg-white w-1/3 rounded-lg">
            <BottomSolid className="flex justify-between items-center w-full py-4 px-7">
              {edit ? (
                <div className="text-lg font-semibold">일정 수정</div>
              ) : (
                <div className="text-lg font-semibold">일정 확인</div>
              )}
              <div
                onClick={closeModal}
                className="text-xl cursor-pointer p-1 text-gray-500"
              >
                x
              </div>
            </BottomSolid>
            {todoList &&
              todoList.map((t) => (
                <CalendarModal
                  key={t.todoId}
                  content={t.content}
                  date={t.date}
                  todoId={t.todoId}
                  status={t.status}
                  edit={edit}
                  setEdit={setEdit}
                  modal={modal}
                  setModal={setModal}
                />
              ))}
          </Modal>
        </ModalArea>
      ) : null}
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
    </div>
  );
};

export default Calendar;
