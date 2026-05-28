"use client";

import {
    CalendarDays,
    ShieldCheck,
} from "lucide-react";

interface Props {
    activeView: "customer" | "admin";
    onChange: (
        view: "customer" | "admin"
    ) => void;
}

export default function Sidebar({
                                    activeView,
                                    onChange,
                                }: Props) {

    return (
        <aside
            className="
  w-72
  border-r
  border-border/50
  bg-sidebar
  px-6
  py-8
  flex
  flex-col
"
        >
            {/* Logo */}

            <div className="mb-12">

                <h1 className="text-3xl font-bold tracking-tight">
                    Urban FabricCare
                </h1>

                <p className="text-sm text-muted-foreground mt-2">
                    Laundry pickup dashboard
                </p>
            </div>

            {/* Navigation */}

            <nav className="space-y-3">

                <button
                    onClick={() =>
                        onChange("customer")
                    }
                    className={`
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-left
            transition-all
            border

            ${
                        activeView === "customer"
                            ? `
                  bg-primary
                  text-primary-foreground
                  border-primary
                `
                            : `
                  hover:bg-muted/50
                  border-transparent
                `
                    }
          `}
                >
                    <CalendarDays className="h-5 w-5" />

                    <span className="font-medium">
            Customer View
          </span>
                </button>

                <button
                    onClick={() =>
                        onChange("admin")
                    }
                    className={`
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-left
            transition-all
            border

            ${
                        activeView === "admin"
                            ? `
                  bg-primary
                  text-primary-foreground
                  border-primary
                `
                            : `
                  hover:bg-muted/50
                  border-transparent
                `
                    }
          `}
                >
                    <ShieldCheck className="h-5 w-5" />

                    <span className="font-medium">
            Admin View
          </span>
                </button>
            </nav>


        </aside>
    );
}