import api from "@/api/api";
import { createProduct, CreateProductInterface } from "@/api/products";
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
import { uploadImage } from "@/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, LoaderCircle, UploadIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomMultiSelect from "../CustomMultiSelect";
import DiscountInput from "../DiscountInput";
import PriceInput from "../PriceInput";

// Define Zod schema
const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  selectedCategories: z
    .array(z.number())
    .nonempty("Selecione pelo menos uma categoria"),
  selectedColors: z.array(z.number()).nonempty("Selecione pelo menos uma cor"),
  brand: z.number().min(1, "Marca é obrigatória"),
  price: z.number().positive("Preço deve ser positivo"),
  discount: z.number().positive("Desconto deve ser positivo"),
  stock: z.number().min(1, "Quantidade deve ser pelo menos 1"),
  images: z
    .array(z.object({ name: z.string(), preview: z.string() }))
    .nonempty("Adicione pelo menos uma imagem"),
});

export function CreateProduct() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
    setValue,
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

  const getNumericValue = (value: string) => {
    return parseInt(value.replace(/[^0-9]/g, ""));
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      let uploadedLinksArray = []

      for (const image of data.images) {
        const response = await uploadImage(image)
        uploadedLinksArray.push(response)
      }

      const createdProduct: CreateProductInterface = {
        price: data.price,
        title: data.name,
        description: data.description,
        discount: data.discount,
        stock_total: data.stock,
        brand: data.brand,
        categories: data.selectedCategories,
        images: uploadedLinksArray,
        colors: data.selectedColors,
      }

      console.log("createdProduct", createdProduct)

      const response = await createProduct(createdProduct);
      if (response) {
        navigate("/products")
      }
    } catch (error) {
      console.log("CreateProduct Error", error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      {
        isLoading && (
          <div className="absolute top-0 w-full h-full z-10 flex items-center justify-center bg-gray-900/70">
            <LoaderCircle className="w-12 h-12 animate-spin" />
          </div>
        )
      }
      <div className="relative flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 m-auto sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                    <Link to="/products">Produtos</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Criar produto</BreadcrumbPage>
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
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Voltar</span>
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
                              onValueChange={(value) => setValue("brand", Number(value))}
                            >
                              <SelectTrigger
                                id="brand"
                                aria-label="Selecione a Marca"
                              >
                                <SelectValue placeholder="Selecione a marca" />
                              </SelectTrigger>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem key={brand.id} value={String(brand.id)}>
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
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                console.log(e.target.value);
                                setValue(
                                  "price",
                                  getNumericValue(e.target.value)
                                );
                              }}
                            />
                            {errors.price && (
                              <span className="text-red-500">
                                {errors.price.message?.toString()}
                              </span>
                            )}
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="price">Desconto</Label>
                            <DiscountInput
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValue(
                                  "discount",
                                  getNumericValue(e.target.value)
                                );
                              }}
                            />
                            {errors.discount && (
                              <span className="text-red-500">
                                {errors.discount.message?.toString()}
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
                              className={`cursor-pointer flex aspect-square w-full col-span-${images.length ? 1 : 2
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
    </>
  );
}
