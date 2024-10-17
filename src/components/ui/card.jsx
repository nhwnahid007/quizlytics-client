import * as React from "react";
import {cn} from "@/lib/utils"; // Assuming you have a utility function for class names

// Card Component

const Card = React.forwardRef(function Card({className, ...props}, ref) {
  return (
    <h3
      ref={ref}
      className={cn("your-classname", className)} // Add your custom class names
      {...props}
    />
  );
});
// Card.displayName = "Card";

// CardHeader Component

const CardHeader = React.forwardRef(function CardHeader(
  {className, ...props},
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn("your-classname", className)} // Add your custom class names
      {...props}
    />
  );
});
// CardHeader.displayName = "CardHeader";

// CardTitle Component
const CardTitle = React.forwardRef(function CardTitle(
  {className, ...props},
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn("your-classname", className)} // Add your custom class names
      {...props}
    />
  );
});
// CardTitle.displayName = "CardTitle";

// CardDescription Component
const CardDescription = React.forwardRef(function CardDescription(
  {className, ...props},
  ref
) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)} // Modify the class names as needed
      {...props}
    />
  );
});
// CardDescription.displayName = "CardDescription";

// CardContent Component
const CardContent = React.forwardRef(function CardContent(
  {className, ...props},
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)} // Customize class names as needed
      {...props}
    />
  );
});
// CardContent.displayName = "CardContent";

// CardFooter Component
const CardFooter = React.forwardRef(function CardFooter(
  {className, ...props},
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)} // Customize class names as needed
      {...props}
    />
  );
});
// CardFooter.displayName = "CardFooter";

// Export all components
export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent};
