"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Check,
  AlertTriangle,
  Bell,
  Mail,
  MessageSquare,
  Loader2,
  User,
  Calendar,
  Filter,
  Briefcase,
  Home,
  Clock,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useTasks, useCreateTask, useDeleteTask } from "@/hooks/use-task";
import { useParties } from "@/hooks/use-party";
import * as z from "zod";
import { useRouter } from "next/navigation";


// Form schema for validation
const formSchema = z.object({
  jobDescription: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  priority: z.enum(["HIGH", "NORMAL", "LOW"]),
  notifyVia: z.enum(["SMS", "WA", "EMAIL"]),
  partyId: z.string().min(1, {
    message: "Please select a party",
  }),
});

const priorityOptions = [
  {
    value: "HIGH",
    label: "High",
    icon: AlertTriangle,
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    value: "NORMAL",
    label: "Normal",
    icon: Check,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    value: "LOW",
    label: "Low",
    icon: Bell,
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
];

const notificationOptions = [
  { value: "SMS", label: "SMS", icon: MessageSquare },
  { value: "WA", label: "WhatsApp", icon: MessageSquare },
  { value: "EMAIL", label: "Email", icon: Mail },
];

const taskTypes = [
  {
    value: "OFFICIAL",
    label: "Official",
    icon: Briefcase,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    value: "PERSONAL",
    label: "Personal",
    icon: Home,
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
];

const getRandomTaskType = () => {
  return taskTypes[Math.floor(Math.random() * taskTypes.length)];
};

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${day} ${month}, ${displayHours}:${minutes} ${ampm}`;
};

export default function TaskManager() {
  const [isPending, startTransition] = useTransition();
  const { data: tasks = [], isLoading } = useTasks();
  const { data: parties = [] } = useParties();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    api.post("visit").catch(console.error);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      priority: "NORMAL",
      notifyVia: "SMS",
      partyId: "",
    },
  });

  // Set first party as default when parties load
  useEffect(() => {
    if (parties.length > 0 && !form.getValues("partyId")) {
      form.setValue("partyId", parties[0].id);
    }
  }, [parties, form]);

  const handleAddTask = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await createTask.mutateAsync(values);
        toast.success("Task created successfully");
        form.reset();
        setIsDialogOpen(false);
      } catch (error) {
        toast.error("Failed to create task");
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    startTransition(async () => {
      try {
        await deleteTask.mutateAsync(id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    });
  };

  // Fixed placement for Nav/Utility top right
  const handleLoggedOut = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/sign-in");
  };

  const getPriorityDetails = (priorityValue: string) => {
    return (
      priorityOptions.find((opt) => opt.value === priorityValue) ||
      priorityOptions[1]
    );
  };

  const getNotificationDetails = (notifyValue: string) => {
    return (
      notificationOptions.find((opt) => opt.value === notifyValue) ||
      notificationOptions[0]
    );
  };


  return (
    <div className="min-h-screen bg-[#171717] relative">
      {/* Top right: Theme toggle and logout */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
   
        <Button
          variant="outline"
          size="icon"
          aria-label="Logout"
          className="rounded-full border border-gray-500 text-gray-300 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLoggedOut}
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#0d0d0d] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/20 via-gray-900/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  Task Manager
                </h1>
                <p className="text-gray-400 text-base lg:text-lg">
                  Streamline your workflow with intelligent task management
                </p>
              </div>

              {/* Stats Overview */}
              <div className="flex gap-4">
                <div className="bg-[#262626] border border-[#404040] rounded-xl px-4 py-3 min-w-[100px]">
                  <div className="text-xl font-bold text-white">
                    {tasks.length}
                  </div>
                  <div className="text-xs text-gray-400">Total Tasks</div>
                </div>
                <div className="bg-[#262626] border border-[#404040] rounded-xl px-4 py-3 min-w-[100px]">
                  <div className="text-xl font-bold text-blue-400">
                    {tasks.filter((t) => t.priority === "HIGH").length}
                  </div>
                  <div className="text-xs text-gray-400">High Priority</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-2.5 font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/25">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-[#262626] border border-[#404040] text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white mb-1">
                      Create New Task
                    </DialogTitle>
                    <p className="text-sm text-gray-400">
                      Add a new task and assign it to your team
                    </p>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleAddTask)}
                      className="space-y-5 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="partyId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-200">
                              Assign to Party
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-11 bg-[#1a1a1a] border-[#404040] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                  <SelectValue placeholder="Select a party" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1a1a1a] border-[#404040]">
                                {parties.map((party) => (
                                  <SelectItem
                                    key={party.id}
                                    value={party.id}
                                    className="text-white hover:bg-[#404040]"
                                  >
                                    <div className="flex items-center">
                                      <User className="mr-2 h-4 w-4 text-gray-400" />
                                      {party.firstName} {party.secondName}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-200">
                              Task Description
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Follow up with client about project requirements"
                                className="h-11 bg-[#1a1a1a] border-[#404040] text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="priority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-200">
                                Priority Level
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-11 bg-[#1a1a1a] border-[#404040] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1a1a1a] border-[#404040]">
                                  {priorityOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                      className="text-white hover:bg-[#404040]"
                                    >
                                      <div className="flex items-center">
                                        <option.icon className="mr-2 h-4 w-4" />
                                        {option.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notifyVia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-200">
                                Notification Method
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-11 bg-[#1a1a1a] border-[#404040] text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1a1a1a] border-[#404040]">
                                  {notificationOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                      className="text-white hover:bg-[#404040]"
                                    >
                                      <div className="flex items-center">
                                        <option.icon className="mr-2 h-4 w-4" />
                                        {option.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t border-[#404040]">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setIsDialogOpen(false)}
                          disabled={isPending}
                          className="border-[#404040] text-gray-300 hover:bg-[#404040] hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isPending || createTask.isPending}
                          className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-600/25"
                        >
                          {isPending || createTask.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Task"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                <span>Showing all tasks</span>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-[#1f1f1f] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden">
            <div className="border-b border-[#333333] px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                Active Tasks
              </h2>
            </div>

            <ScrollArea className="h-full w-full">
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-400">Loading tasks...</p>
                    </div>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-[#262626] p-6 rounded-full mb-6">
                      <MessageSquare className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-gray-400 max-w-sm">
                      Create your first task to start managing your workflow
                      efficiently
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {tasks.map((task) => {
                      const priorityInfo = getPriorityDetails(task.priority);
                      const notificationInfo = getNotificationDetails(
                        task.notifyVia
                      );
                      const randomTaskType = getRandomTaskType();

                      return (
                        <div
                          key={task.id}
                          className="group bg-[#262626] border border-[#404040] rounded-xl p-4 hover:border-[#525252] transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
                        >
                          {/* Header with Name and Delete Button */}
                          <div className="flex justify-between items-center mb-3">
                            {task.party && (
                              <div className="flex items-center text-lg font-semibold text-white">
                                <User className="mr-2 h-4 w-4 text-gray-400" />
                                <span>
                                  {task.party.firstName} {task.party.secondName}
                                </span>
                              </div>
                            )}

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10 shrink-0 opacity-60 group-hover:opacity-100 transition-all duration-200"
                              onClick={() => handleDeleteTask(task.id)}
                              disabled={isPending || deleteTask.isPending}
                            >
                              {isPending || deleteTask.isPending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <X className="h-3 w-3" />
                              )}
                            </Button>
                          </div>

                          {/* Job Description */}
                          <p className="font-medium text-gray-300 text-sm leading-relaxed mb-3">
                            {task.jobDescription}
                          </p>

                          {/* Badges - Mobile Stack */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge
                              variant="outline"
                              className={`${randomTaskType.color} px-2 py-1 text-xs font-medium`}
                            >
                              <randomTaskType.icon className="mr-1 h-3 w-3" />
                              {randomTaskType.label}
                            </Badge>

                            <Badge
                              variant="outline"
                              className={`${priorityInfo.color} px-2 py-1 text-xs font-medium`}
                            >
                              <priorityInfo.icon className="mr-1 h-3 w-3" />
                              {priorityInfo.label}
                            </Badge>

                            <div className="flex items-center text-xs text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded-md">
                              <notificationInfo.icon className="mr-1 h-3 w-3" />
                              {notificationInfo.label}
                            </div>
                          </div>

                          {/* Date and Time - Professional */}
                          {task.createdAt && (
                            <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-[#404040]">
                              <Clock className="mr-1.5 h-3 w-3" />
                              <span>Created {formatDate(task.createdAt)}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
