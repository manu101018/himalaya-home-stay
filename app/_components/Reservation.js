import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
    const [settings, bookedDate, session] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
        auth()
    ]);

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] px-4">
            <DateSelector settings={settings} cabin={cabin} bookedDate={bookedDate} />
            {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
        </div>
    )
};