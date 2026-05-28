import { Skeleton } from "@/components/ui/skeleton";

export default function SlotSkeleton() {

    return (
        <div
            className="
        rounded-2xl
        border
        p-6
        space-y-6
      "
        >
            <Skeleton className="h-8 w-40" />

            <Skeleton className="h-24 w-full" />

            <Skeleton className="h-10 w-full" />
        </div>
    );
}