"use client";
import "./../global.css";
import "./../calendar.css";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

interface DemoAppState {
  currentEvents: Array<any>[];
}

interface Data {
  name: string;
  birthdate: string;
}

export default class DemoApp extends React.Component<object, DemoAppState> {
  state: DemoAppState = {
    currentEvents: [], // Inicialmente, a lista de eventos está vazia
  };

  async componentDidMount() {
    try {
      const eventos = await this.adicionarEvento();
     

      this.setState({ currentEvents: eventos });
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  async adicionarEvento() {
    const resData = await fetch("http://localhost:3001/users");

    const resBithMessage = await fetch(
      "http://localhost:3001/birthday/send-greetings"
    );

    const arrayData = await resData.json();

    const eventos = arrayData.map((data: Data) => ({
      title: data.name,
      start: data.birthdate,
    }));
  

    return eventos;
  }

  render() {
    return (
      <div className={"flex-co justify-center width: 700px"}>
        <div className="flex justify-center items-center">
          <h1>Aniversariantes do Mês</h1>
        </div>
        <div className="flex justify-center">
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,listMonth",
            }}
            titleFormat={{
              formatMatcher: "basic",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              list: "Aniversários",
            }}
            locale={"pt-br"}
            height={500}
            initialView="dayGridMonth"
            events={this.state.currentEvents}
          />
        </div>
      </div>
    );
  }
}
