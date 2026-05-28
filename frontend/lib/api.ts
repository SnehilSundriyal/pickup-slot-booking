import { Slot } from "@/types/slot";

const API_URL = "http://localhost:8080";

export async function getSlots(
    date: string
): Promise<Slot[]> {

    const response = await fetch(
        `${API_URL}/slots?date=${date}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch slots");
    }

    return response.json();
}

export async function createBooking(data: {
    slotId: number;
    customerName: string;
    customerPhone: string;
    address: string;
}) {

    const response = await fetch(
        `${API_URL}/bookings`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error);
    }

    return result;
}

export async function toggleSlotBlock(
    slotId: number,
    blocked: boolean
) {

    const response = await fetch(
        `${API_URL}/slots/${slotId}/block`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                blocked,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to update slot"
        );
    }

    return response.json();
}