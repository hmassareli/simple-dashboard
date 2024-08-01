import api from "@/api/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import CustomMultiSelect from "../CustomMultiSelect";
import PriceInput from "../PriceInput";

// Define Zod schema
const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  selectedCategories: z
    .array(z.number())
    .nonempty("Selecione pelo menos uma categoria"),
  selectedColors: z.array(z.number()).nonempty("Selecione pelo menos uma cor"),
  brand: z.string().min(1, "Marca é obrigatória"),
  price: z.number().positive("Preço deve ser positivo"),
  stock: z.number().min(1, "Quantidade deve ser pelo menos 1"),
  images: z
    .array(z.object({ name: z.string(), preview: z.string() }))
    .nonempty("Adicione pelo menos uma imagem"),
});

export function CreateProduct() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [colors, setColors] = useState<
    { id: number; hexa_code: string; color_name: string }[]
  >([]);
  const [images, setImages] = useState<{ name: string; preview: string }[]>([]);

  useEffect(() => {
    api.get("admin/list-categories").then((res) => {
      setCategories(res.data);
    });
    api.get("admin/list-brands").then((res) => {
      setBrands(res.data);
    });
    api.get("admin/get-colors").then((res) => {
      setColors(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    feat,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedImages = Array.from(files).map((file) => {
        return {
          name: file.name,
          preview: URL.createObjectURL(file),
        };
      });
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      setValue("images", [...images, ...uploadedImages]);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 m-auto sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4">
                <Link to={"/products"}>
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Link to={"/products"}>
                    <Button variant="outline" size="sm">
                      Descartar
                    </Button>
                  </Link>
                  <Button type="submit" size="sm">
                    Salvar Produto
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Detalhes do produto</CardTitle>
                      <CardDescription>
                        Preencha os campos abaixo para criar um novo produto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            {...register("name")}
                          />
                          {errors.name && (
                            <span className="text-red-500">
                              {errors.name.message?.toString()}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            className="min-h-32"
                            {...register("description")}
                          />
                          {errors.description && (
                            <span className="text-red-500">
                              {errors.description.message?.toString()}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="category">Categorias</Label>
                          <CustomMultiSelect
                            placeholder="Selecione as Categorias"
                            values={categories}
                            onValuesChange={(values) =>
                              setValue("selectedCategories", values)
                            }
                          />
                          {errors.selectedCategories && (
                            <span className="text-red-500">
                              {errors.selectedCategories.message?.toString()}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="colors">Cores</Label>
                          <CustomMultiSelect
                            placeholder="Selecione as Cores"
                            values={colors.map((color) => ({
                              id: color.id,
                              name: color.color_name,
                            }))}
                            onValuesChange={(values) =>
                              setValue("selectedColors", values)
                            }
                          />
                          {errors.selectedColors && (
                            <span className="text-red-500">
                              {errors.selectedColors.message?.toString()}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="brand">Marca</Label>
                          <Select
                            onValueChange={(value) => setValue("brand", value)}
                          >
                            <SelectTrigger
                              id="brand"
                              aria-label="Selecione a Marca"
                            >
                              <SelectValue placeholder="Selecione a marca" />
                            </SelectTrigger>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand.id} value={brand.name}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.brand && (
                            <span className="text-red-500">
                              {errors.brand.message?.toString()}
                            </span>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="price">Preço</Label>
                          <PriceInput
                            {...register("price", { valueAsNumber: true })}
                          />
                          {errors.price && (
                            <span className="text-red-500">
                              {errors.price.message?.toString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Estoque do Produto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="stock">Quantidade</Label>
                          <Input
                            type="number"
                            id="stock"
                            {...register("stock", { valueAsNumber: true })}
                          />
                          {errors.stock && (
                            <span className="text-red-500">
                              {errors.stock.message?.toString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Imagens do produto</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={image.preview}
                              alt={`Product Preview ${index + 1}`}
                              className="aspect-square w-full object-cover rounded-md"
                            />
                          ))}
                          <label
                            htmlFor="file-upload"
                            className={`cursor-pointer flex aspect-square w-full col-span-${
                              images.length ? 1 : 2
                            } items-center justify-center rounded-md border border-dashed`}
                          >
                            <UploadIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            multiple
                          />
                        </div>
                        {errors.images && (
                          <span className="text-red-500">
                            {errors.images.message?.toString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Descartar
                </Button>
                <Button type="submit" size="sm">
                  Salvar Produto
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
