"use client";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zhCN } from "date-fns/locale";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import PasswordInput from "@/components/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const FormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    accountType: z.enum(["Personal", "Company"]),
    companyName: z.string().optional(),
    employees: z.coerce.number().optional(),
    dateOfBirth: z.date().refine((d) => {
      return true;
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return d <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 6 characters",
      })
      .refine((password) => {
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least one uppercase letter and one special character"),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean({
        required_error: "You must accept the terms and conditions",
      })
      .refine((checked) => checked, "You must accept the terms and conditions"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
    if (data.accountType === "Company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Please enter your company name",
      });
    }
    if (
      data.accountType === "Company" &&
      (!data.employees || data.employees < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["employees"],
        message: "Please enter the number of employees",
      });
    }
  });

const SignUpPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const accountType = form.watch("accountType");
  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md p-4 dark:bg-slate-950 select-text text-wrap">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <>
      <PersonStandingIcon color="hsl(var(--primary))" size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="me@bytes.fun"
                        type="email"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              {accountType === "Company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field}></Input>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="employees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employees</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Employees"
                            type="number"
                            min={0}
                            {...field}
                            value={field.value || ""}
                          ></Input>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                </>
              )}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex justify-between pr-1",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          captionLayout="dropdown-buttons"
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="••••••••"
                      ></PasswordInput>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="••••••••"
                      ></PasswordInput>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I accept the terms and conditions</FormLabel>
                    </div>

                    <FormDescription>
                      By signing up you agree to our{" "}
                      <span className="text-primary hover:underline cursor-pointer">
                        <Link href={"/terms-and-conditions"}>
                          terms and conditions
                        </Link>
                      </span>
                    </FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" className="uppercase w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-sm">Already have an account?</span>
          <Button variant="outline" className="uppercase">
            <Link href={"/login"}>Login</Link>
            
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignUpPage;
