
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
    value?: number;
    onChange: (value: number) => void;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
}

export const CurrencyInput = ({
    value,
    onChange,
    placeholder = "$0.00",
    className,
    autoFocus
}: CurrencyInputProps) => {
    const [displayValue, setDisplayValue] = useState("");

    // Sync internal display state when prop value changes externally
    useEffect(() => {
        if (value !== undefined && value !== null) {
            if (value === 0 && displayValue === "") return; // Don't force 0 if user cleared it
            // Only update if the numeric value of display doesn't match roughly
            // actually, let's just format it on blur or mount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(value);

            // If user is currently typing, checking equality is hard. 
            // Simple strategy: If prop changes and is different from parsed display, update.
            const parsedDisplay = parseCurrency(displayValue);
            if (parsedDisplay !== value) {
                setDisplayValue(formatted);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const parseCurrency = (input: string): number => {
        // 1. Remove non-numeric/non-suffix chars
        const clean = input.toLowerCase().replace(/[^0-9.km]/g, "");

        // 2. Handle suffixes
        let multiplier = 1;
        if (clean.includes("k")) multiplier = 1000;
        if (clean.includes("m")) multiplier = 1000000;

        const numPart = parseFloat(clean.replace(/[km]/g, ""));

        if (isNaN(numPart)) return 0;
        return numPart * multiplier;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setDisplayValue(raw);

        // Immediate parse for parent
        const number = parseCurrency(raw);
        onChange(number);
    };

    const handleBlur = () => {
        const number = parseCurrency(displayValue);
        if (number > 0) {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(number);
            setDisplayValue(formatted);
        }
    };

    return (
        <Input
            type="text"
            inputMode="text"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn("font-mono text-2xl h-16 bg-white/5 border-white/10 focus:border-primary", className)}
            autoFocus={autoFocus}
        />
    );
};
