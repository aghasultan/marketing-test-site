import * as React from "react"
import { cn } from "@/lib/utils"

// Minimal button implementation mimicking shadcn/ui without cva dependency for now
// If cva becomes available, we can refactor.
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        // Basic styles
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        // Variant styles
        const variants = {
            default: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/90", // Inverted for dark mode (primary)
            destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90",
            outline: "border border-zinc-200 bg-transparent hover:bg-zinc-100 hover:text-zinc-900", // Dark mode adaptation needed? Assuming tech dark mode
            secondary: "bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80",
            ghost: "hover:bg-zinc-800 hover:text-zinc-50",
            link: "text-zinc-100 underline-offset-4 hover:underline"
        }

        // Size styles
        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }

        // Adjust for Tech Dark Mode theme specifically mentioned in story
        // Primary "Apply" button said "Electric Blue/Violet"
        // We can handle that via className override or add a custom variant later. 
        // For now, default button is mapped to "primary" look.

        const Comp = "button"
        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
