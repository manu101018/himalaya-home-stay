"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createNewBookings, deleteBooking, getBookings, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}

export async function updateProfile(formData) {
    const session = await auth();

    if (!session) throw new Error("you are not loggedin");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    const updateGuestData = {
        nationalID,
        nationality,
        countryFlag
    }

    await updateGuest(session.user.guestId, updateGuestData);

    revalidatePath('/account/profile')
}

export async function deleteReservation(bookingId) {
    const session = await auth();

    if (!session) throw new Error("you are not loggedin");

    const guestBookings = await getBookings(session.user.guestId);

    const bookingIds = guestBookings.map(booking => booking.id);

    if (!bookingIds.includes(bookingId)) throw new Error("You are not allowed to delete it.")

    await deleteBooking(bookingId);

    revalidatePath('/account/reservations')
}

export async function updateReservation(formData) {
    const bookingId = Number(formData.get('bookingId'));

    const session = await auth();

    if (!session) throw new Error("you are not loggedin");

    const guestBookings = await getBookings(session.user.guestId);

    const bookingIds = guestBookings.map(booking => booking.id);

    if (!bookingIds.includes(bookingId)) throw new Error("You are not allowed to update it.")

    await updateBooking(bookingId, {
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000)
    });

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath(`/account/reservations`);

    redirect('/account/reservations')
}

export async function createBooking(bookingData, formData) {
    const session = await auth();

    if (!session) throw new Error("you are not loggedin");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuest")),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed"
    };

    await createNewBookings(newBooking);
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect('/cabins/thankyou');
}