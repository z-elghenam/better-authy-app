"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateProfileSchema, UpdateProfileInput } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { uploadImage } from "@/actions/upload";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";

type EditUserDialogProps = {
  image?: string;
  name: string;
};

export function EditUserDialog({ image, name }: EditUserDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(image);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      // Set the current user image as preview when dialog opens
      setPreviewUrl(image || undefined);
    } else {
      // Reset when dialog closes
      setPreviewUrl(undefined);
      form.reset();
    }
  }, [open, image, form]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update form field
      field.onChange(file);
    }
  };

  const onSubmit = async (data: UpdateProfileInput) => {
    let imageUrl: string | undefined;

    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("file", data.image);
      const uploadResult = await uploadImage(formData);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      imageUrl = uploadResult.imageUrl;
    }

    const userData = {
      ...(data.name?.trim() && { name: data.name.trim() }),
      ...(imageUrl && { image: imageUrl }),
    };

    await updateUser(userData, {
      onRequest: () => {},
      onResponse: () => {},
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success("user information updated successfully");
        setOpen(false);
        setPreviewUrl("");
        form.reset();
      },
    });
  };

  const deleteProfileImage = () => {
    if (image) {
      updateUser(
        {
          image: "",
        },
        {
          onSuccess: () => {
            setPreviewUrl(undefined);
            setOpen(false);
            toast.success("image was deleted successfully");
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setPreviewUrl(undefined);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Edit User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>profileImage</FormLabel>
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage
                        src={previewUrl || undefined}
                        alt="Profile preview"
                        className="object-cover object-center w-full h-full"
                      />
                      <AvatarFallback className="bg-sky-500 text-white">
                        {form.watch("name")?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      className="w-30 bg-red-500 hover:bg-red-600 cursor-pointer"
                      onClick={deleteProfileImage}
                    >
                      Delete image
                    </Button>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field)}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />

                    {field.value && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Selected: {(field.value as File).name} (
                        {Math.round((field.value as File).size / 1024)} KB)
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
