import { Slot } from "@/types/slot";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Clock3, Users } from "lucide-react";

interface Props {
    slot: Slot;
    onBook: (slot: Slot) => void;
}

export default function SlotCard({
                                     slot,
                                     onBook,
                                 }: Props) {

    const unavailable =
        slot.blocked || slot.available === 0;

    let status = "Available";

    let badgeClass =
        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";

    if (unavailable) {

        status = slot.blocked
            ? "Blocked"
            : "Full";

        badgeClass =
            "bg-red-500/15 text-red-400 border border-red-500/30";

    } else if (slot.available < 3) {

        status = "Almost Full";

        badgeClass =
            "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";
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
            <CardContent className="p-6 flex flex-col h-full">

                <div className="flex items-start justify-between mb-6">

                    <div>

                        <div className="flex items-center gap-2 mb-2">
                            <Clock3 className="h-5 w-5 text-muted-foreground" />

                            <h2 className="text-2xl font-semibold tracking-tight">
                                {slot.label}
                            </h2>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Schedule your laundry pickup during this time window.
                        </p>
                    </div>

                    <Badge className={badgeClass}>
                        {status}
                    </Badge>
                </div>

                <div className="space-y-5 flex-1">

                    <div
                        className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              p-4
              bg-muted/30
            "
                    >
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />

                            <span className="text-sm text-muted-foreground">
                Availability
              </span>
                        </div>

                        <span className="font-semibold">
              {slot.available}/{slot.maxCapacity}
            </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div
                            className="
                rounded-lg
                border
                p-4
                bg-muted/20
              "
                        >
                            <p className="text-xs text-muted-foreground mb-1">
                                Booked
                            </p>

                            <p className="text-xl font-semibold">
                                {slot.bookedCount}
                            </p>
                        </div>

                        <div
                            className="
                rounded-lg
                border
                p-4
                bg-muted/20
              "
                        >
                            <p className="text-xs text-muted-foreground mb-1">
                                Capacity
                            </p>

                            <p className="text-xl font-semibold">
                                {slot.maxCapacity}
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="
            mt-6
            w-full
            border-border/80
            hover:bg-primary
            hover:text-primary-foreground
            transition-all
          "
                    disabled={unavailable}
                    onClick={() => onBook(slot)}
                >
                    {unavailable
                        ? "Unavailable"
                        : "Book Slot"}
                </Button>
            </CardContent>
        </Card>
    );
}