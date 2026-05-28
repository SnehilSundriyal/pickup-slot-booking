"use client";

import { useState } from "react";

import { Slot } from "@/types/slot";

import { createBooking } from "@/lib/api";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
    slot: Slot | null;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function BookingDialog({
                                          slot,
                                          open,
                                          onClose,
                                          onSuccess,
                                      }: Props) {

    const [customerName, setCustomerName] =
        useState("");

    const [customerPhone, setCustomerPhone] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function handleSubmit() {

        if (!slot) return;

        try {

            setLoading(true);
            setError("");

            await createBooking({
                slotId: slot.id,
                customerName,
                customerPhone,
                address,
            });

            toast.success(
                "Slot booked successfully"
            );

            onSuccess();

            onClose();

            setCustomerName("");
            setCustomerPhone("");
            setAddress("");

        } catch (err: any) {
            setError(err.message);

            toast.error(err.message);

        } finally {

            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent
                className="
    sm:max-w-md
    bg-card
    border-border/60
    shadow-2xl
    rounded-2xl
    p-8
  "
            >

                <DialogHeader className="space-y-3">

                    <DialogTitle className="text-2xl font-semibold">
                        Confirm Booking
                    </DialogTitle>

                    <p className="text-sm text-muted-foreground">
                        {slot?.label}
                    </p>
                </DialogHeader>

                <div className="space-y-4">

                    <Input
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(e.target.value)
                        }
                    />

                    <Input
                        placeholder="Phone Number"
                        value={customerPhone}
                        onChange={(e) =>
                            setCustomerPhone(e.target.value)
                        }
                    />

                    <Textarea
                        placeholder="Pickup Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                    />

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Booking..."
                            : "Confirm Booking"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}