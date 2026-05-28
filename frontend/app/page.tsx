"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import { Slot } from "@/types/slot";

import { getSlots } from "@/lib/api";

import SlotCard from "@/components/customer/SlotCard";

import BookingDialog from "@/components/customer/BookingDialog";

import AdminSlotCard from "@/components/admin/AdminSlotCard";

import Sidebar from "@/components/layout/Sidebar";

import SlotSkeleton from "@/components/layout/SlotSkeleton";
import { CalendarDays } from "lucide-react";

export default function Home() {

    const today = format(
        new Date(),
        "yyyy-MM-dd"
    );

    const [slots, setSlots] =
        useState<Slot[]>([]);

    const [selectedDate, setSelectedDate] =
        useState(today);

    const [selectedSlot, setSelectedSlot] =
        useState<Slot | null>(null);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [activeView, setActiveView] =
        useState<"customer" | "admin">(
            "customer"
        );

    const [initialLoading, setInitialLoading] =
        useState(true);

    async function fetchSlots(
        isInitial = false
    ) {

        try {

            if (isInitial) {
                setInitialLoading(true);
            }

            const data = await getSlots(
                selectedDate
            );

            setSlots(data);

        } catch (err) {

            console.error(err);

        } finally {

            if (isInitial) {
                setInitialLoading(false);
            }
        }
    }

    useEffect(() => {

        fetchSlots(true);

        const interval = setInterval(() => {
            fetchSlots(false);
        }, 5000);

        return () => clearInterval(interval);

    }, [selectedDate]);

    function handleBook(slot: Slot) {

        setSelectedSlot(slot);

        setDialogOpen(true);
    }

    return (
        <main
            className="
      min-h-screen
      bg-gradient-to-br
      from-background
      via-background
      to-muted/20
      flex
    "
        >

            {/* Sidebar */}

            <Sidebar
                activeView={activeView}
                onChange={setActiveView}
            />

            {/* Main Content */}

            <section className="flex-1 overflow-auto">

                <div className="max-w-7xl mx-auto p-10">

                    {/* Header */}

                    <div className="mb-10">

                        <h1
                            className="
              text-5xl
              font-bold
              tracking-tight
              mb-3
            "
                        >
                            {activeView === "customer"
                                ? "Customer Booking"
                                : "Admin Dashboard"}
                        </h1>

                        <p className="text-lg text-muted-foreground">
                            {activeView === "customer"
                                ? "Book your laundry pickup slot"
                                : "Manage slot availability"}
                        </p>
                    </div>

                    {/* Date Picker */}

                    <div className="mb-10">

                        <div
                            className="
          inline-flex
          items-center
          gap-3
          rounded-xl
          border
          border-border/50
          bg-card
          px-4
          py-3
        "
                        >

                            <CalendarDays
                                className="
              h-5
              w-5
              text-muted-foreground
            "
                            />

                            <div className="flex items-center gap-3">

                                <p className="text-sm font-medium">
                                    Select Date
                                </p>

                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className="
                  bg-transparent
                  outline-none
                  text-sm
                  text-foreground
                  [color-scheme:dark]
                "
                                />
                            </div>
                        </div>
                    </div>

                    {/* CUSTOMER VIEW */}

                    {activeView === "customer" && (

                        <>
                            {initialLoading ? (

                                <div
                                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
                                >
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (

                                            <SlotSkeleton
                                                key={index}
                                            />
                                        )
                                    )}
                                </div>

                            ) : slots.length === 0 ? (

                                <div
                                    className="
          border
          rounded-2xl
          p-16
          text-center
          bg-muted/20
        "
                                >
                                    <h2 className="text-2xl font-semibold mb-2">
                                        No Slots Available
                                    </h2>

                                    <p className="text-muted-foreground">
                                        There are no slots for the selected date.
                                    </p>
                                </div>

                            ) : (

                                <div
                                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
                                >
                                    {slots.map((slot) => (

                                        <SlotCard
                                            key={slot.id}
                                            slot={slot}
                                            onBook={handleBook}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ADMIN VIEW */}

                    {activeView === "admin" && (

                        <div
                            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
                        >
                            {slots.map((slot) => (

                                <AdminSlotCard
                                    key={slot.id}
                                    slot={slot}
                                    onUpdate={fetchSlots}
                                />
                            ))}
                        </div>
                    )}

                    {/* Booking Dialog */}

                    <BookingDialog
                        slot={selectedSlot}
                        open={dialogOpen}
                        onClose={() =>
                            setDialogOpen(false)
                        }
                        onSuccess={fetchSlots}
                    />
                </div>
            </section>
        </main>
    );
}