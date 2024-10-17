import * as React from "react";
import {cn} from "@/lib/utils";

const Card = React.forwardRef(function Card({className, ...props}, ref) {
  return (
    <h3
      ref={ref}
      className={cn("your-classname", className)} // Add your custom class names
      {...props}
    />
  );
});

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

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent};
