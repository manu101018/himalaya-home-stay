"use client"

import { createContext, useContext, useState } from "react"

const ReservationContext = createContext();

const initalValue = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
    const [range, setRange] = useState(initalValue);
    const resetRange = () => setRange(initalValue);
    return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>
};

function useReservation() {
    const context = useContext(ReservationContext);

    if (context === undefined) throw new Error("out of context");

    return context;
}

export { ReservationProvider, useReservation };