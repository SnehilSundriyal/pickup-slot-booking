"use client";

import { Slot } from "@/types/slot";

import { toggleSlotBlock } from "@/lib/api";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
    Ban,
    CheckCircle2,
    Users,
} from "lucide-react";
import {toast} from "sonner";

interface Props {
    slot: Slot;
    onUpdate: () => void;
}

export default function AdminSlotCard({
                                          slot,
                                          onUpdate,
                                      }: Props) {

    async function handleToggle() {

        try {

            await toggleSlotBlock(
                slot.id,
                !slot.blocked
            );
            toast.success(
                slot.blocked
                    ? "Slot unblocked"
                    : "Slot blocked"
            );
            onUpdate();

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card
            className="
  bg-card
  border-border/50
  shadow-lg
  transition-all
  duration-300
  hover:border-primary/20
  hover:shadow-2xl
  min-h-[320px]
"
        >
            <CardContent className="p-6">

                <div className="flex items-start justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-semibold">
                            {slot.label}
                        </h2>

                        <p className="text-sm text-muted-foreground mt-1">
                            Admin Controls
                        </p>
                    </div>

                    {slot.blocked ? (

                        <Badge
                            className="
                bg-red-500/15
                text-red-400
                border
                border-red-500/30
              "
                        >
                            Blocked
                        </Badge>

                    ) : (

                        <Badge
                            className="
                bg-emerald-500/15
                text-emerald-400
                border
                border-emerald-500/30
              "
                        >
                            Active
                        </Badge>
                    )}
                </div>

                <div
                    className="
            rounded-lg
            border
            p-4
            mb-6
            bg-muted/20
          "
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm text-muted-foreground">
              Slot Usage
            </span>
                    </div>

                    <p className="text-3xl font-bold">
                        {slot.bookedCount}
                        <span className="text-lg text-muted-foreground">
              /{slot.maxCapacity}
            </span>
                    </p>
                </div>

                <Button
                    variant={
                        slot.blocked
                            ? "default"
                            : "destructive"
                    }
                    className="w-full"
                    onClick={handleToggle}
                >
                    {slot.blocked ? (
                        <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Unblock Slot
                        </>
                    ) : (
                        <>
                            <Ban className="mr-2 h-4 w-4" />
                            Block Slot
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}